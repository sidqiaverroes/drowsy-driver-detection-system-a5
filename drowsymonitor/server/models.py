from django.db import models
from django.conf import settings


class Vehicle(models.Model):
    vehicle_model = models.CharField(max_length=100)
    owner = models.ForeignKey(
        settings.AUTH_USER_MODEL, on_delete=models.CASCADE, related_name="vehicle_owner"
    )
    driver_name = models.CharField(max_length=100)
    plate_licence = models.CharField(max_length=100)

    def __str__(self):
        return self.vehicle_model
