import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { AuthProvider } from './contexts/AuthContext';
import { ToastProvider } from './contexts/ToastContext';
import { SettingsProvider } from './contexts/SettingsContext';
import React, { useState, useEffect } from 'react';
import Home from './pages/Home';
import Login from './pages/Login';
import Register from './pages/Register';
import Layout from './components/Layout';
import LearningHub from './pages/LearningHub';
import LandingPage from './pages/LandingPage';
import About from './pages/About';
import ContactPage from './pages/ContactPage';
import BatteryTypes from './pages/BatteryTypes';

// ─── Protected Pages ────────────────────
import Dashboard from './pages/Dashboard';
import Predictions from './pages/Predictions';
import Profile from './pages/ProfilePage';
import Reports from './pages/Reports';

// ─── Admin Pages ────────────────────────
import AdminDashboard from './pages/admin/AdminDashboard';

// ─── Engineer Pages ─────────────────────
import EngineerDashboard from './pages/Engineer/EngineerDashboard';


// ─── Route Guard ────────────────────────
import ProtectedRoute from './components/ProtectedRoute'
import ResetPassword from './pages/ResetPassword';
// import ContactPage from './pages/ContactPage';

const API_URL = "http://127.0.0.1:8000/records/";

function App() {
    return (
        <BrowserRouter>
            <ToastProvider>
                <AuthProvider>
                    <SettingsProvider>
                        <Routes>
                            {/* Public Routes (no login needed) */}
                            <Route path="/" element={<Layout />}>
                                <Route index element={<Home />} />
                                <Route path="login" element={<Login />} />
                                <Route path="register" element={<Register />} />
                                <Route path="learning" element={<LearningHub />} />
                                <Route path="landingpage" element={<LandingPage />} />
                                <Route path="forgot-password" element={<ResetPassword />} />
                                <Route path="about" element={<About />} />
                                <Route path="battery-types" element={<BatteryTypes />} />
                                <Route path="contact" element={<ContactPage />} />
                            </Route>

                            {/* Protected Routes (login required) */}
                            <Route path="/dashboard" element={
                                <ProtectedRoute>
                                    <Dashboard />
                                </ProtectedRoute>
                            } />

                            {/* Profile Route (profile only) */}
                            <Route path="/profile" element={
                                <ProtectedRoute>
                                    <Profile />
                                </ProtectedRoute>
                            } />

                            {/* Predictions page */}
                            <Route path="/predictions" element={
                                <ProtectedRoute>
                                    <Predictions />
                                </ProtectedRoute>
                            } />

                            {/* Reports page */}
                            <Route path="/reports" element={
                                <ProtectedRoute>
                                    <Reports />
                                </ProtectedRoute>
                            } />


                            {/* ENGINEER ROUTES (engineer only) */}
                            <Route path="/engineer/dashboard" element={
                                <ProtectedRoute allowedRoles={['engineer', 'admin']}>
                                    <EngineerDashboard />
                                </ProtectedRoute>
                            } />

                            {/* ADMIN ROUTES (admin only) */}

                            {/* added import + allowedRoles */}
                            <Route path="/admin/dashboard" element={
                                <ProtectedRoute allowedRoles={['admin']}>
                                    <AdminDashboard />
                                </ProtectedRoute>
                            } />

                            {/* CATCH ALL — redirect to login */}
                            <Route path="*" element={<Navigate to="/login" />} />   {/* ← NEW: Catch-all redirect */}
                        </Routes>
                    </SettingsProvider>
                </AuthProvider>
            </ToastProvider>
        </BrowserRouter>
    );
}

export default App;