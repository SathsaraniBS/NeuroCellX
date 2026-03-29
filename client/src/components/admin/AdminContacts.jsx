import React, { useState, useEffect } from 'react';
import api from '../../services/api';
import { useToast } from '../../contexts/ToastContext';
// FIXED: Added User and Calendar imports
import { Mail, Trash2, CheckCircle, Clock, User, Calendar } from 'lucide-react';

const AdminContacts = () => {
    const [messages, setMessages] = useState([]);
    const [loading, setLoading] = useState(true);
    const { addToast } = useToast();

    const fetchMessages = async () => {
        try {
            const res = await api.get('/admin/contacts');
            setMessages(res.data);
        } catch (err) {
            addToast('Failed to load messages', 'error');
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchMessages();
    }, []);

    const handleStatusUpdate = async (id) => {
        try {
            await api.patch(`admin/contacts/${id}/status`);
            addToast('Marked as Replied', 'success');
            fetchMessages();
        } catch (err) {
            addToast('Update failed', 'error');
        }
    };

    const handleDelete = async (id) => {
        if (window.confirm('Are you sure you want to delete this message?')) {
            try {
                await api.delete(`admin/contacts/${id}`);
                addToast('Message deleted', 'success');
                fetchMessages();
            } catch (err) {
                addToast('Delete failed', 'error');
            }
        }
    };

    if (loading) return <div className="p-10 text-center text-cyan-400">Loading messages...</div>;

    return (
        <div className="space-y-6 animate-fade-in p-4">
            <div className='flex flex-col md:flex-row justify-between items-center gap-4'>
                <div>
                    <h2 className="text-xl font-bold text-cyan-400">Customer Queries</h2>
                    <p className="text-gray-500 dark:text-gray-400 text-sm">Messages from the contact form</p>
                </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {messages.length === 0 ? (
                    <p className="text-gray-500">No messages found.</p>
                ) : (
                    messages.map((msg) => (
                        // FIXED: Added "group" class here so hover effects work on children
                        <div key={msg.id} className="group bg-white/5 border border-white/10 rounded-2xl p-6 hover:border-cyan-500/30 transition shadow-xl flex flex-col justify-between">
                            <div>
                                <div className="flex justify-between items-start mb-4">
                                    <div className='flex items-center gap-3'>
                                        <div className="w-10 h-10 flex items-center justify-center bg-cyan-500/20 text-cyan-400 rounded-lg">
                                            <User className="w-5 h-5" />
                                        </div>
                                        <div>
                                            <h3 className="font-bold text-lg text-white truncate w-32">{msg.name}</h3>
                                            <div className='flex items-center gap-1 text-xs text-blue-500'>
                                                <Mail className="w-3 h-3" />
                                                <span className="truncate w-32">{msg.email}</span>
                                            </div>
                                        </div>
                                    </div>

                                    <div className="flex gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                                        {/* Status Update Button */}
                                        <button
                                            onClick={() => handleStatusUpdate(msg.id)}
                                            className="p-2 bg-green-500/20 text-green-400 rounded-lg hover:bg-green-500/30 transition-colors"
                                            title="Mark as Replied"
                                        >
                                            <CheckCircle className="w-4 h-4" />
                                        </button>
                                        <a
                                            href={`mailto:${msg.email}?subject=Re: Query from VoltIQ`}
                                            className="p-2 bg-cyan-500/20 text-cyan-400 rounded-lg hover:bg-cyan-500/30 transition-colors"
                                            title="Reply via Email"
                                        >
                                            <Mail className="w-4 h-4" />
                                        </a>
                                        <button
                                            onClick={() => handleDelete(msg.id)}
                                            className="p-2 bg-red-500/20 text-red-400 rounded-lg hover:bg-red-500/30 transition-colors"
                                            title="Delete Query"
                                        >
                                            <Trash2 className="w-4 h-4" />
                                        </button>
                                    </div>
                                </div>

                                <div className="space-y-2">
                                    {msg.subject && (
                                        <p className="font-semibold text-sm text-cyan-100">
                                            <span className="text-gray-500 mr-2">Subject:</span>{msg.subject}
                                        </p>
                                    )}
                                    <div className='text-gray-300 text-sm italic bg-black/20 p-3 rounded-xl border border-white/5'>
                                        "{msg.message}"
                                    </div>
                                </div>
                            </div>

                            <div className='pt-4 mt-4 border-t border-white/10 flex items-center justify-end text-xs text-gray-400 gap-1'>
                                <Calendar className="w-3 h-3" />
                                {/* FIXED: Corrected msg reference for time */}
                                {new Date(msg.created_at).toLocaleDateString()} at {new Date(msg.created_at).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                            </div>
                        </div>
                    ))
                )}
            </div>
        </div>
    );
};

export default AdminContacts;