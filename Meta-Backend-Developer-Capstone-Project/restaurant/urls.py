from django.urls import path, include
from rest_framework.routers import DefaultRouter
from rest_framework.authtoken.views import obtain_auth_token
from . import views

router = DefaultRouter()
router.register(r'tables', views.BookingViewSet)

urlpatterns = [
    path('', views.index, name='home'),
    
    # api endpoints
    path('menu/', views.MenuItemView.as_view()),
    path('menu/<int:pk>', views.SingleItemView.as_view()),
    path('booking/', include(router.urls)),
    # path('booking/tables', views.BookingViewSet.as_view({
    #         'get': 'list'
        # })),
        
    # dubious instructions...
    # tokens are already issued through the api paths.  kepp just in case for now.
    path('api-token-auth/', obtain_auth_token),
]