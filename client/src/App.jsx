import React, { Suspense, lazy } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';

// Context Providers
import { AuthProvider } from './contexts/AuthContext';
import { SocketProvider } from './contexts/SocketContext';
import { ToastProvider } from './contexts/ToastContext';
import { ThemeProvider } from './contexts/ThemeContext';
import { SettingsProvider } from './contexts/SettingsContext';
import { GroupSessionProvider } from './contexts/GroupSessionContext';

// Components & Layouts
import Layout from './components/Layout';

const LoadingSpinner = () => (
    <div className="flex items-center justify-center h-screen bg-luxury-950 text-gold-400">
        Loading...
    </div>
);

const Home = lazy(() => import('./pages/Home'));
const Login = lazy(() => import('./pages/Login'));
const Register = lazy(() => import('./pages/Register'));
const ProfilePage = lazy(() => import('./pages/ProfilePage'));
const ContactPage = lazy(() => import('./pages/ContactPage'));
const AdminDashboard = lazy(() => import('./pages/Admin/AdminDashboard'));
const AdminOverview = lazy(() => import('./pages/Admin/AdminOverview'));
const AdminUsers = lazy(() => import('./pages/Admin/AdminUsers'));
const NotFoundPage = lazy(() => import('./pages/NotFoundPage'));

function App() {
    return (
        <BrowserRouter future={{ v7_startTransition: true, v7_relativeSplatPath: true }}>
            <AuthProvider>
                <SocketProvider>
                    <ToastProvider>
                        <ThemeProvider>
                            <SettingsProvider>
                                <GroupSessionProvider>
                                    <Suspense fallback={<LoadingSpinner />}>
                                        <Routes>
                                            {/* Public Layout */}
                                            <Route path="/" element={<Layout />}>
                                                <Route index element={<Home />} />
                                                <Route path="login" element={<Login />} />
                                                <Route path="register" element={<Register />} />
                                                <Route path="profile" element={<ProfilePage />} />
                                                <Route path="contact" element={<ContactPage />} />
                                            </Route>

                                            {/* Admin Layout */}
                                            <Route path="/admin" element={<AdminDashboard />}>
                                                <Route index element={<AdminOverview />} />
                                                <Route path="users" element={<AdminUsers />} />
                                            </Route>

                                            {/* 404 Page */}
                                            <Route path="*" element={<NotFoundPage />} />
                                        </Routes>
                                    </Suspense>
                                </GroupSessionProvider>
                            </SettingsProvider>
                        </ThemeProvider>
                    </ToastProvider>
                </SocketProvider>
            </AuthProvider>
        </BrowserRouter>
    );
}

export default App;