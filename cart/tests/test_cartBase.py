from django.contrib.auth.models import User

from cart import models
from food.tests.test_foodBase import FoodTestBase


class CartTestBase(FoodTestBase):
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
            food=self.make_food(**food_data),
            quantity=quantity
        )

    def make_user(self, username="Pedro", password='123456'):
        return User.objects.create_user(
            username=username, password=password
        )

    def make_order(
            self,
            user_data=None,
            cart_data=None,
            is_confirmed=False,
            is_sending=False,
            is_send=False
    ):
        if user_data is None:
            user_data = {}

        if cart_data is None:
            sanduich = {
                "title": "Sanduich",
                "description": "A delicious sanduich",
                "is_discount": True,
                "discount_perc": 25
            }

            product1 = self.make_cart(food_data=sanduich, quantity=2)
            product2 = self.make_cart()

            cart_data = {product1, product2}

        order = models.Order.objects.create(
            user=self.make_user(**user_data),
            is_confirmed=is_confirmed,
            is_sending=is_sending,
            is_send=is_send
        )

        for p in cart_data:
            order.cart.add(p)

        return order

    def make_order_to_user(self, user):
        food_data = {
            "title": "Double Sanduiche",
            "description": "Delicious sanduiche",
            "price": 15
        }

        food_data2 = {
            "title": "Double Sanduiche 2",
            "description": "Delicious sanduiche",
            "price": 15
        }

        cart1 = self.make_cart(food_data=food_data2)
        cart2 = self.make_cart(food_data=food_data)

        cart_data = {cart1, cart2}

        order = models.Order.objects.create(
            user=user
        )

        total_price_order = 0
        for p in cart_data:
            order.cart.add(p)
            total_price_order += p.get_total_price

        order.total_price_order = total_price_order
        order.save()
        return order
