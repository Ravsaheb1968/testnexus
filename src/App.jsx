import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate, useLocation } from 'react-router-dom';
import Login from './pages/LoginPage';
import ActivateUser from './pages/ActivateUser';
import DeactivateUser from './pages/DeactivateUser';
import ModifyUser from './pages/ModifyUser';
import Navbar from './components/Navbar';
import ScriptManagement from './pages/ScriptManagement';
import MachineAllocation from './pages/MachineAllocation';
import Layout from './components/Layout';
import CreateRequest from './pages/CreateRequest';
import Dashboard from './pages/Dashboard';
function AppContent() {
  const isAuthenticated = localStorage.getItem('token');
  const location = useLocation();

  return (
    <>
      {isAuthenticated && location.pathname !== '/' && <Navbar />}
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/activate-user" element={isAuthenticated ? <Layout> <ActivateUser /></Layout> : <Navigate to="/" />} />
        <Route path="/deactivate-user" element={isAuthenticated ? <Layout><DeactivateUser /></Layout> : <Navigate to="/" />} />
        <Route path="/dashboard-user" element={isAuthenticated ? <Layout><Dashboard /></Layout> : <Navigate to="/" />} />
        <Route path="/create-request" element={isAuthenticated ? <Layout><CreateRequest /></Layout> : <Navigate to="/" />} />
        <Route path="/modify-user" element={isAuthenticated ? <Layout><ModifyUser /></Layout> : <Navigate to="/" />} />
        <Route path="/script-management" element={<Layout><ScriptManagement /></Layout>} />
        <Route path="/allocation" element={<Layout><MachineAllocation /></Layout>} />
      </Routes>
    </>
  );
}

function App() {
  return (
    <Router>
      <AppContent />
    </Router>
  );
}

export default App;