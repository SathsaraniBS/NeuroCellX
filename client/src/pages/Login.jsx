import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';

import { useAuth } from '../contexts/AuthContext';
import { useToast } from '../contexts/ToastContext';

const Login = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const { login } = useAuth();
    const { addToast } = useToast();
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            await login(email, password);
            addToast('Login Successful!', 'success');
            navigate('/');
        } catch (err) {
            addToast(err, 'error');
        }
    };

    return (
        <div className="flex items-center justify-center min-h-[80vh] relative overflow-hidden">
            {/* Background Glow */}
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-cinema-500/20 rounded-full blur-[100px] pointer-events-none" />

            <div className="w-full max-w-md mx-4 glass-card p-8 rounded-2xl relative z-10 animate-fade-in">
                <div className="text-center mb-8">
                    <h2 className="text-3xl font-display font-bold text-white mb-2">Welcome Back</h2>
                    <p className="text-cinema-100/60">Enter your credentials to access your account</p>
                </div>

                <form onSubmit={handleSubmit} className="space-y-6">
                    <div className="space-y-2">
                        <label className="block text-sm font-medium text-cinema-300">Email Address</label>
                        <input
                            type="email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            className="w-full bg-cinema-900/50 border border-white/10 rounded-lg p-3 text-white placeholder-cinema-100/30 focus:border-cinema-500 focus:ring-1 focus:ring-cinema-500 transition-all outline-none"
                            placeholder="you@example.com"
                            required
                        />
                    </div>
                    <div className="space-y-2">
                        <label className="block text-sm font-medium text-cinema-300">Password</label>
                        <input
                            type="password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            className="w-full bg-cinema-900/50 border border-white/10 rounded-lg p-3 text-white placeholder-cinema-100/30 focus:border-cinema-500 focus:ring-1 focus:ring-cinema-500 transition-all outline-none"
                            placeholder="••••••••"
                            required
                        />
                    </div>
                    <button
                        type="submit"
                        className="w-full bg-cinema-500 hover:bg-cinema-400 text-white font-bold py-3 rounded-lg transition-all hover:shadow-[0_0_20px_rgba(112,0,255,0.4)] hover:-translate-y-0.5"
                    >
                        Sign In
                    </button>
                </form>
                <div className="mt-6 text-center">
                    <p className="text-sm text-cinema-100/60">
                        Don't have an account?{' '}
                        <Link to="/register" className="text-cinema-300 hover:text-white font-medium transition-colors hover:underline decoration-cinema-500 decoration-2 underline-offset-4">
                            Create one now
                        </Link>
                    </p>
                </div>
            </div>
        </div>
    );
};

export default Login;
