import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useToast } from '../contexts/ToastContext';
import { User, Mail, Lock, Eye, EyeOff } from "lucide-react";
import { FaTwitter, FaFacebook } from "react-icons/fa";
import axios from "axios";

const Register = () => {
    const [name,            setName]            = useState('');
    const [email,           setEmail]           = useState('');
    const [password,        setPassword]        = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [showPassword,    setShowPassword]    = useState(false);
    const [loading,         setLoading]         = useState(false);

    // ✅ FIX 2: Removed unused { register } from useAuth
    // We don't need it because we call axios directly
    const { addToast } = useToast();
    const navigate     = useNavigate();

    // ✅ FIX 1: Use environment variable instead of hardcoded URL
    const API_URL = import.meta.env.VITE_API_URL || 'http://127.0.0.1:8000';

    const handleSubmit = async (e) => {
        e.preventDefault();

        // ── Validation ──────────────────────────
        if (password.length < 6) {
            addToast("Password must be at least 6 characters", "error");
            return;
        }

        if (password.length > 60) {
            addToast("Password too long (maximum 60 characters)", "error");
            return;
        }

        if (password !== confirmPassword) {
            addToast("Passwords do not match", "error");
            return;
        }

        // ── API Call ─────────────────────────────
        setLoading(true);
        try {
            // ✅ FIX 1: Uses API_URL variable — not hardcoded
            await axios.post(`${API_URL}/api/auth/register`, {
                name,
                email,
                password,
            });

            addToast("Registration Successful! Please login.", "success");
            navigate("/login");

        } catch (err) {
            const errorData = err.response?.data?.detail;
            const message   = typeof errorData === 'string'
                ? errorData
                : "Registration failed. Please try again.";
            addToast(message, "error");

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

                {/* ── Heading ── */}
                <h2 className="text-2xl font-semibold text-center mt-6">
                    Sign Up and Get Started
                </h2>
                <p className="text-center text-gray-400 mt-2 text-sm">
                    Gain real-time insights into your EV's battery health and performance.
                </p>

                {/* ── Form Card ── */}
                <form onSubmit={handleSubmit} className="space-y-6">
                    <div className="mt-8 bg-white/5 backdrop-blur-xl p-6 rounded-2xl border border-white/10 shadow-xl">

                        {/* Name */}
                        <div className="relative mb-4">
                            <User
                                className="absolute left-3 top-3 text-gray-400"
                                size={18}
                            />
                            <input
                                type="text"
                                value={name}
                                onChange={(e) => setName(e.target.value)}
                                className="w-full pl-10 pr-4 py-3 bg-transparent border border-white/20 rounded-xl focus:outline-none focus:ring-2 focus:ring-cyan-400 text-white placeholder-gray-400"
                                placeholder="Full Name"
                                required
                            />
                        </div>

                        {/* Email */}
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
                                placeholder="Email Address"
                                required
                            />
                        </div>

                        {/* Password */}
                        <div className="relative mb-4">
                            <Lock
                                className="absolute left-3 top-3 text-gray-400"
                                size={18}
                            />
                            <input
                                type={showPassword ? "text" : "password"}
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                className="w-full pl-10 pr-10 py-3 bg-transparent border border-white/20 rounded-xl focus:outline-none focus:ring-2 focus:ring-cyan-400 text-white placeholder-gray-400"
                                placeholder="Password (min. 6 characters)"
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
                                placeholder="Confirm Password"
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

                        {/* ── Submit Button ── */}
                        <button
                            type="submit"
                            disabled={loading}
                            className="w-full py-3 rounded-xl font-semibold text-lg bg-gradient-to-r from-cyan-400 to-green-400 text-black hover:opacity-90 transition duration-300 shadow-lg shadow-cyan-500/20 disabled:opacity-60 disabled:cursor-not-allowed"
                        >
                            {loading ? (
                                <span className="flex items-center justify-center gap-2">
                                    <div className="w-4 h-4 border-2 border-black border-t-transparent rounded-full animate-spin" />
                                    Registering...
                                </span>
                            ) : "Create Account"}
                        </button>
                    </div>
                </form>

                {/* ── Sign In Link ── */}
                <p className="text-center text-gray-400 mt-4 text-sm">
                    Already have an account?{" "}
                    <Link
                        to="/login"
                        className="text-cyan-400 cursor-pointer hover:underline"
                    >
                        Sign In
                    </Link>
                </p>

                {/* ── Social Login ── */}
                <div className="mt-8 text-center">
                    <p className="text-gray-500 text-sm mb-4">Or sign up with</p>
                    <div className="flex justify-center gap-6">
                        <button
                            type="button"
                            className="w-12 h-12 flex items-center justify-center rounded-full border border-white/20 bg-white/5 hover:bg-white/10 transition"
                        >
                            <FaFacebook size={18} />
                        </button>
                        <button
                            type="button"
                            className="w-12 h-12 flex items-center justify-center rounded-full border border-white/20 bg-white/5 hover:bg-white/10 transition"
                        >
                            <FaTwitter size={18} />
                        </button>
                        <button
                            type="button"
                            className="w-12 h-12 flex items-center justify-center rounded-full border border-white/20 bg-white/5 hover:bg-white/10 transition font-bold"
                        >
                            G
                        </button>
                    </div>
                </div>

                {/* ── Footer ── */}
                <p className="text-center text-gray-600 text-xs mt-10">
                    © 2026 VoltIQ. All rights reserved.
                </p>

            </div>
        </div>
    );
};

export default Register;