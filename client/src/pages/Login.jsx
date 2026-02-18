import axios from "axios";
import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../contexts/AuthContext";

import { Mail, Lock, Eye, EyeOff } from "lucide-react";
import { FaLinkedinIn , FaTwitter } from "react-icons/fa";

function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();
  const { login } = useAuth(); // from your AuthContext

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    try {
      const res = await axios.post("http://localhost:5000/api/auth/login", {
        email,
        password,
      });

      // Expected response: { token, user: { role, ... } }
      login(res.data.token, res.data.user);

      if (res.data.user.role === "admin") {
        navigate("/admin");
      } else {
        navigate("/user/dashboard");
      }
    } catch (err) {
      const message =
        err.response?.data?.message ||
        err.message ||
        "Login failed. Please try again.";
      setError(message);
      console.error("Login error:", err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-[#030712] via-[#071b2f] to-[#020617] text-white relative overflow-hidden">
      {/* Background glow */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(0,255,255,0.08),transparent_70%)]" />

      <div className="mt-10 relative z-10 w-full max-w-md px-6">
        {/* Logo */}
        <h1 className="text-4xl font-semibold text-center tracking-wide">
          <span className="text-white">Volt</span>
          <span className="bg-gradient-to-r from-cyan-400 to-green-400 bg-clip-text text-transparent">
            IQ
          </span>
        </h1>

        <h2 className="text-2xl font-semibold text-center mt-8">
          Sign in to Your Account
        </h2>
        <p className="text-center text-gray-400 mt-2 text-sm">
          Access your dashboard and stay informed about your EV battery health.
        </p>

        {/* Error */}
        {error && (
          <div className="mt-6 p-4 bg-red-900/60 border border-red-600/60 rounded-xl text-center text-red-200">
            {error}
          </div>
        )}

        {/* Form Card */}
        <form onSubmit={handleSubmit} className="mt-8 space-y-6">
          <div className="bg-white/5 backdrop-blur-xl p-8 rounded-2xl border border-white/10 shadow-2xl">
            {/* Email */}
            <div className="relative mb-5">
              <Mail className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
              <input
                type="email"
                placeholder="Email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full pl-11 pr-4 py-3 bg-transparent border border-white/20 rounded-xl focus:outline-none focus:border-cyan-400/60 focus:ring-2 focus:ring-cyan-500/30 text-white placeholder-gray-400 transition"
                required
              />
            </div>

            {/* Password */}
            <div className="relative mb-6">
              <Lock className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
              <input
                type={showPassword ? "text" : "password"}
                placeholder="Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full pl-11 pr-11 py-3 bg-transparent border border-white/20 rounded-xl focus:outline-none focus:border-cyan-400/60 focus:ring-2 focus:ring-cyan-500/30 text-white placeholder-gray-400 transition"
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

            {/* Submit */}
            <button
              type="submit"
              disabled={loading}
              className="w-full py-3.5 mt-2 rounded-xl font-semibold text-lg bg-gradient-to-r from-cyan-500 to-emerald-500 text-black hover:brightness-110 active:scale-[0.98] transition-all duration-200 shadow-lg shadow-cyan-500/20 disabled:opacity-60 disabled:cursor-not-allowed"
            >
              {loading ? "Signing in..." : "Sign In"}
            </button>
          </div>
        </form>

        {/* Options */}
        <div className="flex justify-between items-center mt-5 text-sm text-gray-400 px-1">
          <label className="flex items-center gap-2 cursor-pointer select-none">
            <input type="checkbox" className="accent-cyan-400 w-4 h-4" />
            Remember me
          </label>
          <span className="text-cyan-400 hover:text-cyan-300 cursor-pointer transition">
            Forgot password?
          </span>
        </div>

        {/* Sign up link */}
        <p className="text-center mt-8 text-gray-400 text-sm">
          Don't have an account?{" "}
          <Link to="/register" className="text-cyan-400 hover:text-cyan-300 cursor-pointer transition">
            Sign Up
          </Link>
        </p>

        {/* Social login */}
        <div className="mt-12 text-center">
          <p className="text-gray-500 text-sm mb-5">Or continue with</p>
          <div className="flex justify-center gap-6">
            <button className="w-12 h-12 flex items-center justify-center rounded-full border border-white/15 bg-white/5 hover:bg-white/10 transition">
              <FaTwitter size={20} />
            </button>
            <button className="w-12 h-12 flex items-center justify-center rounded-full border border-white/15 bg-white/5 hover:bg-white/10 transition">
              <FaLinkedinIn size={20} />
            </button>
            <button className="w-12 h-12 flex items-center justify-center rounded-full border border-white/15 bg-white/5 hover:bg-white/10 transition text-lg font-bold">
              G
            </button>
          </div>
        </div>

        {/* Footer */}
        <p className="text-center text-gray-600 text-xs mt-12">
          © {new Date().getFullYear()} VoltIQ. All rights reserved.
        </p>
      </div>
    </div>
  );
}

export default Login;