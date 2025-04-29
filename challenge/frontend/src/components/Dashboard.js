import React, { useEffect, useState } from "react";
import axios from "axios";
import { useHistory } from "react-router-dom";
import OpenCases from "./Complaints/OpenCases";
import ClosedCases from "./Complaints/ClosedCases";
import TopComplaint from "./Complaints/TopComplaint";
import ComplaintsTable from "./Complaints/ComplaintsTable";
import ConstituentsComplaints from "./Complaints/ConstituentsComplaints";

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

  const handleLogout = () => {
    localStorage.removeItem("token");
    setToken(null);
    history.push("/login");
  };

  const filteredComplaints = complaints.filter((complaint) => {
    if (filter === "open") return !complaint.closedate;
    if (filter === "closed") return complaint.closedate;
    return true;
  });

  return (
    <div style={{ padding: "20px" }}>
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
        <h1>Dashboard</h1>
        <button onClick={handleLogout}>Logout</button>
      </div>

      <div style={{gap: "30px", marginTop: "20px" }}>
        <OpenCases count={openCasesCount} setFilter={setFilter} />
        <ClosedCases count={closedCasesCount} setFilter={setFilter} />
        <TopComplaint topComplaintType={topComplaintType} setFilter={setFilter}/>
        <ConstituentsComplaints  setFilter={setFilter} />
      </div>

      <div style={{ marginTop: "30px" }}>
        <ComplaintsTable complaints={filteredComplaints} />
      </div>
    </div>
  );
}

export default Dashboard;
