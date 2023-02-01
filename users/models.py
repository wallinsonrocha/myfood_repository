from django.contrib.auth import get_user_model
from django.db import models

User = get_user_model()
# Create your models here.
class UserFood(models.Model):
    user = models.OneToOneField(User, on_delete=models.CASCADE)

    def __str__(self):
        return f'{self.user}'
