import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { toast } from 'react-toastify';
import './ActivateUser.css'; // Reusing styles

function DeactivateUser() {
  const [email, setEmail] = useState('');
  const [userOptions, setUserOptions] = useState([]);

  // Fetch only active users
  const fetchActiveUsers = async () => {
    try {
      const res = await axios.get('/api/admin/users?onlyActive=true');
      setUserOptions(Array.isArray(res.data) ? res.data : []);
    } catch (err) {
      toast.error('Failed to fetch users');
      console.error(err);
    }
  };

  useEffect(() => {
    fetchActiveUsers();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!email) {
      toast.warn('Please select a user');
      return;
    }

    try {
      // Hard delete: ensures they can't log in anymore
      const res = await axios.post('/api/admin/deactivate-user', { email, hard: true });
      toast.success(res.data.msg || 'User removed');

      setEmail('');
      await fetchActiveUsers(); // Refresh from backend
    } catch (err) {
      toast.error(err.response?.data?.msg || 'Failed to remove user');
      console.error(err);
    }
  };

  return (
    <div className="activate-user-container">
      <h2>Deactivate User</h2>
      <form className="activate-user-form" onSubmit={handleSubmit}>
        <label>Email ID</label>
        <select value={email} onChange={(e) => setEmail(e.target.value)}>
          <option value="">-- Select Email --</option>
          {userOptions.map(user => (
            <option key={user._id} value={user.email}>
              {user.email}
            </option>
          ))}
        </select>

        <div className="btn-group">
          <button type="submit" className="btn green">Deactivate</button>
        </div>
      </form>
    </div>
  );
}

export default DeactivateUser;
