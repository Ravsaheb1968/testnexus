import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import './Navbar.css';

function Navbar() {
  const navigate = useNavigate();

  const [showAdminMenu, setShowAdminMenu] = useState(false);
  const [showUserMenu, setShowUserMenu] = useState(false);
  const [showMobileMenu, setShowMobileMenu] = useState(false);

  const handleLogout = () => {
    localStorage.removeItem('token');
    navigate('/');
  };

  const handleLinkClick = () => {
    setShowAdminMenu(false);
    setShowUserMenu(false);
    setShowMobileMenu(false);
  };

  const toggleAdminMenu = () => {
    setShowAdminMenu((prev) => !prev);
    setShowUserMenu(false);
  };

  const toggleUserMenu = () => {
    setShowUserMenu((prev) => !prev);
  };

  return (
    <nav className="navbar">
      <div className="navbar-logo">test<span>Nexus</span></div>

      <button className="navbar-menu-toggle" onClick={() => setShowMobileMenu((prev) => !prev)}>
        ☰
      </button>

      <div className={`navbar-links ${showMobileMenu ? 'active' : ''}`}>
        <div className="dropdown">
          <span className="dropdown-toggle" onClick={toggleAdminMenu}>
            Admin Portal ▾
          </span>
          {showAdminMenu && (
            <div className="dropdown-menu">
              <span className="dropdown-subtoggle" onClick={toggleUserMenu}>
                User Management ▸
              </span>
              {showUserMenu && (
                <div className="sub-dropdown-menu">
                  <Link to="/activate-user" onClick={handleLinkClick}>Activate User</Link>
                  <Link to="/deactivate-user" onClick={handleLinkClick}>Deactivate User</Link>
                  <Link to="/modify-user" onClick={handleLinkClick}>Modify User</Link>
                </div>
              )}
              <Link to="/script-management" onClick={handleLinkClick}>Script Management</Link>
              <Link to="/allocation" onClick={handleLinkClick}>Allocation</Link>
            </div>
          )}
        </div>

        <Link to="#" onClick={handleLinkClick}>Automation Catalog</Link>
        <Link to="#" onClick={handleLinkClick}>About Us</Link>

        <div className="navbar-mobile-user">
          <span className="navbar-user">Om Korde</span>
          <button onClick={handleLogout}>Logout</button>
        </div>
      </div>

      <div className="navbar-right desktop-only">
        <span className="navbar-user">Om Korde</span>
        <button onClick={handleLogout}>Logout</button>
      </div>
    </nav>
  );
}

export default Navbar;
