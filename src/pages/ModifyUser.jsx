import React, { useState } from 'react';
import './ActivateUser.css'; // reused styles for consistency

function ModifyUser() {
  const [userType, setUserType] = useState('User');
  const [email, setEmail] = useState('');
  const [username, setUsername] = useState('');
  const [automationSuite, setAutomationSuite] = useState('');

  // Static options (replace with API data in future)
  const emailOptions = [
    'user1@example.com',
    'admin@example.com',
    'qa.engineer@example.com'
  ];

  const usernameOptions = [
    'omkorde',
    'adminuser',
    'qaengineer'
  ];

  const suiteOptions = [
    'Regression Suite',
    'Smoke Suite',
    'E2E Suite'
  ];

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!email || !username || (userType === 'User' && !automationSuite)) {
      alert('Please fill all required fields.');
      return;
    }

    alert(`${userType} Modified\nEmail: ${email}\nUser: ${username}${userType === 'User' ? `\nSuite: ${automationSuite}` : ''}`);
    // TODO: Send update request to backend
  };

  const handleClear = () => {
    setUserType('User');
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
          <option value="">--Select Email--</option>
          {emailOptions.map((option, index) => (
            <option key={index} value={option}>{option}</option>
          ))}
        </select>

        <label>User Name</label>
        <select value={username} onChange={(e) => setUsername(e.target.value)}>
          <option value="">--Select Username--</option>
          {usernameOptions.map((option, index) => (
            <option key={index} value={option}>{option}</option>
          ))}
        </select>

        {userType === 'User' && (
          <>
            <label>Automation Suite</label>
            <select value={automationSuite} onChange={(e) => setAutomationSuite(e.target.value)}>
              <option value="">--Select Suite--</option>
              {suiteOptions.map((suite, index) => (
                <option key={index} value={suite}>{suite}</option>
              ))}
            </select>
          </>
        )}

        <div className="btn-group">
          <button type="submit" className="btn green">Modify</button>
          <button type="button" className="btn blue" onClick={handleClear}>Clear</button>
        </div>
      </form>
    </div>
  );
}

export default ModifyUser;
