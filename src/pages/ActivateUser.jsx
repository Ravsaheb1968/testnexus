import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { toast } from 'react-toastify';
import './ActivateUser.css';

function ActivateUser() {
  const [email, setEmail] = useState('');
  const [username, setUsername] = useState('');
  const [machineName, setMachineName] = useState('');
  const [automationSuite, setAutomationSuite] = useState('');
  const [userOptions, setUserOptions] = useState([]);
  const [suiteOptions, setSuiteOptions] = useState([]);

  // Fetch only inactive users + suite list
  useEffect(() => {
    const fetchData = async () => {
      try {
        const userRes = await axios.get('/api/admin/users?onlyInactive=true');
        const suiteRes = await axios.get('/api/admin/suites');

        setUserOptions(Array.isArray(userRes.data) ? userRes.data : []);
        setSuiteOptions(Array.isArray(suiteRes.data) ? suiteRes.data : []);
      } catch (err) {
        toast.error('Failed to fetch users or suites');
        console.error(err);
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

    if (!email || !username || !machineName || !automationSuite) {
      toast.warn('Please fill all required fields.');
      return;
    }

    try {
      const payload = {
        email,
        username,
        machineName,
        suite: automationSuite
      };

      const res = await axios.post('/api/admin/activate-user', payload);
      toast.success(res.data.msg || 'User activated successfully');

      // Remove activated user from dropdown immediately
      setUserOptions(prev => prev.filter(user => user.email !== email));
      handleClear();
    } catch (err) {
      toast.error(err.response?.data?.msg || 'Activation failed');
      console.error(err);
    }
  };

  const handleClear = () => {
    setEmail('');
    setUsername('');
    setMachineName('');
    setAutomationSuite('');
  };

  return (
    <div className="activate-user-container">
      <h2>Activate User</h2>
      <form className="activate-user-form" onSubmit={handleSubmit}>

        {/* Email Dropdown */}
        <label>Email ID</label>
        <select value={email} onChange={(e) => setEmail(e.target.value)}>
          <option value="">-- Select Email --</option>
          {userOptions.map((user) => (
            <option key={user._id} value={user.email}>
              {user.email}
            </option>
          ))}
        </select>

        {/* Username Dropdown */}
        <label>Username</label>
        <select value={username} onChange={(e) => setUsername(e.target.value)}>
          <option value="">-- Select Username --</option>
          {userOptions.map((user) => (
            <option key={user._id + '-username'} value={user.username}>
              {user.username}
            </option>
          ))}
        </select>

        {/* Machine Name */}
        <label>Machine Name</label>
        <input
          type="text"
          value={machineName}
          onChange={(e) => setMachineName(e.target.value)}
          placeholder="Enter machine name"
        />

        {/* Automation Suite Dropdown */}
        <label>Automation Suite</label>
        <select value={automationSuite} onChange={(e) => setAutomationSuite(e.target.value)}>
          <option value="">-- Select Suite --</option>
          {suiteOptions.map((suite) => (
            <option key={suite._id || suite.name} value={suite.name}>
              {suite.name}
            </option>
          ))}
        </select>

        <div className="btn-group">
          <button type="submit" className="btn green">Make Active</button>
          <button type="button" className="btn blue" onClick={handleClear}>Clear Form</button>
        </div>
      </form>
    </div>
  );
}

export default ActivateUser;
