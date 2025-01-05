import React, { useState, useEffect } from "react";
import { FaTemperatureHigh, FaTint } from "react-icons/fa"; // Import FontAwesome icons
import "../styles/CardView.css";

const CardView = () => {
  const [data, setData] = useState(null); // Single data record
  const [error, setError] = useState(null); // Capture any errors

  useEffect(() => {
    // Fetch the data from the backend API
    fetch("http://127.0.0.1:8000/api/data/") // Replace with the actual API endpoint
      .then((response) => {
        if (!response.ok) {
          throw new Error(`HTTP error! Status: ${response.status}`);
        }
        return response.json();
      })
      .then((records) => {
        if (records.length > 0) {
          setData(records[0]); // Only use the first record
        } else {
          setError("No data available from the API.");
        }
      })
      .catch((error) => {
        console.error("Error fetching data:", error);
        setError("Failed to fetch data.");
      });
  }, []);

  return (
    <div className="projects">
      <h2>Sensor Data</h2>
      <div className="card-container" style={{ display: "flex", gap: "20px", justifyContent: "center" }}>
        {error ? (
          <p style={{ color: "red" }}>{error}</p> // Display any errors
        ) : data ? (
          <>
            {/* Card for Temperature */}
            <div className="card temperature-card" style={{ padding: "20px", border: "1px solid #ccc", borderRadius: "10px", boxShadow: "0px 4px 6px rgba(0, 0, 0, 0.1)" }}>
              <h3 style={{ textAlign: "center", color: "red" }}>
                <FaTemperatureHigh style={{ fontSize: "2rem", marginRight: "10px" }} />
                Température
              </h3>
              <p style={{ fontSize: "1.5rem", textAlign: "center" }}>
                <strong>{data.temperature} °C</strong>
              </p>
              <p style={{ textAlign: "center", color: "#555" }}>
                <strong>Temps : </strong>
                {new Date(data.date).toLocaleString()}
              </p>
            </div>

            {/* Card for Humidity */}
            <div className="card humidity-card" style={{ padding: "20px", border: "1px solid #ccc", borderRadius: "10px", boxShadow: "0px 4px 6px rgba(0, 0, 0, 0.1)" }}>
              <h3 style={{ textAlign: "center", color: "blue" }}>
                <FaTint style={{ fontSize: "2rem", marginRight: "10px" }} />
                Humidité
              </h3>
              <p style={{ fontSize: "1.5rem", textAlign: "center" }}>
                <strong>{data.humidity} %</strong>
              </p>
              <p style={{ textAlign: "center", color: "#555" }}>
                <strong>Temps : </strong>
                {new Date(data.date).toLocaleString()}
              </p>
            </div>
          </>
        ) : (
          <p>Loading data...</p>
        )}
      </div>
    </div>
  );
};

export default CardView;
