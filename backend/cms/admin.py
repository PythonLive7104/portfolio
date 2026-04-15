from django.contrib import admin
from django.urls import resolve
from django.utils.html import format_html

from .models import (
    HomeTechStackItem,
    Project,
    ProjectFeature,
    ProjectScreenshot,
    ProjectTech,
    SiteProfile,
    TechTag,
    Testimonial,
)


class ProjectTechInline(admin.TabularInline):
    model = ProjectTech
    extra = 1
    autocomplete_fields = ['tag']
    ordering = ['position']
    fields = ['tag', 'position']


class ProjectFeatureInline(admin.TabularInline):
    model = ProjectFeature
    extra = 1
    ordering = ['position']
    fields = ['text', 'position']


class ProjectScreenshotInline(admin.StackedInline):
    model = ProjectScreenshot
    extra = 0
    ordering = ['position']
    fields = ['position', 'image', 'external_image_url', 'caption']
    verbose_name = 'Screenshot'
    verbose_name_plural = 'Screenshots (drag order: use Position; replace image by uploading again)'


@admin.register(SiteProfile)
class SiteProfileAdmin(admin.ModelAdmin):
    list_display = ['__str__', 'profile_preview', 'has_resume']
    fieldsets = (
        (
            'Hero',
            {'fields': ('profile_image', 'profile_image_alt')},
        ),
        (
            'Resume',
            {
                'fields': ('resume',),
                'description': 'Upload a PDF. It appears on the site Resume page and in the nav when set.',
            },
        ),
    )

    def has_add_permission(self, request):
        return not SiteProfile.objects.exists()

    def has_delete_permission(self, request, obj=None):
        return False

    @admin.display(description='Preview')
    def profile_preview(self, obj: SiteProfile):
        if not obj.profile_image:
            return '—'
        return format_html(
            '<img src="{}" width="56" height="56" style="object-fit:cover;border-radius:9999px" />',
            obj.profile_image.url,
        )

    @admin.display(description='Resume', boolean=True)
    def has_resume(self, obj: SiteProfile):
        return bool(obj.resume)


@admin.register(Project)
class ProjectAdmin(admin.ModelAdmin):
    list_display = ['title', 'slug', 'featured', 'list_order', 'hero_preview']
    list_filter = ['featured']
    list_editable = ['featured', 'list_order']
    prepopulated_fields = {'slug': ('title',)}
    search_fields = ['title', 'slug', 'short_description']
    inlines = [ProjectTechInline, ProjectFeatureInline, ProjectScreenshotInline]
    fieldsets = (
        (None, {'fields': ('title', 'slug', 'short_description')}),
        (
            'Media',
            {
                'fields': ('image', 'external_image_url', 'card_thumbnail'),
                'description': (
                    'To change the hero: pick a new file under Image and click Save. '
                    'Check Clear if you want to remove the upload and rely on screenshots / URL. '
                    'Card / featured image: save Screenshots first, then select which one appears on '
                    'the home page and project cards (optional).'
                ),
            },
        ),
        (
            'Listing & links',
            {'fields': ('featured', 'list_order', 'live_demo_url', 'github_url')},
        ),
        ('Case study text', {'fields': ('overview', 'problem', 'solution')}),
    )

    def formfield_for_foreignkey(self, db_field, request, **kwargs):
        if db_field.name == 'card_thumbnail':
            match = resolve(request.path)
            oid = match.kwargs.get('object_id')
            if oid:
                kwargs['queryset'] = ProjectScreenshot.objects.filter(project_id=oid).order_by(
                    'position', 'pk'
                )
            else:
                kwargs['queryset'] = ProjectScreenshot.objects.none()
        return super().formfield_for_foreignkey(db_field, request, **kwargs)

    @admin.display(description='Image')
    def hero_preview(self, obj: Project):
        url = ''
        if obj.image:
            url = obj.image.url
        elif obj.external_image_url:
            url = obj.external_image_url
        if not url:
            return '—'
        return format_html(
            '<img src="{}" width="72" height="48" style="object-fit:cover;border-radius:4px" />',
            url,
        )


@admin.register(ProjectScreenshot)
class ProjectScreenshotAdmin(admin.ModelAdmin):
    list_display = ['project', 'position', 'thumb_preview', 'caption']
    list_filter = ['project']
    search_fields = ['project__title', 'caption']
    ordering = ['project', 'position', 'pk']
    fields = ['project', 'position', 'image', 'external_image_url', 'caption']

    @admin.display(description='Thumb')
    def thumb_preview(self, obj: ProjectScreenshot):
        if obj.image:
            url = obj.image.url
        elif obj.external_image_url:
            url = obj.external_image_url
        else:
            return '—'
        return format_html(
            '<img src="{}" width="64" height="40" style="object-fit:cover;border-radius:4px" />',
            url,
        )


@admin.register(TechTag)
class TechTagAdmin(admin.ModelAdmin):
    search_fields = ['label']


@admin.register(HomeTechStackItem)
class HomeTechStackItemAdmin(admin.ModelAdmin):
    list_display = ['label', 'category', 'sort_order']
    list_editable = ['sort_order']


@admin.register(Testimonial)
class TestimonialAdmin(admin.ModelAdmin):
    list_display = ['author_name', 'author_company', 'sort_order']
    list_editable = ['sort_order']
