import React, { useEffect, useState } from "react";
import axios from "axios";

function TopComplaint({ token }) {
  const [topComplaint, setTopComplaint] = useState("");

  useEffect(() => {
    const fetchTopComplaint = async () => {
      try {
        const response = await axios.get("http://localhost:8000/api/complaints/topComplaints/", {
          headers: { Authorization: `Token ${token}` },
        });
        if (response.data.length > 0) {
          setTopComplaint(response.data[0].complaint_type);
        } else {
          setTopComplaint("No Complaints Found");
        }
      } catch (error) {
        console.error("Error fetching top complaint:", error);
      }
    };

    fetchTopComplaint();
  }, [token]);

  return (
    <div style={{ marginBottom: "10px" }}>
      <h3>Top Complaint Type: {topComplaint}</h3>
    </div>
  );
}

export default TopComplaint;
