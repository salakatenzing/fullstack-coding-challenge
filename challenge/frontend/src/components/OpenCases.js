import React, { useEffect, useState } from "react";
import axios from "axios";

function OpenCases({ token }) {
  const [count, setCount] = useState(0);

  useEffect(() => {
    const fetchOpenCases = async () => {
      try {
        const response = await axios.get("http://localhost:8000/api/complaints/openCases/", {
          headers: { Authorization: `Token ${token}` },
        });
        setCount(response.data.length);
      } catch (error) {
        console.error("Error fetching open cases:", error);
      }
    };

    fetchOpenCases();
  }, [token]);

  return (
    <div style={{ marginBottom: "10px" }}>
      <h3>Number of Open Cases: {count}</h3>
    </div>
  );
}

export default OpenCases;
