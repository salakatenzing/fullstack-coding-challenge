import React, {useState} from 'react';
import { BrowserRouter as Router, Route, Switch, Redirect } from "react-router-dom";
import Login from './components/Login';
import Dashboard from './components/Dashboard';
import './App.css';


function App() {
  const [token, setToken] = useState(null);

  return (
    <Router>
    <Switch>
      <Route path="/login">
        <Login setToken={setToken} />
      </Route>
      <Route path="/dashboard">
        {token ? <Dashboard token={token} /> : <Redirect to="/login" />}
      </Route>
      <Redirect to="/login" />
    </Switch>
  </Router>
  );
}

export default App;
