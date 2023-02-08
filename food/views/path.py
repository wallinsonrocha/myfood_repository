from django.shortcuts import render


def home(request):
    return render(request, 'food/pages/home.html')

def address(request):
    return render(request, 'food/pages/confirm_order.html')