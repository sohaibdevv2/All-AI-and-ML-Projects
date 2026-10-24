from django.shortcuts import render
from django.contrib.auth.models import User
from rest_framework import generics, viewsets, permissions
# from rest_framework.decorators import authentication_classes
from rest_framework.permissions import IsAuthenticated
from .models import Menu, Booking
from .serializers import MenuSerializer, BookingSerializer, UserSerializer

def index(request):
    return render(request, 'index.html', {})

class MenuItemView(generics.ListCreateAPIView):
    queryset = Menu.objects.all()
    serializer_class = MenuSerializer

class SingleItemView(generics.RetrieveUpdateAPIView):
    queryset = Menu.objects.all()
    serializer_class = MenuSerializer
    
class BookingViewSet(viewsets.ModelViewSet):
    queryset = Booking.objects.all()
    permission_classes = [IsAuthenticated]
    serializer_class = BookingSerializer
    
class UserViewSet(viewsets.ModelViewSet):
    queryset = User
    serializer_class = UserSerializer
    permission_classes = [permissions.IsAuthenticated]