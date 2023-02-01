from rest_framework import test
from unittest.mock import patch
from django.urls import reverse
from .test_foodBase import FoodTestBase

from food.models import Category


class FoodAPIMixin(FoodTestBase):
    def get_url_list(self, parametre='food:food-api-list'):
        rv = reverse(parametre)
        return rv

    def get_food_data(self):
        # Necessário para fazer a associação category_id
        category = self.make_category(name="Category")
        return {
            "title": "Title django test 1000",
            "description": "This is the description",
            "price": 25,
            "category": category.id
        }

    def get_food_data_parcial_update(self):
        return {
            "title": "Title django test 8080",
            "description": "This is the description 8080",
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


class FoodListView(test.APITestCase, FoodAPIMixin):
    @patch('food.views.FoodPagination.page_size', new=10)
    def test_if_food_list_is_loading(self):
        wanted_number_of_food = 10

        self.make_food_in_batch(qtd=wanted_number_of_food)

        response = self.client.get(self.get_url_list() + '?page=1')

        qtd_of_loaded_food = len(response.data.get('results'))

        self.assertEqual(
            wanted_number_of_food,
            qtd_of_loaded_food
        )

    def test_if_request_get_sugar_category_is_correct(self):
        self.make_food(title="Hamburguer double blend", category_data={'name': 'savory'})
        self.make_food(title="Biscoitos cremosos", category_data={'name': 'sugar'})

        response = self.client.get(reverse('food:food-api-list') + '?category_id=2')

        category_number = response.data.get('results')[0].get('category')

        self.assertEqual(
            category_number,
            2
        )

    def test_if_post_without_login_is_will_fail(self):
        response = self.client.post(self.get_url_list())
        self.assertEqual(
            response.status_code,
            401
        )

    def test_if_pacth_id_without_login_is_fail(self):
        food = self.make_food()
        response = self.client.patch(
            reverse('food:food-api-detail', args=(food.id,)),
        )
        self.assertEqual(
            response.status_code,
            401
        )

    def test_if_delete_id_without_login_is_fail(self):
        food = self.make_food()
        response = self.client.delete(
            reverse('food:food-api-detail', args=(food.id,)),
        )
        self.assertEqual(
            response.status_code,
            401
        )

    def test_if_get_id_without_login_is_sucess(self):
        food = self.make_food()
        response = self.client.get(
            reverse('food:food-api-detail', args=(food.id,)),
        )
        self.assertEqual(
            response.status_code,
            200
        )

    def test_if_gerente_can_create_food(self):
        food_data = self.get_food_data()
        gerente = self.get_auth_data_gerente()
        jwt_access_token = gerente.get('jwt_access_token')

        response = self.client.post(
            self.get_url_list(),
            data=food_data,
            HTTP_AUTHORIZATION=f'Bearer {jwt_access_token}'
        )

        self.assertEqual(
            response.status_code,
            201
        )

    def test_if_client_cant_create_food(self):
        food_data = self.get_food_data()
        cliente = self.get_auth_data_cliente()
        jwt_access_token = cliente.get('jwt_access_token')

        response = self.client.post(
            self.get_url_list(),
            data=food_data,
            HTTP_AUTHORIZATION=f'Bearer {jwt_access_token}'
        )

        self.assertEqual(
            response.status_code,
            403
        )

    def test_if_gerente_can_update_food(self):
        food_data = self.get_food_data_parcial_update()
        gerente = self.get_auth_data_gerente()
        jwt_access_token = gerente.get('jwt_access_token')

        food = self.make_food()

        response = self.client.patch(
            # Observe o nome detail e o argumento que ele requer
            reverse('food:food-api-detail', args=(food.id,)),
            data=food_data,
            HTTP_AUTHORIZATION=f'Bearer {jwt_access_token}',
        )

        self.assertEqual(
            response.status_code,
            200
        )

    def test_if_client_cant_update_food(self):
        food_data = self.get_food_data_parcial_update()
        cliente = self.get_auth_data_cliente()
        jwt_access_token = cliente.get('jwt_access_token')

        food = self.make_food()

        response = self.client.patch(
            # Observe o nome detail e o argumento que ele requer
            reverse('food:food-api-detail', args=(food.id,)),
            data=food_data,
            HTTP_AUTHORIZATION=f'Bearer {jwt_access_token}',
        )

        self.assertEqual(
            response.status_code,
            403
        )

    def test_if_gerente_can_delete_food(self):
        gerente = self.get_auth_data_gerente()
        jwt_access_token = gerente.get('jwt_access_token')

        food = self.make_food()

        response = self.client.patch(
            # Observe o nome detail e o argumento que ele requer
            reverse('food:food-api-detail', args=(food.id,)),
            HTTP_AUTHORIZATION=f'Bearer {jwt_access_token}',
        )

        self.assertEqual(
            response.status_code,
            200
        )


    def test_if_cliente_cant_delete_food(self):
        cliente = self.get_auth_data_cliente()
        jwt_access_token = cliente.get('jwt_access_token')

        food = self.make_food()

        response = self.client.patch(
            # Observe o nome detail e o argumento que ele requer
            reverse('food:food-api-detail', args=(food.id,)),
            HTTP_AUTHORIZATION=f'Bearer {jwt_access_token}',
        )

        self.assertEqual(
            response.status_code,
            403
        )