from django.db import models

from food.models import Food
from users.models import UserFood

# Create your models here.

class Cart(models.Model):
    food = models.ForeignKey(Food, on_delete=models.CASCADE, null=False, default=None)
    quantity = models.PositiveIntegerField(null=False)

    @property
    def get_total_price(self):
        total = 0
        if self.food.is_discount:
            total = self.food.get_price_discount*self.quantity
        else:
            total = self.food.price*self.quantity
        
        return total

    def __str__(self):
        return f'{self.food} {self.quantity}x'

class Order(models.Model):
    user = models.ForeignKey(UserFood,on_delete=models.CASCADE, null=False, default=None)
    cart = models.ManyToManyField(Cart, related_name="order")
    total_price = models.FloatField(blank=True, null=True)
    date_order = models.DateTimeField(auto_now=True)
    is_confirmed = models.BooleanField(default=False)
    is_sending = models.BooleanField(default=False)
    is_send = models.BooleanField(default=False)