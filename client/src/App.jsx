import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { AuthProvider } from './contexts/AuthContext';
import { ToastProvider } from './contexts/ToastContext';
import { SettingsProvider } from './contexts/SettingsContext';
import React, { useState, useEffect } from 'react';
import Home from './pages/Home';
import Login from './pages/Login';
import Register from './pages/Register';
import Layout from './components/Layout';
import LearningHub from './pages/EV';
import LandingPage from './pages/LandingPage';
import About from './pages/About';
import ContactPage from './pages/ContactPage';
import BatteryTypes from './pages/BatteryTypes';
import Charging from './pages/Charging';  // ← NEW: Import Charging page
// ─── Protected Pages ────────────────────
import Dashboard from './pages/Dashboard';
import Predictions from './pages/Predictions';
import Profile from './pages/ProfilePage';
import Reports from './pages/Reports';
import FindStations from './pages/FindStations';
import PublicCharging from './pages/PublicCharging';
import Homecharging from './pages/Homecharging';
import Battery from './pages/Battery';
import Batterylife from './pages/Batterylife';
import EVArchitecture from './pages/EVArchitecture';
import InsideBattery from './pages/InsideBattery';
import Batterysafety from './pages/Batterysafety';
import RepairandMaintenance from './pages/RepairandMaintenance';
import EV from './pages/EV';
import EVMaintenanceGuide from './pages/EVMaintenanceGuide';
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
                                <Route path="ev" element={<EV/>} />
                                <Route path="landingpage" element={<LandingPage />} />
                                <Route path="forgot-password" element={<ResetPassword />} />
                                <Route path="about" element={<About />} />
                                <Route path="battery-types" element={<BatteryTypes />} />
                                <Route path="contact" element={<ContactPage />} />
                            </Route>

                            {/* Protected Routes (login required) */}

                            <Route path="/battery" element={
                                <ProtectedRoute>
                                    <Battery />
                                </ProtectedRoute>
                            } />

                            <Route path="/battery-life" element={
                                <ProtectedRoute>
                                    <Batterylife />
                                </ProtectedRoute>
                            } />

                            <Route path="/battery-safety" element={
                                <ProtectedRoute>
                                    <Batterysafety />
                                </ProtectedRoute>
                            } />

                            <Route path="/ev-architecture" element={
                                <ProtectedRoute>
                                    <EVArchitecture />
                                </ProtectedRoute>
                            } />

                            <Route path="/inside-battery" element={
                                <ProtectedRoute>
                                    <InsideBattery />
                                </ProtectedRoute>
                            } />

                            <Route path="/repair-and-maintenance" element={
                                <ProtectedRoute>
                                    <RepairandMaintenance />
                                </ProtectedRoute>
                            } />

                            <Route path="charging" element={
                                <ProtectedRoute>
                                <Charging />
                                </ProtectedRoute>
                            } /> 

                            <Route path="/homecharging" element={
                                <ProtectedRoute>
                                    <Homecharging />
                                </ProtectedRoute>
                            }/>
                            <Route path="/publiccharging" element={
                                <ProtectedRoute>
                                    <PublicCharging />
                                </ProtectedRoute>
                            } />

                            <Route path="/find-station" element={
                                <ProtectedRoute>
                                    <FindStations/>
                                </ProtectedRoute>
                            } />

                            <Route path="/ev-maintenance-guide" element={
                                <ProtectedRoute>
                                    <EVMaintenanceGuide />
                                </ProtectedRoute>
                            } />

                        
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