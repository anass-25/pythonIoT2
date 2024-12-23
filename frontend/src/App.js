import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Dashboard from "./components/Dashboard"; // Import the Dashboard component
import CardView from "./components/CardView";// Import the Table component (if needed)
import ChartTemp from "./components/ChartTemp"; // Import temperature chart component
import ChartHum from "./components/ChartHum"; // Import humidity chart component
import JsonView from "./components/JsonView"; // Import JSON view component
import Header from "./components/Header"; // Import a Header or Navbar if you have one
import './styles/Dashboard.css';
import './styles/Header.css';
import './styles/CardView.css';


 

function App() {
  return (
    <Router>
      <Header /> {/* Include a Header or Navbar if applicable */}
      <div className="app-container">
        <Routes>
          <Route path="/" element={<Dashboard />} />
          <Route path="/CardView" element={<CardView />} />
          <Route path="/chart-temperature" element={<ChartTemp />} />
          <Route path="/chart-humidity" element={<ChartHum />} />
          <Route path="/data-json" element={<JsonView />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
