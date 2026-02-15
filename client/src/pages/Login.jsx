import axios from "axios";
import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../contexts/AuthContext";
import { useToast } from "../contexts/ToastContext";

function Register() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();
  const { login } = useAuth(); // ← gets the login function from context

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    try {
      // 1. Register the user
      const res = await axios.post("http://localhost:5000/api/auth/register", {
        name,
        email,
        password,
      });

      // 2. Automatically log the user in after successful signup
      login(res.data.token, res.data.user);

      // 3. Redirect based on role
      if (res.data.user.role === "admin") {
        navigate("/admin");
      } else {
        navigate("/user/dashboard");
      }
    } catch (err) {
      setError(
        err.response?.data?.message || "Registration failed. Please try again."
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-[#030712] via-[#071b2f] to-[#020617] text-white relative overflow-hidden">
      {/* Background Glow Effect */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(0,255,255,0.08),transparent_70%)]"></div>

      {/* Main Container */}
      <div className="relative z-10 w-full max-w-md px-6">

        {/* Logo */}
        <h1 className="text-4xl font-semibold text-center tracking-wide">
          <span className="text-white">Volt</span>
          <span className="bg-gradient-to-r from-cyan-400 to-green-400 bg-clip-text text-transparent">
            IQ
          </span>
        </h1>

        {/* Heading */}
        <h2 className="text-2xl font-semibold text-center mt-8">
          Sign in to Your Account
        </h2>
        <p className="text-center text-gray-400 mt-2 text-sm">
          Access your dashboard and stay informed about your EV battery health.
        </p>

        {/* Glass Card */}
        <form onSubmit={handleSubmit} className="space-y-6">
        <div className="mt-8 bg-white/5 backdrop-blur-xl p-6 rounded-2xl border border-white/10 shadow-2xl">

          {/* Email */}
          <div className="relative mb-4">
            <Mail className="absolute left-3 top-3 text-gray-400" size={18} />
            <input
              type="email"
              placeholder="Email"
              className="w-full pl-10 pr-4 py-3 bg-transparent border border-white/20 rounded-xl focus:outline-none focus:ring-2 focus:ring-cyan-400 text-white placeholder-gray-400"
            />
          </div>

          {/* Password */}
          <div className="relative mb-4">
            <Lock className="absolute left-3 top-3 text-gray-400" size={18} />
            <input
              type={showPassword ? "text" : "password"}
              placeholder="Password"
              className="w-full pl-10 pr-10 py-3 bg-transparent border border-white/20 rounded-xl focus:outline-none focus:ring-2 focus:ring-cyan-400 text-white placeholder-gray-400"
            />
            <div
              className="absolute right-3 top-3 text-gray-400 cursor-pointer"
              onClick={() => setShowPassword(!showPassword)}
            >
              {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
            </div>
          </div>

          {/* Sign In Button */}
          <button className="w-full py-3 mt-4 rounded-xl font-semibold text-lg bg-gradient-to-r from-cyan-400 to-green-400 text-black hover:opacity-90 transition duration-300 shadow-lg shadow-cyan-500/20">
            Sign In
          </button>
          </div>
        </form>


          {/* Remember + Forgot */}
          <div className="flex justify-between items-center mt-4 text-sm text-gray-400">
            <label className="flex items-center gap-2 cursor-pointer">
              <input type="checkbox" className="accent-cyan-400" />
              Remember Me
            </label>
            <span className="text-cyan-400 cursor-pointer hover:underline">
              Forgot Password?
            </span>
          </div>

          {/* Sign Up */}
          <div className="text-center mt-6 text-gray-400 text-sm">
            Don't have an account?{" "}
            <span className="text-cyan-400 cursor-pointer hover:underline">
              Sign Up
            </span>
          </div>
        </div>

        {/* Social Login */}
        <div className="mt-10 text-center">
          <p className="text-gray-500 text-sm mb-4">Or sign in with</p>

          <div className="flex justify-center gap-6">
            <div className="w-12 h-12 flex items-center justify-center rounded-full border border-white/20 bg-white/5 hover:bg-white/10 transition cursor-pointer">
              <Twitter size={18} />
            </div>

            <div className="w-12 h-12 flex items-center justify-center rounded-full border border-white/20 bg-white/5 hover:bg-white/10 transition cursor-pointer">
              <Linkedin size={18} />
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
}
    
      
             


export default Register;
