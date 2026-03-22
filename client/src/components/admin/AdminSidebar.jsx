import { Link, useLocation } from 'react-router-dom';
import { LayoutDashboard,  Users, MessageSquare, LogOut, Sun, Moon, Settings, ExternalLink } from 'lucide-react';
import { useAuth } from '../../contexts/AuthContext';
import { useTheme } from '../../contexts/ThemeContext';

const AdminSidebar = () => {
    const { pathname } = useLocation();
    const { logout } = useAuth();
    const { theme, toggleTheme } = useTheme();co

    const links = [
        { path: '/admin', icon: LayoutDashboard, label: 'Overview' },
        { path: '/admin/users', icon: Users, label: 'Users' },
        { path: '/admin/contacts', icon: MessageSquare, label: 'Queries' },
        { path: '/admin/settings', icon: Settings, label: 'Settings' },
    ];

    const isActive = (path) => {
        if (path === '/admin' && pathname === '/admin') return true;
        if (path !== '/admin' && pathname.startsWith(path)) return true;
        return false;
    };

    return (
        <aside className="fixed left-0 top-0 h-screen w-64 bg-luxury-50 dark:bg-luxury-900 border-r border-luxury-200 dark:border-luxury-800 text-luxury-900 dark:text-white z-50 pt-10 hidden lg:flex flex-col transition-colors duration-500 shadow-xl">
            <div className="px-6 mb-8 flex items-start justify-between">
                <div>
                    <h2 className="text-2xl font-bold font-serif text-gold-500 tracking-wide">CINEMANIA</h2>
                    <p className="text-xs text-luxury-400 dark:text-luxury-500 font-medium uppercase tracking-widest ml-0.5">Admin Panel</p>
                </div>
                {/* View Site Button */}
                <Link
                    to="/"
                    className="p-2 rounded-full transition-all duration-300 hover:bg-gold-500/10 border border-gold-500/20 hover:border-gold-500/40 group text-gold-500"
                    title="View Website"
                >
                    <ExternalLink className="w-4 h-4 group-hover:scale-110 transition-transform" />
                </Link>
            </div>

            <nav className="px-4 space-y-2 flex-1 overflow-y-auto scrollbar-hide">
                {links.map((link) => (
                    <Link
                        key={link.path}
                        to={link.path}
                        className={`flex items-center gap-3 px-4 py-3 rounded-xl transition-all duration-300 group ${isActive(link.path)
                            ? 'bg-gradient-to-r from-gold-500/20 to-transparent text-gold-600 dark:text-gold-400 border-l-4 border-gold-500'
                            : 'text-gray-500 dark:text-gray-400 hover:text-luxury-900 dark:hover:text-white hover:bg-luxury-100 dark:hover:bg-white/5'
                            }`}
                    >
                        <link.icon className={`w-5 h-5 transition-transform group-hover:scale-110 ${isActive(link.path) ? 'text-gold-500' : ''}`} />
                        <span className="font-medium">{link.label}</span>
                    </Link>
                ))}
            </nav>

            <div className="p-4 border-t border-luxury-200 dark:border-white/5 bg-luxury-50/50 dark:bg-black/20 backdrop-blur-sm">
                {/* Bottom Actions Cluster */}
                <div className="flex items-center justify-between gap-2">
                    {/* Logout Button (Left) */}
                    <button
                        onClick={logout}
                        className="p-2.5 rounded-full transition-all duration-300 text-red-500 hover:bg-red-500/10 border border-transparent hover:border-red-500/20 group"
                        title="Logout"
                    >
                        <LogOut className="w-5 h-5 group-hover:-translate-x-0.5 transition-transform" />
                    </button>



                    {/* Theme Toggle (Right) */}
                    <button
                        onClick={toggleTheme}
                        className="p-2.5 rounded-full transition-all duration-300 text-gray-500 dark:text-gray-400 hover:bg-luxury-200 dark:hover:bg-white/10 group border border-transparent"
                        aria-label="Toggle Theme"
                        title={theme === 'dark' ? 'Switch to Light Mode' : 'Switch to Dark Mode'}
                    >
                        {theme === 'dark' ? (
                            <Sun className="w-5 h-5 group-hover:rotate-90 transition-transform duration-500" />
                        ) : (
                            <Moon className="w-5 h-5 group-hover:-rotate-12 transition-transform duration-500" />
                        )}
                    </button>
                </div>
            </div>
        </aside>
    );
};

export default AdminSidebar;
