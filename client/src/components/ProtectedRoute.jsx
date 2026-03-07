import React from 'react';
import { Navigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext'; 

const ProtectedRoute = ({ children }) => {
  // const { currentUser } = useAuth();  


  // if (!currentUser) {
  //   return <Navigate to="/login" />;        
  // }

  // return children; 
  
  const { user, loading } = useAuth();
    const location = useLocation();

    if (loading) {
        return <div className="min-h-screen bg-[#030712] flex items-center justify-center text-white">Loading...</div>;
    }

    if (!user) {
        return <Navigate to="/login" state={{ from: location }} replace />;
    }

    return children;
};

export default ProtectedRoute;