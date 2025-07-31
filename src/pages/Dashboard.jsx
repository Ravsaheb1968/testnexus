import React, { useState } from 'react';
import { Pie, Bar } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  ArcElement,
  Tooltip,
  Legend,
  CategoryScale,
  LinearScale,
  BarElement
} from 'chart.js';
import './Dashboard.css';

ChartJS.register(ArcElement, Tooltip, Legend, CategoryScale, LinearScale, BarElement);

const Dashboard = () => {
  const [filters, setFilters] = useState({
    suite: '',
    functionalArea: '',
    user: '',
    machine: '',
  });

  const [showCharts, setShowCharts] = useState(false);

  const pieData = {
    labels: ['In-Queue', 'In-Progress', 'Pass', 'Fail'],
    datasets: [
      {
        label: 'Execution Summary',
        data: [0, 30, 3130, 4086],
        backgroundColor: ['#7a7a52', 'yellow', 'green', 'red'],
        borderWidth: 1,
      },
    ],
  };

  const barData = {
    labels: ['In-Queue', 'In-Progress', 'Pass', 'Fail'],
    datasets: [
      {
        label: 'Test Case Count',
        data: [0, 30, 3130, 4086],
        backgroundColor: ['#7a7a52', 'yellow', 'green', 'red'],
      },
    ],
  };

  const barOptions = {
    responsive: true,
    plugins: {
      legend: { display: false },
      tooltip: { enabled: true },
    },
    scales: {
      y: {
        beginAtZero: true,
        ticks: { color: '#fff' },
      },
      x: {
        ticks: { color: '#fff' },
      },
    },
  };

  const handleFilterChange = (e) => {
    const { name, value } = e.target;
    setFilters((prev) => ({ ...prev, [name]: value }));
  };

  const handleGenerateReport = () => {
    // TODO: Fetch and update pieData, barData, and table data based on filters
    setShowCharts(true);
  };

  return (
    <div className="dashboard-container">
      <h2>Consolidated Report</h2>
      <p className="subtitle">Select criteria for Report</p>

      {/* === Filters === */}
      <div className="filter-section">
        <select name="suite" onChange={handleFilterChange} value={filters.suite}>
          <option value="">Select Automation Suite</option>
          <option value="SAP_ECC">SAP_ECC</option>
          <option value="HCM">HCM</option>
        </select>
        <select name="functionalArea" onChange={handleFilterChange} value={filters.functionalArea}>
          <option value="">Select Functional Area</option>
          <option value="Finance">Finance</option>
          <option value="HR">HR</option>
        </select>
        <select name="user" onChange={handleFilterChange} value={filters.user}>
          <option value="">Select User</option>
          <option value="SITHAPE">SITHAPE</option>
        </select>
        <select name="machine" onChange={handleFilterChange} value={filters.machine}>
          <option value="">Select Machine</option>
          <option value="RFS">RFS</option>
        </select>
        <button className="btn generate" onClick={handleGenerateReport}>Generate Report</button>
      </div>

      {showCharts && (
        <>
          {/* === Execution Summary === */}
          <div className="execution-summary">
            <h4>Execution Summary</h4>
            <div className="charts">
              <div className="chart pie">
                <Pie data={pieData} />
              </div>
              <div className="chart bar">
                <Bar data={barData} options={barOptions} />
              </div>
            </div>
          </div>

          {/* === Table Section === */}
          <div className="result-table">
            <table>
              <thead>
                <tr>
                  <th>Automation Suite</th>
                  <th>Functional Area</th>
                  <th>User</th>
                  <th>Machine</th>
                  <th>In-Queue</th>
                  <th>In-Progress</th>
                  <th>Pass</th>
                  <th>Fail</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td>SAP_ECC</td>
                  <td>Finance</td>
                  <td>SITHAPE</td>
                  <td>RFS</td>
                  <td>0</td>
                  <td>30</td>
                  <td>3130</td>
                  <td>4086</td>
                </tr>
              </tbody>
            </table>
          </div>
        </>
      )}
    </div>
  );
};

export default Dashboard;
