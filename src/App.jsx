import React from 'react';
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
  useLocation,
} from 'react-router-dom';

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
import About from './pages/About';
import SuiteManagement from './pages/SuiteManagement';
import AdminRoute from './components/AdminRoute'; // make sure this exists

function AppContent() {
  const isAuthenticated = !!localStorage.getItem('token');
  const location = useLocation();

  return (
    <>
      {isAuthenticated && location.pathname !== '/' && <Navbar />}
      <Routes>
        <Route path="/" element={<Login />} />

        {/* Admin-only routes */}
        <Route
          path="/activate-user"
          element={
            isAuthenticated ? (
              <AdminRoute>
                <Layout>
                  <ActivateUser />
                </Layout>
              </AdminRoute>
            ) : (
              <Navigate to="/" replace />
            )
          }
        />
        <Route
          path="/deactivate-user"
          element={
            isAuthenticated ? (
              <AdminRoute>
                <Layout>
                  <DeactivateUser />
                </Layout>
              </AdminRoute>
            ) : (
              <Navigate to="/" replace />
            )
          }
        />
        <Route
          path="/modify-user"
          element={
            isAuthenticated ? (
              <AdminRoute>
                <Layout>
                  <ModifyUser />
                </Layout>
              </AdminRoute>
            ) : (
              <Navigate to="/" replace />
            )
          }
        />
        <Route
          path="/script-management"
          element={
            isAuthenticated ? (
              <AdminRoute>
                <Layout>
                  <ScriptManagement />
                </Layout>
              </AdminRoute>
            ) : (
              <Navigate to="/" replace />
            )
          }
        />
        <Route
          path="/allocation"
          element={
            isAuthenticated ? (
              <AdminRoute>
                <Layout>
                  <MachineAllocation />
                </Layout>
              </AdminRoute>
            ) : (
              <Navigate to="/" replace />
            )
          }
        />

        {/* Authenticated non-admin routes */}
        <Route
          path="/dashboard-user"
          element={
            isAuthenticated ? (
              <Layout>
                <Dashboard />
              </Layout>
            ) : (
              <Navigate to="/" replace />
            )
          }
        />
        <Route
          path="/create-request"
          element={
            isAuthenticated ? (
              <Layout>
                <CreateRequest />
              </Layout>
            ) : (
              <Navigate to="/" replace />
            )
          }
        />
        <Route
          path="/suite-management"
          element={
            isAuthenticated ? (
              <Layout>
                <SuiteManagement />
              </Layout>
            ) : (
              <Navigate to="/" replace />
            )
          }
        />
        <Route
          path="/about"
          element={
            isAuthenticated ? (
              <Layout>
                <About />
              </Layout>
            ) : (
              <Navigate to="/" replace />
            )
          }
        />

        {/* Fallback */}
        <Route
          path="*"
          element={
            isAuthenticated ? <Navigate to="/dashboard-user" replace /> : <Navigate to="/" replace />
          }
        />
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
