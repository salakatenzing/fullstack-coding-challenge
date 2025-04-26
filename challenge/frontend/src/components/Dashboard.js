

import React, { useEffect, useState } from "react";
import axios from "axios";
import { useHistory } from "react-router-dom";
import OpenCases from "./OpenCases";
import ClosedCases from "./ClosedCases";
import TopComplaint from "./TopComplaint";
import ComplaintsTable from "./ComplaintsTable";


function Dashboard({ token, setToken }) {
  const [complaints, setComplaints] = useState([]);
  const history = useHistory();

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

  const handleLogout = () => {
    localStorage.removeItem("token"); 
    setToken(null);                   
    history.push("/login");           
  };

  return (
     <div style={{ padding: "20px" }}>
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
        <h1>Dashboard</h1>
        <button onClick={handleLogout} style={{ height: "30px" }}>Logout</button>
      </div>

      <OpenCases token={token} />
      <ClosedCases token={token} />
      <TopComplaint token={token} />
      <ComplaintsTable token={token} />
      
    </div>
  );
}

export default Dashboard;
