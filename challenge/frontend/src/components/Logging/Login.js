import React, { useState } from "react";
import { useHistory } from "react-router-dom";
import axios from "axios";
import CouncilMembers from '../CouncilMembers';
import "../../styles/Login.css"

function LoginPage({ setToken }) {

  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const history = useHistory();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post("http://localhost:8000/login/", {
        username,
        password,
      });
      setToken(response.data.token);
      localStorage.setItem("token", response.data.token);
      history.push("/dashboard");
    } catch (error) {
      console.error("Login failed:", error);
      alert("Invalid username or password");
    }
  };

  return (
    <div className="login-container">
      <div className="login-page">
        <div className="login-card">
          <h2 className="login-title">Council Member Login</h2>
          <form onSubmit={handleSubmit} className="login-form">
            <div className="login-form-group">
              <label>Username:</label>
              <input
                type="text"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                required
                className="login-input"
              />
            </div>
            <div className="login-form-group">
              <label>Password:</label>
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                className="login-input"
              />
            </div>
            <button type="submit" className="login-button">Login</button>
          </form>
        </div>
      </div>
      <CouncilMembers />
    </div>
  )
}

export default LoginPage;

