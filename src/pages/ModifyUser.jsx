import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { toast } from 'react-toastify';
import './ActivateUser.css';

function ModifyUser() {
  const [userType, setUserType] = useState('User'); // target role you want to set
  const [email, setEmail] = useState('');
  const [username, setUsername] = useState('');
  const [automationSuite, setAutomationSuite] = useState('');
  const [userOptions, setUserOptions] = useState([]);
  const [suiteOptions, setSuiteOptions] = useState([]);

  // Fetch active users + suites
  useEffect(() => {
    const fetchData = async () => {
      try {
        const [userRes, suiteRes] = await Promise.all([
          axios.get('/api/admin/users?onlyActive=true'),
          axios.get('/api/admin/suites')
        ]);

        const allActive = Array.isArray(userRes.data) ? userRes.data : [];

        // Filter by role (DB uses lowercase: 'admin' | 'user')
        const wantRole = userType === 'User' ? 'admin' : 'user';
        const filtered = allActive.filter(
          u => (u.role || '').toLowerCase() === wantRole
        );

        setUserOptions(filtered);
        setSuiteOptions(Array.isArray(suiteRes.data) ? suiteRes.data : []);
      } catch (err) {
        console.error(err);
        toast.error('Failed to fetch users or suites');
      }
    };
    fetchData();
  }, [userType]);

  // Autofill username when email changes
  useEffect(() => {
    const matched = userOptions.find(u => u.email === email);
    setUsername(matched ? matched.username : '');
  }, [email, userOptions]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    // If converting to User, suite is required. If converting to Admin, suite ignored.
    if (!email || !username || (userType === 'User' && !automationSuite)) {
      toast.warn('Please fill all required fields.');
      return;
    }

    try {
      const payload = {
        email,
        role: userType.toLowerCase(), // <- IMPORTANT: backend expects lowercase
        suite: userType === 'User' ? automationSuite : null
      };

      const res = await axios.post('/api/admin/modify-user-role', payload);
      toast.success(res.data.msg || 'User modified successfully');

      // Clear inputs
      setEmail('');
      setUsername('');
      setAutomationSuite('');

      // Refresh list so the user disappears from the current filter
      const refresh = await axios.get('/api/admin/users?onlyActive=true');
      const allActive = Array.isArray(refresh.data) ? refresh.data : [];
      const wantRole = userType === 'User' ? 'admin' : 'user';
      setUserOptions(allActive.filter(u => (u.role || '').toLowerCase() === wantRole));
    } catch (err) {
      console.error(err);
      toast.error(err.response?.data?.msg || 'Modification failed');
    }
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
        {/* Role selection */}
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

        {/* Email */}
        <label>Email ID</label>
        <select value={email} onChange={(e) => setEmail(e.target.value)}>
          <option value="">-- Select Email --</option>
          {userOptions.map(user => (
            <option key={user._id} value={user.email}>
              {user.email}
            </option>
          ))}
        </select>

        {/* Username */}
        <label>User Name</label>
        <select value={username} onChange={(e) => setUsername(e.target.value)}>
          <option value="">-- Select Username --</option>
          {userOptions.map(user => (
            <option key={`${user._id}-u`} value={user.username}>
              {user.username}
            </option>
          ))}
        </select>

        {/* Suite (only when converting Admin -> User) */}
        {userType === 'User' && (
          <>
            <label>Automation Suite</label>
            <select
              value={automationSuite}
              onChange={(e) => setAutomationSuite(e.target.value)}
            >
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
          <button type="submit" className="btn green">Modify</button>
          <button type="button" className="btn blue" onClick={handleClear}>Clear</button>
        </div>
      </form>
    </div>
  );
}

export default ModifyUser;
