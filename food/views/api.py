from django.db.models import Q
from django.http import Http404
from django.shortcuts import get_object_or_404, render
from rest_framework import status
from rest_framework.pagination import PageNumberPagination
from rest_framework.response import Response
from rest_framework.viewsets import ModelViewSet

from users.permissions import IsGerente

from ..models import Category, Food
from ..serializers import CategorySerializer, FoodSerializer


class FoodPagination(PageNumberPagination):
    page_size = 10

class FoodAPIViewSet(ModelViewSet):
    queryset = Food.objects.get_queryset().order_by('id')
    serializer_class = FoodSerializer
    pagination_class = FoodPagination
    permission_classes = [IsGerente]
    http_method_names = ['get', 'options', 'head', 'patch', 'post', 'delete']

    def get_queryset(self):
        qs = super().get_queryset()
        category_id = self.request.query_params.get('category_id', '')
        is_discount = self.request.query_params.get('is_discount','')
        search_term = self.request.query_params.get('search')

        if category_id != '' and category_id.isnumeric():
            qs = qs.filter(category_id=category_id)

        elif is_discount != '' and is_discount.lower() == 'true':
            qs = qs.filter(is_discount=True)

        elif search_term != '' and search_term:
            qs = qs.filter(Q(slug__icontains=search_term))

            if not qs.exists():
                raise Http404('Não foram encontrados resultados para a pesquisa.')

        return qs

    def get_object(self):
        pk = self.kwargs.get('pk', '')

        obj = get_object_or_404(
            self.get_queryset(),
            pk=pk,
        )

        self.check_object_permissions(self.request, obj)

        return obj

    def create(self, request, *args, **kwargs):
        serializer = self.get_serializer(data=request.data)
        serializer.is_valid(raise_exception=True)
        serializer.save()
        headers = self.get_success_headers(serializer.data)
        return Response(
            serializer.data,
            status=status.HTTP_201_CREATED,
            headers=headers
        )

    def partial_update(self, request, *args, **kwargs):
        food = self.get_object()
        serializer = FoodSerializer(
            instance=food,
            data=request.data,
            many=False,
            context={'request': request},
            partial=True,
        )
        serializer.is_valid(raise_exception=True)
        serializer.save()
        return Response(
            serializer.data,
        )

class CategoryAPIViewSet(ModelViewSet):
    queryset = Category.objects.get_queryset().order_by('id')
    serializer_class = CategorySerializer
    permission_classes = [IsGerente]
    http_method_names = ['get', 'options', 'head', 'patch', 'post', 'delete']

    def get_object(self):
        pk = self.kwargs.get('pk', '')

        obj = get_object_or_404(
            self.get_queryset(),
            pk=pk,
        )

        self.check_object_permissions(self.request, obj)

        return obj

    def create(self, request, *args, **kwargs):
        serializer = self.get_serializer(data=request.data)
        serializer.is_valid(raise_exception=True)
        serializer.save()
        headers = self.get_success_headers(serializer.data)
        return Response(
            serializer.data,
            status=status.HTTP_201_CREATED,
            headers=headers
        )