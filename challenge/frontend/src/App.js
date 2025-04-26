import React, {useState} from 'react';
import Login from './components/Login';
import logo from './logo.svg';
import './App.css';

function App() {
  const [token, setToken] = useState(null);

  return (
    <div className="App">
      {!token ? (
        <Login setToken={setToken} />
      ) : (
        <h1>Welcome! (You are logged in)</h1>
      )}
    </div>
  );
}

export default App;
