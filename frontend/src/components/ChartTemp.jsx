import React, { useState, useEffect } from "react";
import { Line } from "react-chartjs-2";
import {
  Chart as ChartJS,
  LineElement,
  CategoryScale,
  LinearScale,
  PointElement,
  TimeScale,
} from "chart.js";
import "chartjs-adapter-date-fns";

// Register Chart.js modules
ChartJS.register(LineElement, CategoryScale, LinearScale, PointElement, TimeScale);

const ChartComponent = () => {
  const [temperatureData, setTemperatureData] = useState(null);
  const [humidityData, setHumidityData] = useState(null);
  const [url, setUrl] = useState("/chart-data/");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Fetch data from the backend
  const fetchData = async () => {
    setLoading(true);
    setError(null);
    try {
      const response = await fetch(url);
      if (!response.ok) throw new Error(`HTTP error! Status: ${response.status}`);
      const data = await response.json();

      // Process data
      const labels = data.temps.slice(-27);
      const temperatureValues = data.temperature.slice(-27);
      const humidityValues = data.humidity.slice(-27);

      setTemperatureData({
        labels,
        datasets: [
          {
            label: "Température (°C)",
            data: temperatureValues,
            borderColor: "rgb(255, 99, 132)",
            backgroundColor: "rgba(255, 99, 132, 0.2)",
            borderWidth: 2,
            pointRadius: 3,
            pointBorderColor: "black",
          },
        ],
      });

      setHumidityData({
        labels,
        datasets: [
          {
            label: "Humidité (%)",
            data: humidityValues,
            borderColor: "rgb(54, 162, 235)",
            backgroundColor: "rgba(54, 162, 235, 0.2)",
            borderWidth: 2,
            pointRadius: 3,
            pointBorderColor: "black",
          },
        ],
      });
    } catch (err) {
      console.error(err);
      setError("Failed to load data. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, [url]);

  return (
    <div className="graphique" style={{ padding: "20px" }}>
      <div className="navb" style={{ display: "flex", justifyContent: "center", gap: "10px", marginBottom: "20px" }}>
        <button onClick={() => setUrl("/chart-data-jour/")}>Historique d'Aujourd'hui</button>
        <button onClick={() => setUrl("/chart-data-semaine/")}>Historique de cette semaine</button>
        <button onClick={() => setUrl("/chart-data-mois/")}>Historique de ce mois</button>
      </div>

      {loading && <p>Chargement des données...</p>}
      {error && <p style={{ color: "red" }}>{error}</p>}

      {!loading && !error && (
        <>
          <div className="graphique-temp" style={{ marginBottom: "30px" }}>
            <h3 style={{ textAlign: "center" }}>Température</h3>
            <Line
              data={temperatureData}
              options={{
                responsive: true,
                maintainAspectRatio: false,
                scales: {
                  x: {
                    type: "time",
                    time: {
                      unit: "hour",
                      displayFormats: {
                        hour: "HH:mm",
                      },
                    },
                    ticks: {
                      maxRotation: 45,
                      minRotation: 0,
                    },
                  },
                  y: {
                    beginAtZero: true,
                    ticks: {
                      callback: (value) => `${value}°`,
                    },
                  },
                },
              }}
            />
          </div>

          <div className="graphique-hum">
            <h3 style={{ textAlign: "center" }}>Humidité</h3>
            <Line
              data={humidityData}
              options={{
                responsive: true,
                maintainAspectRatio: false,
                scales: {
                  x: {
                    type: "time",
                    time: {
                      unit: "hour",
                      displayFormats: {
                        hour: "HH:mm",
                      },
                    },
                    ticks: {
                      maxRotation: 45,
                      minRotation: 0,
                    },
                  },
                  y: {
                    beginAtZero: true,
                    ticks: {
                      callback: (value) => `${value}%`,
                    },
                  },
                },
              }}
            />
          </div>
        </>
      )}
    </div>
  );
};

export default ChartComponent;
