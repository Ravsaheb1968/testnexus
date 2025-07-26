import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Login from './pages/Login';
import Navbar from './components/Navbar';
import ActivateUser from './pages/ActivateUser';

const isAuthenticated = true; // Replace with your actual auth logic

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route
          path="/activate-user"
          element={
            isAuthenticated
              ? (
                <>
                  <Navbar />
                  <ActivateUser />
                </>
              )
              : <Navigate to="/" />
          }
        />
      </Routes>
    </Router>
  );
}

export default App;