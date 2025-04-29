import React from "react";

function TopComplaint({ topComplaintType, setFilter }) {
  return (
    <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
    <h3>Top Complaint:</h3>
    <p>{topComplaintType}</p>
    <button onClick={() => setFilter("all")}>View All</button>
  </div>
  );
}

export default TopComplaint;
