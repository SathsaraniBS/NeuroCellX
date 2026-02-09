import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';

import { useAuth } from '../contexts/AuthContext';
import { useToast } from '../contexts/ToastContext';

const Register = () => {
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const { register } = useAuth();
    const { addToast } = useToast();
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            await register(name, email, password);
            addToast('Registration Successful!', 'success');
            navigate('/');
        } catch (err) {
            addToast(err, 'error');
        }
    };

    return (
        <div className="flex items-center justify-center min-h-[80vh] relative overflow-hidden">
            {/* Background Glow */}
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-gold-300/20 rounded-full blur-[100px] pointer-events-none" />

            <div className="w-full max-w-md mx-4 glass-card p-8 rounded-2xl relative z-10 animate-fade-in">
                <div className="text-center mb-8">
                    <h2 className="text-4xl font-serif font-bold text-luxury-900 dark:text-white mb-2">Join Cinemania</h2>
                    <p className="text-luxury-500 dark:text-gold-200/60 font-serif italic">Start your cinematic journey today</p>
                </div>

                <form onSubmit={handleSubmit} className="space-y-6">
                    <div className="space-y-2">
                        <label className="block text-sm font-medium text-luxury-700 dark:text-gold-200">Name</label>
                        <input
                            type="text"
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                            className="w-full bg-white/50 dark:bg-luxury-900/50 border border-luxury-200 dark:border-white/10 rounded-lg p-3 text-luxury-900 dark:text-white placeholder-luxury-400 dark:placeholder-white/20 focus:border-gold-500 focus:ring-1 focus:ring-gold-500 transition-all outline-none"
                            placeholder="John Doe"
                            required
                        />
                    </div>
                    <div className="space-y-2">
                        <label className="block text-sm font-medium text-luxury-700 dark:text-gold-200">Email Address</label>
                        <input
                            type="email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            className="w-full bg-white/50 dark:bg-luxury-900/50 border border-luxury-200 dark:border-white/10 rounded-lg p-3 text-luxury-900 dark:text-white placeholder-luxury-400 dark:placeholder-white/20 focus:border-gold-500 focus:ring-1 focus:ring-gold-500 transition-all outline-none"
                            placeholder="you@example.com"
                            required
                        />
                    </div>
                    <div className="space-y-2">
                        <label className="block text-sm font-medium text-luxury-700 dark:text-gold-200">Password</label>
                        <input
                            type="password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            className="w-full bg-white/50 dark:bg-luxury-900/50 border border-luxury-200 dark:border-white/10 rounded-lg p-3 text-luxury-900 dark:text-white placeholder-luxury-400 dark:placeholder-white/20 focus:border-gold-500 focus:ring-1 focus:ring-gold-500 transition-all outline-none"
                            placeholder="••••••••"
                            required
                        />
                    </div>
                    <button
                        type="submit"
                        className="w-full bg-gradient-to-r from-gold-500 to-gold-300 hover:from-gold-400 hover:to-gold-300/80 text-white font-bold py-3 rounded-lg transition-all hover:shadow-[0_4px_20px_rgba(212,175,55,0.4)] hover:-translate-y-0.5"
                    >
                        Create Account
                    </button>
                </form>
                <div className="mt-6 text-center">
                    <p className="text-sm text-luxury-600 dark:text-gold-100/60">
                        Already have an account?{' '}
                        <Link to="/login" className="text-gold-600 dark:text-gold-400 hover:text-gold-500 font-medium transition-colors hover:underline decoration-gold-300 decoration-2 underline-offset-4">
                            Sign In
                        </Link>
                    </p>
                </div>
            </div>
        </div>
    );
};

export default Register;
