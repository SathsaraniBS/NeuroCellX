import React, { useState, useEffect } from "react";
import { Link } from 'react-router-dom';
import { User, Menu, X, LogOut } from 'lucide-react'; // icons සඳහා

const Navbar = () => {
    const [isOpen, setIsOpen] = useState(false);
    const [isScrolled, setIsScrolled] = useState(false);

    // මෙහි user දත්ත දැනට null ලෙස ඇත. 
    // පසුව ඔබගේ Auth Context එක හරහා මෙය සම්බන්ධ කරන්න.
    const [user, setUser] = useState(null); 

    const toggleMenu = () => {
        setIsOpen(!isOpen);
    };

    useEffect(() => {
        const handleScroll = () => {
            if (window.scrollY > 50) {
                setIsScrolled(true);
            } else {
                setIsScrolled(false);
            }
        };

        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    return (
        <nav
            className={`fixed w-full top-0 z-50 py-4 h-20 transition-all duration-300 flex items-center shadow-md ${
                isScrolled ? 'bg-[#050816]/80 backdrop-blur-md border-b border-white/10' : 'bg-transparent'
            }`}
        >
            <div className="max-w-7xl mx-auto flex justify-between items-center w-full px-6">

                {/* Logo */}
                <Link to="/" className="text-2xl font-bold tracking-wide">
                    <span className="bg-gradient-to-r from-cyan-400 to-lime-400 bg-clip-text text-transparent">
                        VoltIQ
                    </span>
                </Link>

                {/* Desktop Nav Links */}
                <div className="hidden md:flex items-center gap-8 text-gray-300 font-medium">
                    <Link to="/" className="hover:text-cyan-400 transition duration-300">Home</Link>
                    <a href="#features" className="hover:text-cyan-400 transition duration-300">Features</a>
                    <Link to="/landingpage" className="hover:text-cyan-400 transition duration-300">Landing Page</Link>
                    <Link to="/about" className="hover:text-cyan-400 transition duration-300">About</Link>
                    <Link to="/learning" className="hover:text-cyan-400 transition duration-300">Learning Hub</Link>
                </div>

                {/* Right Side: Auth / Profile */}
                <div className="flex items-center gap-4">
                    {user ? (
                        /* User Profile Section */
                        <div className="flex items-center gap-3 group cursor-pointer relative">
                            <Link to="/profile" className="flex items-center gap-2 bg-white/5 p-1 pr-4 rounded-full border border-white/10 hover:border-cyan-400/50 transition-all">
                                <div className="w-8 h-8 rounded-full overflow-hidden border border-cyan-400/30">
                                    {user.profilePicture ? (
                                        <img src={user.profilePicture} alt={user.name} className="w-full h-full object-cover" />
                                    ) : (
                                        <div className="w-full h-full flex items-center justify-center bg-cyan-400/10">
                                            <User className="w-4 h-4 text-cyan-400" />
                                        </div>
                                    )}
                                </div>
                                <span className="text-sm text-white font-medium hidden lg:inline">{user.name || "User"}</span>
                            </Link>
                        </div>
                    ) : (
                        /* Login / Join Section */
                        <div className="hidden md:flex items-center gap-4">
                            <Link to="/login" className="text-gray-300 hover:text-cyan-400 transition font-medium">
                                Login
                            </Link>
                            <Link to="/register"
                                className="px-6 py-2 rounded-lg font-semibold text-black bg-gradient-to-r from-cyan-400 to-lime-400 hover:shadow-[0_0_20px_rgba(34,211,238,0.4)] transition-all duration-300 border border-white/10"
                            >
                                Join Now
                            </Link>
                        </div>
                    )}

                    {/* Mobile Menu Button */}
                    <button onClick={toggleMenu} className="md:hidden text-white">
                        {isOpen ? <X size={28} /> : <Menu size={28} />}
                    </button>
                </div>
            </div>

            {/* Mobile Menu Dropdown */}
            {isOpen && (
                <div className="absolute top-20 left-0 w-full bg-[#050816] border-b border-white/10 flex flex-col p-6 gap-4 md:hidden animate-in slide-in-from-top duration-300">
                    <Link to="/" onClick={toggleMenu} className="text-gray-300 hover:text-cyan-400">Home</Link>
                    <Link to="/landingpage" onClick={toggleMenu} className="text-gray-300 hover:text-cyan-400">Landing Page</Link>
                    <Link to="/about" onClick={toggleMenu} className="text-gray-300 hover:text-cyan-400">About</Link>
                    {!user && (
                        <div className="flex flex-col gap-3 mt-4">
                            <Link to="/login" onClick={toggleMenu} className="text-center py-2 border border-white/10 rounded-lg">Login</Link>
                            <Link to="/register" onClick={toggleMenu} className="text-center py-2 bg-cyan-400 text-black rounded-lg font-bold">Join Now</Link>
                        </div>
                    )}
                </div>
            )}
        </nav>
    );
}

export default Navbar;