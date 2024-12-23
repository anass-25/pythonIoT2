import React, { useEffect, useState } from 'react';
import axios from 'axios';
import '../styles/Dashboard.css';
import { FaTemperatureHigh, FaTint, FaClock, FaCloud, FaDownload } from 'react-icons/fa';

function Dashboard() {
  const [valeurs, setValeurs] = useState(null);

  useEffect(() => {
    fetchData();
    const interval = setInterval(() => {
      fetchData();
    }, 1000);
    return () => clearInterval(interval);
  }, []);

  const fetchData = () => {
    axios
      .get('/api/data/last/')
      .then((response) => {
        setValeurs(response.data);
      })
      .catch((error) => {
        console.error('Erreur lors de la récupération des données:', error);
      });
  };

  const handleDownloadCSV = () => {
    axios
      .get('/download_csv/', {
        responseType: 'blob',
      })
      .then((response) => {
        const url = window.URL.createObjectURL(new Blob([response.data]));
        const link = document.createElement('a');
        link.href = url;
        link.setAttribute('download', 'model_values.csv');
        document.body.appendChild(link);
        link.click();
        link.remove();
      })
      .catch((error) => {
        console.error('Erreur lors du téléchargement du CSV:', error);
      });
  };

  return (
    <div className="dashboard">
      <div className="show-row">
        <h3>Dashboard / Table / Last</h3>
        {/* Include your form here if needed */}
        {/* <form id="my-form">
          {/* Form elements */}
        {/* </form> */}
      </div>
      <div className="projects">
        <div className="cards">
          {valeurs ? (
            <div className="card">
              <h4>
                <FaCloud /> Nom: DHT 11
              </h4>
              <p>
                <FaTemperatureHigh /> Température: {valeurs.temperature} °C
              </p>
              <p>
                <FaTint /> Humidité: {valeurs.humidity} %
              </p>
              <p>
                <FaClock /> Date: {new Date(valeurs.date).toLocaleString()}
              </p>
            </div>
          ) : (
            <p>Chargement des données...</p>
          )}
          <p>
            Ce tableau présente les mesures actuelles de température et d'humidité enregistrées par le capteur
            DHT11. Ces données sont essentielles pour surveiller et ajuster les conditions environnementales en
            temps réel.
          </p>
          <button onClick={handleDownloadCSV}>
            <FaDownload /> Télécharger CSV
          </button>
        </div>
      </div>
    </div>
  );
}

export default Dashboard;
