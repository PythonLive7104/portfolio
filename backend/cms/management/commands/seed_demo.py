from django.core.management.base import BaseCommand

from cms.models import (
    HomeTechStackItem,
    Project,
    ProjectFeature,
    ProjectScreenshot,
    ProjectTech,
    TechTag,
    Testimonial,
)


class Command(BaseCommand):
    help = 'Creates sample CMS rows so the API and site are not empty (safe to run once).'

    def handle(self, *args, **options):
        if Project.objects.exists():
            self.stdout.write(self.style.WARNING('Projects already exist; skipping seed.'))
            return

        tags = [
            TechTag.objects.create(label='React', category='frontend'),
            TechTag.objects.create(label='Django', category='backend'),
            TechTag.objects.create(label='DRF', category='backend'),
        ]

        p = Project.objects.create(
            slug='sample-saas-dashboard',
            title='Sample SaaS Dashboard',
            short_description='Demo project - replace copy and images from Django admin.',
            external_image_url='https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=1200&h=750&fit=crop',
            live_demo_url='https://example.com',
            github_url='https://github.com',
            featured=True,
            list_order=0,
            overview='Overview text editable in admin.',
            problem='Problem statement goes here.',
            solution='Solution narrative goes here.',
        )
        for i, t in enumerate(tags):
            ProjectTech.objects.create(project=p, tag=t, position=i)
        ProjectFeature.objects.create(project=p, position=0, text='Feature one — edit in admin.')
        ProjectFeature.objects.create(project=p, position=1, text='Feature two — edit in admin.')
        ProjectScreenshot.objects.create(
            project=p,
            position=0,
            external_image_url='https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=1600&h=1000&fit=crop',
            caption='Screenshot caption',
        )

        HomeTechStackItem.objects.create(label='React', category='frontend', sort_order=0)
        HomeTechStackItem.objects.create(label='Django', category='backend', sort_order=1)
        HomeTechStackItem.objects.create(label='DRF', category='backend', sort_order=2)

        Testimonial.objects.create(
            quote='Great experience shipping our SaaS MVP - swap this quote in admin.',
            author_name='Alex Rivera',
            author_role='Product Lead',
            author_company='Demo Co',
            avatar_url='https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=128&h=128&fit=crop',
            sort_order=0,
        )

        self.stdout.write(self.style.SUCCESS('Demo portfolio content created.'))
