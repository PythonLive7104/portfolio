from django.core.exceptions import ValidationError
from django.core.validators import FileExtensionValidator
from django.db import models


class SiteProfile(models.Model):
    """Singleton (pk=1): hero portrait and site-wide profile fields editable in admin."""

    profile_image = models.ImageField(
        upload_to='profile/',
        blank=True,
        null=True,
        help_text='Portrait shown in the landing page hero. Square or portrait photos work best.',
    )
    profile_image_alt = models.CharField(
        max_length=200,
        blank=True,
        default='',
        help_text='Alt text for the hero image (accessibility).',
    )
    resume = models.FileField(
        upload_to='resumes/',
        blank=True,
        null=True,
        validators=[FileExtensionValidator(['pdf'])],
        help_text='PDF resume. Shown on the public Resume page and linked from the site navigation.',
    )

    class Meta:
        verbose_name = 'Site profile'
        verbose_name_plural = 'Site profile'

    def save(self, *args, **kwargs):
        self.pk = 1
        super().save(*args, **kwargs)

    def delete(self, *args, **kwargs):
        pass

    def __str__(self) -> str:
        return 'Site profile'

    @classmethod
    def load(cls) -> 'SiteProfile':
        obj, _ = cls.objects.get_or_create(pk=1)
        return obj


class TechTag(models.Model):
    """Reusable label for project tech stacks (M2M through ProjectTech)."""

    label = models.CharField(max_length=100)
    category = models.CharField(
        max_length=80,
        blank=True,
        help_text='Optional grouping, e.g. frontend, backend.',
    )

    class Meta:
        ordering = ['label']
        verbose_name = 'Tech tag'

    def __str__(self) -> str:
        return self.label


class HomeTechStackItem(models.Model):
    """Badges shown in the home page Tech stack section."""

    label = models.CharField(max_length=100)
    category = models.CharField(max_length=80, blank=True)
    sort_order = models.PositiveIntegerField(default=0)

    class Meta:
        ordering = ['sort_order', 'pk']
        verbose_name = 'Home tech stack item'

    def __str__(self) -> str:
        return self.label


class Project(models.Model):
    slug = models.SlugField(unique=True, max_length=120)
    title = models.CharField(max_length=200)
    short_description = models.TextField()
    image = models.ImageField(
        upload_to='projects/',
        blank=True,
        null=True,
        help_text='Hero image for project cards and case study banner. If empty, the first screenshot is used.',
    )
    external_image_url = models.URLField(
        max_length=500,
        blank=True,
        help_text=(
            'Optional fallback URL for cards/banner only if there is no hero Image and no Screenshots '
            'with an image.'
        ),
    )
    live_demo_url = models.URLField('Live demo URL', max_length=500, blank=True)
    github_url = models.URLField(max_length=500, blank=True)
    featured = models.BooleanField(
        default=False,
        help_text='If checked, project is eligible for the home page “Featured projects” block (first 3 by list order).',
    )
    list_order = models.PositiveIntegerField(
        default=0,
        help_text='Lower numbers appear first in lists.',
    )
    overview = models.TextField()
    problem = models.TextField()
    solution = models.TextField()
    tech_tags = models.ManyToManyField(
        TechTag,
        through='ProjectTech',
        related_name='projects',
        blank=True,
    )
    card_thumbnail = models.ForeignKey(
        'ProjectScreenshot',
        null=True,
        blank=True,
        on_delete=models.SET_NULL,
        related_name='+',
        verbose_name='Card / featured image',
        help_text=(
            'Pick one of this project’s screenshots to use on the home “Featured” and /projects cards. '
            'Leave blank to auto-pick: hero Image → first screenshot → external URL.'
        ),
    )

    class Meta:
        ordering = ['list_order', 'pk']

    def __str__(self) -> str:
        return self.title

    def clean(self):
        super().clean()
        if self.card_thumbnail_id and self.pk and self.card_thumbnail.project_id != self.pk:
            raise ValidationError(
                {'card_thumbnail': 'Choose a screenshot that belongs to this project (save screenshots first).'},
            )


class ProjectTech(models.Model):
    project = models.ForeignKey(
        Project,
        on_delete=models.CASCADE,
        related_name='project_tech_links',
    )
    tag = models.ForeignKey(TechTag, on_delete=models.CASCADE)
    position = models.PositiveSmallIntegerField(default=0)

    class Meta:
        ordering = ['position', 'pk']
        constraints = [
            models.UniqueConstraint(fields=['project', 'tag'], name='uniq_project_tag'),
        ]


class ProjectFeature(models.Model):
    project = models.ForeignKey(
        Project,
        on_delete=models.CASCADE,
        related_name='features',
    )
    text = models.TextField()
    position = models.PositiveIntegerField(default=0)

    class Meta:
        ordering = ['position', 'pk']

    def __str__(self) -> str:
        return self.text[:50]


class ProjectScreenshot(models.Model):
    project = models.ForeignKey(
        Project,
        on_delete=models.CASCADE,
        related_name='screenshots',
    )
    image = models.ImageField(
        upload_to='screenshots/',
        blank=True,
        null=True,
        help_text='Upload a file here, then Save. To replace it, choose another file (or clear and save).',
    )
    external_image_url = models.URLField(max_length=500, blank=True)
    caption = models.CharField(max_length=255, blank=True)
    position = models.PositiveIntegerField(default=0)

    class Meta:
        ordering = ['position', 'pk']


class Testimonial(models.Model):
    quote = models.TextField()
    author_name = models.CharField(max_length=120)
    author_role = models.CharField(max_length=120)
    author_company = models.CharField(max_length=120)
    avatar = models.ImageField(upload_to='avatars/', blank=True, null=True)
    avatar_url = models.URLField(max_length=500, blank=True)
    sort_order = models.PositiveIntegerField(default=0)

    class Meta:
        ordering = ['sort_order', 'pk']

    def __str__(self) -> str:
        return f'{self.author_name} — {self.author_company}'
