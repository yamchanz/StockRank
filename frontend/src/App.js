import './App.css';
import React, {useState, useEffect} from 'react';

function App() {

  const [msg, setMsg] = useState("");

  useEffect(() => {
    fetch("/api").then((response) => {
      return response.json()
    })
    .then((json) => {
      setMsg(json["welcome"])
    })
  })

  return (
    <div className="App">
      <header className="App-header">
        {msg}
      </header>
    </div>
  );
}

export default App;
