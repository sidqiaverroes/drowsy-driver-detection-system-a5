from django.shortcuts import render
from rest_framework import viewsets
from rest_framework.response import Response
from drf_spectacular.utils import extend_schema

from .models import Vehicle
from .serializer import VehicleSerializer


class VehicleListViewSet(viewsets.ViewSet):
    queryset = Vehicle.objects.all()

    @extend_schema(responses=VehicleSerializer)
    def list(self, request):
        serializer = VehicleSerializer(self.queryset, many=True)
        return Response(serializer.data)
