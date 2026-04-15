"""
URL configuration for config project.
"""

from django.conf import settings
from django.contrib import admin
from django.urls import include, path, re_path
from django.views.decorators.clickjacking import xframe_options_exempt
from django.views.static import serve

urlpatterns = [
    path('admin/', admin.site.urls),
    path('api/', include('cms.urls')),
]

if settings.DEBUG:
    # Default static() uses X-Frame-Options: DENY, which blocks embedding PDFs from /media/ in the SPA iframe.
    urlpatterns += [
        re_path(
            r'^media/(?P<path>.*)$',
            xframe_options_exempt(serve),
            {'document_root': settings.MEDIA_ROOT},
        ),
    ]
