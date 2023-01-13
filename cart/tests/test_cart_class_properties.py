from .test_cartBase import CartTestBase


class CartProperties(CartTestBase):
    def test_if_cart_has_total_price_correct(self):
        cart = self.make_cart()
        total = cart.get_total_price

        self.assertEqual(total, 30)

    def test_if_total_price_order_is_correct(self):
        order = self.make_order()
        total = order.get_total_price

        self.assertEqual(total, 45)