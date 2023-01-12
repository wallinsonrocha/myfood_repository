from django.contrib import admin

from . import models


# Register your models here.
@admin.register(models.Food)
class FoodAdmin(admin.ModelAdmin):
    ...


@admin.register(models.Category)
class CategoryAdmin(admin.ModelAdmin):
    ...

