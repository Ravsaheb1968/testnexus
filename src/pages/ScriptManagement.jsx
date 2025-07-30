import React, { useState } from 'react';
import './ScriptManagement.css';

function ScriptManagement() {
  const [suite, setSuite] = useState('');
  const [functionArea, setFunctionArea] = useState('');
  const [testCases, setTestCases] = useState([]);
  const [userType, setUserType] = useState('Admin'); // This would typically come from auth
  const [selectAll, setSelectAll] = useState(false);

  const fetchTestCases = () => {
    setTestCases([
      { id: 1, name: 'TC_ModCom_Agent_Journey', blocked: false, selected: false },
      { id: 2, name: 'TC_Multiple_ManualRequests_Agent_Journey', blocked: false, selected: false },
      { id: 3, name: 'TC_IPAccess_With_Addons_Agent_Journey', blocked: false, selected: false },
    ]);
    setSelectAll(false);
  };

  const toggleSelectTest = (index) => {
    setTestCases(prev =>
      prev.map((test, i) =>
        i === index ? { ...test, selected: !test.selected } : test
      )
    );
  };

  const toggleBlockAll = () => {
    setTestCases(prev =>
      prev.map(test =>
        test.selected ? { ...test, blocked: true, selected: false } : test
      )
    );
  };

  const handleSelectAll = () => {
    setSelectAll(prev => !prev);
    setTestCases(prev =>
      prev.map(test =>
        test.blocked ? test : { ...test, selected: !selectAll }
      )
    );
  };

  return (
    <div className="script-management-container">
      <h2>Block Test Scenarios</h2>
      <form className="script-form">
        <div className="form-row">
          <div className="form-group">
            <label id='lable-name1' >Suite</label>
            <select value={suite} onChange={(e) => setSuite(e.target.value)}>
              <option value="">--Select--</option>
              <option value="CPQ_Quote_Processing">CPQ_Quote_Processing</option>
              <option value="Number_On_Demand">Number_On_Demand</option>
            </select>
          </div>

          <div className="form-group">
            <label id='lable-name2'>Functional Area</label>
            <select value={functionArea} onChange={(e) => setFunctionArea(e.target.value)}>
              <option value="">--Select--</option>
              <option value="Batch">Batch</option>
              <option value="Agent Journey">Agent Journey</option>
            </select>
          </div>

          <div className="form-group button-group">
            <button type="button" className="btn green" onClick={fetchTestCases}>
              Show
            </button>
          </div>
        </div>
      </form>

      {testCases.length > 0 && (
        <div className="testcase-list">
          <div className="select-all-container">
            <label>
              <input 
                type="checkbox"
                checked={selectAll}
                onChange={handleSelectAll}
              />
              Select All
            </label>
          </div>

          <table className="testcase-table">
            <thead>
              <tr>
                <th>Select</th>
                <th>Test Case Name</th>
              </tr>
            </thead>
            <tbody>
              {testCases.map((test, index) => (
                <tr key={test.id} className={test.blocked ? 'blocked' : ''}>
                  <td>
                    <input
                      type="checkbox"
                      disabled={test.blocked}
                      checked={test.selected}
                      onChange={() => toggleSelectTest(index)}
                    />
                  </td>
                  <td>{test.name}</td>
                </tr>
              ))}
            </tbody>
          </table>

          {userType === 'Admin' && (
            <div className="btn-group short-button">
              <button
                type="button"
                className="btn red"
                onClick={toggleBlockAll}
              >
                Save
              </button>
            </div>
          )}
        </div>
      )}
    </div>
  );
}

export default ScriptManagement;