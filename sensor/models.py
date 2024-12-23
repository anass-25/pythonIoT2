from django.db import models # type: ignore

class SensorData(models.Model):
    temperature = models.FloatField()
    humidity = models.FloatField()
    date = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return f"{self.date}: {self.temperature}°C, {self.humidity}%"
