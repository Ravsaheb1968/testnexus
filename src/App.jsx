import React from 'react';
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
  useLocation,
} from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import Login from './pages/LoginPage';
import Signup from './pages/Signup';
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

import AdminRoute from './components/AdminRoute';
import PrivateRoute from './components/PrivateRoute'; // ✅ Import here

function AppContent() {
  const isAuthenticated = !!localStorage.getItem('token');
  const location = useLocation();

  return (
    <>
      {isAuthenticated && location.pathname !== '/' && <Navbar />}

      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/signup" element={<Signup />} />

        {/* Admin-only protected routes */}
        <Route
          path="/activate-user"
          element={
            <PrivateRoute>
              <AdminRoute>
                <Layout>
                  <ActivateUser />
                </Layout>
              </AdminRoute>
            </PrivateRoute>
          }
        />
        <Route
          path="/deactivate-user"
          element={
            <PrivateRoute>
              <AdminRoute>
                <Layout>
                  <DeactivateUser />
                </Layout>
              </AdminRoute>
            </PrivateRoute>
          }
        />
        <Route
          path="/modify-user"
          element={
            <PrivateRoute>
              <AdminRoute>
                <Layout>
                  <ModifyUser />
                </Layout>
              </AdminRoute>
            </PrivateRoute>
          }
        />
        <Route
          path="/script-management"
          element={
            <PrivateRoute>
              <AdminRoute>
                <Layout>
                  <ScriptManagement />
                </Layout>
              </AdminRoute>
            </PrivateRoute>
          }
        />
        <Route
          path="/allocation"
          element={
            <PrivateRoute>
              <AdminRoute>
                <Layout>
                  <MachineAllocation />
                </Layout>
              </AdminRoute>
            </PrivateRoute>
          }
        />

        {/* User-protected routes */}
        <Route
          path="/dashboard-user"
          element={
            <PrivateRoute>
              <Layout>
                <Dashboard />
              </Layout>
            </PrivateRoute>
          }
        />
        <Route
          path="/create-request"
          element={
            <PrivateRoute>
              <Layout>
                <CreateRequest />
              </Layout>
            </PrivateRoute>
          }
        />
        <Route
          path="/suite-management"
          element={
            <PrivateRoute>
              <Layout>
                <SuiteManagement />
              </Layout>
            </PrivateRoute>
          }
        />
        <Route
          path="/about"
          element={
            <PrivateRoute>
              <Layout>
                <About />
              </Layout>
            </PrivateRoute>
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

      <ToastContainer position="top-center" autoClose={3000} />
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
