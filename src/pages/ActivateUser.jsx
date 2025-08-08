import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { toast } from 'react-toastify';
import './ActivateUser.css';

function ActivateUser() {
  const [userType, setUserType] = useState('User');
  const [email, setEmail] = useState('');
  const [username, setUsername] = useState('');
  const [machineName, setMachineName] = useState('');
  const [automationSuite, setAutomationSuite] = useState('');

  const [userOptions, setUserOptions] = useState([]);
  const [suiteOptions, setSuiteOptions] = useState([]);

  // Fetch users and suites
  useEffect(() => {
    const fetchData = async () => {
      try {
        const userRes = await axios.get('/api/admin/users');
        const suiteRes = await axios.get('/api/admin/suites');
        console.log("Fetched users →", userRes.data);
        setUserOptions(Array.isArray(userRes.data) ? userRes.data : []);
        setSuiteOptions(Array.isArray(suiteRes.data) ? suiteRes.data : []);
      } catch (err) {
        toast.error('Failed to fetch users or suites');
        console.error(err);
        console.error("Axios error →", err);
      }
    };

    fetchData();
  }, []);

  // Autofill username when email is selected
  useEffect(() => {
    const matched = userOptions.find(user => user.email === email);
    setUsername(matched ? matched.username : '');
  }, [email, userOptions]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!email || !username || !machineName || (userType === 'User' && !automationSuite)) {
      toast.warn('Please fill all required fields.');
      return;
    }

    try {
      const payload = {
        email,
        username,
        machineName,
        suite: userType === 'User' ? automationSuite : null
      };

      const res = await axios.post('/api/admin/activate-user', payload);
      toast.success(res.data.msg || 'User activated successfully');
      handleClear();
    } catch (err) {
      toast.error(err.response?.data?.msg || 'Activation failed');
      console.error(err);
    }
  };

  const handleClear = () => {
    setUserType('User');
    setEmail('');
    setUsername('');
    setMachineName('');
    setAutomationSuite('');
  };

  return (
    <div className="activate-user-container">
      <h2>Activate User</h2>
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
          <option value="">-- Select Email --</option>
          {userOptions.map((user) => (
            <option key={user._id} value={user.email}>
              {user.email}
            </option>
          ))}
        </select>

        <label>Username</label>
        <select value={username} onChange={(e) => setUsername(e.target.value)}>
          <option value="">-- Select Username --</option>
          {userOptions.map((user) => (
            <option key={user._id + '-username'} value={user.username}>
              {user.username}
            </option>
          ))}
        </select>

        <label>Machine Name</label>
        <input
          type="text"
          value={machineName}
          onChange={(e) => setMachineName(e.target.value)}
          placeholder="Enter machine name"
        />

        {userType === 'User' && (
          <>
            <label>Automation Suite</label>
            <select value={automationSuite} onChange={(e) => setAutomationSuite(e.target.value)}>
              <option value="">-- Select Suite --</option>
              {suiteOptions.map((suite, i) => (
                <option key={i} value={suite.name || suite}>
                  {suite.name || suite}
                </option>
              ))}
            </select>
          </>
        )}

        <div className="btn-group">
          <button type="submit" className="btn green">Make Active</button>
          <button type="button" className="btn blue" onClick={handleClear}>Clear Form</button>
        </div>
      </form>
    </div>
  );
}

export default ActivateUser;
