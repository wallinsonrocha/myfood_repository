from django.shortcuts import render


def order_process(request, order_id):
    return render(request, 'order/pages/process.html')

def all_orders(request):
    return render(request, 'order/pages/last_buy.html')