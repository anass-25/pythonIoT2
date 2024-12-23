import React from "react";
import '../styles/Header.css';// Import the CSS file for styling



function Header() {
  const handleFormSubmit = (e) => {
    e.preventDefault();
    const selectedValue = e.target.select_field.value;
    if (selectedValue === "signup") {
      window.location.href = "/signup"; // Redirect to signup
    } else if (selectedValue === "logout") {
      window.location.href = "/logout"; // Redirect to logout
    }
  };

  return (
    <header className="header">
      <div className="header-container">
        <div className="logo">
          <h1>SURVEILLANCE IOT: CAPTEUR DHT11</h1>
        </div>

        <nav className="navigation">
          <ul className="nav-links">
            <li>
              <a href="/CardView">Table</a>
            </li>
            <li>
              <a href="/chart-temperature">Graph of Temperature</a>
            </li>
            <li>
              <a href="/chart-humidity">Graph of Humidity</a>
            </li>
            <li>
              <a href="/data-json">JSON</a>
            </li>
          </ul>
        </nav>

        <div className="user-actions">
          <form onSubmit={handleFormSubmit} className="action-form">
            <select id="select" name="select_field" defaultValue="signup">
              <option value="signup">S'inscrire</option>
              <option value="logout">Se déconnecter</option>
            </select>
            <button type="submit">Submit</button>
          </form>
        </div>
      </div>
    </header>
  );
}

export default Header;
