"""Delete replaced or cleared ImageField files from storage when saving in admin."""

from django.db.models.signals import pre_save
from django.dispatch import receiver

from .models import Project, ProjectScreenshot, Testimonial


def _delete_replaced_image_file(instance, Model, field_name: str) -> None:
    if not instance.pk:
        return
    try:
        old = Model.objects.get(pk=instance.pk)
    except Model.DoesNotExist:
        return
    old_file = getattr(old, field_name, None)
    if not old_file or not old_file.name:
        return
    old_name = old_file.name

    new_file = getattr(instance, field_name, None)
    if not new_file or not getattr(new_file, 'name', None):
        old_file.delete(save=False)
        return
    if new_file.name != old_name:
        old_file.delete(save=False)


@receiver(pre_save, sender=Project)
def project_image_cleanup(sender, instance, **kwargs):
    _delete_replaced_image_file(instance, Project, 'image')


@receiver(pre_save, sender=ProjectScreenshot)
def screenshot_image_cleanup(sender, instance, **kwargs):
    _delete_replaced_image_file(instance, ProjectScreenshot, 'image')


@receiver(pre_save, sender=Testimonial)
def testimonial_avatar_cleanup(sender, instance, **kwargs):
    _delete_replaced_image_file(instance, Testimonial, 'avatar')
