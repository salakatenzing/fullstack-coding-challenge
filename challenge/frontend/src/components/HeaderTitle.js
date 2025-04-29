import React from "react";
import "../styles/HeaderTitle.css"; 

function HeaderTitle() {
  return (
    <header className="header">
      <div className="header-content">
        <img
          src="https://council.nyc.gov/wp-content/themes/wp-nycc/assets/images/nyc-seal-blue.png"
          alt="NYC Council Seal"
          className="header-logo"
        />
        <h1 className="header-title">NYC Council Complaints</h1>
      </div>
    </header>
  );
}

export default HeaderTitle;
