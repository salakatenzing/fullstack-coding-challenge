import React, { useEffect, useState } from "react";
import axios from "axios";
import { useHistory } from "react-router-dom";
import OpenCases from "./OpenCases";
import ClosedCases from "./ClosedCases";
import TopComplaint from "./TopComplaint";
import ComplaintsTable from "./ComplaintsTable";

function Dashboard({ token, setToken }) {
  const [openCasesCount, setOpenCasesCount] = useState(0);
  const [closedCasesCount, setClosedCasesCount] = useState(0);
  const [topComplaintType, setTopComplaintType] = useState("");
  const [complaints, setComplaints] = useState([]);
  const [filter, setFilter] = useState("all");

  const history = useHistory();

  useEffect(() => {
    const fetchDashboardData = async () => {
      try {
        const [openRes, closedRes, topRes, allRes] = await Promise.all([
          axios.get("http://localhost:8000/api/complaints/openCases/", {
            headers: { Authorization: `Token ${token}` },
          }),
          axios.get("http://localhost:8000/api/complaints/closedCases/", {
            headers: { Authorization: `Token ${token}` },
          }),
          axios.get("http://localhost:8000/api/complaints/topComplaints/", {
            headers: { Authorization: `Token ${token}` },
          }),
          axios.get("http://localhost:8000/api/complaints/allComplaints/", {
            headers: { Authorization: `Token ${token}` },
          }),
        ]);

        setOpenCasesCount(openRes.data.length);
        setClosedCasesCount(closedRes.data.length);
        setTopComplaintType(
          topRes.data.length > 0 ? topRes.data[0].complaint_type : "N/A"
        );
        setComplaints(allRes.data);

      } catch (error) {
        console.error("Error fetching dashboard data:", error);
      }
    };

    fetchDashboardData();
  }, [token]);

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
      </div>

      <div style={{ marginTop: "30px" }}>
        <ComplaintsTable complaints={filteredComplaints} />
      </div>
    </div>
  );
}

export default Dashboard;
