from django.test import TestCase
from cart import models
from food.tests.test_foodBase import FoodTestBase

class CartTestBase(TestCase):
    def setUp(self) -> None:
        return super().setUp()

    def make_cart(
            self,
            food_data=None,
            quantity=3
    ):
        if food_data is None:
            food_data = {}

        return models.Cart.objects.create(
            food=FoodTestBase.make_food(**food_data),
            quantity=quantity
        )

class OrderTestBase(TestCase):
    def setUp(self) -> None:
        return super().setUp()

    def make_user(self):
        ...
    # Continuar aqui

    def make_order(
            self,
            user_data=None,
            cart_data=None,
            total_price=None,
            is_confirmed=False,
            is_sending=False,
            is_send=False
    ):
        if cart_data is None:
            cart_data = {}

        if total_price is None:
            total_price = {}

        return models.Order.objects.create(

        )