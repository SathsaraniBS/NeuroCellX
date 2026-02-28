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

           
        </div>
    );
};

export default ProfilePage;