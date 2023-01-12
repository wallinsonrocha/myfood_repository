from .test_foodBase import FoodTestBase


class FoodProperties(FoodTestBase):
    def test_if_discount_price_is_corrects(self):
        food = self.make_food(is_discount=True, discount_perc=25)
        total = food.get_price_discount

        self.assertEqual(total, 7.5)

    def test_if_discount_is_false_the_discount_price_is_none(self):
        food = self.make_food(is_discount=False)
        total = food.get_price_discount

        self.assertEqual(total, None)