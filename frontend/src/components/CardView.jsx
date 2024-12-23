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
      <div className="card-container">
        {error ? (
          <p style={{ color: "red" }}>{error}</p> // Display any errors
        ) : data ? (
          <div className="card big-card">
            <p>
              <FaTemperatureHigh style={{ color: "red", fontSize: "2rem", marginRight: "10px" }} />
              <strong>Temperature: </strong>  {data.temperature} °C
            </p>
            <p>
              <FaTint style={{ color: "blue", fontSize: "2rem", marginRight: "10px" }} />
              <strong>Humidité: </strong>  {data.humidity} %
            </p>
            <p>
            <strong>temps : </strong>  {data.date} 
            </p>
          </div>
        ) : (
          <p>Loading data...</p>
        )}
      </div>
    </div>
  );
};

export default CardView;
