from django.contrib.auth.models import User
from django.db import models

from food.models import Food

# Create your models here.

class Cart(models.Model):
    food = models.ForeignKey(Food, on_delete=models.CASCADE, null=False, default=None)
    quantity = models.PositiveIntegerField(null=False)
    total_price_foods = models.FloatField(null=True, blank=True)

    def __str__(self):
        return f'{self.food} {self.quantity}x'

    @property
    def get_total_price(self):
        total = 0
        if self.food.is_discount:
            total = self.food.get_price_discount * self.quantity
        else:
            total = self.food.price * self.quantity

        return total

    def save(self, *args, **kwargs):
        self.total_price_foods = self.get_total_price
        return super().save(*args, **kwargs)


class Order(models.Model):
    user = models.ForeignKey(User, on_delete=models.CASCADE, null=False, default=None)
    cart = models.ManyToManyField(Cart, related_name="order", default=None)
    date_order = models.DateTimeField(auto_now=True)
    is_confirmed = models.BooleanField(default=False)
    is_sending = models.BooleanField(default=False)
    is_send = models.BooleanField(default=False)
    total_price_order = models.FloatField(null=True, blank=True)
        