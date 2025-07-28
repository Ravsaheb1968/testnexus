import React from 'react';
import Navbar from './Navbar';
import './Layout.css';

const Layout = ({ children }) => {
  return (
    <div className="app-background">
      <Navbar />
      <main className="content-container">{children}</main>
    </div>
  );
};

export default Layout;
