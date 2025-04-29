import React, { useEffect, useState } from "react";
import axios from "axios";
import { useHistory } from "react-router-dom";
import OpenCases from "../Complaints/OpenCases";
import ClosedCases from "../Complaints/ClosedCases";
import TopComplaint from "../Complaints/TopComplaint";
import ComplaintsTable from "../Complaints/ComplaintsTable";
import ConstituentsComplaints from "../Complaints/ConstituentsComplaints";
import "../../styles/Dashboard.css"

function Dashboard({ token, setToken }) {
  const [openCasesCount, setOpenCasesCount] = useState(0);
  const [closedCasesCount, setClosedCasesCount] = useState(0);
  const [topComplaintType, setTopComplaintType] = useState("");
  const [complaints, setComplaints] = useState([]);
  // const [constituentsCount, setConstituentsCount] = useState(0);
  const [filter, setFilter] = useState("all");

  const history = useHistory();
  
  const fetchComplaints = async (filterType) => {
    const endpointMap = {
      all: "/api/complaints/allComplaints/",
      open: "/api/complaints/openCases/",
      closed: "/api/complaints/closedCases/",
      constituents: "/api/complaints/constituentsComplaints/",
    };
  
    const endpoint = endpointMap[filterType] || endpointMap["all"]; // fallback to 'all'
  
    try {
      const response = await axios.get(`http://localhost:8000${endpoint}`, {
        headers: { Authorization: `Token ${token}` },
      });
      setComplaints(response.data);
    } catch (error) {
      console.error("Error fetching complaints:", error);
    }
  };

  const fetchDashboardData = async () => {
    try {
      const [openRes, closedRes, topRes] = await Promise.all([
        axios.get("http://localhost:8000/api/complaints/openCases/", {
          headers: { Authorization: `Token ${token}` },
        }),
        axios.get("http://localhost:8000/api/complaints/closedCases/", {
          headers: { Authorization: `Token ${token}` },
        }),
        axios.get("http://localhost:8000/api/complaints/topComplaints/", {
          headers: { Authorization: `Token ${token}` },
        }),
        axios.get("http://localhost:8000/api/complaints/constituentsComplaints/", {
          headers: { Authorization: `Token ${token}` },
        }),
      ]);
      setOpenCasesCount(openRes.data.length);
      setClosedCasesCount(closedRes.data.length);
      setTopComplaintType(
        topRes.data.length > 0 ? topRes.data[0].complaint_type : "N/A"
      );

      fetchComplaints("all");

    } catch (error) {
      console.error("Error fetching dashboard data:", error);
    }
  };
      
  useEffect(() => {
    fetchDashboardData();
  }, [token]);

  useEffect(() => {
    fetchComplaints(filter);   
  }, [filter]);

 

  const filteredComplaints = complaints.filter((complaint) => {
    if (filter === "open") return !complaint.closedate;
    if (filter === "closed") return complaint.closedate;
    return true;
  });

  return (
    <div className="dashboard-container">
  <div className="dashboard-header">
    <h1 className="dash-title">Dashboard</h1>
  </div>

  <div className="dashboard-cards">
    <div className="dashboard-card">
      <OpenCases count={openCasesCount} setFilter={setFilter} />
    </div>

    <div className="dashboard-card">
      <ClosedCases count={closedCasesCount} setFilter={setFilter} />
    </div>

    <div className="dashboard-card">
      <TopComplaint topComplaintType={topComplaintType} setFilter={setFilter} />
    </div>

    <div className="dashboard-card">
      <ConstituentsComplaints setFilter={setFilter} />
    </div>
  </div>

  <div className="dashboard-table">
    <ComplaintsTable complaints={filteredComplaints} />
  </div>
</div>

  );
}

export default Dashboard;
