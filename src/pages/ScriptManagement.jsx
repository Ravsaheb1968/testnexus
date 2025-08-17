import React, { useEffect, useState } from 'react';
import axios from 'axios';
import './ScriptManagement.css';

const STATUS_OPTIONS = ['Not Run', 'In-Progress', 'Passed', 'Failed', 'Blocked'];

function ScriptManagement() {
  const [suites, setSuites] = useState([]);
  const [selectedSuite, setSelectedSuite] = useState('');
  const [functionAreas, setFunctionAreas] = useState([]);
  const [selectedFA, setSelectedFA] = useState('');
  const [testCases, setTestCases] = useState([]);

  // ✅ Fetch Suites from backend
  useEffect(() => {
    axios.get('/api/suites')
      .then(res => setSuites(res.data))
      .catch(err => console.error('Failed to fetch suites:', err));
  }, []);

  // ✅ Fetch function areas when suite changes
  useEffect(() => {
    if (selectedSuite) {
      const suiteObj = suites.find(s => s._id === selectedSuite);
      setFunctionAreas(suiteObj?.functionAreas || []);
      setSelectedFA('');
      setTestCases([]);
    }
  }, [selectedSuite, suites]);

  // ✅ Fetch test cases by suite + function area
  const handleShow = async () => {
    if (!selectedFA) return;
    try {
      const res = await axios.get(`/api/testcases/suites/${selectedSuite}/function-areas/${selectedFA}/testcases`);
      setTestCases(res.data || []);
    } catch (err) {
      console.error('Failed to fetch test cases:', err);
      alert('❌ Failed to load test cases');
    }
  };

  // ✅ Local status change
  const handleStatusChange = (id, newStatus) => {
    setTestCases(prev =>
      prev.map(tc =>
        tc._id === id
          ? { ...tc, execution: { ...tc.execution, status: newStatus } }
          : tc
      )
    );
  };

  // ✅ Submit updated statuses to backend
  const handleSubmit = async () => {
    try {
      await axios.post('/api/testcases/update-status', { testCases });
      alert('✅ Statuses updated successfully');
    } catch (err) {
      console.error('Update failed:', err);
      alert('❌ Failed to update statuses');
    }
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
              <option key={s._id} value={s._id}>
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
            {functionAreas.map((fa, idx) => (
              <option key={idx} value={fa}>
                {fa}
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
                <tr key={tc._id}>
                  <td>{tc.name}</td>
                  <td>{tc.execution?.assigned_user || '-'}</td>
                  <td>{tc.execution?.machine_name || '-'}</td>
                  <td>{tc.execution?.status || 'Not Run'}</td>
                  <td>
                    <select
                      value={tc.execution?.status || 'Not Run'}
                      onChange={e => handleStatusChange(tc._id, e.target.value)}
                    >
                      {STATUS_OPTIONS.map(s => (
                        <option key={s} value={s}>{s}</option>
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

        {/* ✅ Submit button visible only if test cases exist */}
        {testCases.length > 0 && (
          <div style={{ marginTop: '20px', textAlign: 'center' }}>
            <button className="btn green" onClick={handleSubmit}>
              Submit Changes
            </button>
          </div>
        )}
      </div>
    </div>
  );
}

export default ScriptManagement;
