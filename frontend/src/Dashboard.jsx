import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Pie } from 'react-chartjs-2';
import { Chart as ChartJS } from 'chart.js/auto';
import './App.css'; // Import CSS file

const Dashboard = () => {
  const [carTypesData, setCarTypesData] = useState([]);
  const [carCompaniesData, setCarCompaniesData] = useState([]);

  useEffect(() => {
    // Fetch the dashboard data from the backend
    axios
      .get('http://localhost:5000/api/dashboard')
      .then((response) => {
        setCarTypesData(response.data.carTypes);
        setCarCompaniesData(response.data.carCompanies);
      })
      .catch((error) => console.error('Error fetching data:', error));
  }, []);

  // Pie chart data for Car Types
  const carTypesChartData = {
    labels: carTypesData.map((item) => item.name), // Car types as labels
    datasets: [
      {
        label: 'Car Type Distribution',
        data: carTypesData.map((item) => item.count), // The count for each car type
        backgroundColor: ['#FF6384', '#36A2EB', '#FFCE56', '#4BC0C0', '#FF9F40'],
      },
    ],
  };

  // Pie chart data for Car Companies
  const carCompaniesChartData = {
    labels: carCompaniesData.map((item) => item.name), // Car companies as labels
    datasets: [
      {
        label: 'Car Company Distribution',
        data: carCompaniesData.map((item) => item.count), // The count for each car company
        backgroundColor: ['#FF6384', '#36A2EB', '#FFCE56', '#4BC0C0', '#FF9F40'],
      },
    ],
  };

  return (
    <div className="dashboard-container">
      {/* <h2>Dashboard</h2> */}
      <div className="pie-chart">
        <h3>Car Types Market Share</h3>
        <Pie data={carTypesChartData} />
      </div>
      <div className="pie-chart">
        <h3>Car Companies Market Share</h3>
        <Pie data={carCompaniesChartData} />
      </div>
    </div>
  );
};

export default Dashboard;
