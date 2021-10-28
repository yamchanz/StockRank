import './App.css';
import axios from 'axios';
import React, {useState, useEffect} from 'react';

function App() {

  const [msg, setMsg] = useState("");
  const [company, setCompany] = useState("");

  useEffect(() => {
    axios.get("/api").then(res => {
      setMsg(res.data["welcome"])
    });

    axios.get("/api/company/" + Math.ceil(Math.random() * 100)).then(res => {
      setCompany(res.data["companyname"])
    })
  }, [])

  return (
    <div className="App">
      <header className="App-header">
        {msg}
        <div>
          A Random Company: {company}
        </div>
      </header>
    </div>
  );
}

export default App;
