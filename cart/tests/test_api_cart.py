from django.contrib.auth.models import User
from rest_framework import test
from unittest.mock import patch
from django.urls import reverse
from .test_cartBase import CartTestBase


class CartAPIMixin(CartTestBase):
    def get_cart_url_list(self):
        return reverse('cart:cart-api-list')

    def get_cart_url_detail(self, pk=1):
        return reverse('cart:cart-api-detail', args=(pk,))

    def get_cart_data_raw(self, qtd=1):
        self.make_food()
        return{
            "food": 1,
            "quantity": qtd
        }

    def get_auth_data_cliente(self, username='user', password='pass'):
        userdata = {
            'username': username,
            'password': password,
        }
        user = self.make_user_client(
            username=userdata.get('username'),
            password=userdata.get('password')
        )
        response = self.client.post(
            reverse('cart:token_obtain_pair'), data={**userdata}
        )
        return {
            'jwt_access_token': response.data.get('access'),
            'jwt_refresh_token': response.data.get('refresh'),
            'user': user,
        }

    def get_auth_data_gerente(self, username='gerente', password='123456'):
        userdata = {
            'username': username,
            'password': password,
        }
        user = self.make_user_gerente(
            username=userdata.get('username'),
            password=userdata.get('password')
        )
        response = self.client.post(
            reverse('cart:token_obtain_pair'), data={**userdata}
        )

        return {
            'jwt_access_token': response.data.get('access'),
            'jwt_refresh_token': response.data.get('refresh'),
            'user': user,
        }


class CartAPI(test.APITestCase, CartAPIMixin):
    # Anonymous User
    def test_if_anonymous_user_cant_get_cart(self):
        self.make_cart()
        response_cart = self.client.get(self.get_cart_url_list())

        self.assertEqual(
            response_cart.status_code,
            401
        )

    def test_if_anonymous_user_cant_post_cart(self):
        cart_data = self.get_cart_data_raw()
        response_cart = self.client.post(
            self.get_cart_url_list(),
            data=cart_data
        )

        self.assertEqual(
            response_cart.status_code,
            401
        )

    def test_if_anonymous_user_cant_delete_cart(self):
        cart_data = self.get_cart_data_raw()
        response_cart = self.client.delete(
            self.get_cart_url_detail(),
        )

        self.assertEqual(
            response_cart.status_code,
            401
        )

    def test_if_anonymous_user_cant_update_cart(self):
        cart_data = self.get_cart_data_raw()
        response_cart = self.client.patch(
            self.get_cart_url_detail(),
        )

        self.assertEqual(
            response_cart.status_code,
            401
        )

    # Client user
    def test_if_client_can_get_cart(self):
        cliente = self.get_auth_data_cliente()
        self.make_cart()
        jwt_access_token = cliente.get('jwt_access_token')

        response = self.client.get(
            self.get_cart_url_list(),
            HTTP_AUTHORIZATION=f'Bearer {jwt_access_token}'
        )

        self.assertEqual(
            response.status_code,
            200
        )

    def test_if_client_can_post_cart(self):
        cliente = self.get_auth_data_cliente()
        cart_data = self.get_cart_data_raw()
        jwt_access_token = cliente.get('jwt_access_token')

        response = self.client.post(
            self.get_cart_url_list(),
            data=cart_data,
            HTTP_AUTHORIZATION=f'Bearer {jwt_access_token}'
        )

        self.assertEqual(
            response.status_code,
            201
        )




