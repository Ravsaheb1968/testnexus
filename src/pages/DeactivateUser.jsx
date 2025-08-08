import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { toast } from 'react-toastify';
import './ActivateUser.css'; // Reusing styles

function DeactivateUser() {
  const [email, setEmail] = useState('');
  const [userOptions, setUserOptions] = useState([]);

  // Fetch all registered users (active or not)
  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const res = await axios.get('/api/admin/users');
        setUserOptions(res.data); // Now includes isActive field
      } catch (err) {
        toast.error('Failed to fetch users');
        console.error(err);
      }
    };

    fetchUsers();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!email) {
      toast.warn('Please select a user');
      return;
    }

    try {
      const res = await axios.post('/api/admin/deactivate-user', { email });
      toast.success(res.data.msg || 'User deactivated');
      setEmail('');
    } catch (err) {
      toast.error(err.response?.data?.msg || 'Failed to deactivate');
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
              {user.email} {user.isActive ? '' : '(Inactive)'}
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

