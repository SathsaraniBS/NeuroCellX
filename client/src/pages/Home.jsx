import { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import { useToast } from '../contexts/ToastContext';
import Hero from '../components/Hero';

const Home = () => {
    const { user } = useAuth();
    const { addToast } = useToast();
    const navigate = useNavigate();

    return (
        <div className="min-h-screen bg-gradient-to-b from-luxury-950 via-black to-luxury-950 text-white font-sans">
            {/* Navigation */}
            <Hero />
            {/* <nav className="fixed top-0 left-0 right-0 z-50 bg-black/60 backdrop-blur-md border-b border-white/10">
                <div className="max-w-7xl mx-auto px-6 py-5 flex items-center justify-between">
                    <div className="text-3xl font-bold tracking-tight text-cyan-400">
                        VoltIQ
                    </div>

                    <div className="hidden md:flex items-center space-x-10">
                        <a href="#features" className="text-gray-300 hover:text-cyan-400 transition-colors">
                            Features
                        </a>
                        <a href="#learning" className="text-gray-300 hover:text-cyan-400 transition-colors">
                            Learning Hub
                        </a>
                        <a href="#about" className="text-gray-300 hover:text-cyan-400 transition-colors">
                            About
                        </a>
                    </div>

                    <button
                        className="
              px-6 py-2.5
              bg-gradient-to-r from-cyan-500 to-blue-600
              hover:from-cyan-400 hover:to-blue-500
              rounded-full font-medium
              transition-all
              shadow-lg shadow-cyan-500/20
            "
                    >
                        Sign In
                    </button>
                </div>
            </nav> */}

            {/* Hero Section */}
            <section className="relative pt-32 pb-24 md:pt-48 md:pb-32 overflow-hidden">
                <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_20%,rgba(0,255,255,0.08),transparent_40%)]" />

                <div className="relative max-w-7xl mx-auto px-6 text-center">
                    <h1 className="text-5xl md:text-7xl font-extrabold leading-tight tracking-tight mb-6">
                        Unlock the Future
                        <br />
                        of Your <span className="text-cyan-400">EV Battery</span>
                    </h1>

                    <p className="text-xl md:text-2xl text-gray-300 max-w-4xl mx-auto mb-10 leading-relaxed">
                        Real-time health insights, AI-driven RUL predictions, and smarter driving recommendations.
                    </p>

                    <div className="flex flex-col sm:flex-row justify-center gap-5 mb-16">
                        <button
                            className="
                group relative px-10 py-5
                bg-gradient-to-r from-cyan-500 to-emerald-500
                hover:from-cyan-400 hover:to-emerald-400
                rounded-full font-semibold text-lg
                transition-all shadow-xl shadow-cyan-600/30
                hover:shadow-cyan-500/50
              "
                        >
                            Connect Your Vehicle
                            <span className="ml-2 group-hover:translate-x-1 inline-block transition-transform">→</span>
                        </button>

                        <button
                            className="
                px-10 py-5
                bg-white/10 hover:bg-white/15
                backdrop-blur-sm border border-white/20
                rounded-full font-medium transition-all
              "
                        >
                            Explore Learning Hub →
                        </button>
                    </div>

                    {/* Battery Health Card */}
                    <div className="inline-block bg-gradient-to-br from-gray-900/80 to-black/80 backdrop-blur-lg border border-cyan-500/30 rounded-2xl p-8 max-w-4xl mx-auto shadow-2xl shadow-cyan-900/40">
                        <div className="flex flex-col md:flex-row items-center justify-between gap-8">
                            <div className="text-left">
                                <div className="text-sm uppercase tracking-wider text-cyan-400 mb-2">
                                    State of Health (SoH)
                                </div>
                                <div className="text-6xl md:text-7xl font-black text-cyan-300">94%</div>
                                <div className="text-xl text-gray-400 mt-2">
                                    ~6.5 years remaining
                                </div>
                            </div>

                            <div className="w-full md:w-96 h-32 bg-black/50 rounded-xl relative overflow-hidden">
                                <div className="absolute inset-0 bg-gradient-to-r from-cyan-500/20 via-blue-500/10 to-transparent animate-pulse" />
                                <div className="absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r from-cyan-400 via-blue-400 to-cyan-400" />
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* Features Section */}
            <section className="py-24 bg-black/40">
                <div className="max-w-7xl mx-auto px-6">
                    <h2 className="text-4xl md:text-5xl font-bold text-center mb-16">
                        Smart Battery Management for EVs
                    </h2>

                    <div className="grid md:grid-cols-3 gap-8">
                        <div
                            className="
                group bg-gradient-to-br from-gray-900 to-black
                border border-cyan-900/30 rounded-2xl p-8
                hover:border-cyan-500/50 transition-all
                hover:shadow-xl hover:shadow-cyan-900/30
              "
                        >
                            <div className="w-16 h-16 mb-6 rounded-xl bg-gradient-to-br from-cyan-500/20 to-blue-500/20 flex items-center justify-center text-3xl">
                                📈
                            </div>
                            <h3 className="text-2xl font-bold mb-4">Predictive Intelligence</h3>
                            <p className="text-gray-400 leading-relaxed">
                                Predict remaining battery life with AI-powered analytics
                            </p>
                        </div>

                        {/* ... other feature cards follow the same pattern ... */}
                    </div>
                </div>
            </section>

            {/* Footer remains unchanged */}
            <footer className="py-12 bg-black border-t border-white/10">
                {/* ... footer content ... */}
            </footer>
        </div>

    );
};

export default Home;