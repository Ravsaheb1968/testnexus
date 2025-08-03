import React from 'react';
import { Navigate } from 'react-router-dom';

// helper to get role from JWT in localStorage
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

const AdminRoute = ({ children }) => {
  const role = getUserRole();
  if (role !== 'admin') {
    // redirect non-admins out
    return <Navigate to="/" replace />;
  }
  return children;
};

export default AdminRoute;
