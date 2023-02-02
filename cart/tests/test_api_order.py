from test_cartBase import CartTestBase
from django.contrib.auth.models import User
from rest_framework import test
from unittest.mock import patch
from django.urls import reverse


class OrderAPIMixin(CartTestBase):
    def get_order_data(self):
        self.make_user()
        self.make_cart()
        self.make_cart()

        return {
            "user": 1,
            "cart": [1, 2]
        }

class OrderAPI(test.APITestCase, OrderAPIMixin):
    ...
 # Continuar aqui