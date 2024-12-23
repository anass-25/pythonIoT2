import React, { useState, useEffect } from "react";

const JsonView = () => {
  const [data, setData] = useState(null);

  useEffect(() => {
    fetch("/api/data/") // Replace with your actual backend API endpoint
      .then((response) => response.json())
      .then((data) => setData(data))
      .catch((error) => console.error("Error fetching data:", error));
  }, []);

  return (
    <div style={{ padding: "20px", fontFamily: "Arial, sans-serif" }}>
      <h2>JSON Data Viewer</h2>
      {data ? (
        <pre style={{ backgroundColor: "#f5f5f5", padding: "10px", borderRadius: "5px" }}>
          {JSON.stringify(data, null, 2)}
        </pre>
      ) : (
        <p>Loading data...</p>
      )}
    </div>
  );
};

export default JsonView;
