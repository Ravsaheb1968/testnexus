import React, { useState, useMemo } from 'react';
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

// Mock data to simulate executions per function area / suite
const MOCK_TEST_EXECUTIONS = [
  {
    suite: 'CPQ_Quote_Processing',
    functionalArea: 'Legacy_Product',
    user: 'userA',
    machine: 'MACHINE_01',
    testCase: 'TC_Legacy_1',
    status: 'In-Queue',
  },
  {
    suite: 'CPQ_Quote_Processing',
    functionalArea: 'Legacy_Product',
    user: 'userB',
    machine: 'MACHINE_02',
    testCase: 'TC_Legacy_2',
    status: 'Pass',
  },
  {
    suite: 'CPQ_Quote_Processing',
    functionalArea: 'Agent_Journey',
    user: 'userC',
    machine: 'MACHINE_03',
    testCase: 'TC_Agent_1',
    status: 'In-Progress',
  },
  {
    suite: 'CPQ_Quote_Processing',
    functionalArea: 'Agent_Journey',
    user: 'userD',
    machine: 'MACHINE_04',
    testCase: 'TC_Agent_2',
    status: 'Fail',
  },
  {
    suite: 'Payments_Gateway',
    functionalArea: 'Bank_API_Integration',
    user: 'userE',
    machine: 'MACHINE_05',
    testCase: 'TC_Bank_1',
    status: 'Pass',
  },
  {
    suite: 'Payments_Gateway',
    functionalArea: 'Transaction_Monitor',
    user: 'userF',
    machine: 'MACHINE_06',
    testCase: 'TC_Trans_1',
    status: 'In-Queue',
  },
];

const STATUS_LABELS = ['In-Queue', 'In-Progress', 'Pass', 'Fail'];
const SUITES = [
  { id: 'CPQ_Quote_Processing', name: 'CPQ Quote Processing' },
  { id: 'Payments_Gateway', name: 'Payments Gateway' },
];
const FUNCTION_AREAS = {
  CPQ_Quote_Processing: ['Legacy_Product', 'Agent_Journey'],
  Payments_Gateway: ['Bank_API_Integration', 'Transaction_Monitor'],
};
const USERS = ['userA', 'userB', 'userC', 'userD', 'userE', 'userF'];
const MACHINES = ['MACHINE_01', 'MACHINE_02', 'MACHINE_03', 'MACHINE_04', 'MACHINE_05', 'MACHINE_06'];

const Dashboard = () => {
  const [filters, setFilters] = useState({
    suite: '',
    functionalArea: '',
    user: '',
    machine: '',
  });
  const [showResults, setShowResults] = useState(false);

  const handleFilterChange = (e) => {
    const { name, value } = e.target;
    setFilters(prev => ({ ...prev, [name]: value }));
  };

  const filteredExecutions = useMemo(() => {
    if (!showResults) return [];
    return MOCK_TEST_EXECUTIONS.filter(exec => {
      if (filters.suite && exec.suite !== filters.suite) return false;
      if (filters.functionalArea && exec.functionalArea !== filters.functionalArea) return false;
      if (filters.user && exec.user !== filters.user) return false;
      if (filters.machine && exec.machine !== filters.machine) return false;
      return true;
    });
  }, [filters, showResults]);

  // Aggregate counts
  const summaryCounts = useMemo(() => {
    const counts = { 'In-Queue': 0, 'In-Progress': 0, Pass: 0, Fail: 0 };
    filteredExecutions.forEach(e => {
      if (counts[e.status] !== undefined) counts[e.status] += 1;
    });
    return counts;
  }, [filteredExecutions]);

  const pieData = {
    labels: STATUS_LABELS,
    datasets: [
      {
        label: 'Execution Summary',
        data: STATUS_LABELS.map(s => summaryCounts[s] || 0),
        backgroundColor: ['#7a7a52', '#f59e0b', '#22c55e', '#ef4444'],
        borderWidth: 1,
      },
    ],
  };

  const barData = {
    labels: STATUS_LABELS,
    datasets: [
      {
        label: 'Test Case Count',
        data: STATUS_LABELS.map(s => summaryCounts[s] || 0),
        backgroundColor: ['#7a7a52', '#f59e0b', '#22c55e', '#ef4444'],
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

  const handleGenerate = () => {
    setShowResults(true);
  };

  return (
    <div className="dashboard-container">
      <h2>Consolidated Report</h2>
      <p className="subtitle">Select criteria for Report</p>

      {/* Filters */}
      <div className="filter-section">
        <select name="suite" onChange={handleFilterChange} value={filters.suite}>
          <option value="">Select Automation Suite</option>
          {SUITES.map(s => (
            <option key={s.id} value={s.id}>{s.name}</option>
          ))}
        </select>

        <select
          name="functionalArea"
          onChange={handleFilterChange}
          value={filters.functionalArea}
          disabled={!filters.suite}
        >
          <option value="">Select Functional Area</option>
          {filters.suite &&
            FUNCTION_AREAS[filters.suite].map(fa => (
              <option key={fa} value={fa}>{fa.replace(/_/g, ' ')}</option>
            ))}
        </select>

        <select name="user" onChange={handleFilterChange} value={filters.user}>
          <option value="">Select User</option>
          {USERS.map(u => (
            <option key={u} value={u}>{u}</option>
          ))}
        </select>

        <select name="machine" onChange={handleFilterChange} value={filters.machine}>
          <option value="">Select Machine</option>
          {MACHINES.map(m => (
            <option key={m} value={m}>{m}</option>
          ))}
        </select>

        <button className="btn generate" onClick={handleGenerate}>
          Generate Report
        </button>
      </div>

      {showResults && (
        <>
          {/* Charts */}
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

          {/* Table */}
          <div className="result-table">
            <table>
              <thead>
                <tr>
                  <th>Automation Suite</th>
                  <th>Functional Area</th>
                  <th>User</th>
                  <th>Machine</th>
                  <th>Status</th>
                  <th>Test Case</th>
                </tr>
              </thead>
              <tbody>
                {filteredExecutions.length > 0 ? (
                  filteredExecutions.map((row, i) => (
                    <tr key={i}>
                      <td>{row.suite}</td>
                      <td>{row.functionalArea.replace(/_/g, ' ')}</td>
                      <td>{row.user}</td>
                      <td>{row.machine}</td>
                      <td>{row.status}</td>
                      <td>{row.testCase}</td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan={6} style={{ textAlign: 'center' }}>
                      No test cases match the selected criteria.
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </>
      )}
    </div>
  );
};

export default Dashboard;
