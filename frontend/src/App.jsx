import React, { useState } from 'react';
import CarForm from './CarForm';
import Dashboard from './Dashboard';
import './App.css'; // Import CSS file

const App = () => {
  const [view, setView] = useState('form'); // 'form' or 'dashboard'

  return (
    <div className="app-container">
      <h1 className="app-title">Car Dashboard</h1>
      <div className="button-container">
        <button className="nav-button" onClick={() => setView('form')}>Enter Car Details</button>
        <button className="nav-button" onClick={() => setView('dashboard')}>Dashboard</button>
      </div>

      {view === 'form' && <CarForm />}
      {view === 'dashboard' && <Dashboard />}
    </div>
  );
};

export default App;
