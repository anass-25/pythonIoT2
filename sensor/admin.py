from django.contrib import admin # type: ignore
from .models import SensorData

@admin.register(SensorData)
class SensorDataAdmin(admin.ModelAdmin):
    list_display = ('temperature', 'humidity', 'date')  # Colonnes affichées
