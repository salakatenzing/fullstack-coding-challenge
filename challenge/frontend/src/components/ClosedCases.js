import React from "react";

function ClosedCases({ count, setFilter }) {
  return (
    <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
      <h3>Closed Cases: {count}</h3>
      <button onClick={() => setFilter("closed")}>View</button>
    </div>
  );
}

export default ClosedCases;
