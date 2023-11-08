from rest_framework import serializers
from .models import Message, Coordinate


class CoordinateSerializer(serializers.ModelSerializer):
    class Meta:
        model = Coordinate
        fields = ("latitude", "longitude")


class MessageSerializer(serializers.ModelSerializer):
    sender = serializers.StringRelatedField
    coordinate = CoordinateSerializer()

    class Meta:
        model = Message
        fields = [
            "id",
            "driver_state",
            "alarm_state",
            "velocity",
            "coordinate",
            "timestamp",
        ]
