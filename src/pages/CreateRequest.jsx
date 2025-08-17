import React, { useState, useEffect } from 'react';
import './CreateRequest.css';
import axios from 'axios';
import { toast } from 'react-toastify';

const CreateRequest = () => {
  const [allSuites, setAllSuites] = useState([]);
  const [automationSuite, setAutomationSuite] = useState('');
  const [functionAreas, setFunctionAreas] = useState([]);
  const [selectedFunctionArea, setSelectedFunctionArea] = useState('');
  const [testCases, setTestCases] = useState(['']);

  // 1️⃣ Fetch all suites from backend (SuiteManagement data)
  useEffect(() => {
    const fetchSuites = async () => {
      try {
        const res = await axios.get('/api/suites'); // Same as SuiteManagement
        setAllSuites(res.data || []);
      } catch (err) {
        toast.error('Failed to load automation suites');
        console.error(err);
      }
    };
    fetchSuites();
  }, []);

  // 2️⃣ Update function areas when suite changes
  useEffect(() => {
    if (automationSuite) {
      const suiteObj = allSuites.find(s => s.name === automationSuite);
      setFunctionAreas(suiteObj?.functionAreas || []);
      setSelectedFunctionArea('');
    } else {
      setFunctionAreas([]);
    }
  }, [automationSuite, allSuites]);

  // 3️⃣ Handle test case input change
  const handleTestCaseChange = (index, value) => {
    const updated = [...testCases];
    updated[index] = value;
    setTestCases(updated);
  };

  // 4️⃣ Add new test case input
  const addTestCase = () => {
    setTestCases([...testCases, '']);
  };

  // 5️⃣ Remove a test case input
  const removeTestCase = (index) => {
    setTestCases(prev => prev.filter((_, i) => i !== index));
  };

  // 6️⃣ Submit request
  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!automationSuite || !selectedFunctionArea || testCases.some(tc => !tc.trim())) {
      toast.warn('Please fill all required fields');
      return;
    }

    const payload = {
      automationSuite,
      functionArea: selectedFunctionArea,
      testCases
    };

    try {
      await axios.post('/api/testcases/add', payload);
      toast.success('✅ Test cases added successfully!');

      // Reset form
      setAutomationSuite('');
      setFunctionAreas([]);
      setSelectedFunctionArea('');
      setTestCases(['']);
    } catch (err) {
      console.error(err);
      toast.error('❌ Failed to add test cases');
    }
  };


  return (
    <div className="create-request-container">
      <h2>Create Test Request</h2>
      <form onSubmit={handleSubmit} className="create-request-form">

        {/* Automation Suite Dropdown */}
        <label>Automation Suite</label>
        <select
          value={automationSuite}
          onChange={(e) => setAutomationSuite(e.target.value)}
        >
          <option value="">-- Select Suite --</option>
          {allSuites.map((suite, idx) => (
            <option key={idx} value={suite.name}>
              {suite.name}
            </option>
          ))}
        </select>

        {/* Function Area Dropdown */}
        {functionAreas.length > 0 && (
          <>
            <label>Function Area</label>
            <select
              value={selectedFunctionArea}
              onChange={(e) => setSelectedFunctionArea(e.target.value)}
            >
              <option value="">-- Select Function Area --</option>
              {functionAreas.map((area, idx) => (
                <option key={idx} value={area}>{area}</option>
              ))}
            </select>
          </>
        )}

        {/* Test Cases Input */}
        <label>Add Test Cases</label>
        {testCases.map((tc, idx) => (
          <div key={idx} className="testcase-row">
            <input
              type="text"
              placeholder={`Test Case ${idx + 1}`}
              value={tc}
              onChange={(e) => handleTestCaseChange(idx, e.target.value)}
            />
            {testCases.length > 1 && (
              <button
                type="button"
                className="btn remove"
                onClick={() => removeTestCase(idx)}
              >
                ❌
              </button>
            )}
          </div>
        ))}
        <button type="button" className="btn add" onClick={addTestCase}>
          + Add Test Case
        </button>

        <div className="form-buttons">
          <button type="submit" className="btn modify">Submit</button>
        </div>
      </form>
    </div>
  );
};

export default CreateRequest;
