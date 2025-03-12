from django.shortcuts import render


def hello_guys(request):
    return render(request, "hello.html", {"name": "yassine"})
