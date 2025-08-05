import React, { useState, useMemo } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import './Navbar.css';

function getUserRole() {
  const token = localStorage.getItem('token');
  if (!token) return null;
  try {
    const payload = JSON.parse(atob(token.split('.')[1]));
    return payload.role || null;
  } catch {
    return null;
  }
}

function Navbar() {
  const navigate = useNavigate();
  const role = useMemo(() => getUserRole(), []);
  const isAdmin = role === 'admin';

  const [showAutomationCatalog, setShowAutomationCatalog] = useState(false);
  const [showAdminMenu, setShowAdminMenu] = useState(false);
  const [showUserMenu, setShowUserMenu] = useState(false);
  const [showMobileMenu, setShowMobileMenu] = useState(false);

  const handleLogout = () => {
    localStorage.removeItem('token');
    navigate('/');
  };

  const closeAll = () => {
    setShowAdminMenu(false);
    setShowUserMenu(false);
    setShowAutomationCatalog(false);
    setShowMobileMenu(false);
  };

  const toggleAdminMenu = () => {
    setShowAdminMenu(prev => !prev);
    setShowAutomationCatalog(false);
    setShowUserMenu(false);
  };

  const toggleAutomationMenu = () => {
    setShowAutomationCatalog(prev => !prev);
    setShowAdminMenu(false);
    setShowUserMenu(false);
  };

  return (
    <nav className="navbar">
      <div className="navbar-logo">test<span>Nexus</span></div>

      <button className="navbar-toggle" onClick={() => setShowMobileMenu(!showMobileMenu)}>☰</button>

      <div className={`navbar-links ${showMobileMenu ? 'active' : ''}`}>
        {isAdmin && (
          <div className="dropdown">
            <span className="dropdown-toggle" onClick={toggleAdminMenu}>Admin Portal ▾</span>
            {showAdminMenu && (
              <div className="dropdown-menu">
                <div className="dropdown-subtoggle" onClick={() => setShowUserMenu(prev => !prev)}>User Management ▾</div>
                {showUserMenu && (
                  <div className="sub-dropdown-menu vertical">
                    <Link to="/activate-user" onClick={closeAll}>Activate User</Link>
                    <Link to="/deactivate-user" onClick={closeAll}>Deactivate User</Link>
                    <Link to="/modify-user" onClick={closeAll}>Modify User</Link>
                  </div>
                )}
                <Link to="/script-management" onClick={closeAll}>Script Management</Link>
                <Link to="/allocation" onClick={closeAll}>Allocation</Link>
              </div>
            )}
          </div>
        )}

        <div className="dropdown">
          <span className="dropdown-toggle" onClick={toggleAutomationMenu}>Automation Catalog ▾</span>
          {showAutomationCatalog && (
            <div className="dropdown-menu">
              <Link to="/create-request" onClick={closeAll}>Create Request</Link>
              <Link to="/dashboard-user" onClick={closeAll}>Dashboard</Link>
              <Link to="/suite-management" onClick={closeAll}>Suite Management</Link>
            </div>
          )}
        </div>

        <Link to="/about" onClick={closeAll}>About Us</Link>

        {/* mobile view user details */}
        <div className="navbar-user-mobile">
          <span>Om Korde</span>
          <button onClick={handleLogout}>Logout</button>
        </div>
      </div>

      {/* desktop user */}
      <div className="navbar-right">
        <span className="navbar-user">Om Korde</span>
        <button onClick={handleLogout}>Logout</button>
      </div>
    </nav>
  );
}

export default Navbar;
