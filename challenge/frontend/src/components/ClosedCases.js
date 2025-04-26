import React, { useEffect, useState } from "react";
import axios from "axios";

function ClosedCases({ token }) {
  const [count, setCount] = useState(0);

  useEffect(() => {
    const fetchClosedCases = async () => {
      try {
        const response = await axios.get("http://localhost:8000/api/complaints/closedCases/", {
          headers: { Authorization: `Token ${token}` },
        });
        setCount(response.data.length);
      } catch (error) {
        console.error("Error fetching closed cases:", error);
      }
    };

    fetchClosedCases();
  }, [token]);

  return (
    <div style={{ marginBottom: "10px" }}>
      <h3>Number of Closed Cases: {count}</h3>
    </div>
  );
}

export default ClosedCases;
