from rolepermissions.checkers import has_role

from .test_cartBase import CartTestBase
from rest_framework import test
from django.urls import reverse


class OrderAPIMixin(CartTestBase):
    def get_url_list(self):
        return reverse("cart:order-api-list")

    def get_url_detail(self, pk=1):
        return reverse("cart:order-api-detail", args=(pk,))

    def get_order_data_parcial_update(self):
        return {
            "is_send": True,
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
            reverse('food:token_obtain_pair'), data={**userdata}
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
            reverse('food:token_obtain_pair'), data={**userdata}
        )

        return {
            'jwt_access_token': response.data.get('access'),
            'jwt_refresh_token': response.data.get('refresh'),
            'user': user,
        }
    def get_order_data(self, user=1):
        self.make_user()
        food_data = {
            "title": "Double Sanduiche",
            "description": "Delicious sanduiche",
            "price": 15
        }

        cart1 = self.make_cart()
        cart2 = self.make_cart(food_data=food_data)

        return {
            "user": user,
            "cart": [cart1.id, cart2.id]
        }



class OrderAPI(test.APITestCase, OrderAPIMixin):
# Anonymous User
    def test_if_anonymous_user_cant_get(self):
        response = self.client.get(self.get_url_list())

        self.assertEqual(
            response.status_code,
            401
        )

    def test_if_anonymous_user_cant_get_pk(self):
        response = self.client.get(self.get_url_detail())

        self.assertEqual(
            response.status_code,
            401
        )


    def test_if_anonymous_user_cant_post(self):
        response_cart = self.client.post(
            self.get_url_list(),
        )

        self.assertEqual(
            response_cart.status_code,
            401
        )


    def test_if_anonymous_user_cant_delete(self):
        response_cart = self.client.delete(
            self.get_url_detail(),
        )

        self.assertEqual(
            response_cart.status_code,
            401
        )


    def test_if_anonymous_user_cant_update(self):
        response_cart = self.client.patch(
            self.get_url_detail(),
        )

        self.assertEqual(
            response_cart.status_code,
            401
        )

# Client user
    def test_if_client_can_get_only_his_order(self):
        cliente = self.get_auth_data_cliente()
        cliente_user = cliente.get('user')
        self.make_order_to_user(user=cliente_user)
        self.make_order()
        jwt_access_token = cliente.get('jwt_access_token')

        response = self.client.get(
            self.get_url_list(),
            HTTP_AUTHORIZATION=f'Bearer {jwt_access_token}'
        )

        for data in response.data.get('results'):
            self.assertEqual(
                data.get('user'),
                cliente_user.id
            )

    def test_if_client_can_get_his_pk_order(self):
        cliente = self.get_auth_data_cliente()
        cliente_user = cliente.get('user')
        self.make_order()
        jwt_access_token = cliente.get('jwt_access_token')

        order = self.make_order_to_user(user=cliente_user)

        response = self.client.get(
            self.get_url_detail(pk=order.id),
            HTTP_AUTHORIZATION=f'Bearer {jwt_access_token}'
        )


        self.assertEqual(
            response.status_code,
            200
        )

    def test_if_user_can_post_a_order(self):
        cliente = self.get_auth_data_cliente()
        cliente_id = cliente.get('user').id
        order_data = self.get_order_data(user=cliente_id)
        jwt_access_token = cliente.get('jwt_access_token')

        response = self.client.post(
            self.get_url_list(),
            data=order_data,
            HTTP_AUTHORIZATION=f'Bearer {jwt_access_token}'
        )

        self.assertEqual(
            response.status_code,
            201
        )

    def test_if_user_cant_update_his_order(self):
        cliente = self.get_auth_data_cliente()
        cliente_user = cliente.get('user')
        order = self.make_order_to_user(user=cliente_user)
        jwt_access_token = cliente.get('jwt_access_token')

        self.get_url_detail()

        response = self.client.patch(
            self.get_url_detail(order.id),
            HTTP_AUTHORIZATION=f'Bearer {jwt_access_token}'
        )

        self.assertEqual(
            response.status_code,
            403
        )

    def test_if_client_cant_get_other_order(self):
        cliente = self.get_auth_data_cliente()
        cliente_user = cliente.get('user')
        jwt_access_token = cliente.get('jwt_access_token')
        self.make_order_to_user(user=cliente_user)

        other_order = self.make_order()
        other_id = other_order.user.id

        response = self.client.get(
            self.get_url_detail(pk=other_id),
            HTTP_AUTHORIZATION=f'Bearer {jwt_access_token}'
        )

        self.assertEqual(
            response.status_code,
            403
        )

# Gerent user
    def test_if_gerente_can_create(self):
        order_data = self.get_order_data()
        gerente = self.get_auth_data_gerente()
        jwt_access_token = gerente.get('jwt_access_token')

        response = self.client.post(
            self.get_url_list(),
            data=order_data,
            HTTP_AUTHORIZATION=f'Bearer {jwt_access_token}'
        )

        self.assertEqual(
            response.status_code,
            201
        )

    def test_if_gerente_can_update(self):
        order_data = self.get_order_data_parcial_update()
        gerente = self.get_auth_data_gerente()
        jwt_access_token = gerente.get('jwt_access_token')

        order = self.make_order()

        response = self.client.patch(
            self.get_url_detail(pk=order.id),
            data=order_data,
            HTTP_AUTHORIZATION=f'Bearer {jwt_access_token}',
        )

        self.assertEqual(
            response.status_code,
            200
        )

    def test_if_gerente_can_delete(self):
        gerente = self.get_auth_data_gerente()
        jwt_access_token = gerente.get('jwt_access_token')

        order = self.make_order()

        response = self.client.patch(
            # Observe o nome detail e o argumento que ele requer
            self.get_url_detail(pk=order.id),
            HTTP_AUTHORIZATION=f'Bearer {jwt_access_token}',
        )

        self.assertEqual(
            response.status_code,
            200
        )