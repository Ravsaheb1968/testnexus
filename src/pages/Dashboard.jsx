import React from 'react';
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

  return (
    <div className="dashboard-container">
      {/* Filter UI already added above */}
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
      {/* Rest of the table code follows... */}
    </div>
  );
};

export default Dashboard;
