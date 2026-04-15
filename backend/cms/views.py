from rest_framework import viewsets
from rest_framework.pagination import PageNumberPagination
from rest_framework.response import Response
from rest_framework.views import APIView

from .models import HomeTechStackItem, Project, SiteProfile, Testimonial
from .serializers import (
    HomeTechStackSerializer,
    ProjectDetailSerializer,
    ProjectListSerializer,
    SiteProfileSerializer,
    TestimonialSerializer,
)


class OptionalPagination(PageNumberPagination):
    page_size = 50
    page_size_query_param = 'page_size'
    max_page_size = 100


class ProjectViewSet(viewsets.ReadOnlyModelViewSet):
    lookup_field = 'slug'
    pagination_class = OptionalPagination

    def get_queryset(self):
        qs = Project.objects.select_related('card_thumbnail').prefetch_related(
            'project_tech_links__tag',
            'features',
            'screenshots',
        ).all()
        if self.request.query_params.get('featured') == 'true':
            qs = qs.filter(featured=True)
        return qs

    def get_serializer_class(self):
        if self.action == 'retrieve':
            return ProjectDetailSerializer
        return ProjectListSerializer


class TestimonialViewSet(viewsets.ReadOnlyModelViewSet):
    queryset = Testimonial.objects.all()
    serializer_class = TestimonialSerializer
    pagination_class = None

    def list(self, request, *args, **kwargs):
        queryset = self.filter_queryset(self.get_queryset())
        serializer = self.get_serializer(queryset, many=True)
        return Response({'results': serializer.data})


class SiteProfileView(APIView):
    def get(self, request, *args, **kwargs):
        profile = SiteProfile.load()
        data = SiteProfileSerializer(profile, context={'request': request}).data
        return Response(data)


class HomeTechStackViewSet(viewsets.ReadOnlyModelViewSet):
    queryset = HomeTechStackItem.objects.all()
    serializer_class = HomeTechStackSerializer
    pagination_class = None

    def list(self, request, *args, **kwargs):
        queryset = self.filter_queryset(self.get_queryset())
        serializer = self.get_serializer(queryset, many=True)
        return Response({'results': serializer.data})
