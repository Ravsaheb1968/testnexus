import React, { useState } from 'react';
import './MachineAllocation.css';

function MachineAllocation() {
  const [suite, setSuite] = useState('');
  const [searchTerm, setSearchTerm] = useState('');
  const [machines, setMachines] = useState([]);

  const fetchMachines = () => {
    // Simulated data — replace with actual API
    setMachines([
      { id: 1, machine: 'ULVMCTMUFT108', user: 'MSingh-adm', email: 'msingh@example.com', status: 'green', selected: false },
      { id: 2, machine: 'NAVMCTMTTL108', user: 'MPandit-adm', email: 'mpandit@example.com', status: 'red', selected: false },
      { id: 3, machine: 'NAVMCTMCTCA001', user: 'OKorde1-adm', email: 'okorde1@example.com', status: 'green', selected: false },
    ]);
  };

  const handleSelect = (id) => {
    setMachines(prev =>
      prev.map(machine =>
        machine.id === id ? { ...machine, selected: !machine.selected } : machine
      )
    );
  };

  const handleSave = () => {
    const selectedMachines = machines.filter(m => m.selected);
    alert(`Saved ${selectedMachines.length} machines.`);
  };

  const filteredMachines = machines.filter(machine =>
    machine.machine.toLowerCase().includes(searchTerm.toLowerCase()) ||
    machine.user.toLowerCase().includes(searchTerm.toLowerCase()) ||
    machine.email.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="machine-allocation-container">
      <h2>Machine Allocation</h2>
      <div className="allocation-controls">
        <label>Suite</label>
        <select value={suite} onChange={(e) => setSuite(e.target.value)}>
          <option value="">--Select--</option>
          <option value="CPQ_Quote_Processing">CPQ_Quote_Processing</option>
        </select>
        <button className="btn green" onClick={fetchMachines}>Show</button>
      </div>

      {machines.length > 0 && (
        <>
          <input
            type="text"
            placeholder="Search"
            className="search-input"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />

          <table className="machine-table">
            <thead>
              <tr>
                <th>Select</th>
                <th>Machine Name</th>
                <th>User Name</th>
                <th>Email ID</th>
              </tr>
            </thead>
            <tbody>
              {filteredMachines.map(machine => (
                <tr key={machine.id}>
                  <td>
                    <input
                      type="checkbox"
                      checked={machine.selected}
                      onChange={() => handleSelect(machine.id)}
                    />
                  </td>
                  <td>{machine.machine}</td>
                  <td>{machine.user}</td>
                  <td>{machine.email}</td>
                </tr>
              ))}
            </tbody>
          </table>

          <div className="save-container">
            <button className="btn green" onClick={handleSave}>Save</button>
          </div>
          <p className="note">
            *Note: Selected machines will be persisted on save.
          </p>
        </>
      )}
    </div>
  );
}

export default MachineAllocation;
