import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

const SuperAdminProtectedRoute = ({ children }) => {
  const navigate = useNavigate();
  const token = localStorage.getItem('restaurantmanagementsoftwaresuperadmin');

  useEffect(() => {
    if (!token) {
      navigate('/super-admin/login', { replace: true });
    }
  }, [token, navigate]);

  if (!token) {
    return null; // Or a loading spinner
  }

  return children;
};

export default SuperAdminProtectedRoute;
