

import React, { useEffect, useState } from "react";
import axios from "axios";

function Dashboard({ token }) {
  const [complaints, setComplaints] = useState([]);

  useEffect(() => {
    const fetchComplaints = async () => {
      try {
        const response = await axios.get("http://localhost:8000/api/complaints/allComplaints/", {
          headers: {
            Authorization: `Token ${token}`,
          },
        });
        setComplaints(response.data);
      } catch (error) {
        console.error("Error fetching complaints:", error);
      }
    };

    fetchComplaints();
  }, [token]);

  return (
    <div style={{ padding: "20px" }}>
      <h1>All Complaints</h1>
      <ul>
        {complaints.map((complaint, index) => (
          <li key={index}>
            <strong>Type:</strong> {complaint.complaint_type} <br />
            <strong>Description:</strong> {complaint.descriptor} <br />
            <strong>Opened:</strong> {complaint.opendate} <br />
            <strong>Borough:</strong> {complaint.borough}
            <hr />
          </li>
        ))}
      </ul>
    </div>
  );
}

export default Dashboard;
