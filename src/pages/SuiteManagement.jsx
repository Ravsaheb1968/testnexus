import React, { useEffect, useState } from 'react';
import './SuiteManagement.css';

const mockActivatedUsers = [
  // In real app, replace with API call to get activated users and their assigned suites
  { email: 'user1@example.com', userName: 'user1', suite: 'CPQ_Quote_Processing' },
  { email: 'user2@example.com', userName: 'user2', suite: 'Payments_Gateway' },
];

// Persisted suites with their function areas (could come from backend)
const initialSuites = {
  CPQ_Quote_Processing: ['Legacy_Product'],
  Payments_Gateway: ['Bank_API_Integration'],
};

const SuiteManagement = () => {
  const [suites, setSuites] = useState(initialSuites); // { suiteName: [functionArea1,...] }
  const [selectedSuite, setSelectedSuite] = useState('');
  const [newFunctionArea, setNewFunctionArea] = useState('');
  const [availableSuites, setAvailableSuites] = useState([]);

  useEffect(() => {
    // Derive available suites from activated users (simulate fetch)
    const uniqueSuites = Array.from(new Set(mockActivatedUsers.map(u => u.suite)));
    setAvailableSuites(uniqueSuites);
    if (!selectedSuite && uniqueSuites.length) {
      setSelectedSuite(uniqueSuites[0]);
    }
  }, []);

  const handleAddFunctionArea = () => {
    if (!selectedSuite) return;
    if (!newFunctionArea.trim()) {
      alert('Function Area name cannot be empty.');
      return;
    }
    setSuites(prev => {
      const existing = prev[selectedSuite] || [];
      if (existing.includes(newFunctionArea.trim())) {
        alert('Function Area already exists for this suite.');
        return prev;
      }
      return {
        ...prev,
        [selectedSuite]: [...existing, newFunctionArea.trim()],
      };
    });
    setNewFunctionArea('');
  };

  const handleCreateSuite = () => {
    const suiteName = prompt('Enter new Suite name (no spaces, use underscores):');
    if (!suiteName) return;
    if (suites[suiteName]) {
      alert('Suite already exists.');
      return;
    }
    setSuites(prev => ({ ...prev, [suiteName]: [] }));
    setAvailableSuites(prev => {
      if (prev.includes(suiteName)) return prev;
      return [...prev, suiteName];
    });
    setSelectedSuite(suiteName);
  };

  return (
    <div className="suite-management-container">
      <h2>Suite Management</h2>
      <p className="subtitle">Create and manage Function Areas per Automation Suite</p>

      <div className="suite-selection">
        <div className="field">
          <label>Suite</label>
          <div className="inline-group">
            <select
              value={selectedSuite}
              onChange={(e) => setSelectedSuite(e.target.value)}
            >
              <option value="">-- Select Suite --</option>
              {availableSuites.map((s) => (
                <option key={s} value={s}>{s}</option>
              ))}
            </select>
            <button className="btn small" onClick={handleCreateSuite}>+ New Suite</button>
          </div>
        </div>
      </div>

      {selectedSuite && (
        <div className="function-area-section">
          <h4>Function Areas for <span className="suite-name">{selectedSuite}</span></h4>

          <div className="existing-areas">
            {suites[selectedSuite] && suites[selectedSuite].length > 0 ? (
              suites[selectedSuite].map((fa, idx) => (
                <div key={idx} className="fa-badge">{fa}</div>
              ))
            ) : (
              <p className="empty">No function areas yet.</p>
            )}
          </div>

          <div className="add-area">
            <div className="field">
              <label>New Function Area</label>
              <input
                type="text"
                placeholder="e.g., Agent_Journey"
                value={newFunctionArea}
                onChange={(e) => setNewFunctionArea(e.target.value)}
              />
            </div>
            <button className="btn add" onClick={handleAddFunctionArea}>Add Function Area</button>
          </div>
        </div>
      )}
    </div>
  );
};

export default SuiteManagement;
