import React from 'react';
import './Dashboard.css';

const Dashboard = () => {
  return (
    <div className="dashboard-container">
      <h2>Consolidated Report</h2>

      <div className="filters-section">
        {/* Filter fields */}
        <div className="filters-row">
          <select><option>All Suite</option></select>
          <select><option>All User ID</option></select>
          <select><option>All Browser</option></select>
          <input type="text" placeholder="Request ID" />
        </div>

        <div className="filters-row">
          <select><option>All Environment</option></select>
          <select><option>All Functional Area</option></select>
          <select><option>Select Functional Area</option></select>
          <select><option>Test Case Name</option></select>
        </div>

        <div className="filters-row">
          <input type="date" />
          <input type="date" />
          <select><option>Test Case Status</option></select>
        </div>

        <div className="generate-btn-row">
          <button className="btn generate">Generate</button>
        </div>
      </div>

      {/* Execution Summary */}
      <div className="execution-summary">
        <h4>Execution Summary</h4>
        <div className="charts">
          <div className="chart pie">[Pie Chart]</div>
          <div className="chart bar">[Bar Chart]</div>
        </div>
      </div>

      {/* Test Case Report Table */}
      <div className="table-section">
        <div className="table-controls">
          <label>Show <select><option>10</option></select> entries</label>
          <input type="text" placeholder="Search..." />
        </div>

        <table>
          <thead>
            <tr>
              <th>RequestId</th>
              <th>OccurrenceType</th>
              <th>Automation Suite</th>
              <th>Request Name</th>
              <th>Test Case Count</th>
              <th>Created By</th>
              <th>Created Date</th>
              <th>Environment</th>
              <th>Status</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>115031</td>
              <td>Now</td>
              <td>SAP_ECC</td>
              <td>Sample</td>
              <td>1</td>
              <td>SITHAPE</td>
              <td>2025-07-30</td>
              <td>RFS</td>
              <td className="status-completed">Completed</td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Dashboard;
