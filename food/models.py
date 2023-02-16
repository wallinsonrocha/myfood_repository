from django.db import models
from django.utils.text import slugify


# Create your models here.
class Category(models.Model):
    name = models.CharField(max_length=65)

    def __str__(self):
        return self.name    

class Food(models.Model):
    title = models.CharField(max_length=65, unique=True)
    cover = models.ImageField(upload_to='food/covers/%Y/%m/%d/', null=True, default=None)
    description = models.TextField()
    slug = models.SlugField(unique=True, blank=True)
    price = models.FloatField()
    category = models.ForeignKey(Category, on_delete=models.CASCADE, related_name="category", default=None)
    is_discount = models.BooleanField(default=False)
    discount_perc = models.IntegerField(null=True, blank=True)
    price_discount = models.FloatField(null=True, blank=True)

    def __str__(self):
        return self.title

    @property
    def get_price_discount(self):
        if(isinstance(self.discount_perc, int)):
            discount_perc = self.discount_perc
        else:
            discount_perc = 0
        if self.is_discount:
            price = self.price
            
            percent = (1 - (discount_perc / 100))

            total = (price * percent)

            return total

    def save(self, *args, **kwargs):
        if not self.slug:
            slug = f'{slugify(self.title)}'
            self.slug = slug
            self.price_discount = self.get_price_discount

        return super().save(*args, **kwargs)
