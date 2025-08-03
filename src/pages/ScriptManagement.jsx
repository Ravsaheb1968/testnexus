import React, { useEffect, useState } from 'react';
import './ScriptManagement.css';

const mockSuites = [
  { id: 'CPQ_Quote_Processing', name: 'CPQ Quote Processing' },
  { id: 'Payments_Gateway', name: 'Payments Gateway' },
];

const mockFunctionAreas = {
  CPQ_Quote_Processing: [
    { id: 'Legacy_Product', name: 'Legacy Product' },
    { id: 'Agent_Journey', name: 'Agent Journey' },
  ],
  Payments_Gateway: [
    { id: 'Bank_API_Integration', name: 'Bank API Integration' },
    { id: 'Transaction_Monitor', name: 'Transaction Monitor' },
  ],
};

// Test cases keyed by function area
const mockTestCases = {
  Legacy_Product: [
    {
      execution: {
        id: 1,
        assigned_user: 'userA',
        machine_name: 'MACHINE_01',
        status: 'In-Queue',
      },
      testCase: { name: 'TC_Legacy_1' },
    },
    {
      execution: {
        id: 2,
        assigned_user: 'userB',
        machine_name: 'MACHINE_02',
        status: 'Pass',
      },
      testCase: { name: 'TC_Legacy_2' },
    },
  ],
  Agent_Journey: [
    {
      execution: {
        id: 3,
        assigned_user: 'userC',
        machine_name: 'MACHINE_03',
        status: 'In-Progress',
      },
      testCase: { name: 'TC_Agent_1' },
    },
    {
      execution: {
        id: 4,
        assigned_user: 'userD',
        machine_name: 'MACHINE_04',
        status: 'Fail',
      },
      testCase: { name: 'TC_Agent_2' },
    },
  ],
  Bank_API_Integration: [
    {
      execution: {
        id: 5,
        assigned_user: 'userE',
        machine_name: 'MACHINE_05',
        status: 'Pass',
      },
      testCase: { name: 'TC_Bank_1' },
    },
  ],
  Transaction_Monitor: [
    {
      execution: {
        id: 6,
        assigned_user: 'userF',
        machine_name: 'MACHINE_06',
        status: 'In-Queue',
      },
      testCase: { name: 'TC_Trans_1' },
    },
  ],
};

const STATUS_OPTIONS = ['In-Queue', 'In-Progress', 'Pass', 'Fail'];

function ScriptManagement() {
  const [suites, setSuites] = useState([]);
  const [selectedSuite, setSelectedSuite] = useState('');
  const [functionAreas, setFunctionAreas] = useState([]);
  const [selectedFA, setSelectedFA] = useState('');
  const [testCases, setTestCases] = useState([]);

  useEffect(() => {
    // simulate fetching available suites
    setSuites(mockSuites);
  }, []);

  useEffect(() => {
    if (selectedSuite) {
      // load function areas for suite
      setFunctionAreas(mockFunctionAreas[selectedSuite] || []);
      setSelectedFA('');
      setTestCases([]);
    }
  }, [selectedSuite]);

  const handleShow = () => {
    if (!selectedFA) return;
    // simulate fetching test cases
    setTestCases(mockTestCases[selectedFA] || []);
  };

  const handleStatusChange = (executionId, newStatus) => {
    setTestCases(prev =>
      prev.map(tc => {
        if (tc.execution.id === executionId) {
          return {
            ...tc,
            execution: {
              ...tc.execution,
              status: newStatus,
            },
          };
        }
        return tc;
      })
    );
  };

  return (
    <div className="script-management-container">
      <h2>Script Management</h2>

      <div className="selectors">
        <div className="field">
          <label>Suite</label>
          <select
            value={selectedSuite}
            onChange={e => setSelectedSuite(e.target.value)}
          >
            <option value="">-- Select Suite --</option>
            {suites.map(s => (
              <option key={s.id} value={s.id}>
                {s.name}
              </option>
            ))}
          </select>
        </div>

        <div className="field">
          <label>Function Area</label>
          <select
            value={selectedFA}
            onChange={e => setSelectedFA(e.target.value)}
            disabled={!selectedSuite}
          >
            <option value="">-- Select Function Area --</option>
            {functionAreas.map(fa => (
              <option key={fa.id} value={fa.id}>
                {fa.name}
              </option>
            ))}
          </select>
        </div>

        <div className="action">
          <button className="btn green" onClick={handleShow} disabled={!selectedFA}>
            Show
          </button>
        </div>
      </div>

      <div className="testcase-list">
        <table>
          <thead>
            <tr>
              <th>Test Case</th>
              <th>User</th>
              <th>Machine</th>
              <th>Status</th>
              <th>Change Status</th>
            </tr>
          </thead>
          <tbody>
            {testCases.length > 0 ? (
              testCases.map(tc => (
                <tr key={tc.execution.id}>
                  <td>{tc.testCase.name}</td>
                  <td>{tc.execution.assigned_user}</td>
                  <td>{tc.execution.machine_name}</td>
                  <td>{tc.execution.status}</td>
                  <td>
                    <select
                      value={tc.execution.status}
                      onChange={e =>
                        handleStatusChange(tc.execution.id, e.target.value)
                      }
                    >
                      {STATUS_OPTIONS.map(s => (
                        <option key={s} value={s}>
                          {s}
                        </option>
                      ))}
                    </select>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan={5} style={{ textAlign: 'center' }}>
                  {selectedFA ? 'No test cases for this function area.' : 'Select suite & function area then click Show.'}
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default ScriptManagement;
