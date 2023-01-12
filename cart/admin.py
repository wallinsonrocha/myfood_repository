from django.contrib import admin

from . import models


@admin.register(models.Cart)
class CartAdmin(admin.ModelAdmin):
    ...

@admin.register(models.Order)
class OrderAdmin(admin.ModelAdmin):
    ...