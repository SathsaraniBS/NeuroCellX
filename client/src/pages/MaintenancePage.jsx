import { Settings, Mail, Zap, BatteryCharging } from 'lucide-react';
import { useSettings } from '../contexts/SettingsContext';

const MaintenancePage = () => {
    const { settings } = useSettings();

    return (
        <div className="min-h-screen flex flex-col items-center justify-center bg-[#050816] text-white px-4 relative overflow-hidden font-sans">
            
            {/* Animated Background Glows */}
            <div className="absolute inset-0 overflow-hidden pointer-events-none">
                <div className="absolute top-1/4 left-1/4 w-72 h-72 bg-cyan-500/10 rounded-full blur-[100px] animate-pulse" />
                <div className="absolute bottom-1/4 right-1/4 w-72 h-72 bg-green-500/10 rounded-full blur-[100px] animate-pulse" style={{ animationDelay: '1.5s' }} />
                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-blue-500/10 rounded-full blur-[100px] animate-pulse" style={{ animationDelay: '0.5s' }} />
            </div>

            {/* Main Content */}
            <div className="relative z-10 text-center max-w-lg w-full">
                
                {/* Animated EV Theme Icons */}
                <div className="relative mb-10 flex items-center justify-center">
                    <div className="relative">
                        <Settings
                            className="w-24 h-24 sm:w-32 sm:h-32 text-cyan-400/70 animate-spin"
                            style={{ animationDuration: '8s' }}
                        />
                        <BatteryCharging
                            className="absolute -bottom-2 -right-2 w-12 h-12 sm:w-16 sm:h-16 text-green-400 animate-bounce"
                            style={{ animationDuration: '2s' }}
                        />
                    </div>
                </div>

                {/* Tech Glass Card */}
                <div className="rounded-3xl p-8 sm:p-10 border border-white/10 bg-white/5 backdrop-blur-xl shadow-[0_0_30px_rgba(34,211,238,0.1)] space-y-6">
                    <div className="space-y-3">
                        <h1 className="text-3xl sm:text-4xl font-bold bg-gradient-to-r from-cyan-400 to-green-400 bg-clip-text text-transparent">
                            System Upgrade
                        </h1>
                        <p className="text-gray-400 text-base sm:text-lg leading-relaxed">
                            We are currently optimizing our AI models and EV battery tracking systems to improve your experience. 
                            Please check back shortly.
                        </p>
                    </div>

                    {/* Glowing Divider */}
                    <div className="flex items-center gap-4">
                        <div className="flex-1 h-px bg-gradient-to-r from-transparent via-cyan-500/30 to-transparent" />
                        <div className="w-2 h-2 bg-cyan-400 rounded-full animate-pulse shadow-[0_0_10px_rgba(34,211,238,0.8)]" />
                        <div className="flex-1 h-px bg-gradient-to-r from-transparent via-cyan-500/30 to-transparent" />
                    </div>

                    {/* Contact Info */}
                    {settings?.contactEmail && (
                        <div className="flex flex-col items-center gap-3">
                            <p className="text-sm text-gray-400">
                                Need urgent assistance?
                            </p>
                            <a
                                href={`mailto:${settings.contactEmail}`}
                                className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-cyan-500/10 border border-cyan-400/20 text-cyan-300 font-medium hover:bg-cyan-500/20 hover:border-cyan-400/50 transition-all duration-300 shadow-lg shadow-cyan-500/5"
                            >
                                <Mail className="w-4 h-4" />
                                {settings.contactEmail}
                            </a>
                        </div>
                    )}

                    {/* Status Indicator */}
                    <div className="flex items-center justify-center gap-3 pt-4">
                        <span className="relative flex h-3 w-3">
                            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75"></span>
                            <span className="relative inline-flex rounded-full h-3 w-3 bg-green-500"></span>
                        </span>
                        <span className="text-sm font-medium text-green-400">
                            Maintenance in progress
                        </span>
                    </div>
                </div>
            </div>

            {/* Footer Branding - VoltIQ */}
            <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex items-center gap-3 text-gray-500 text-sm">
                <Zap className="w-4 h-4 text-cyan-500/70 animate-pulse" />
                <span className="font-semibold tracking-widest text-gray-400 uppercase">VoltIQ</span>
                <Zap className="w-4 h-4 text-cyan-500/70 animate-pulse" />
            </div>
        </div>
    );
};

export default MaintenancePage;