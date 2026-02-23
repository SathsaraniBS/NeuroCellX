import React from "react";
import { FaTwitter, FaLinkedinIn, FaInstagram } from "react-icons/fa";
import { Link } from 'react-router-dom';

const Footer = () => {
  return (
    <footer className="relative bg-gradient-to-b from-[#050816] via-[#0a0f2c] to-black text-white pt-16 pb-10 border-t border-white/10">

      {/* Top Border Glow */}
      <div className="absolute top-0 left-0 w-full h-[1px] bg-gradient-to-r from-transparent via-cyan-400 to-transparent opacity-40"></div>

      <div className="max-w-6xl mx-auto px-6">

        {/* ================= Top Section ================= */}
        <div className="grid md:grid-cols-4 gap-10 mb-12">

          {/* Logo */}
          <div>
            <h2 className="text-3xl font-semibold mb-4">
              <span className="bg-gradient-to-r from-cyan-400 to-lime-400 bg-clip-text text-transparent">
                VoltIQ
              </span>
            </h2>
          </div>

          {/* Company */}
          <div>
            <h3 className="font-semibold mb-4 text-gray-300">Company</h3>
            <ul className="space-y-2 text-gray-400">
              <li className="hover:text-cyan-400 transition cursor-pointer">About Us</li>
              <li className="hover:text-cyan-400 transition cursor-pointer">Careers</li>
              <li className="hover:text-cyan-400 transition cursor-pointer">Blog</li>
            </ul>
          </div>

          {/* Resources */}
          <div>
            <h3 className="font-semibold mb-4 text-gray-300">Resources</h3>
            <ul className="space-y-2 text-gray-400">
              <li className="hover:text-cyan-400 transition cursor-pointer">EV Basics</li>
              <li className="hover:text-cyan-400 transition cursor-pointer">Battery Health</li>
              <li className="hover:text-cyan-400 transition cursor-pointer">Charging Tips</li>
            </ul>
          </div>

          {/* Support */}
          <div>
            <h3 className="font-semibold mb-4 text-gray-300">Support</h3>
            <ul className="space-y-2 text-gray-400">
              <li>
                <Link to="/contact" className="hover:text-cyan-400 transition cursor-pointer">Contact</Link>
              </li>
              <li className="hover:text-cyan-400 transition cursor-pointer">FAQ</li>
              <li className="hover:text-cyan-400 transition cursor-pointer">Privacy Policy</li>
            </ul>
          </div>
        </div>

        {/* Divider */}
        <div className="border-t border-white/10 mb-10"></div>

        {/* ================= Newsletter Section ================= */}
        <div className="text-center mb-10">
          <h3 className="text-lg mb-6 text-gray-300">
            Subscribe for the latest EV insights and updates
          </h3>

          <div className="flex flex-col md:flex-row justify-center items-center gap-4">

            <input
              type="email"
              placeholder="Your email"
              className="w-full md:w-96 px-5 py-3 rounded-lg
              bg-white/5 border border-cyan-400/30
              focus:outline-none focus:ring-2 focus:ring-cyan-400
              text-white placeholder-gray-400 backdrop-blur-md"
            />

            <button
              className="px-6 py-3 rounded-lg font-semibold
              bg-gradient-to-r from-cyan-500 to-lime-400
              hover:from-cyan-400 hover:to-lime-300
              transition-all duration-300
              shadow-[0_0_20px_rgba(0,255,255,0.6)]
              hover:shadow-[0_0_30px_rgba(0,255,255,0.9)]"
            >
              Subscribe
            </button>

          </div>
        </div>

        {/* ================= Social Icons ================= */}
        <div className="flex justify-center gap-6 mb-8">

          {[FaTwitter, FaLinkedinIn, FaInstagram].map((Icon, index) => (
            <div
              key={index}
              className="w-12 h-12 flex items-center justify-center rounded-full
              bg-white/5 border border-white/10
              hover:border-cyan-400 hover:shadow-[0_0_15px_rgba(0,255,255,0.7)]
              transition-all duration-300 cursor-pointer"
            >
              <Icon className="text-gray-300 hover:text-cyan-400 transition" />
            </div>
          ))}

        </div>

        {/* ================= Copyright ================= */}
        <div className="text-center text-gray-500 text-sm">
          © 2026 VoltIQ. All rights reserved.
        </div>

      </div>
    </footer>
  );
};

export default Footer;
