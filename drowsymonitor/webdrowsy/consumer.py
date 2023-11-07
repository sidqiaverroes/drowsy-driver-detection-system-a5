from asgiref.sync import async_to_sync
from channels.generic.websocket import JsonWebsocketConsumer
from django.contrib.auth import get_user_model
from .models import Transportation, Message

User = get_user_model()


class WebDrowsyConsumer(JsonWebsocketConsumer):
    def __init__(self, *args, **kwargs):
        super().__init__(*args, **kwargs)
        self.vehicle_id = None

    def connect(self):
        self.accept()

        self.vehicle_id = self.scope["url_route"]["kwargs"]["vehicleId"]

        async_to_sync(self.channel_layer.group_add)(
            self.vehicle_id,
            self.channel_name,
        )

    def receive_json(self, content):
        vehicle_id = self.vehicle_id
        driver_state = content["driver_state"]
        alarm_state = content["alarm_state"]
        velocity = content["velocity"]
        coordinate = content["coordinate"]

        transportation, created = Transportation.objects.get_or_create(
            vehicle_id=vehicle_id
        )

        new_message = Message.objects.create(
            transportation=transportation,
            driver_state=driver_state,
            alarm_state=alarm_state,
            velocity=velocity,
            coordinate=coordinate,
        )

        async_to_sync(self.channel_layer.group_send)(
            self.vehicle_id,
            {
                "type": "chat.message",
                "new_message": {
                    "id": new_message.id,
                    "driver_state": new_message.driver_state,
                    "alarm_state": new_message.alarm_state,
                    "velocity": new_message.velocity,
                    "coordinate": new_message.coordinate,
                    "timestamp": new_message.timestamp.isoformat(),
                },
            },
        )

    def chat_message(self, event):
        self.send_json(event)

    def disconnect(self, close_code):
        async_to_sync(self.channel_layer.group_discard)(
            self.channel_id, self.channel_name
        )
        super().disconnect(close_code)
