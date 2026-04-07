import React from 'react';
import { Settings, Mail, Zap, BatteryCharging, ShieldAlert } from 'lucide-react';
import { useSettings } from '../contexts/SettingsContext';

const MaintenancePage = () => {
    // Note: If useSettings() returns undefined during testing, we fallback safely.
    const { settings } = useSettings() || { settings: { contactEmail: 'support@voltiq.com' } };

    return (
        <div className="min-h-screen flex flex-col items-center justify-center bg-[#050816] text-white px-4 relative overflow-hidden font-sans selection:bg-cyan-500/30">
            
            {/* Environment: High-Tech Grid & Dynamic Glows */}
            <div className="absolute inset-0 overflow-hidden pointer-events-none">
                {/* Dashboard Grid Pattern */}
                <div className="absolute inset-0 bg-[linear-gradient(to_right,#06b6d410_1px,transparent_1px),linear-gradient(to_bottom,#06b6d410_1px,transparent_1px)] bg-[size:32px_32px] opacity-40 mix-blend-screen"></div>
                
                {/* Radial Glows */}
                <div className="absolute top-0 left-1/4 w-[500px] h-[500px] bg-cyan-600/10 rounded-full blur-[120px] animate-pulse" style={{ animationDuration: '4s' }} />
                <div className="absolute bottom-0 right-1/4 w-[500px] h-[500px] bg-green-600/10 rounded-full blur-[120px] animate-pulse" style={{ animationDelay: '2s', animationDuration: '5s' }} />
            </div>

            {/* Main Interface Module */}
            <div className="relative z-10 w-full max-w-lg mt-8">
                
                {/* Top Alert Badge */}
                <div className="flex justify-center mb-6">
                    <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-cyan-500/30 bg-cyan-500/10 text-cyan-400 text-xs font-bold tracking-[0.2em] uppercase backdrop-blur-md shadow-[0_0_15px_rgba(6,182,212,0.2)]">
                        <ShieldAlert className="w-4 h-4" />
                        <span>System Offline</span>
                    </div>
                </div>

                {/* Main Glass Panel */}
                <div className="relative rounded-[2rem] p-8 md:p-10 border border-white/10 bg-black/40 backdrop-blur-2xl shadow-2xl overflow-hidden group">
                    {/* Top edge highlight */}
                    <div className="absolute top-0 left-0 right-0 h-[1px] bg-gradient-to-r from-transparent via-cyan-400/50 to-transparent"></div>

                    {/* Animated EV Engine / Core */}
                    <div className="relative mb-10 mt-4 flex items-center justify-center">
                        <div className="relative flex items-center justify-center w-32 h-32 rounded-full border border-white/5 bg-gradient-to-b from-white/5 to-transparent shadow-[inset_0_0_20px_rgba(0,0,0,0.5)]">
                            {/* Outer spinning ring */}
                            <div className="absolute inset-0 rounded-full border-t-2 border-r-2 border-cyan-500/50 animate-spin" style={{ animationDuration: '3s' }}></div>
                            <div className="absolute inset-2 rounded-full border-b-2 border-l-2 border-green-500/30 animate-spin" style={{ animationDuration: '4s', animationDirection: 'reverse' }}></div>
                            
                            <Settings className="absolute text-cyan-400/80 animate-spin w-12 h-12" style={{ animationDuration: '10s' }} />
                            <BatteryCharging className="absolute text-green-400 animate-pulse w-8 h-8 z-10" />
                        </div>
                    </div>

                    {/* Content */}
                    <div className="text-center space-y-4 mb-10">
                        <h1 className="text-3xl md:text-4xl font-black bg-gradient-to-br from-white via-cyan-100 to-cyan-500 bg-clip-text text-transparent tracking-tight">
                            Firmware Update
                        </h1>
                        <p className="text-gray-400 text-sm md:text-base leading-relaxed max-w-[90%] mx-auto font-medium">
                            We are recalibrating our global charging network algorithms and upgrading the fleet management matrix. 
                            The grid will be back online shortly.
                        </p>
                    </div>

                    {/* Diagnostic / Charging Progress Bar */}
                    <div className="mb-10">
                        <div className="flex justify-between text-xs text-gray-500 mb-2 font-mono uppercase tracking-wider">
                            <span>Matrix Diagnostics</span>
                            <span className="text-cyan-400 animate-pulse">85% Processed</span>
                        </div>
                        <div className="w-full bg-black/60 rounded-full h-1.5 border border-white/5 overflow-hidden relative">
                            <div className="absolute top-0 bottom-0 left-0 bg-gradient-to-r from-cyan-600 to-green-400 w-[85%] relative overflow-hidden">
                                {/* Moving glare effect on the bar */}
                                <div className="absolute top-0 bottom-0 w-20 bg-gradient-to-r from-transparent via-white/40 to-transparent -translate-x-full animate-[shimmer_2s_infinite]"></div>
                            </div>
                        </div>
                    </div>

                    {/* Contact Action */}
                    {settings?.contactEmail && (
                        <div className="flex flex-col items-center">
                            <a
                                href={`mailto:${settings.contactEmail}`}
                                className="group relative inline-flex items-center justify-center gap-3 px-8 py-3.5 rounded-xl bg-cyan-500/5 border border-cyan-500/20 text-cyan-300 font-bold text-sm tracking-wide hover:bg-cyan-500/10 hover:border-cyan-400/50 hover:shadow-[0_0_20px_rgba(6,182,212,0.2)] transition-all duration-300 overflow-hidden w-full sm:w-auto"
                            >
                                <Mail className="w-4 h-4 transition-transform group-hover:-translate-y-0.5" />
                                <span>Contact Fleet Support</span>
                            </a>
                        </div>
                    )}
                </div>
            </div>

            {/* Footer Branding */}
            <div className="absolute bottom-6 flex flex-col items-center gap-2">
                <div className="flex items-center justify-center gap-2">
                    <span className="relative flex h-2 w-2">
                        <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75"></span>
                        <span className="relative inline-flex rounded-full h-2 w-2 bg-green-500"></span>
                    </span>
                    <span className="text-xs font-mono text-gray-500 uppercase tracking-widest">
                        Core Systems Updating
                    </span>
                </div>
                <div className="flex items-center gap-2 mt-1">
                    <Zap className="w-3 h-3 text-cyan-500/50" />
                    <span className="font-bold tracking-[0.3em] text-white/30 text-xs uppercase">VoltIQ Operating System</span>
                    <Zap className="w-3 h-3 text-cyan-500/50" />
                </div>
            </div>

            {/* Custom Animations required for the progress bar glare */}
            <style jsx="true">{`
                @keyframes shimmer {
                    100% { transform: translateX(400%); }
                }
            `}</style>
        </div>
    );
};

export default MaintenancePage;