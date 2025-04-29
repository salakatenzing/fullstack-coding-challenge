import React, {useState} from 'react';
import { BrowserRouter as Router, Route, Switch, Redirect } from "react-router-dom";
import Login from './components/Login/Login';
import Homepage from "./components/Homepage/Homepage";
import Dashboard from './components/Dashboard/Dashboard';
import './App.css';
import HeaderTitle from './components/HeaderTitle';
import Footer from "./components/Homepage/Footer"


function App() {
  const [token, setToken] = useState(() => localStorage.getItem('token'));

  return (
    <Router>
      <div className="app-container">
      <HeaderTitle /> 

      <Switch>
    <Route path="/" exact component={Homepage} />
      <Route path="/login">
        <Login setToken={setToken} />
      </Route>
      <Route path="/dashboard">
        {token ? <Dashboard token={token} setToken={setToken} /> : <Redirect to="/login" />}
      </Route>
      <Redirect to="/login" />
    </Switch>
    <Footer />
    </div>
  </Router>
  );
}

export default App;
