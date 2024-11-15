import React, { useState } from 'react';
import axios from 'axios';
import './App.css'; // Import CSS file

const CarForm = () => {
  const [carType, setCarType] = useState('');
  const [carCompany, setCarCompany] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();

    // Send the car details to the backend
    axios
      .post('http://localhost:5000/api/cars', { carType, carCompany })
      .then((response) => {
        alert('Car details submitted successfully!');
        setCarType('');
        setCarCompany('');
      })
      .catch((error) => {
        console.error('Error submitting car details:', error);
        alert('Error submitting car details');
      });
  };

  return (
    <div>
      <h2>Enter Car Details</h2>
      <form onSubmit={handleSubmit}>
        <div>
          <label>Car Type:</label>
          <input
            type="text"
            value={carType}
            onChange={(e) => setCarType(e.target.value)}
            required
          />
        </div>
        <div>
          <label>Car Company:</label>
          <input
            type="text"
            value={carCompany}
            onChange={(e) => setCarCompany(e.target.value)}
            required
          />
        </div>
        <button type="submit">Submit</button>
      </form>
    </div>
  );
};

export default CarForm;
