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
    <div>
      <h2>All Complaints</h2>
      {complaints.length === 0 ? (
        <p>No complaints found.</p>
      ) : (
        <table>
          <thead>
            <tr>
              <th>Type</th>
              <th>Description</th>
              <th>Opened</th>
              <th>Closed</th>
              <th>Borough</th>
              <th>City</th>
              <th>Zip</th>
              <th>Community Board</th>
              <th>District</th>
            </tr>
          </thead>
          <tbody>
            {complaints.map((complaint, index) => (
              <tr key={index}>
                <td>{complaint.complaint_type}</td>
                <td>{complaint.descriptor}</td>
                <td>{complaint.opendate || "-"}</td>
                <td>{complaint.closedate || "Still Open"}</td>
                <td>{complaint.borough}</td>
                <td>{complaint.city}</td>
                <td>{complaint.zip}</td>
                <td>{complaint.community_board}</td>
                <td>{complaint.account}</td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
}

export default ComplaintsTable;
