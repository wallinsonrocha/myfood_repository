from rest_framework import test
from django.urls import reverse
from .test_foodBase import FoodTestBase

class CategoryAPIMixin(FoodTestBase):
    def get_url_list(self, parametre='food:ctg-api-list'):
        rv = reverse(parametre)
        return rv

    def get_url_detail(self, parametre='food:ctg-api-detail', ctg=1):
        rv = reverse(parametre, args=(ctg,))
        return rv

    def get_category_data(self, name="Category 1"):
        return {
            "name": name
        }

    def get_category_data_parcial_update(self, name="Mod Category"):
        return {
            "name": name
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


class CategoryListView(test.APITestCase, CategoryAPIMixin):
    def test_if_post_without_login_is_will_fail(self):
        response = self.client.post(self.get_url_list())
        self.assertEqual(
            response.status_code,
            401
        )

    def test_if_pacth_id_without_login_is_fail(self):
        response = self.client.patch(
            self.get_url_detail(),
        )
        self.assertEqual(
            response.status_code,
            401
        )

    def test_if_delete_id_without_login_is_fail(self):
        ctg = self.make_category()
        response = self.client.delete(
            self.get_url_detail(ctg=ctg.id),
        )
        self.assertEqual(
            response.status_code,
            401
        )

    def test_if_get_id_without_login_is_sucess(self):
        ctg = self.make_category()
        response = self.client.get(
            self.get_url_detail(ctg=ctg.id),
        )
        self.assertEqual(
            response.status_code,
            200
        )

    def test_if_gerente_can_create_food(self):
        ctg_data = self.get_category_data()
        gerente = self.get_auth_data_gerente()
        jwt_access_token = gerente.get('jwt_access_token')

        response = self.client.post(
            self.get_url_list(),
            data=ctg_data,
            HTTP_AUTHORIZATION=f'Bearer {jwt_access_token}'
        )

        self.assertEqual(
            response.status_code,
            201
        )

    def test_if_client_cant_create_food(self):
        ctg_data = self.get_category_data()
        cliente = self.get_auth_data_cliente()
        jwt_access_token = cliente.get('jwt_access_token')

        response = self.client.post(
            self.get_url_list(),
            data=ctg_data,
            HTTP_AUTHORIZATION=f'Bearer {jwt_access_token}'
        )

        self.assertEqual(
            response.status_code,
            403
        )

    def test_if_gerente_can_update_food(self):
        ctg_data = self.get_category_data_parcial_update()
        gerente = self.get_auth_data_gerente()
        jwt_access_token = gerente.get('jwt_access_token')

        ctg = self.make_category()

        response = self.client.patch(
            # Observe o nome detail e o argumento que ele requer
            self.get_url_detail(ctg=ctg.id),
            data=ctg_data,
            HTTP_AUTHORIZATION=f'Bearer {jwt_access_token}',
        )

        self.assertEqual(
            response.status_code,
            200
        )

    def test_if_client_cant_update_food(self):
        ctg_data = self.get_category_data_parcial_update()
        cliente = self.get_auth_data_cliente()
        jwt_access_token = cliente.get('jwt_access_token')

        ctg = self.make_category()

        response = self.client.patch(
            # Observe o nome detail e o argumento que ele requer
            self.get_url_detail(ctg=ctg.id),
            data=ctg_data,
            HTTP_AUTHORIZATION=f'Bearer {jwt_access_token}',
        )

        self.assertEqual(
            response.status_code,
            403
        )

    def test_if_gerente_can_delete_food(self):
        gerente = self.get_auth_data_gerente()
        jwt_access_token = gerente.get('jwt_access_token')

        ctg = self.make_category()

        response = self.client.patch(
            # Observe o nome detail e o argumento que ele requer
            self.get_url_detail(ctg=ctg.id),
            HTTP_AUTHORIZATION=f'Bearer {jwt_access_token}',
        )

        self.assertEqual(
            response.status_code,
            200
        )


    def test_if_cliente_cant_delete_food(self):
        cliente = self.get_auth_data_cliente()
        jwt_access_token = cliente.get('jwt_access_token')

        ctg = self.make_category()

        response = self.client.patch(
            # Observe o nome detail e o argumento que ele requer
            self.get_url_detail(ctg=ctg.id),
            HTTP_AUTHORIZATION=f'Bearer {jwt_access_token}',
        )

        self.assertEqual(
            response.status_code,
            403
        )