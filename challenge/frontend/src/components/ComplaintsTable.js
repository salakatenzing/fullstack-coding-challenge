import React, { useEffect, useState } from "react";
import axios from "axios";

function ComplaintsTable({ token }) {
  const [complaints, setComplaints] = useState([]);

  useEffect(() => {
    const fetchComplaints = async () => {
      try {
        const response = await axios.get("http://localhost:8000/api/complaints/allComplaints/", {
          headers: { Authorization: `Token ${token}` },
        });
        setComplaints(response.data);
      } catch (error) {
        console.error("Error fetching complaints:", error);
      }
    };

    fetchComplaints();
  }, [token]);

  return (
    <div style={{ marginTop: "20px" }}>
      <h2>All Complaints</h2>
      {complaints.length === 0 ? (
        <p>No complaints found.</p>
      ) : (
        <table style={{ width: "100%", borderCollapse: "collapse" }}>
          <thead>
            <tr>
              <th style={{ border: "1px solid black", padding: "8px" }}>Type</th>
              <th style={{ border: "1px solid black", padding: "8px" }}>Description</th>
              <th style={{ border: "1px solid black", padding: "8px" }}>Opened</th>
              <th style={{ border: "1px solid black", padding: "8px" }}>Borough</th>
            </tr>
          </thead>
          <tbody>
            {complaints.map((complaint, index) => (
              <tr key={index}>
                <td style={{ border: "1px solid black", padding: "8px" }}>{complaint.complaint_type}</td>
                <td style={{ border: "1px solid black", padding: "8px" }}>{complaint.descriptor}</td>
                <td style={{ border: "1px solid black", padding: "8px" }}>{complaint.opendate}</td>
                <td style={{ border: "1px solid black", padding: "8px" }}>{complaint.borough}</td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
}

export default ComplaintsTable;
