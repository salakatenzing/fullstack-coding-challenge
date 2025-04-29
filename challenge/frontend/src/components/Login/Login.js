import React, { useState } from "react";
import LoginForm from "./LoginForm";
import CouncilMembers from "../CouncilMembers";

function LoginPage({ token, setToken }) {
  const [showLogin, setShowLogin] = useState(true);

  return (
    <div style={{ padding: "20px" }}>
      {token && (
        <div>
          <h2>Welcome, you are logged in!</h2>
        </div>
      )}

      {!token && (
        <div>
          {showLogin ? (
            <LoginForm setToken={setToken} />
          ) : null}

          <CouncilMembers />
        </div>
      )}
    </div>
  );
}

export default LoginPage;
