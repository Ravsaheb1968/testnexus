import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import './Navbar.css';

function Navbar() {
  const navigate = useNavigate();
  const [showAdminMenu, setShowAdminMenu] = useState(false);

  const handleLogout = () => {
    localStorage.removeItem('token');
    navigate('/');
  };

  return (
    <nav className="navbar">
      <div className="navbar-left">
        <span className="navbar-logo">colt<span>CTAP</span></span>

        <div className="dropdown">
          <span className="dropdown-toggle" onClick={() => setShowAdminMenu(!showAdminMenu)}>
            Admin Portal ▾
          </span>
          {showAdminMenu && (
            <div className="dropdown-menu">
              <Link to="/user-management">User Management</Link>
              <Link to="/script-management">Script Management</Link>
              <Link to="/allocation">Allocation</Link>
            </div>
          )}
        </div>

        <Link to="#">Automation Catalog</Link>
        <Link to="#">About Us</Link>
      </div>

      <div className="navbar-right">
        <span className="navbar-user">Om Korde</span>
        <button onClick={handleLogout}>Logout</button>
      </div>
    </nav>
  );
}

export default Navbar;