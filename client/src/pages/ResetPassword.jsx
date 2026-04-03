import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useToast } from '../contexts/ToastContext';
import { Lock, Eye, EyeOff, Mail, ArrowLeft } from "lucide-react";
import axios from "axios";

const ResetPassword = () => {

    const [email,           setEmail]           = useState('');
    const [newPassword,     setNewPassword]     = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [showPassword,    setShowPassword]    = useState(false);
    const [loading,         setLoading]         = useState(false);
    const [step,            setStep]            = useState(1);

    const { addToast } = useToast();
    const navigate     = useNavigate();

    const API_URL = import.meta.env.VITE_API_URL || 'http://127.0.0.1:8000';

    // ── Step 1: Verify Email ──────────────────
    const handleSendEmail = async (e) => {
        e.preventDefault();
        setLoading(true);
        try {
            await axios.post(
                `${API_URL}/api/auth/forgot-password`,
                { email: email }
            );
            addToast("Email verified! Enter your new password.", "success");
            setStep(2);
        } catch (err) {
            const errorData = err.response?.data?.detail;
            const message   = typeof errorData === 'string'
                ? errorData
                : "No account found with this email.";
            addToast(message, "error");
        } finally {
            setLoading(false);
        }
    };

    // ── Step 2: Reset Password ────────────────
    const handleResetPassword = async (e) => {
        e.preventDefault();

        if (newPassword.length < 6) {
            addToast("Password must be at least 6 characters", "error");
            return;
        }

        if (newPassword !== confirmPassword) {
            addToast("Passwords do not match", "error");
            return;
        }

        setLoading(true);
        try {
            await axios.post(
                `${API_URL}/api/auth/reset-password`,
                {
                    email:        email,
                    new_password: newPassword
                }
            );
            addToast("Password reset successful! Please login.", "success");
            navigate("/login");
        } catch (err) {
            const errorData = err.response?.data?.detail;
            const message   = typeof errorData === 'string'
                ? errorData
                : "Reset failed. Please try again.";
            addToast(message, "error");
            console.error("Reset Error:", err.response?.data);
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="min-h-screen w-full bg-gradient-to-br from-[#050b18] via-[#071b2f] to-[#020617] text-white flex flex-col items-center justify-center relative overflow-hidden">

            {/* Background Glow */}
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(0,255,255,0.08),transparent_70%)]" />

            <div className="mt-10 relative z-10 w-full max-w-md px-6">

                {/* ── Logo ── */}
                <h1 className="text-4xl font-semibold text-center mb-2 tracking-wide">
                    <span className="text-white">Volt</span>
                    <span className="bg-gradient-to-r from-cyan-400 to-green-400 bg-clip-text text-transparent">
                        IQ
                    </span>
                </h1>

                {/* ── Title ── */}
                <h2 className="text-2xl font-semibold text-center mt-6">
                    Reset Password
                </h2>
                <p className="text-center text-gray-400 mt-2 text-sm">
                    {step === 1
                        ? "Enter your email to verify your account."
                        : "Enter your new password below."}
                </p>

                {/* ── Step Indicator ── */}
                <div className="flex items-center justify-center gap-3 mt-6">
                    <div className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-bold
                        ${step === 1
                            ? 'bg-cyan-400 text-black'
                            : 'bg-cyan-400/30 text-cyan-400'}`}>
                        1
                    </div>
                    <div className="w-12 h-0.5 bg-white/10">
                        <div className={`h-full transition-all duration-500
                            ${step === 2 ? 'bg-cyan-400 w-full' : 'w-0'}`}
                        />
                    </div>
                    <div className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-bold
                        ${step === 2
                            ? 'bg-cyan-400 text-black'
                            : 'bg-white/10 text-gray-500'}`}>
                        2
                    </div>
                </div>

                {/* ── STEP 1: Email Form ── */}
                {step === 1 && (
                    <form onSubmit={handleSendEmail} className="space-y-6">
                        <div className="mt-8 bg-white/5 backdrop-blur-xl p-6 rounded-2xl border border-white/10 shadow-xl">

                            <label className="text-gray-400 text-sm block mb-2">
                                Email Address
                            </label>

                            {/* Email Input */}
                            <div className="relative mb-4">
                                <Mail
                                    className="absolute left-3 top-3 text-gray-400"
                                    size={18}
                                />
                                <input
                                    type="email"
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)}
                                    className="w-full pl-10 pr-4 py-3 bg-transparent border border-white/20 rounded-xl focus:outline-none focus:ring-2 focus:ring-cyan-400 text-white placeholder-gray-400"
                                    placeholder="your@email.com"
                                    required
                                />
                            </div>

                            {/* Verify Button */}
                            <button
                                type="submit"
                                disabled={loading}
                                className="w-full py-3 rounded-xl font-semibold text-lg bg-gradient-to-r from-cyan-400 to-green-400 text-black hover:opacity-90 transition duration-300 shadow-lg shadow-cyan-500/20 disabled:opacity-60 disabled:cursor-not-allowed"
                            >
                                {loading ? (
                                    <span className="flex items-center justify-center gap-2">
                                        <div className="w-4 h-4 border-2 border-black border-t-transparent rounded-full animate-spin" />
                                        Checking...
                                    </span>
                                ) : "Verify Email"}
                            </button>
                        </div>
                    </form>
                )}

                {/* ── STEP 2: New Password Form ── */}
                {step === 2 && (
                    <form onSubmit={handleResetPassword} className="space-y-6">
                        <div className="mt-8 bg-white/5 backdrop-blur-xl p-6 rounded-2xl border border-white/10 shadow-xl">

                            {/* ✅ Back button to go back to step 1 */}
                            <button
                                type="button"
                                onClick={() => setStep(1)}
                                className="flex items-center gap-2 text-gray-400 hover:text-cyan-400 transition text-sm mb-4"
                            >
                                <ArrowLeft size={16} /> Back
                            </button>

                            {/* New Password */}
                            <label className="text-gray-400 text-sm block mb-2">
                                New Password
                            </label>
                            <div className="relative mb-4">
                                <Lock
                                    className="absolute left-3 top-3 text-gray-400"
                                    size={18}
                                />
                                <input
                                    type={showPassword ? "text" : "password"}
                                    value={newPassword}
                                    onChange={(e) => setNewPassword(e.target.value)}
                                    className="w-full pl-10 pr-10 py-3 bg-transparent border border-white/20 rounded-xl focus:outline-none focus:ring-2 focus:ring-cyan-400 text-white placeholder-gray-400"
                                    placeholder="Min. 6 characters"
                                    required
                                />
                                <button
                                    type="button"
                                    onClick={() => setShowPassword(!showPassword)}
                                    className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 hover:text-cyan-300 transition"
                                >
                                    {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                                </button>
                            </div>

                            {/* Confirm Password */}
                            <label className="text-gray-400 text-sm block mb-2">
                                Confirm Password
                            </label>
                            <div className="relative mb-6">
                                <Lock
                                    className="absolute left-3 top-3 text-gray-400"
                                    size={18}
                                />
                                <input
                                    type={showPassword ? "text" : "password"}
                                    value={confirmPassword}
                                    onChange={(e) => setConfirmPassword(e.target.value)}
                                    className="w-full pl-10 pr-10 py-3 bg-transparent border border-white/20 rounded-xl focus:outline-none focus:ring-2 focus:ring-cyan-400 text-white placeholder-gray-400"
                                    placeholder="Repeat new password"
                                    required
                                />
                            </div>

                            {/* Reset Button */}
                            <button
                                type="submit"
                                disabled={loading}
                                className="w-full py-3 rounded-xl font-semibold text-lg bg-gradient-to-r from-cyan-400 to-green-400 text-black hover:opacity-90 transition duration-300 shadow-lg shadow-cyan-500/20 disabled:opacity-60 disabled:cursor-not-allowed"
                            >
                                {loading ? (
                                    <span className="flex items-center justify-center gap-2">
                                        <div className="w-4 h-4 border-2 border-black border-t-transparent rounded-full animate-spin" />
                                        Resetting...
                                    </span>
                                ) : "Reset Password"}
                            </button>
                        </div>
                    </form>
                )}

                {/* ── Back to Login ── */}
                <p className="text-center text-gray-400 mt-4 text-sm">
                    Remember your password?{" "}
                    <Link
                        to="/login"
                        className="text-cyan-400 cursor-pointer hover:underline"
                    >
                        Sign In
                    </Link>
                </p>

                {/* ── Footer ── */}
                <p className="text-center text-gray-600 text-xs mt-10">
                    © 2026 VoltIQ. All rights reserved.
                </p>

            </div>
        </div>
    );
};

export default ResetPassword;