import React from "react";

function ComplaintsTable({ complaints }) {
  if (!complaints || complaints.length === 0) {
    return <p>No complaints found.</p>;
  }

  return (
    <div>
      <h2>Complaints List</h2>
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
            <th>Problem Location (Account District)</th>
            <th>Complainer's District</th> 
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
              <td>{complaint.council_dist}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default ComplaintsTable;
