import React, {useEffect} from "react";
import { useHistory } from "react-router-dom";
import Footer from "./Footer"
import "../../styles/Homepage.css"


function Homepage() {
  const history = useHistory();

  const handleLoginClick = () => {
    history.push("/login");
  };

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      history.push("/dashboard");
    }
  }, [history]);

  return (
    <div className="homepage-container">


    <main className="homepage-main">
      <h2>Welcome to the NYC Council Member Portal</h2>
      <p>
        Access district complaints, manage cases, and stay informed with the latest updates in your council district.
      </p>
      <button className="homepage-login-button" onClick={handleLoginClick}>
        Council Member Login
      </button>
    </main>

 

  </div>
  );
}

export default Homepage;
