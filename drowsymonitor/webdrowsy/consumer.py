from asgiref.sync import async_to_sync
from channels.generic.websocket import JsonWebsocketConsumer
from django.contrib.auth import get_user_model
from .models import Transportation, Message, Coordinate
import json
from decimal import Decimal

User = get_user_model()


class WebDrowsyConsumer(JsonWebsocketConsumer):
    def __init__(self, *args, **kwargs):
        super().__init__(*args, **kwargs)
        self.vehicle_id = "test"

    def connect(self):
        self.accept()

        self.vehicle_id = self.scope["url_route"]["kwargs"]["vehicleId"]

        async_to_sync(self.channel_layer.group_add)(
            self.vehicle_id,
            self.channel_name,
        )

    def receive_json(self, content):
        # print(type(content), content)
        # print("/////////")
        # print(type(content["messageData"]), content["messageData"])
        content = content["messageData"]
        vehicle_id = self.vehicle_id
        if content["driver_state"] == "true":
            driver_state = True
        elif content["driver_state"] == "false":
            driver_state = False

        if content["alarm_state"] == "true":
            alarm_state = True
        elif content["alarm_state"] == "false":
            alarm_state = False

        velocity = content["velocity"]

        # transportation, created = Transportation.objects.get_or_create(
        #     vehicle_id=vehicle_id
        # )

        # coordinate = Coordinate.objects.create(
        #     latitude=content["coordinate"]["latitude"],
        #     longitude=content["coordinate"]["longitude"],
        # )

        # new_message = Message.objects.create(
        #     transportation=transportation,
        #     driver_state=driver_state,
        #     alarm_state=alarm_state,
        #     velocity=velocity,
        #     coordinate=coordinate,
        # )

        # print(new_message)
        # print("/////////")
        # new_message = json.dumps(new_message)
        # print(new_message)

        async_to_sync(self.channel_layer.group_send)(
            self.vehicle_id,
            {
                "type": "chat.message",
                "new_message": {
                    # "id": new_message.id,
                    "driver_state": driver_state,
                    "alarm_state": alarm_state,
                    "velocity": velocity,
                    "coordinate": {
                        "latitude": content["coordinate"]["latitude"],
                        "longitude": content["coordinate"]["longitude"],
                    },
                    # "timestamp": new_message.timestamp.isoformat(),
                },
            },
        )

    def chat_message(self, event):
        self.send_json(event)

    def disconnect(self, close_code):
        async_to_sync(self.channel_layer.group_discard)(
            self.vehicle_id, self.channel_name
        )
        super().disconnect(close_code)
