from django.db import models
from django.contrib.auth import get_user_model


class Transportation(models.Model):
    vehicle_id = models.CharField(max_length=255)
    created_at = models.DateTimeField(auto_now_add=True)


class Coordinate(models.Model):
    latitude = models.DecimalField(max_digits=9, decimal_places=6)
    longitude = models.DecimalField(max_digits=10, decimal_places=7)


class Message(models.Model):
    transportation = models.ForeignKey(
        Transportation, on_delete=models.CASCADE, related_name="message"
    )
    driver_state = models.BooleanField()
    alarm_state = models.BooleanField()
    velocity = models.DecimalField(max_digits=5, decimal_places=2)
    coordinate = models.OneToOneField(Coordinate, on_delete=models.CASCADE)
    timestamp = models.DateTimeField(auto_now_add=True)
