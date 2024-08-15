// src/App.js
import React, { useState } from 'react';
import './App.css';

function App() {
  const [name, setName] = useState('');
  const [submittedName, setSubmittedName] = useState('');

  const handleSubmit = (event) => {
    event.preventDefault();
    setSubmittedName(name);
  };

  return (
    <div className="App">
      <header className="App-header">
        <h1>Enter Your Name</h1>
        <form onSubmit={handleSubmit}>
          <label>
            Name:
            <input 
              type="text" 
              value={name} 
              onChange={(e) => setName(e.target.value)} 
            />
          </label>
          <button type="submit">Submit</button>
        </form>
        {submittedName && <h2>Hello, {submittedName}!</h2>}
      </header>
    </div>
  );
}

export default App;