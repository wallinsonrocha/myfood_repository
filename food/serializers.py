from rest_framework import serializers
from .models import Food, Category

class FoodSerializer(serializers.ModelSerializer):
    class Meta:
        model = Food
        fields = [
            'id', 'title', 'description', 'slug', 'price', 'category',
            'is_discount', 'discount_perc','cover', 'price_discount'
        ]

class CategorySerializer(serializers.ModelSerializer):
    class Meta:
        model = Category
        fields = "__all__"