import React, { useState, useEffect } from 'react';
import './CreateRequest.css';

const CreateRequest = () => {
  const [automationSuite, setAutomationSuite] = useState('');
  const [functionAreas, setFunctionAreas] = useState([]);
  const [testCases, setTestCases] = useState(['']);

  useEffect(() => {
    if (automationSuite === 'CPQ Quote Processing') {
      setFunctionAreas(['CPQ Legacy Product', 'Agent Journey']);
    } else if (automationSuite === 'Payments Gateway') {
      setFunctionAreas(['Bank API Integration', 'Transaction Monitor']);
    } else {
      setFunctionAreas([]);
    }
  }, [automationSuite]);

  const handleTestCaseChange = (index, value) => {
    const updated = [...testCases];
    updated[index] = value;
    setTestCases(updated);
  };

  const addTestCase = () => {
    setTestCases([...testCases, '']);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('Submitted:', {
      automationSuite,
      functionAreas,
      testCases,
    });
    alert('Test cases submitted!');
  };

  return (
    <div className="create-request-container">
      <h2>Create Test Request</h2>
      <form onSubmit={handleSubmit} className="create-request-form">
        <label>Automation Suite</label>
        <select value={automationSuite} onChange={(e) => setAutomationSuite(e.target.value)}>
          <option value="">-- Select Suite --</option>
          <option value="CPQ Quote Processing">CPQ Quote Processing</option>
          <option value="Payments Gateway">Payments Gateway</option>
        </select>

        {functionAreas.length > 0 && (
          <>
            <label>Function Area</label>
            <select>
              {functionAreas.map((area, idx) => (
                <option key={idx} value={area}>{area}</option>
              ))}
            </select>
          </>
        )}

        <label>Add Test Cases</label>
        {testCases.map((tc, idx) => (
          <input
            key={idx}
            type="text"
            placeholder={`Test Case ${idx + 1}`}
            value={tc}
            onChange={(e) => handleTestCaseChange(idx, e.target.value)}
          />
        ))}
        <button type="button" className="btn add" onClick={addTestCase}>+ Add Test Case</button>

        <div className="form-buttons">
          <button type="submit" className="btn modify">Submit</button>
        </div>
      </form>
    </div>
  );
};

export default CreateRequest;
