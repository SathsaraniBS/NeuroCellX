import React from "react";
import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import { useToast } from '../contexts/ToastContext';
import { User, Mail, Lock, Eye } from "lucide-react";
import { FaTwitter ,FaFacebook } from "react-icons/fa";
import axios from "axios";

const Register = () => {
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [loading, setLoading] = useState(false);

    const { register } = useAuth();
    const { addToast } = useToast();
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        // 1. Password length check (frontend)
        if (password.length > 60) {
            addToast("Password too long (maximum 60 characters)", "error");
            return;
        }

        // 2. Password match check
        if (password !== confirmPassword) {
            addToast("Passwords do not match", "error");
            return;
        }

        // 3. Loading start
        setLoading(true);
        
        try {
            const res = await axios.post("http://127.0.0.1:8000/api/auth/register", {
                name,
                email,
                password,
            });

            addToast("Registration Successful! Please login.", "success");
            navigate("/login"); 
        } catch (err) {
            const message = err.response?.data?.detail || "Registration failed. Please try again.";
            addToast(message, "error");
        } finally {
            setLoading(false); 
        }
    };

  return (
    <div className="min-h-screen w-full bg-gradient-to-br from-[#050b18] via-[#071b2f] to-[#020617] text-white flex flex-col items-center justify-center relative overflow-hidden">

      {/* Background Glow Effect */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(0,255,255,0.08),transparent_70%)]"></div>

      {/* Main Container */}
      <div className="mt-10 relative z-10 w-full max-w-md px-6">

        {/* Logo */}
        <h1 className="text-4xl font-semibold text-center mb-2 tracking-wide">
          <span className="text-white">Volt</span>
          <span className="bg-gradient-to-r from-cyan-400 to-green-400 bg-clip-text text-transparent">
            IQ
          </span>
        </h1>

        {/* Heading */}
        <h2 className="text-2xl font-semibold text-center mt-6">
          Sign Up and Get Started
        </h2>
        <p className="text-center text-gray-400 mt-2 text-sm">
          Gain real-time insights into your EV’s battery health and performance.
        </p>

        {/* Form Card */}
        <form onSubmit={handleSubmit} className="space-y-6">
        <div className="mt-8 bg-white/5 backdrop-blur-xl p-6 rounded-2xl border border-white/10 shadow-xl">

          {/* Name */}
          <div className="relative mb-4">
            <User className="absolute left-3 top-3 text-gray-400" size={18} />
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="w-full pl-10 pr-4 py-3 bg-transparent border border-white/20 rounded-xl focus:outline-none focus:ring-2 focus:ring-cyan-400 text-white placeholder-gray-400"
              placeholder="Name"
              required
            />
          </div>

          {/* Email */}
          <div className="relative mb-4">
            <Mail className="absolute left-3 top-3 text-gray-400" size={18} />
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full pl-10 pr-4 py-3 bg-transparent border border-white/20 rounded-xl focus:outline-none focus:ring-2 focus:ring-cyan-400 text-white placeholder-gray-400"
              placeholder="Email"
              required

            />
          </div>

          {/* Password */}
          <div className="relative mb-4">
            <Lock className="absolute left-3 top-3 text-gray-400" size={18} />
            <input
              type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              className="w-full pl-10 pr-4 py-3 bg-transparent border border-white/20 rounded-xl focus:outline-none focus:ring-2 focus:ring-cyan-400 text-white placeholder-gray-400"
              placeholder="Password"
              required
            />cd 
          </div>

          {/* Confirm Password */}
          <div className="relative mb-6">
            <Lock className="absolute left-3 top-3 text-gray-400" size={18} />
            <input
              type="password"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              className="w-full pl-10 pr-10 py-3 bg-transparent border border-white/20 rounded-xl focus:outline-none focus:ring-2 focus:ring-cyan-400 text-white placeholder-gray-400"
              placeholder="Confirm Password"
              required
            />
            <Eye className="absolute right-3 top-3 text-gray-400 cursor-pointer" size={18} />
          </div>

          {/* Create Account Button */}
          <button className="w-full py-3 rounded-xl font-semibold text-lg bg-gradient-to-r from-cyan-400 to-green-400 text-black hover:opacity-90 transition duration-300 shadow-lg shadow-cyan-500/20">
            Create Account
          </button>
          </div>
        </form>

          {/* Sign In Link */}
          <p className="text-center text-gray-400 mt-4 text-sm">
            Already have an account?{" "}
            <Link to="/login"
             className="text-cyan-400 cursor-pointer hover:underline">
              Sign In
            </Link>
          </p>
        </div>

        {/* Social Login */}
        <div className="mt-8 text-center">
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

        {/* Footer */}
        <p className="text-center text-gray-600 text-xs mt-10">
          © 2026 VoltIQ. All rights reserved.
        </p>

      </div>
  );
};

export default Register;
