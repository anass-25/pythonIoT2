from django.urls import path  # type: ignore
from .views import SensorDataView, LastSensorDataView, download_csv

urlpatterns = [
    path('data/', SensorDataView.as_view(), name='sensor_data'),  # For GET/POST all data
    path('data/last/', LastSensorDataView.as_view(), name='last_sensor_data'),  # For GET last data
    path('download_csv/', download_csv, name='download_csv'),
]