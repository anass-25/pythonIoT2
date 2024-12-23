import React, { useState, useEffect } from "react";
import { Line } from "react-chartjs-2";
import { Chart as ChartJS, LineElement, CategoryScale, LinearScale, PointElement } from "chart.js";

ChartJS.register(LineElement, CategoryScale, LinearScale, PointElement);

const ChartHum = () => {
  const [chartData, setChartData] = useState({});
  const [url, setUrl] = useState("/chart-data/");

  useEffect(() => {
    fetchChartData(url);
  }, [url]);

  const fetchChartData = (endpoint) => {
    fetch(endpoint)
      .then((response) => response.json())
      .then((data) => {
        const labels = data.temps.slice(-27); // Last 27 entries
        const dataValues = data.humidity.slice(-27); // Last 27 humidity values
        setChartData({
          labels,
          datasets: [
            {
              label: "La valeur de Humidité",
              data: dataValues,
              backgroundColor: "rgba(0, 123, 255, 0.2)",
              borderColor: "rgb(0, 123, 255)",
              borderWidth: 2,
              pointStyle: "circle",
              pointRadius: 3,
              pointBorderColor: "black",
            },
          ],
        });
      })
      .catch((error) => console.error("Error fetching chart data:", error));
  };

  return (
    <div className="graphique">
      <div className="navb">
        <button onClick={() => setUrl("/chart-data-jour/")}>Historique d'Aujourd'hui</button>
        <button onClick={() => setUrl("/chart-data-semaine/")}>Historique de cette semaine</button>
        <button onClick={() => setUrl("/chart-data-mois/")}>Historique de ce mois</button>
      </div>
      <div className="graphique-hum">
        <Line
          data={chartData}
          options={{
            responsive: true,
            maintainAspectRatio: false,
            scales: {
              y: {
                beginAtZero: true,
                min: 0,
                max: 80, // Limiter l'axe des y à 80%
                ticks: {
                  callback: (value) => `${value}%`,
                },
              },
              x: {
                ticks: {
                  maxTicksLimit: 20,
                },
              },
            },
          }}
          height={220}
        />
      </div>
    </div>
  );
};

export default ChartHum;
