from django.shortcuts import render


def home(request):
    return render(request, 'food/pages/home.html')

def address(request):
    return render(request, 'food/pages/confirm_order.html')

def category_id(request):
    return render(request, 'food/pages/category_id.html')
