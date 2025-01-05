import React, { useState, useEffect, useCallback } from "react";
import { Line } from "react-chartjs-2";
import {
  Chart as ChartJS,
  LineElement,
  CategoryScale,
  LinearScale,
  PointElement,
  TimeScale,
  Tooltip,
} from "chart.js";
import "chartjs-adapter-date-fns";

// Register Chart.js modules
ChartJS.register(LineElement, CategoryScale, LinearScale, PointElement, TimeScale, Tooltip);

const ChartComponent = () => {
  const [temperatureData, setTemperatureData] = useState(null);
  const [humidityData, setHumidityData] = useState(null);
  const [url, setUrl] = useState("http://127.0.0.1:8000/api/data/");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchData = useCallback(async () => {
    setLoading(true);
    setError(null);
  
    try {
      const response = await fetch(url);
  
      if (!response.ok) {
        throw new Error(`Erreur HTTP ! Status : ${response.status}`);
      }
  
      const data = await response.json();
  
      console.log("Données reçues :", data);
  
      // Vérifier et reformater les dates si nécessaire
      const recentData = data.slice(-27).filter((entry) => {
        const parsedDate = Date.parse(entry.date);
        if (isNaN(parsedDate)) {
          console.error("Entrée ignorée en raison d'une date invalide :", entry.date);
          return false;
        }
        return true;
      });
  
      const labels = recentData.map((entry) => new Date(entry.date));
      const temperatureValues = recentData.map((entry) => entry.temperature);
      const humidityValues = recentData.map((entry) => entry.humidity);
  
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
      console.error("Erreur lors du chargement des données :", err);
      setError("Impossible de charger les données. Veuillez réessayer plus tard.");
    } finally {
      setLoading(false);
    }
  }, [url]);
  
  useEffect(() => {
    fetchData();
  }, [fetchData]);

  return (
    <div className="graphique" style={{ padding: "20px" }}>
      <div className="navb" style={{ display: "flex", justifyContent: "center", gap: "10px", marginBottom: "20px" }}>
        <button onClick={() => setUrl("http://127.0.0.1:8000/api/data-jour/")}>Historique d'Aujourd'hui</button>
        <button onClick={() => setUrl("http://127.0.0.1:8000/api/data-semaine/")}>Historique de cette semaine</button>
        <button onClick={() => setUrl("http://127.0.0.1:8000/api/data-mois/")}>Historique de ce mois</button>
      </div>

      {loading && <p>Chargement des données...</p>}
      {error && <p style={{ color: "red" }}>{error}</p>}

      {!loading && !error && (
        <div className="graph-container" style={{ display: "flex", justifyContent: "center", gap: "20px" }}>
          {/* Graphique Température */}
          <div className="graphique-temp" style={{ flex: "1", height: "400px", maxWidth: "600px" }}>
            <h3 style={{ textAlign: "center" }}>Température</h3>
            <Line
              data={temperatureData}
              options={{
                responsive: true,
                maintainAspectRatio: true,
                plugins: {
                  tooltip: {
                    enabled: true,
                    backgroundColor: "rgba(0, 0, 0, 0.8)",
                    titleColor: "white",
                    bodyColor: "white",
                    borderColor: "rgba(255, 255, 255, 0.5)",
                    borderWidth: 1,
                    callbacks: {
                      title: (tooltipItems) => {
                        const date = tooltipItems[0].label;
                        return date === "Invalid Date" ? "Date invalide" : `Date: ${new Date(date).toLocaleString()}`;
                      },
                      label: (tooltipItem) => {
                        return `Température: ${tooltipItem.raw}°C`;
                      },
                    },
                  },
                },
                scales: {
                  x: {
                    type: "time",
                    time: {
                      unit: "hour",
                      displayFormats: {
                        hour: "HH:mm",
                      },
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

          {/* Graphique Humidité */}
          <div className="graphique-hum" style={{ flex: "1", height: "400px", maxWidth: "600px" }}>
            <h3 style={{ textAlign: "center" }}>Humidité</h3>
            <Line
              data={humidityData}
              options={{
                responsive: true,
                maintainAspectRatio: true,
                plugins: {
                  tooltip: {
                    enabled: true,
                    backgroundColor: "rgba(0, 0, 0, 0.8)",
                    titleColor: "white",
                    bodyColor: "white",
                    borderColor: "rgba(255, 255, 255, 0.5)",
                    borderWidth: 1,
                    callbacks: {
                      title: (tooltipItems) => {
                        const date = tooltipItems[0].label;
                        return date === "Invalid Date" ? "Date invalide" : `Date: ${new Date(date).toLocaleString()}`;
                      },
                      label: (tooltipItem) => {
                        return `Humidité: ${tooltipItem.raw}%`;
                      },
                    },
                  },
                },
                scales: {
                  x: {
                    type: "time",
                    time: {
                      unit: "hour",
                      displayFormats: {
                        hour: "HH:mm",
                      },
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
        </div>
      )}
    </div>
  );
};

export default ChartComponent;
