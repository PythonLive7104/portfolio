from django.conf import settings
from rest_framework import serializers

from .models import HomeTechStackItem, Project, ProjectScreenshot, SiteProfile, TechTag, Testimonial


def _media_file_url(request, file_field):
    """
    URL for uploaded files in API responses.

    Admin uses relative ``/media/...`` paths, so thumbnails work. The API used to call
    ``build_absolute_uri()``, which behind Docker/nginx can become ``http://backend:8000/media/...``,
    which browsers cannot load. Prefer path-only URLs so ``<img src>`` resolves on the public host.

    Override with ``PUBLIC_BASE_URL`` (e.g. https://cdn.example.com) when media is on another origin.
    """
    if not file_field or not hasattr(file_field, 'url'):
        return None
    base = getattr(settings, 'PUBLIC_BASE_URL', '').strip().rstrip('/')
    if base:
        return f'{base}{file_field.url}'
    if getattr(settings, 'MEDIA_USE_RELATIVE_URLS', True):
        return file_field.url
    if request:
        return request.build_absolute_uri(file_field.url)
    return None


def _first_project_screenshot_url(obj: Project, request):
    """Prefer lowest position; works with prefetched ``screenshots``."""
    first = None
    for s in obj.screenshots.all():
        if first is None or (s.position, s.pk) < (first.position, first.pk):
            first = s
    if not first:
        return None
    u = _media_file_url(request, first.image)
    if u:
        return u
    return first.external_image_url or None


def _url_from_screenshot(shot: ProjectScreenshot | None, request) -> str | None:
    if shot is None:
        return None
    u = _media_file_url(request, shot.image)
    if u:
        return u
    return shot.external_image_url or None


def _project_banner_url(obj: Project, request) -> str:
    """
    Case-study top banner (detail page): hero image → first screenshot → external URL.
    Does not use Card / featured screenshot pick.
    """
    u = _media_file_url(request, obj.image)
    if u:
        return u
    shot_url = _first_project_screenshot_url(obj, request)
    if shot_url:
        return shot_url
    return obj.external_image_url or ''


def _project_list_card_url(obj: Project, request) -> str:
    """
    Home + /projects cards: optional Card / featured screenshot → then same as banner.
    """
    picked = _url_from_screenshot(getattr(obj, 'card_thumbnail', None), request)
    if picked:
        return picked
    return _project_banner_url(obj, request)


class TechBadgeSerializer(serializers.ModelSerializer):
    id = serializers.SerializerMethodField()

    class Meta:
        model = TechTag
        fields = ['id', 'label', 'category']

    def get_id(self, obj: TechTag) -> str:
        return str(obj.pk)


class SiteProfileSerializer(serializers.ModelSerializer):
    profile_image_url = serializers.SerializerMethodField()
    resume_url = serializers.SerializerMethodField()

    class Meta:
        model = SiteProfile
        fields = ['profile_image_url', 'profile_image_alt', 'resume_url']

    def get_profile_image_url(self, obj: SiteProfile):
        request = self.context.get('request')
        return _media_file_url(request, obj.profile_image)

    def get_resume_url(self, obj: SiteProfile):
        request = self.context.get('request')
        return _media_file_url(request, obj.resume)


class HomeTechStackSerializer(serializers.ModelSerializer):
    id = serializers.SerializerMethodField()

    class Meta:
        model = HomeTechStackItem
        fields = ['id', 'label', 'category']

    def get_id(self, obj: HomeTechStackItem) -> str:
        return str(obj.pk)


class TestimonialSerializer(serializers.ModelSerializer):
    id = serializers.SerializerMethodField()
    avatar_url = serializers.SerializerMethodField()

    class Meta:
        model = Testimonial
        fields = [
            'id',
            'quote',
            'author_name',
            'author_role',
            'author_company',
            'avatar_url',
        ]

    def get_id(self, obj: Testimonial) -> str:
        return str(obj.pk)

    def get_avatar_url(self, obj: Testimonial):
        request = self.context.get('request')
        if obj.avatar:
            return _media_file_url(request, obj.avatar)
        return obj.avatar_url or None


class ProjectScreenshotSerializer(serializers.ModelSerializer):
    id = serializers.SerializerMethodField()
    url = serializers.SerializerMethodField()

    class Meta:
        model = ProjectScreenshot
        fields = ['id', 'url', 'caption']

    def get_id(self, obj: ProjectScreenshot) -> str:
        return str(obj.pk)

    def get_url(self, obj: ProjectScreenshot):
        request = self.context.get('request')
        u = _media_file_url(request, obj.image)
        if u:
            return u
        return obj.external_image_url or ''


class ProjectListSerializer(serializers.ModelSerializer):
    id = serializers.SerializerMethodField()
    image_url = serializers.SerializerMethodField()
    tech_stack = serializers.SerializerMethodField()
    order = serializers.IntegerField(source='list_order')

    class Meta:
        model = Project
        fields = [
            'id',
            'slug',
            'title',
            'short_description',
            'image_url',
            'tech_stack',
            'live_demo_url',
            'github_url',
            'featured',
            'order',
        ]

    def get_id(self, obj: Project) -> str:
        return str(obj.pk)

    def get_image_url(self, obj: Project):
        request = self.context.get('request')
        return _project_list_card_url(obj, request)

    def get_tech_stack(self, obj: Project):
        links = obj.project_tech_links.select_related('tag').all()
        return TechBadgeSerializer([l.tag for l in links], many=True).data


class ProjectDetailSerializer(ProjectListSerializer):
    features = serializers.SerializerMethodField()
    screenshots = serializers.SerializerMethodField()

    class Meta(ProjectListSerializer.Meta):
        fields = ProjectListSerializer.Meta.fields + [
            'overview',
            'problem',
            'solution',
            'features',
            'screenshots',
        ]

    def get_image_url(self, obj: Project):
        request = self.context.get('request')
        return _project_banner_url(obj, request)

    def get_features(self, obj: Project):
        return [f.text for f in obj.features.all()]

    def get_screenshots(self, obj: Project):
        shots = obj.screenshots.all()
        return ProjectScreenshotSerializer(shots, many=True, context=self.context).data
