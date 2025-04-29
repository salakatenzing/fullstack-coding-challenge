import React, { useEffect, useState } from "react";
import axios from "axios";
import "../styles/CouncilMembers.css"

function CouncilMembers() {
  const [members, setMembers] = useState([]);

  useEffect(() => {
    const fetchMembers = async () => {
      try {
        const response = await axios.get("http://localhost:8000/api/complaints/councilmembers/");
        setMembers(response.data);
        // console.log(response.data)
      } catch (error) {
        console.error("Error fetching council members:", error);
      }
    };

    fetchMembers();
  }, []);

  return (
    <div>
      <h2 className="council-members-container">Meet Your Council Members</h2>
      <div className="council-members-scroll">
        {members.map((member) => (
          <div key={member.id} className="council-member-card">
            <h3>{member.first_name} {member.last_name}</h3>
            <p><strong>District:</strong> {member.district}</p>
            <p><strong>Party:</strong> {member.party}</p>
            <p><strong>Borough:</strong> {member.borough}</p>
          </div>
        ))}
      </div>
    </div>
  );
}

export default CouncilMembers;
