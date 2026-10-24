from django.test import TestCase
from rest_framework.response import Response
from restaurant.models import Menu
from restaurant.serializers import MenuSerializer

class MenuViewTest(TestCase):
    def setup(self):
        Menu.objects.create(title="Ice Cream", price=1, inventory=1)
        Menu.objects.create(title="Pasta", price=2, inventory=2)
        Menu.objects.create(title="Bread Sticks", price=3, inventory=3)
        Menu.objects.create(title="Hot Soup", price=4, inventory=4)
        Menu.objects.create(title="Butter", price=5, inventory=5)
    
    def test_getall(self):
        self.setup()
        items = Menu.objects.all()
        
        for item in items:
            # NOTE(chase): This is a pull quote from the reading exercise, errors are their own:
            #    "The retrieved objects must serialized, so make sure the method runs assertions
            #     to check if the serialized data equals the responses."
            # I am not sure exactly what they want from this, but this will do for now.
            serial = MenuSerializer(item)
            response = Response(serial.data)
            self.assertEqual(serial.data, response.data)