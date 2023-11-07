from django.shortcuts import render
from rest_framework import viewsets
from rest_framework.response import Response
from .serializer import MessageSerializer
from .schema import list_message_docs
from .models import Transportation


class MessageViewSet(viewsets.ViewSet):
    @list_message_docs
    def list(self, request):
        vehicle_id = request.query_params.get("vehicle_id")
        try:
            transportation = Transportation.objects.get(vehicle_id=vehicle_id)
            message = transportation.message.all()
            serializer = MessageSerializer(message, many=True)
            return Response(serializer.data)
        except Transportation.DoesNotExist:
            return Response([])
