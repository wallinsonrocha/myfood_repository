from django.test import TestCase

from food import models


# Create your tests here.
class FoodTestBase(TestCase):
    def setUp(self) -> None:
        return super().setUp()

    def make_category(self, name="Category"):
        return models.Category.objects.create(name=name)

    def make_food(
        self,
        title="Hamburguer",
        description="A delicious hamburguer",
        price=10,
        category_data=None,
        is_discount=False,
        discount_perc=None
    ):

        if category_data is None:
            category_data = {}

        return models.Food.objects.create(
            title=title,
            description=description,
            price=price,
            category=self.make_category(**category_data),
            is_discount=is_discount,
            discount_perc=discount_perc,
        )
        