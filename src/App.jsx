import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate, useLocation } from 'react-router-dom';
import Login from './pages/LoginPage';
import ActivateUser from './pages/ActivateUser';
import DeactivateUser from './pages/DeactivateUser';
import ModifyUser from './pages/ModifyUser';
import Navbar from './components/Navbar';
import ScriptManagement from './pages/ScriptManagement';
import MachineAllocation from './pages/MachineAllocation';
function AppContent() {
  const isAuthenticated = localStorage.getItem('token');
  const location = useLocation();

  return (
    <>
      {isAuthenticated && location.pathname !== '/' && <Navbar />}
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/activate-user" element={isAuthenticated ? <ActivateUser /> : <Navigate to="/" />} />
        <Route path="/deactivate-user" element={isAuthenticated ? <DeactivateUser /> : <Navigate to="/" />} />
        <Route path="/modify-user" element={isAuthenticated ? <ModifyUser /> : <Navigate to="/" />} />
        <Route path="/script-management" element={<ScriptManagement />} />
        <Route path="/allocation" element={<MachineAllocation />} />
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