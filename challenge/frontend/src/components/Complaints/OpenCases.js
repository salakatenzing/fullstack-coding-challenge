import React from "react";

function OpenCases({ count, setFilter }) {
  return (
    <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
      <h3>Open Cases: {count}</h3>
      <button onClick={() => setFilter("open")}>View</button>
    </div>
  );
}

export default OpenCases;
