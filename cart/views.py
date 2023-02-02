from django.shortcuts import get_object_or_404
from rest_framework import status
from rest_framework.response import Response
from rest_framework.viewsets import ModelViewSet
from users.permissions import IsClient, IsGerente
from .models import Cart, Order
from .serializers import CartSerializer, OrderSerializer
from rest_framework.pagination import PageNumberPagination


class CartAPIViewSet(ModelViewSet):
    queryset = Cart.objects.get_queryset().order_by('id')
    serializer_class = CartSerializer
    pagination_class = PageNumberPagination
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

    def get_permissions(self):
        if self.request.method:
            return [IsClient(), ]
        return super().get_permissions()


class OrderAPIViewSet(ModelViewSet):
    queryset = Order.objects.get_queryset().order_by('id')
    serializer_class = OrderSerializer
    pagination_class = PageNumberPagination
    permission_classes = [IsGerente, IsClient]
    http_method_names = ['get', 'options', 'head', 'patch', 'post', 'delete']


    def get_object(self):
        pk = self.kwargs.get('pk', '')

        obj = get_object_or_404(
            self.get_queryset(),
            pk=pk,
        )

        self.check_object_permissions(self.request, obj)

        return obj
