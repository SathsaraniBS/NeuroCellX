import { Mail, Phone, MapPin, Send, Clock, MessageSquare, ShieldCheck, Globe, Locate } from 'lucide-react';
import { useSettings } from '../contexts/SettingsContext';
import { useState } from 'react';
import { useToast } from '../contexts/ToastContext';
import api from '../api/api';

const ContactPage = () => {
    const { settings } = useSettings();
    const { addToast } = useToast();
    const [formData, setFormData] = useState({ name: '', email: '', subject: '', message: '' });
    const [sending, setSending] = useState(false);

    const handleSubmit = async (e) => {
        e.preventDefault();
        setSending(true);
        try {
            await api.post('/contacts', formData);
            addToast('Message sent! We will get back to you soon.', 'success');
            setFormData({ name: '', email: '', subject: '', message: '' });
        } catch (error) {
            addToast(error.response?.data?.message || 'Failed to send message. Please try again.', 'error');
        } finally {
            setSending(false);
        }
    };

    const contactInfo = [
        {
            icon: MapPin,
            title: 'Our Location',
            details: settings.address || '123 Visionary Blvd, Innovation City, Future State',
            description: 'Visit our flagship complex'
        },
        {
            icon: Phone,
            title: 'Phone Number',
            details: settings.contactPhone || '+1 (555) 123-4567',
            description: 'Mon - Sun: 9:00 AM - 11:00 PM'
        },
        {
            icon: Mail,
            title: 'Email Address',
            details: settings.contactEmail || 'voltIQ@.com',
            description: 'We respond within 24 hours'
        },
        {
            icon: Clock,
            title: 'Operational Hours',
            details: settings.operationalHours || 'Mon - Sun: 9:00 AM - 11:00 PM',
            description: 'Box office and lounge'
        }
    ];

    return (
        <div className="pt-24 pb-20 dark:bg-black transition-colors duration-500 min-h-screen">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                {/* Header Section */}
                <div className="text-center max-w-3xl mx-auto mb-20 animate-fade-in">
                    <h1 className="text-5xl md:text-6xl font-serif font-bold text-luxury-900 dark:text-white mb-6 tracking-tight">
                        Get In <span className="text-gold-500 italic">Touch</span>
                    </h1>
                    <div className="w-24 h-1 bg-gold-500 mx-auto mb-8 rounded-full" />
                    <p className="text-xl text-luxury-600 dark:text-luxury-200 font-light leading-relaxed">
                        Whether you have a question about our services, or want to share your experience, we're here to listen and assist you.
                    </p>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-3 gap-12 lg:gap-8">
                    {/* Contact Cards */}
                    <div className="lg:col-span-1 space-y-6">
                        {contactInfo.map((info, index) => (
                            <div
                                key={index}
                                className="group glass-card p-6 rounded-2xl border border-luxury-200 dark:border-white/5 hover:border-gold-500/50 transition-all duration-500 flex items-start gap-5 hover:-translate-y-1"
                                style={{ animationDelay: `${index * 100}ms` }}
                            >
                                <div className="w-14 h-14 rounded-2xl bg-gold-500/10 flex items-center justify-center shrink-0 group-hover:bg-gold-500 group-hover:text-white transition-all duration-500">
                                    <info.icon className="w-7 h-7 text-gold-500 group-hover:text-white transition-colors" />
                                </div>
                                <div className="space-y-1">
                                    <h3 className="font-bold text-luxury-900 dark:text-white text-lg">{info.title}</h3>
                                    <p className="text-gold-600 dark:text-gold-400 font-medium text-sm">{info.details}</p>
                                    <p className="text-xs text-luxury-500 dark:text-luxury-400">{info.description}</p>
                                </div>
                            </div>
                        ))}
                    </div>

                    {/* Contact Form */}
                    <div className="lg:col-span-2">
                        <div className="glass-card p-8 md:p-10 rounded-[2.5rem] border border-luxury-200 dark:border-white/5 relative overflow-hidden">
                            <div className="absolute top-0 right-0 w-64 h-64 bg-gold-500/5 rounded-full blur-3xl -mr-32 -mt-32" />

                            <div className="relative z-10">
                                <div className="flex items-center gap-3 mb-8">
                                    <div className="w-8 h-8 rounded-lg bg-gold-500 flex items-center justify-center">
                                        <MessageSquare className="w-4 h-4 text-black" />
                                    </div>
                                    <h2 className="text-2xl font-bold text-luxury-900 dark:text-white">Send us a Message</h2>
                                </div>

                                <form onSubmit={handleSubmit} className="space-y-6">
                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                        <div className="space-y-2">
                                            <label className="text-sm font-semibold text-luxury-700 dark:text-gray-300 ml-1">Your Name</label>
                                            <input
                                                type="text"
                                                required
                                                value={formData.name}
                                                onChange={e => setFormData({ ...formData, name: e.target.value })}
                                                className="w-full bg-luxury-100 dark:bg-white/5 border border-luxury-200 dark:border-white/10 rounded-2xl px-5 py-4 text-luxury-900 dark:text-white focus:border-gold-500 outline-none transition-all placeholder:text-luxury-400 dark:placeholder:text-gray-600"
                                                placeholder="John Doe"
                                            />
                                        </div>
                                        <div className="space-y-2">
                                            <label className="text-sm font-semibold text-luxury-700 dark:text-gray-300 ml-1">Email Address</label>
                                            <input
                                                type="email"
                                                required
                                                value={formData.email}
                                                onChange={e => setFormData({ ...formData, email: e.target.value })}
                                                className="w-full bg-luxury-100 dark:bg-white/5 border border-luxury-200 dark:border-white/10 rounded-2xl px-5 py-4 text-luxury-900 dark:text-white focus:border-gold-500 outline-none transition-all placeholder:text-luxury-400 dark:placeholder:text-gray-600"
                                                placeholder="john@example.com"
                                            />
                                        </div>
                                    </div>
                                    <div className="space-y-2">
                                        <label className="text-sm font-semibold text-luxury-700 dark:text-gray-300 ml-1">Subject</label>
                                        <input
                                            type="text"
                                            required
                                            value={formData.subject}
                                            onChange={e => setFormData({ ...formData, subject: e.target.value })}
                                            className="w-full bg-luxury-100 dark:bg-white/5 border border-luxury-200 dark:border-white/10 rounded-2xl px-5 py-4 text-luxury-900 dark:text-white focus:border-gold-500 outline-none transition-all placeholder:text-luxury-400 dark:placeholder:text-gray-600"
                                            placeholder="How can we help?"
                                        />
                                    </div>
                                    <div className="space-y-2">
                                        <label className="text-sm font-semibold text-luxury-700 dark:text-gray-300 ml-1">Message</label>
                                        <textarea
                                            rows="5"
                                            required
                                            value={formData.message}
                                            onChange={e => setFormData({ ...formData, message: e.target.value })}
                                            className="w-full bg-luxury-100 dark:bg-white/5 border border-luxury-200 dark:border-white/10 rounded-2xl px-5 py-4 text-luxury-900 dark:text-white focus:border-gold-500 outline-none transition-all placeholder:text-luxury-400 dark:placeholder:text-gray-600 resize-none"
                                            placeholder="Write your message here..."
                                        />
                                    </div>

                                    <div className="flex flex-col sm:flex-row items-center justify-between gap-6 pt-4">
                                        <div className="flex items-center gap-2 text-luxury-500 dark:text-gray-400 text-sm">
                                            <ShieldCheck className="w-4 h-4 text-gold-500" />
                                            Your data is protected by our privacy policy.
                                        </div>
                                        <button
                                            type="submit"
                                            disabled={sending}
                                            className="w-full sm:w-auto bg-gold-500 hover:bg-gold-400 text-black px-10 py-4 rounded-2xl font-bold shadow-xl shadow-gold-500/20 transition-all hover:-translate-y-1 active:scale-95 flex items-center justify-center gap-3 group disabled:opacity-50"
                                        >
                                            {sending ? 'Sending...' : 'Send Message'}
                                            {!sending && <Send className="w-4 h-4 group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" />}
                                        </button>
                                    </div>
                                </form>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Map Section */}
                <div className="mt-20 animate-fade-in">
                    <div className="text-center mb-10">
                        <h2 className="text-3xl md:text-4xl font-serif font-bold text-luxury-900 dark:text-white mb-3">
                            Find <span className="text-gold-500 italic">Us</span>
                        </h2>
                        <p className="text-luxury-600 dark:text-luxury-300 text-sm md:text-base">Visit our flagship cinema complex for the ultimate experience</p>
                    </div>

                    <div className="relative rounded-2xl md:rounded-[3rem] overflow-hidden glass-card border border-luxury-200 dark:border-white/5 h-[300px] sm:h-[400px] lg:h-[500px] group shadow-2xl shadow-black/10">
                        {/* Gradient Overlays */}
                        <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent z-10 pointer-events-none" />
                        <div className="absolute inset-0 bg-gradient-to-r from-black/30 via-transparent to-transparent z-10 pointer-events-none" />

                        {/* Map iframe */}
                        <iframe
                            title="CINEMANIA Location"
                            src={settings.mapUrl || "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d193595.15830869428!2d-74.119763973046!3d40.69766374874431!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x89c24fa5d33f083b%3A0xc80b8f06e177fe62!2sNew%20York%2C%20NY%2C%20USA!5e0!3m2!1sen!2s!4v1709193740266!5m2!1sen!2s"}
                            width="100%"
                            height="100%"
                            style={{ border: 0 }}
                            allowFullScreen=""
                            loading="lazy"
                            referrerPolicy="no-referrer-when-downgrade"
                            className="transition-transform duration-700 group-hover:scale-105"
                        />

                        {/* Location Card - Responsive */}
                        <div className="absolute bottom-4 left-4 right-4 sm:bottom-6 sm:left-6 sm:right-auto z-20">
                            <div className="backdrop-blur-xl bg-white/90 dark:bg-black/80 p-4 sm:p-5 rounded-xl sm:rounded-2xl border border-white/20 dark:border-white/10 shadow-2xl max-w-xs sm:max-w-sm">
                                <div className="flex items-start gap-3">
                                    <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-xl bg-gold-500 flex items-center justify-center shrink-0 shadow-lg shadow-gold-500/30">
                                        <Locate className="w-5 h-5 sm:w-6 sm:h-6 text-black" />
                                    </div>
                                    <div className="min-w-0">
                                        <h3 className="font-bold text-luxury-900 dark:text-white text-sm sm:text-base truncate">
                                            {settings.siteName || 'CINEMANIA'} Grand Central
                                        </h3>
                                        <p className="text-gold-600 dark:text-gold-400 text-xs sm:text-sm font-medium">Headquarters & Cinema</p>
                                        <p className="text-luxury-500 dark:text-gray-400 text-xs mt-1 line-clamp-2">
                                            {settings.address || '123 Luxury Lane, Cinema District, Star City'}
                                        </p>
                                    </div>
                                </div>
                                <a
                                    href={`https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(settings.address || 'Times Square, New York')}`}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="mt-3 w-full flex items-center justify-center gap-2 bg-gold-500 hover:bg-gold-400 text-black text-xs sm:text-sm font-bold py-2.5 px-4 rounded-xl transition-all hover:-translate-y-0.5 active:scale-95"
                                >
                                    <MapPin className="w-4 h-4" />
                                    Get Directions
                                </a>
                            </div>
                        </div>

                        {/* Decorative corner accent */}
                        <div className="absolute top-4 right-4 sm:top-6 sm:right-6 z-20">
                            <div className="backdrop-blur-md bg-white/10 dark:bg-black/40 px-3 py-1.5 rounded-full border border-white/20 dark:border-white/10">
                                <span className="text-white text-xs font-medium flex items-center gap-1.5">
                                    <span className="w-2 h-2 bg-green-400 rounded-full animate-pulse" />
                                    Open Now
                                </span>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ContactPage;
