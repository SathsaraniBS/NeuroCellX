import { useEffect, useState } from 'react';
import { useAuth } from '../contexts/AuthContext';
import api from '../api/api';
import { User,  MapPin, Calendar, Clock, Award, LogOut, Trash2, Edit2, X, Upload, QrCode } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const ProfilePage = () => {
    const { user, logout } = useAuth();
    const navigate = useNavigate();
    const { addToast } = useToast();

    const [isEditOpen, setIsEditOpen] = useState(false);
    const [editForm, setEditForm] = useState({ name: '', email: '', password: '', profilePicture: '' });
    const [updating, setUpdating] = useState(false);
    const [selectedQR, setSelectedQR] = useState(null);

    useEffect(() => {
        if (user) {
            setEditForm({
                name: user.name || '',
                email: user.email || '',
                password: '',
                profilePicture: user.profilePicture || ''
            });
        }

        

    }, [user]);

    

    const handleLogout = () => {
        logout();
        navigate('/login');
    };

    const handleFileUpload = async (e) => {
        const file = e.target.files[0];
        if (!file) return;

        const formData = new FormData();
        formData.append('image', file);
        formData.append('folder', 'users');
        setUpdating(true);

        try {
            const { data } = await api.post('/upload?folder=users', formData, {
                headers: { 'Content-Type': 'multipart/form-data' }
            });
            setEditForm(prev => ({ ...prev, profilePicture: data }));
            addToast('Profile picture uploaded', 'success');
        } catch (error) {
            console.error(error);
            addToast('Image upload failed', 'error');
        } finally {
            setUpdating(false);
        }
    };

    const handleUpdateProfile = async (e) => {
        e.preventDefault();
        setUpdating(true);
        try {
            const { data } = await api.put('/users/profile', editForm);
            addToast('Profile updated successfully', 'success');
            setIsEditOpen(false);

            if (data.token) {
                localStorage.setItem('userInfo', JSON.stringify(data));
            }
            window.location.reload();
        } catch (error) {
            addToast(error.response?.data?.message || 'Failed to update profile', 'error');
        } finally {
            setUpdating(false);
        }
    };

    

    const isCancellable = (createdAt) => {
        const bookingTime = new Date(createdAt).getTime();
        const now = Date.now();
        return now < bookingTime + 5 * 60 * 60 * 1000; // 5 hours
    };

    

    return (
        <div className="max-w-6xl mx-auto px-4 py-12 relative">
            <div className="glass-card rounded-3xl p-8 mb-12 flex flex-col md:flex-row items-center gap-8 relative overflow-hidden">
                <div className="absolute top-0 right-0 p-4 flex gap-2">
                    <button
                        onClick={() => setIsEditOpen(true)}
                        className="flex items-center gap-2 text-luxury-500 hover:text-gold-500 font-bold transition-colors bg-white/10 p-2 rounded-lg"
                        title="Edit Profile"
                    >
                        <Edit2 className="w-5 h-5" />
                    </button>
                    <button onClick={handleLogout} className="flex items-center gap-2 text-red-500 hover:text-red-400 font-bold transition-colors bg-white/10 p-2 rounded-lg">
                        <LogOut className="w-5 h-5" />
                    </button>
                </div>

                <div className="w-32 h-32 rounded-full border-4 border-gold-500/30 overflow-hidden bg-luxury-900 box-content relative group">
                    <img
                        src={user?.profilePicture || `https://ui-avatars.com/api/?name=${user?.name}&background=random`}
                        alt={user?.name}
                        className="w-full h-full object-cover"
                    />
                </div>

                <div className="flex-1 text-center md:text-left">
                    <h1 className="text-4xl font-serif font-bold text-luxury-900 dark:text-white mb-2">{user?.name}</h1>
                    <p className="text-luxury-500 dark:text-gold-100/60 mb-6">{user?.email}</p>

                    <div className="flex flex-wrap gap-4 justify-center md:justify-start items-start">
                        <div className="bg-white/50 dark:bg-luxury-800/50 px-6 py-2.5 rounded-xl border border-luxury-200 dark:border-white/10 flex items-center gap-3 h-[72px]">
                            <div className="p-2 bg-gold-500/20 rounded-lg text-gold-600 dark:text-gold-300">
                                <Award className="w-5 h-5" />
                            </div>
                            <div>
                                <p className="text-[10px] text-luxury-500 dark:text-gold-100/50 uppercase tracking-widest font-bold">Points</p>
                                <p className="text-xl font-bold text-luxury-900 dark:text-white leading-none">{stats.points.toLocaleString()}</p>
                            </div>
                        </div>

                       
                    </div>
                </div>
            </div>

            <div className="flex gap-8 mb-8 border-b border-luxury-200 dark:border-white/10">
                <button
                    onClick={() => setActiveTab('bookings')}
                    className={`pb-4 text-lg font-bold transition-all ${activeTab === 'bookings' ? 'text-gold-500 border-b-2 border-gold-500' : 'text-luxury-400 hover:text-luxury-600 dark:text-gold-100/40 dark:hover:text-gold-100'}`}
                >
                    Recent Bookings
                </button>
                <button
                    onClick={() => setActiveTab('watchlist')}
                    className={`pb-4 text-lg font-bold transition-all ${activeTab === 'watchlist' ? 'text-gold-500 border-b-2 border-gold-500' : 'text-luxury-400 hover:text-luxury-600 dark:text-gold-100/40 dark:hover:text-gold-100'}`}
                >
                    My Watchlist
                </button>
            </div>

            {activeTab === 'bookings' ? (
                <div className="space-y-6">
                    {bookings.length === 0 ? (
                        <p className="text-luxury-500 dark:text-gold-100/50 italic">No bookings found.</p>
                    ) : (
                        bookings.map(booking => {
                            if (!booking?.showtime?.movie) return null;

                            return (
                                <div key={booking._id} className="glass-card p-6 rounded-2xl flex flex-col md:flex-row gap-6 hover:border-gold-500/30 transition-all relative">
                                    <div className="w-full md:w-32 h-32 rounded-xl overflow-hidden flex-shrink-0">
                                        <img src={booking.showtime.movie.poster} className="w-full h-full object-cover" />
                                    </div>
                                    <div className="flex-1">
                                        <div className="flex justify-between items-start mb-2">
                                            <h3 className="text-xl font-bold text-luxury-900 dark:text-white font-serif">{booking.showtime.movie.title}</h3>
                                            <span className="text-sm font-mono text-gold-500">#{booking._id.slice(-8).toUpperCase()}</span>
                                        </div>
                                        <div className="flex flex-wrap gap-4 text-sm text-luxury-600 dark:text-gold-100/70 mb-4">
                                            <span className="flex items-center gap-1"><Calendar className="w-4 h-4" /> {new Date(booking.showtime.startTime).toLocaleDateString()}</span>
                                            <span className="flex items-center gap-1"><Clock className="w-4 h-4" /> {new Date(booking.showtime.startTime).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}</span>
                                            <span className="flex items-center gap-1"><MapPin className="w-4 h-4" /> Hall 1</span>
                                        </div>
                                        <div className="flex items-center gap-4">
                                            <span className="px-3 py-1 bg-luxury-100 dark:bg-luxury-800 rounded-lg text-xs font-bold text-luxury-700 dark:text-gold-100">
                                                {booking.seats.length} Tickets
                                            </span>
                                            {booking.snacks && booking.snacks.length > 0 && (
                                                <span className="px-3 py-1 bg-luxury-100 dark:bg-luxury-800 rounded-lg text-xs font-bold text-luxury-700 dark:text-gold-100">
                                                    {booking.snacks.length} Snacks
                                                </span>
                                            )}
                                            {booking.qrCode && (
                                                <button
                                                    onClick={() => setSelectedQR(booking)}
                                                    className="flex items-center gap-1 px-3 py-1 bg-gold-500/10 hover:bg-gold-500 text-gold-600 hover:text-white rounded-lg text-xs font-bold transition-all border border-gold-500/30"
                                                    title="View QR Code"
                                                >
                                                    <QrCode className="w-4 h-4" />
                                                    View Ticket
                                                </button>
                                            )}
                                        </div>
                                    </div>
                                    <div className="flex flex-col justify-between items-end border-l border-luxury-200 dark:border-white/5 pl-6">
                                        <div className="text-right">
                                            <span className="text-xs text-luxury-400 dark:text-gold-100/40 uppercase font-bold block">Total Paid</span>
                                            <span className="text-2xl font-serif font-bold text-gold-600 dark:text-gold-400">${booking.totalPrice}</span>
                                        </div>
                                        {isCancellable(booking.createdAt) && (
                                            <button
                                                onClick={() => handleCancelBooking(booking._id)}
                                                className="mt-4 px-4 py-2 bg-red-500/10 hover:bg-red-500 text-red-500 hover:text-white rounded-lg text-sm font-bold transition-colors flex items-center gap-2"
                                            >
                                                <Trash2 className="w-4 h-4" /> Cancel Booking
                                            </button>
                                        )}
                                    </div>
                                </div>
                            );
                        })
                    )}
                </div>
            ) : (
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6">
                    {watchlist.length === 0 ? (
                        <p className="col-span-full text-luxury-500 dark:text-gold-100/50 italic">Your watchlist is empty.</p>
                    ) : (
                        watchlist.map(movie => (
                            <div key={movie._id} className="glass-card rounded-xl overflow-hidden group relative">
                                <div onClick={() => navigate(`/movie/${movie._id}`)} className="aspect-[2/3] cursor-pointer">
                                    <img src={movie.poster} alt={movie.title} className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110" />
                                    <div className="absolute inset-0 bg-black/20 group-hover:bg-transparent transition-colors" />
                                </div>
                                <div className="absolute top-2 right-2">
                                    <button
                                        onClick={() => removeFromWatchlist(movie._id)}
                                        className="p-2 bg-black/50 hover:bg-red-500/80 text-white rounded-full transition-colors backdrop-blur-sm"
                                        title="Remove from watchlist"
                                    >
                                        <Trash2 className="w-4 h-4" />
                                    </button>
                                </div>
                                <div className="p-4" onClick={() => navigate(`/movie/${movie._id}`)}>
                                    <h3 className="font-bold text-luxury-900 dark:text-white truncate cursor-pointer hover:text-gold-500 transition-colors">{movie.title}</h3>
                                    <p className="text-xs text-luxury-500 dark:text-gold-100/50">{movie.genre}</p>
                                </div>
                            </div>
                        ))
                    )}
                </div>
            )}

            {/* Edit Profile Modal */}
            {isEditOpen && (
                <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm p-4">
                    <div className="bg-white dark:bg-luxury-900 rounded-3xl p-8 max-w-md w-full relative border border-gold-500/20 shadow-2xl animate-fade-in max-h-[90vh] overflow-y-auto">
                        <button
                            onClick={() => setIsEditOpen(false)}
                            className="absolute top-4 right-4 text-luxury-400 hover:text-red-500 transition-colors"
                        >
                            <X className="w-6 h-6" />
                        </button>

                        <h2 className="text-2xl font-serif font-bold text-luxury-900 dark:text-white mb-6">Edit Profile</h2>

                        <form onSubmit={handleUpdateProfile} className="space-y-5">
                            {/* Profile Picture Upload */}
                            <div className="flex justify-center mb-4">
                                <div className="relative group">
                                    <div className="w-24 h-24 rounded-full overflow-hidden border-2 border-dashed border-gray-300 dark:border-gray-600 hover:border-gold-500 transition-colors">
                                        {editForm.profilePicture ? (
                                            <img src={editForm.profilePicture} alt="Profile" className="w-full h-full object-cover" />
                                        ) : (
                                            <div className="w-full h-full bg-gray-100 dark:bg-white/5 flex items-center justify-center">
                                                <User className="w-8 h-8 text-gray-400" />
                                            </div>
                                        )}
                                    </div>
                                    <label className="absolute inset-0 flex items-center justify-center bg-black/50 rounded-full opacity-0 group-hover:opacity-100 transition-opacity cursor-pointer">
                                        <span className="text-white text-xs font-bold">{updating ? '...' : 'Upload'}</span>
                                        <input type="file" className="hidden" accept="image/*" onChange={handleFileUpload} disabled={updating} />
                                    </label>
                                </div>
                            </div>

                            {/* Name */}
                            <div>
                                <label className="block text-sm font-bold text-luxury-700 dark:text-gold-100/70 mb-2">Display Name</label>
                                <input
                                    type="text"
                                    value={editForm.name}
                                    onChange={(e) => setEditForm({ ...editForm, name: e.target.value })}
                                    className="w-full bg-luxury-50 dark:bg-luxury-800 border border-luxury-200 dark:border-white/10 rounded-xl px-4 py-3 outline-none focus:border-gold-500 transition-colors text-luxury-900 dark:text-white"
                                    required
                                />
                            </div>

                            {/* Email */}
                            <div>
                                <label className="block text-sm font-bold text-luxury-700 dark:text-gold-100/70 mb-2">Email Address</label>
                                <input
                                    type="email"
                                    value={editForm.email}
                                    onChange={(e) => setEditForm({ ...editForm, email: e.target.value })}
                                    className="w-full bg-luxury-50 dark:bg-luxury-800 border border-luxury-200 dark:border-white/10 rounded-xl px-4 py-3 outline-none focus:border-gold-500 transition-colors text-luxury-900 dark:text-white"
                                    required
                                />
                            </div>

                            {/* Password */}
                            <div>
                                <label className="block text-sm font-bold text-luxury-700 dark:text-gold-100/70 mb-2">New Password <span className="text-xs font-normal text-luxury-400">(leave blank to keep current)</span></label>
                                <input
                                    type="password"
                                    value={editForm.password}
                                    onChange={(e) => setEditForm({ ...editForm, password: e.target.value })}
                                    className="w-full bg-luxury-50 dark:bg-luxury-800 border border-luxury-200 dark:border-white/10 rounded-xl px-4 py-3 outline-none focus:border-gold-500 transition-colors text-luxury-900 dark:text-white"
                                    placeholder="••••••••"
                                />
                            </div>

                            <button
                                type="submit"
                                disabled={updating}
                                className="w-full bg-gold-500 hover:bg-gold-400 text-white font-bold py-3 rounded-xl transition-all shadow-lg hover:shadow-gold-500/25 disabled:opacity-50"
                            >
                                {updating ? 'Saving...' : 'Save Changes'}
                            </button>
                        </form>
                    </div>
                </div>
            )}

            {/* QR Code Modal */}
            {selectedQR && (
                <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 backdrop-blur-sm p-4" onClick={() => setSelectedQR(null)}>
                    <div className="bg-white dark:bg-luxury-900 rounded-3xl p-8 max-w-md w-full relative border border-gold-500/20 shadow-2xl animate-fade-in" onClick={(e) => e.stopPropagation()}>
                        <button
                            onClick={() => setSelectedQR(null)}
                            className="absolute top-4 right-4 text-luxury-400 hover:text-red-500 transition-colors w-8 h-8 flex items-center justify-center rounded-full bg-luxury-100 dark:bg-luxury-800"
                        >
                            ✕
                        </button>

                        <h2 className="text-2xl font-serif font-bold text-luxury-900 dark:text-white mb-4 text-center">Digital Ticket</h2>

                        <div className="bg-luxury-50 dark:bg-luxury-800/50 rounded-2xl p-4 mb-4">
                            <div className="flex justify-center mb-4">
                                {selectedQR.qrCode ? (
                                    <img src={selectedQR.qrCode} alt="Booking QR Code" className="w-64 h-64 border-4 border-gold-500/20 rounded-xl" />
                                ) : (
                                    <div className="w-64 h-64 bg-luxury-100 dark:bg-luxury-800 flex items-center justify-center rounded-xl border-2 border-dashed border-luxury-300 dark:border-white/10">
                                        <p className="text-luxury-400 dark:text-gold-100/40 text-sm">QR Code Unavailable</p>
                                    </div>
                                )}
                            </div>
                        </div>

                        <div className="space-y-3 text-sm">
                            <div className="flex justify-between">
                                <span className="text-luxury-500 dark:text-gold-100/50">Movie:</span>
                                <span className="font-bold text-luxury-900 dark:text-white">{selectedQR.showtime.movie.title}</span>
                            </div>
                            <div className="flex justify-between">
                                <span className="text-luxury-500 dark:text-gold-100/50">Date:</span>
                                <span className="font-bold text-luxury-900 dark:text-white">
                                    {new Date(selectedQR.showtime.startTime).toLocaleDateString()}
                                </span>
                            </div>
                            <div className="flex justify-between">
                                <span className="text-luxury-500 dark:text-gold-100/50">Time:</span>
                                <span className="font-bold text-luxury-900 dark:text-white">
                                    {new Date(selectedQR.showtime.startTime).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                                </span>
                            </div>
                            <div className="flex justify-between">
                                <span className="text-luxury-500 dark:text-gold-100/50">Seats:</span>
                                <span className="font-bold text-luxury-900 dark:text-white">
                                    {selectedQR.seats.map(s => `${String.fromCharCode(65 + s.row)}${s.col + 1}`).join(', ')}
                                </span>
                            </div>
                            <div className="flex justify-between border-t border-luxury-200 dark:border-white/10 pt-3">
                                <span className="text-luxury-500 dark:text-gold-100/50">Booking ID:</span>
                                <span className="font-mono text-xs text-gold-600 dark:text-gold-300">
                                    #{selectedQR._id.slice(-8).toUpperCase()}
                                </span>
                            </div>
                        </div>

                        <p className="text-xs text-center text-luxury-400 dark:text-gold-100/40 mt-6">
                            Present this QR code at the cinema entrance
                        </p>
                    </div>
                </div>
            )}
        </div>
    );
};

export default ProfilePage;