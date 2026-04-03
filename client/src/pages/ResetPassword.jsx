import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useToast } from '../contexts/ToastContext';
import { Lock, Eye, EyeOff, Mail } from "lucide-react";
import { FaTwitter, FaFacebook } from "react-icons/fa";
import axios from "axios";

const ResetPassword = () => {
    const [email, setEmail] = useState('');
    const [newPassword, setNewPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    
    // ── UI states ──
    const [showPassword, setShowPassword] = useState(false);
    const [loading, setLoading] = useState(false);
    const [step, setStep] = useState(1); // 1 = email, 2 = new password

    const { addToast } = useToast();
    const navigate = useNavigate();

    const API_URL = import.meta.env.VITE_API_URL || 'http://127.0.0.1:8000';

    // ── Handle Step 1: Send reset email ──
    const handleSendEmail = async (e) => {
        e.preventDefault();
        setLoading(true);
        try {
            await axios.post(
                `${API_URL}/api/auth/forgot-password`,
                { email: email }
            );
            addToast("User verified! Enter your new password.", "success");
            setStep(2); 
        } catch (err) {
            // FastAPI detail එක object එකක් නම් එය string එකක් බවට පත් කිරීම
            const errorData = err.response?.data?.detail;
            const message = typeof errorData === 'string' ? errorData : "Failed to find user.";
            addToast(message, "error");
        } finally {
            setLoading(false);
        }
    };

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
            // වැදගත්: මෙහි field names ඔබේ FastAPI Schema එකේ (Pydantic model) නම් වලට සමාන විය යුතුය.
            // බොහෝ විට FastAPI වල reset-password සඳහා බලාපොරොත්තු වන්නේ email සහ password/new_password ය.
            await axios.post(
                `${API_URL}/api/auth/reset-password`,
                { 
                    email: email, 
                    new_password: newPassword 
                }
            );
            addToast("Password reset successful! Please login.", "success");
            navigate("/login");
        } catch (err) {
            const errorData = err.response?.data?.detail;
            // Error එක object එකක් නම් පැහැදිලිව පෙන්වීමට:
            const message = typeof errorData === 'string' 
                ? errorData 
                : "Reset failed. Please check your details.";
            
            addToast(message, "error");
            console.error("Full Error:", err.response?.data);
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="min-h-screen w-full bg-gradient-to-br from-[#050b18] via-[#071b2f] to-[#020617] text-white flex flex-col items-center justify-center relative overflow-hidden">
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(0,255,255,0.08),transparent_70%)]" />

            <div className="mt-10 relative z-10 w-full max-w-md px-6">
                <h1 className="text-4xl font-semibold text-center mb-2 tracking-wide">
                    <span className="text-white">Volt</span>
                    <span className="bg-gradient-to-r from-cyan-400 to-green-400 bg-clip-text text-transparent">
                        IQ
                    </span>
                </h1>

                <h2 className="text-2xl font-semibold text-center mt-6">
                    Reset Password
                </h2>
                <p className="text-center text-gray-400 mt-2 text-sm">
                    {step === 1
                        ? "Enter your email to verify your account."
                        : "Enter your new password below."}
                </p>

                {step === 1 && (
                    <form onSubmit={handleSendEmail} className="space-y-6">
                        <div className="mt-8 bg-white/5 backdrop-blur-xl p-6 rounded-2xl border border-white/10 shadow-xl">
                            <div className="relative mb-4">
                                <Mail className="absolute left-3 top-3 text-gray-400" size={18} />
                                <input
                                    type="email"
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)}
                                    className="w-full pl-10 pr-4 py-3 bg-transparent border border-white/20 rounded-xl focus:outline-none focus:ring-2 focus:ring-cyan-400 text-white placeholder-gray-400"
                                    placeholder="Your email address"
                                    required
                                />
                            </div>
                            <button
                                type="submit"
                                disabled={loading}
                                className="w-full py-3 rounded-xl font-semibold text-lg bg-gradient-to-r from-cyan-400 to-green-400 text-black hover:opacity-90 transition duration-300 shadow-lg shadow-cyan-500/20 disabled:opacity-60"
                            >
                                {loading ? "Checking..." : "Verify Email"}
                            </button>
                        </div>
                    </form>
                )}

                {step === 2 && (
                    <form onSubmit={handleResetPassword} className="space-y-6">
                        <div className="mt-8 bg-white/5 backdrop-blur-xl p-6 rounded-2xl border border-white/10 shadow-xl">
                            <div className="relative mb-4">
                                <Lock className="absolute left-3 top-3 text-gray-400" size={18} />
                                <input
                                    type={showPassword ? "text" : "password"}
                                    value={newPassword}
                                    onChange={(e) => setNewPassword(e.target.value)}
                                    className="w-full pl-10 pr-10 py-3 bg-transparent border border-white/20 rounded-xl focus:outline-none focus:ring-2 focus:ring-cyan-400 text-white placeholder-gray-400"
                                    placeholder="New Password"
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
                            <div className="relative mb-6">
                                <Lock className="absolute left-3 top-3 text-gray-400" size={18} />
                                <input
                                    type={showPassword ? "text" : "password"}
                                    value={confirmPassword}
                                    onChange={(e) => setConfirmPassword(e.target.value)}
                                    className="w-full pl-10 pr-10 py-3 bg-transparent border border-white/20 rounded-xl focus:outline-none focus:ring-2 focus:ring-cyan-400 text-white placeholder-gray-400"
                                    placeholder="Confirm New Password"
                                    required
                                />
                            </div>
                            <button
                                type="submit"
                                disabled={loading}
                                className="w-full py-3 rounded-xl font-semibold text-lg bg-gradient-to-r from-cyan-400 to-green-400 text-black hover:opacity-90 transition duration-300 shadow-lg shadow-cyan-500/20 disabled:opacity-60"
                            >
                                {loading ? "Resetting..." : "Reset Password"}
                            </button>
                        </div>
                    </form>
                )}

                <p className="text-center text-gray-400 mt-4 text-sm">
                    Back to {" "}
                    <Link to="/login" className="text-cyan-400 cursor-pointer hover:underline">
                        Sign In
                    </Link>
                </p>
            </div>

            <div className="mt-8 text-center relative z-10">
                <p className="text-gray-500 text-sm mb-4">Or sign up with</p>
                <div className="flex justify-center gap-6">
                    <div className="w-12 h-12 flex items-center justify-center rounded-full border border-white/20 bg-white/5 hover:bg-white/10 transition cursor-pointer">
                        <FaFacebook size={18} />
                    </div>
                    <div className="w-12 h-12 flex items-center justify-center rounded-full border border-white/20 bg-white/5 hover:bg-white/10 transition cursor-pointer">
                        <FaTwitter size={18} />
                    </div>
                    <div className="w-12 h-12 flex items-center justify-center rounded-full border border-white/20 bg-white/5 hover:bg-white/10 transition cursor-pointer">
                        G
                    </div>
                </div>
            </div>

            <p className="text-center text-gray-600 text-xs mt-10 relative z-10">
                © 2026 VoltIQ. All rights reserved.
            </p>
        </div>
    );
};

export default ResetPassword;