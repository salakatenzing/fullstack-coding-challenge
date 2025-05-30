import React from "react";
import { useHistory } from "react-router-dom";
import "../styles/HeaderTitle.css"; 

function HeaderTitle({ token, setToken }) {
  const history = useHistory();

  const handleLogout = () => {
    localStorage.removeItem("token");
    setToken(null);
    history.push("/");
  };
  return (
    <header className="header">
      <div className="header-content">
        <img
          src="https://council.nyc.gov/wp-content/themes/wp-nycc/assets/images/nyc-seal-blue.png"
          alt="NYC Council Seal"
          className="header-logo"
        />
        <h1 className="header-title">NYC Council Complaints</h1>
        {token && (
          <button className="logout-button" onClick={handleLogout}>
            Logout
          </button>
        )}
      </div>
    </header>
  );
}

export default HeaderTitle;
