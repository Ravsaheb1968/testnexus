import React, { useState } from 'react';
import './ActivateUser.css';

function DeactivateUser() {
  const [email, setEmail] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    alert('User Deactivated');
  };

  const handleClear = () => {
    setEmail('');
  };

  return (
    <div className="activate-user-container">
      <h2>Deactivate User</h2>
      <form className="activate-user-form" onSubmit={handleSubmit}>
        <label>Email ID</label>
        <select value={email} onChange={(e) => setEmail(e.target.value)}>
          <option>--Select--</option>
          <option value="user1@example.com">user1@example.com</option>
        </select>

        <div className="btn-group">
          <button type="submit" className="btn green">Deactivate</button>
          <button type="button" className="btn blue" onClick={handleClear}>Clear</button>
        </div>
      </form>
    </div>
  );
}

export default DeactivateUser;