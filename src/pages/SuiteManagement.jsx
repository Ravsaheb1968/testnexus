import React, { useEffect, useState } from 'react';
import axios from 'axios';
import './SuiteManagement.css';
import { toast } from 'react-toastify';

const SuiteManagement = () => {
  const [suites, setSuites] = useState({}); // { suiteName: [functionArea,...] }
  const [selectedSuite, setSelectedSuite] = useState('');
  const [newFunctionArea, setNewFunctionArea] = useState('');
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [newSuiteName, setNewSuiteName] = useState('');

  // Fetch all suites on mount
  useEffect(() => {
    const fetchSuites = async () => {
      try {
        // MUST match backend: GET /api/suites
        const res = await axios.get('/api/suites');
        const mapped = {};
        (Array.isArray(res.data) ? res.data : []).forEach(s => {
          mapped[s.name] = s.functionAreas || [];
        });
        setSuites(mapped);

        const names = Object.keys(mapped);
        if (names.length && !selectedSuite) {
          setSelectedSuite(names[0]);
        }
      } catch (err) {
        toast.error('Failed to load suites');
        console.error(err);
      }
    };
    fetchSuites();
  }, []); // only once

  const handleAddFunctionArea = async () => {
    if (!selectedSuite || !newFunctionArea.trim()) {
      toast.warn('Function Area name cannot be empty.');
      return;
    }
    try {
      await axios.post('/api/suites/add-function-area', {
        suiteName: selectedSuite,
        functionArea: newFunctionArea.trim(),
      });

      // Optimistic update
      setSuites(prev => ({
        ...prev,
        [selectedSuite]: [
          ...(prev[selectedSuite] || []),
          newFunctionArea.trim()
        ],
      }));

      toast.success('Function area added');
      setNewFunctionArea('');
    } catch (err) {
      toast.error(err.response?.data?.msg || 'Failed to add function area');
      console.error(err);
    }
  };

  const handleCreateSuite = async () => {
    const suiteName = newSuiteName.trim();
    if (!suiteName) {
      toast.warn('Suite name cannot be empty');
      return;
    }
    try {
      // MUST match backend: POST /api/suites/create
      await axios.post('/api/suites/create', { name: suiteName });

      setSuites(prev => ({ ...prev, [suiteName]: [] }));
      setSelectedSuite(suiteName);
      toast.success('Suite created successfully');
      setNewSuiteName('');
      setIsModalOpen(false);
    } catch (err) {
      toast.error(err.response?.data?.msg || 'Failed to create suite');
      console.error(err);
    }
  };
  const handleRemoveFunctionArea = async (faName) => {
    try {
      await axios.post('/api/suites/remove-function-area', {
        suiteName: selectedSuite,
        functionArea: faName,
      });

      setSuites(prev => ({
        ...prev,
        [selectedSuite]: prev[selectedSuite].filter(fa => fa !== faName),
      }));

      toast.success('Function area removed');
    } catch (err) {
      toast.error(err.response?.data?.msg || 'Failed to remove function area');
      console.error(err);
    }
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
              {Object.keys(suites).map(name => (
                <option key={name} value={name}>{name}</option>
              ))}
            </select>
            <button className="btn small" onClick={() => setIsModalOpen(true)}>
              + New Suite
            </button>
          </div>
        </div>
      </div>

      {selectedSuite && (
        <div className="function-area-section">
          <h4>Function Areas for <span className="suite-name">{selectedSuite}</span></h4>

          {/* <div className="existing-areas">
            {(suites[selectedSuite] || []).length > 0 ? (
              suites[selectedSuite].map((fa, idx) => (
                <div key={idx} className="fa-badge">{fa}</div>
              ))
            ) : (
              <p className="empty">No function areas yet.</p>
            )}
          </div> */}
          <div className="existing-areas">
            {(suites[selectedSuite] || []).length > 0 ? (
              suites[selectedSuite].map((fa, idx) => (
                <div key={idx} className="fa-badge">
                  {fa}
                  <span
                    className="delete-icon"
                    onClick={() => handleRemoveFunctionArea(fa)}
                    title="Remove"
                  >
                    ✖
                  </span>
                </div>
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
            <button className="btn add" onClick={handleAddFunctionArea}>
              Add Function Area
            </button>
          </div>
        </div>
      )}

      {isModalOpen && (
        <div className="modal-overlay">
          <div className="modal">
            <h3>Create New Suite</h3>
            <input
              type="text"
              placeholder="Suite name (e.g., Order_Processing)"
              value={newSuiteName}
              onChange={(e) => setNewSuiteName(e.target.value)}
            />
            <div className="modal-actions">
              <button className="btn" onClick={handleCreateSuite}>Create</button>
              <button className="btn cancel" onClick={() => setIsModalOpen(false)}>Cancel</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default SuiteManagement;
