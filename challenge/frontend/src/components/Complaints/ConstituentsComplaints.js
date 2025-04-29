import React from "react";

function ConstituentsComplaints({ setFilter }) {
  return (
    <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
      <h3>Constituents' Complaints</h3>
      <button onClick={() => setFilter("constituents")}>View</button>
    </div>
  );
}

export default ConstituentsComplaints;
