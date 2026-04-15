from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('cms', '0007_site_profile_resume'),
    ]

    operations = [
        migrations.AddField(
            model_name='siteprofile',
            name='contact_email',
            field=models.EmailField(blank=True, default='', help_text='Shown in the footer and Contact page for mailto: links.', max_length=254),
        ),
        migrations.AddField(
            model_name='siteprofile',
            name='github_url',
            field=models.URLField(
                blank=True,
                default='',
                help_text='Full URL to your GitHub profile (e.g. https://github.com/yourname).',
                max_length=500,
            ),
        ),
        migrations.AddField(
            model_name='siteprofile',
            name='linkedin_url',
            field=models.URLField(
                blank=True,
                default='',
                help_text='Full URL to your LinkedIn profile.',
                max_length=500,
            ),
        ),
    ]
