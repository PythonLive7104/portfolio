from django.urls import include, path
from rest_framework.routers import DefaultRouter

from .views import HomeTechStackViewSet, ProjectViewSet, SiteProfileView, TestimonialViewSet

router = DefaultRouter()
router.register(r'projects', ProjectViewSet, basename='project')
router.register(r'testimonials', TestimonialViewSet, basename='testimonial')
router.register(r'home-tech', HomeTechStackViewSet, basename='hometech')

urlpatterns = [
    path('site-profile/', SiteProfileView.as_view(), name='site-profile'),
    path('', include(router.urls)),
]
