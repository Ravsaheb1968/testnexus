import React, { useState } from 'react';
import './ActivateUser.css';

function ModifyUser() {
  const [userType, setUserType] = useState('User');
  const [email, setEmail] = useState('');
  const [username, setUsername] = useState('');
  const [automationSuite, setAutomationSuite] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    alert('User Modified');
  };

  const handleClear = () => {
    setEmail('');
    setUsername('');
    setAutomationSuite('');
  };

  return (
    <div className="activate-user-container">
      <h2>Modify User</h2>
      <form className="activate-user-form" onSubmit={handleSubmit}>
        <div className="radio-group">
          <label>
            <input
              type="radio"
              value="User"
              checked={userType === 'User'}
              onChange={() => setUserType('User')}
            />
            User
          </label>
          <label>
            <input
              type="radio"
              value="Admin"
              checked={userType === 'Admin'}
              onChange={() => setUserType('Admin')}
            />
            Admin
          </label>
        </div>
        <label>Email ID</label>
        <select value={email} onChange={(e) => setEmail(e.target.value)}>
          <option>--Select--</option>
          <option value="user1@example.com">user1@example.com</option>
        </select>

        <label>User Name</label>
        <input
          type="text"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
        />

        <label>Automation Suite</label>
        <input
          type="text"
          value={automationSuite}
          onChange={(e) => setAutomationSuite(e.target.value)}
        />

        <div className="btn-group">
          <button type="submit" className="btn green">Modify</button>
          <button type="button" className="btn blue" onClick={handleClear}>Clear</button>
        </div>
      </form>
    </div>
  );
}

export default ModifyUser;