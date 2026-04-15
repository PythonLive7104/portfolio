from rest_framework import serializers

from .models import HomeTechStackItem, Project, ProjectScreenshot, SiteProfile, TechTag, Testimonial

def _absolute_media_url(request, file_field):
    if file_field and hasattr(file_field, 'url') and request:
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
    u = _absolute_media_url(request, first.image)
    if u:
        return u
    return first.external_image_url or None


def _url_from_screenshot(shot: ProjectScreenshot | None, request) -> str | None:
    if shot is None:
        return None
    u = _absolute_media_url(request, shot.image)
    if u:
        return u
    return shot.external_image_url or None


def _project_banner_url(obj: Project, request) -> str:
    """
    Case-study top banner (detail page): hero image → first screenshot → external URL.
    Does not use Card / featured screenshot pick.
    """
    u = _absolute_media_url(request, obj.image)
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
        return _absolute_media_url(request, obj.profile_image)

    def get_resume_url(self, obj: SiteProfile):
        request = self.context.get('request')
        return _absolute_media_url(request, obj.resume)


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
        if obj.avatar and request:
            return request.build_absolute_uri(obj.avatar.url)
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
        u = _absolute_media_url(request, obj.image)
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
