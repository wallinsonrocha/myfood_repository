from django.contrib.auth.models import User
from django.test import TestCase
from rolepermissions.roles import assign_role
from rolepermissions.checkers import has_role

from food import models


# Create your tests here.
class FoodTestBase(TestCase):
    def setUp(self) -> None:
        return super().setUp()

    def make_user_client(
        self,
        first_name='user',
        last_name='name',
        username='client',
        password='123456',
        email='userclient@email.com',
    ):
        cliente = User.objects.create_user(
            first_name=first_name,
            last_name=last_name,
            username=username,
            password=password,
            email=email,
        )

        cliente.save()

        return cliente

    def make_user_gerente(
        self,
        first_name='gerente',
        last_name='name',
        username='gerente',
        password='123456',
        email='usergerente@email.com',
    ):
        gerente = User.objects.create_user(
            first_name=first_name,
            last_name=last_name,
            username=username,
            password=password,
            email=email,
        )

        gerente.save()
        assign_role(gerente, 'gerente')

        return gerente

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

    def make_food_in_batch(self, qtd=10):
        foods = []
        for i in range(qtd):
            kwargs = {
                'title': f'Food {i}',
                'price': 10+i
            }
            food = self.make_food(**kwargs)
            foods.append(food)
        return foods
