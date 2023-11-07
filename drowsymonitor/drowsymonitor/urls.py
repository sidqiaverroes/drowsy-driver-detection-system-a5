from django.contrib import admin
from django.urls import path
from rest_framework.routers import DefaultRouter
from server.views import VehicleListViewSet
from drf_spectacular.views import SpectacularAPIView, SpectacularSwaggerView

router = DefaultRouter()
router.register("api/vehicle", VehicleListViewSet)

urlpatterns = [
    path("admin/", admin.site.urls),
    path("api/docs/schema/", SpectacularAPIView.as_view(), name="schema"),
    path("api/docs/schema/ui/", SpectacularSwaggerView.as_view()),
]
