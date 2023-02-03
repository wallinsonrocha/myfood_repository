from django.shortcuts import get_object_or_404
from rest_framework import status
from rest_framework.response import Response
from rest_framework.viewsets import ModelViewSet
from users.permissions import IsClient, IsGerente
from rest_framework.permissions import IsAuthenticated
from .models import Cart, Order
from .serializers import CartSerializer, OrderSerializer
from rest_framework.pagination import PageNumberPagination
from rolepermissions.checkers import has_role


class CartAPIViewSet(ModelViewSet):
    queryset = Cart.objects.get_queryset().order_by('id')
    serializer_class = CartSerializer
    pagination_class = PageNumberPagination
    permission_classes = [IsAuthenticated]
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

    def get_permissions(self):
        if self.request.method in ['PUT', 'PATCH', 'DELETE']:
            return [IsGerente(), ]
        if self.request.method:
            return [IsClient(), ]


class OrderAPIViewSet(ModelViewSet):
    queryset = Order.objects.get_queryset().order_by('id')
    serializer_class = OrderSerializer
    pagination_class = PageNumberPagination
    permission_classes = [IsAuthenticated]
    http_method_names = ['get', 'options', 'head', 'patch', 'post', 'delete']

    def get_object(self):
        pk = self.kwargs.get('pk', '')

        obj = get_object_or_404(
            self.get_queryset(),
            pk=pk,
        )

        self.check_object_permissions(self.request, obj)

        return obj

    def get_permissions(self):
        if self.request.method in ['PUT', 'PATCH', 'DELETE']:
            return [IsGerente(), ]
        if self.request.method:
            return [IsClient(), ]

    def list(self, request, *args, **kwargs):
        list_user = Order.objects.get_queryset().\
            filter(user=request.user).order_by('id')
        list_admin = Order.objects.get_queryset().order_by('id')

        if has_role(request.user, 'gerente'):
            page = self.paginate_queryset(list_admin)
            if page is not None:
                serializer = self.get_serializer(page, many=True)
                return self.get_paginated_response(serializer.data)

        page = self.paginate_queryset(list_user)
        if page is not None:
            serializer = self.get_serializer(page, many=True)
            return self.get_paginated_response(serializer.data)
