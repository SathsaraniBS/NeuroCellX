import React from "react";
import { Link } from 'react-router-dom';
import { useState, useEffect } from "react";

const Navbar = () => {
    const [isOpen, setIsOpen] = useState(false);
    const [isScrolled, setIsScrolled] = useState(false); // FIXED: Track scroll state
  
    const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  // FIXED: Add scroll event listener
  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 50) { // Change background after 50px scroll
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll); // Cleanup
  }, []);

  return (
    
    <nav
      className={`fixed w-full top-0 z-50 py-4 h-20 text-white flex justify-between items-center shadow-md transition duration-300 ${
        isScrolled ? 'bg-white/5 backdrop-blur-md' : ' bg-transparent'
      }`} // FIXED: Dynamic background color
    >
        <div className="max-w-7xl mx-auto flex justify-between items-center w-full px-4">


        {/* Logo */}
        <div className="text-2xl font-semibold tracking-wide">
          <span className="bg-gradient-to-r from-cyan-400 to-lime-400 bg-clip-text text-transparent">
            VoltIQ
          </span>
        </div>

        {/* Nav Links */}
        <div className="hidden md:flex items-center gap-10 text-gray-300 font-medium">

        {/* Desktop Menu */}
          <Link to ="/" className="hover:text-cyan-400 transition duration-300 hover:drop-shadow-[0_0_8px_rgba(0,255,255,0.8)]">
            Home
          </Link>
          <a
            href="#features"
            className="hover:text-white transition duration-300 hover:drop-shadow-[0_0_8px_rgba(0,255,255,0.8)]"
          >
            Features
          </a>
          <a
            href="#pricing"
            className="hover:text-white transition duration-300 hover:drop-shadow-[0_0_8px_rgba(0,255,255,0.8)]"
          >
            Pricing
          </a>
          <a
            href="#about"
            className="hover:text-white transition duration-300 hover:drop-shadow-[0_0_8px_rgba(0,255,255,0.8)]"
          >
            About
          </a>
          <Link to = "/learning"
            className="hover:text-white transition duration-300 hover:drop-shadow-[0_0_8px_rgba(0,255,255,0.8)]"
          >
            Learning Hub ▾
          </Link>
        </div>

        <div className="flex gap-4 mr-4">

        {/* Sign In Button */}
        <Link to="/register"
          className="relative px-6 py-2 rounded-lg font-semibold text-white
          bg-gradient-to-r from-cyan-500 to-lime-400
          hover:from-cyan-400 hover:to-lime-300
          transition-all duration-300
          shadow-[0_0_20px_rgba(0,255,255,0.6)]
          hover:shadow-[0_0_30px_rgba(0,255,255,0.9)]
          border border-white/20"
        >
          Sign In
        </Link>
        <Link to="/login" className="px-5 py-2 border border-cyan-400 rounded-lg hover:bg-cyan-400 hover:text-black transition ">
            Login
        </Link>
        </div>
        </div>
    </nav>
  );
}

export default Navbar
    