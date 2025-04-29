import React, {useState} from 'react';
import { BrowserRouter as Router, Route, Switch} from "react-router-dom";
import LoginPage from './components/Logging/Login';
import Homepage from "./components/Homepage/Homepage";
import { ProtectedRoute } from './ProtectedRoute';
import './App.css';
import HeaderTitle from './components/HeaderTitle';
import Footer from "./components/Homepage/Footer"
import { Logout } from './components/Logging/Logout';


function App() {
  const [token, setToken] = useState(() => localStorage.getItem('token'));

  return (
    <div className="app-container">
      <Router>
        <HeaderTitle token={token} setToken={setToken} />
        <Switch>
          <Route path="/login">
            <LoginPage setToken={setToken} />
          </Route>
          <Route path="/logout">
            <Logout />
          </Route>
          <Route path="/" exact component={Homepage} />
          <ProtectedRoute token={token} />
        </Switch>
        <Footer />
      </Router>
    </div>
  );
}

export default App;
