import { BrowserRouter, Routes, Route,Navigate } from 'react-router-dom';
import { AuthProvider } from './contexts/AuthContext';
import { ToastProvider } from './contexts/ToastContext';
import React, { useState, useEffect } from 'react';
import Home from './pages/Home';
import Login from './pages/Login';
import Register from './pages/Register';
import AdminDashboard from './pages/AdminDashboard';
import Layout from './components/Layout';
import LearningHub from './pages/LearningHub';
import LandingPage from './pages/LandingPage';
import Dashboard from './pages/Dashboard';
import ProtectedRoute from './components/ProtectedRoute'
import About from './pages/About';
import ResetPassword from './pages/ResetPassword';
// import ContactPage from './pages/ContactPage';

const API_URL = "http://127.0.0.1:8000/records/";

function App() {
    return (
        <BrowserRouter>
            <ToastProvider> 
                <AuthProvider>
                    <Routes>
                        {/* Public Routes  */}
                        <Route path="/" element={<Layout />}>
                            <Route index element={<Home />} />
                            <Route path="login" element={<Login />} />
                            <Route path="register" element={<Register />} />
                            <Route path="learning" element={<LearningHub />} />
                            <Route path="landingpage" element={<LandingPage />} />
                            <Route path="forgot-password" element={<ResetPassword />} />
                            {/* <Route path="dashboard" element={<Dashboard />} /> */}
                            <Route path="about" element={<About />} />
                            {/* <Route path="contact" element={<ContactPage />} /> */}
                        </Route>

                        {/* Protected Routes  */}
                        <Route path="/dashboard" element={
                            <ProtectedRoute>
                                <Dashboard />
                            </ProtectedRoute>
                        } />

                        <Route path="/admin" element={
                            <ProtectedRoute>
                                <AdminDashboard />
                            </ProtectedRoute>
                        } />

                        {/* Default Route */}
                        <Route path="*" element={<Navigate to="/login" />} />   {/* ← NEW: Catch-all redirect */}
                    </Routes>
                </AuthProvider>
            </ToastProvider>
        </BrowserRouter>
    );
}

export default App;