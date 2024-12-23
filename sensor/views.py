import csv
from http.client import HTTPResponse
from rest_framework.views import APIView  # type: ignore
from rest_framework.response import Response  # type: ignore
from .models import SensorData
from .serializers import SensorDataSerializer

class SensorDataView(APIView):
    """
    Handles GET and POST requests for SensorData.
    """
    def get(self, request):
        # Retrieve all sensor data
        all_data = SensorData.objects.all()
        serializer = SensorDataSerializer(all_data, many=True)
        return Response(serializer.data)

    def post(self, request):
        # Create a new sensor data entry
        serializer = SensorDataSerializer(data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=201)
        return Response(serializer.errors, status=400)


class LastSensorDataView(APIView):
    """
    Handles GET requests for the latest SensorData entry.
    """
    def get(self, request):
        try:
            last_data = SensorData.objects.latest('date')  # Retrieves the latest entry by date
            serializer = SensorDataSerializer(last_data)
            return Response(serializer.data)
        except SensorData.DoesNotExist:
            return Response({"error": "Aucune donnée trouvée"}, status=404)
        

def download_csv(request):
    # Create the HttpResponse object with CSV headers
    response = HTTPResponse(content_type='text/csv')
    response['Content-Disposition'] = 'attachment; filename="model_values.csv"'

    writer = csv.writer(response)
    writer.writerow(['Temperature', 'Humidity', 'Date'])

    data = SensorData.objects.all()
    for item in data:
        writer.writerow([item.temperature, item.humidity, item.date])

    return response
