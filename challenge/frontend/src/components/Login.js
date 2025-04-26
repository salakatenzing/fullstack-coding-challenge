

import React, { useState } from "react";
import axios from "axios";
import { useHistory } from "react-router-dom";


function Login({ setToken }) {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const history = useHistory();

  const handleLogin = async (event) => {
    event.preventDefault();
    try {
      const response = await axios.post("http://localhost:8000/login/", {
        username,
        password,
      });
    //   console.log("Token:", response.data.token);
      setToken(response.data.token);
      localStorage.setItem('token', response.data.token);
      history.push("/dashboard"); 
    } catch (error) {
      console.error("Login failed:", error);
    }
  };

  
  return (
    <div style={{ padding: "20px" }}>
      <h1>Login</h1>
      <form onSubmit={handleLogin}>
        <input
          type="text"
          placeholder="Username"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          style={{ display: "block", marginBottom: "10px", width: "200px" }}
        />
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          style={{ display: "block", marginBottom: "10px", width: "200px" }}
        />
        <button type="submit">Login</button>
      </form>
    </div>
  );
}

export default Login;
