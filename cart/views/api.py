from django.shortcuts import get_object_or_404
from rest_framework import status
from rest_framework.pagination import PageNumberPagination
from rest_framework.permissions import IsAuthenticated
from rest_framework.response import Response
from rest_framework.viewsets import ModelViewSet
from rolepermissions.checkers import has_role

from users.permissions import IsClient, IsGerente

from ..models import Cart, Order
from ..serializers import CartSerializer, OrderSerializer


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

        food_id = serializer.validated_data.get('food').id
        quantity_food = serializer.validated_data.get('quantity')
        cart_item = Cart.objects.filter(food=food_id, quantity=quantity_food).first()
        has_cart_item = cart_item is not None
        
        # Verify if object exists
        if has_cart_item:
            cart = Cart.objects.get(food=food_id, quantity=quantity_food)
            cart_id = cart.id
            return Response(
            {"id": cart_id},
            status=status.HTTP_200_OK,
        )     

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
        
    def create(self, request, *args, **kwargs):
        serializer = self.get_serializer(data=request.data)
        serializer.is_valid(raise_exception=True)
        carts = serializer.validated_data.get('cart')

        # Sum total price
        total_price = 0
        for cart in carts:
            total_price += cart.total_price_foods

        serializer.save(user_id=request.user.id, total_price_order=total_price)
        headers = self.get_success_headers(serializer.data)
        return Response(
            # serializer.data,
            status=status.HTTP_201_CREATED,
            headers=headers
        )
