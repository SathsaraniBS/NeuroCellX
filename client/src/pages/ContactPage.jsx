import { Mail, Phone, MapPin, Send, Clock, MessageSquare, User, Tag, ShieldCheck } from 'lucide-react';
import { useSettings } from '../contexts/SettingsContext';
import { useState } from 'react';
import { useToast } from '../contexts/ToastContext';
import api from '../api/api';
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";

const ContactPage = () => {
    const { settings } = useSettings();
    const { addToast } = useToast();

    // State management for the form
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        subject: '',
        message: ''
    });
    const [sending, setSending] = useState(false);

    // Handle input changes dynamically
    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setSending(true);
        try {
            await api.post('/contacts/', formData);
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
            title: 'VoltIQ HQ',
            details: settings.address || 'Colombo Tech Hub, Sri Lanka',
            description: 'AI-powered EV Battery Intelligence Center'
        },
        {
            icon: Phone,
            title: 'EV Support Line',
            details: settings.contactPhone || '+94 77 123 4567',
            description: '24/7 Battery Monitoring & Support'
        },
        {
            icon: Mail,
            title: 'Support Email',
            details: settings.contactEmail || 'support@voltiq.ai',
            description: 'AI assistance & technical help'
        },
        {
            icon: Clock,
            title: 'System Availability',
            details: settings.operationalHours || '24/7 Active Monitoring',
            description: 'Real-time EV battery tracking system'
        }
    ];

    return (
        <div className="pt-24 pb-20 min-h-screen bg-[#050816] text-white font-sans">
            <Navbar />

            <div className="max-w-7xl mx-auto grid md:grid-cols-2 gap-10 px-6 py-12">

                {/* Contact Cards */}
                <div className="lg:col-span-1 space-y-6 w-[90%] md:w-[85%] lg:w-[75%] mx-auto md:mx-0">
                    {contactInfo.map((info, index) => (
                        <div
                            key={index}
                            className="group relative p-6 rounded-2xl bg-white/5 backdrop-blur-xl border border-white/10 hover:border-cyan-400/60 transition-all duration-500 flex items-start gap-5 hover:-translate-y-1 hover:shadow-[0_0_25px_rgba(34,211,238,0.25)]"
                            style={{ animationDelay: `${index * 100}ms` }}
                        >

                            {/* Glow Border Effect */}
                            <div className="absolute inset-0 rounded-2xl bg-gradient-to-r from-cyan-500/10 via-green-400/10 to-blue-500/10 opacity-0 group-hover:opacity-100 blur-xl transition duration-500"></div>

                            {/* Icon */}
                            <div className="relative w-14 h-14 rounded-xl bg-gradient-to-br from-cyan-500/20 to-green-400/20 flex items-center justify-center shrink-0 border border-white/10 group-hover:from-cyan-400 group-hover:to-green-400 group-hover:shadow-[0_0_15px_rgba(34,211,238,0.6)] transition-all duration-500"
                            >
                                <info.icon className="w-7 h-7 text-cyan-400 group-hover:text-white transition-colors duration-300" />
                            </div>

                            {/* Text Content */}
                            <div className="relative space-y-1">
                                <h3 className="font-semibold text-white text-lg tracking-wide">
                                    {info.title}
                                </h3>

                                <p className="text-green-400 font-medium text-sm">
                                    {info.details}
                                </p>

                                <p className="text-xs text-gray-400">
                                    {info.description}
                                </p>
                            </div>
                        </div>
                    ))}
                </div>

                {/* CONTACT FORM */}
                <div>
                    <h2 className="text-4xl font-bold mb-4">Contact Us</h2>
                    <p className="text-gray-400 mb-8">
                        Have questions or need support? Reach out to us and we'll help you out.
                    </p>

                    <form onSubmit={handleSubmit} className="bg-white/5 backdrop-blur-xl p-8 rounded-2xl border border-white/10 shadow-xl space-y-5">
                        {/* Name */}
                        <div className="relative">
                            <User className="absolute left-3 top-3 text-cyan-400" size={18} />
                            <input
                                type="text"
                                name="name"
                                value={formData.name}
                                onChange={handleChange}
                                className="w-full pl-10 pr-4 py-3 bg-white/5 border border-white/10 rounded-xl focus:outline-none focus:ring-2 focus:ring-cyan-400 text-white placeholder-gray-500"
                                placeholder="Full Name"
                                required
                            />
                        </div>

                        {/* Email */}
                        <div className="relative">
                            <Mail className="absolute left-3 top-3 text-cyan-400" size={18} />
                            <input
                                type="email"
                                name="email"
                                value={formData.email}
                                onChange={handleChange}
                                className="w-full pl-10 pr-4 py-3 bg-white/5 border border-white/10 rounded-xl focus:outline-none focus:ring-2 focus:ring-cyan-400 text-white placeholder-gray-500"
                                placeholder="Email Address"
                                required
                            />
                        </div>

                        {/* Subject */}
                        <div className="relative">
                            <Tag className="absolute left-3 top-3 text-cyan-400" size={18} />
                            <input
                                type="text"
                                name="subject"
                                value={formData.subject}
                                onChange={handleChange}
                                className="w-full pl-10 pr-4 py-3 bg-white/5 border border-white/10 rounded-xl focus:outline-none focus:ring-2 focus:ring-cyan-400 text-white placeholder-gray-500"
                                placeholder="Subject"
                                required
                            />
                        </div>

                        {/* Message */}
                        <div className="relative">
                            <MessageSquare className="absolute left-3 top-3 text-cyan-400" size={18} />
                            <textarea
                                name="message"
                                value={formData.message}
                                onChange={handleChange}
                                rows="4"
                                className="w-full pl-10 pr-4 py-3 bg-white/5 border border-white/10 rounded-xl focus:outline-none focus:ring-2 focus:ring-cyan-400 text-white placeholder-gray-500"
                                placeholder="How can we help you?"
                                required
                            ></textarea>
                        </div>

                        <div className="flex flex-col sm:flex-row items-center justify-between gap-6 pt-4">
                            <div className="flex items-center gap-2 text-luxury-500 dark:text-gray-400 text-sm">
                                <ShieldCheck className="w-4 h-4 text-gold-500" />
                                Your data is protected by our privacy policy.
                            </div>

                            {/* Submit Button */}
                            <button
                                type="submit"
                                disabled={sending}
                                className="w-full px-10 py-4 rounded-xl font-bold text-lg bg-gradient-to-r from-cyan-400 to-green-400 text-black hover:opacity-90 transition duration-300 shadow-lg shadow-cyan-500/20 flex justify-center items-center gap-2">
                                {sending ? "Sending..." : (
                                    <>
                                        Send Message <Send size={20} />
                                    </>
                                )}
                            </button>
                        </div>
                    </form>
                </div>

               

                {/* RIGHT SIDE - CONTACT INFO */}
                {/* <div className="space-y-8">
                    <div className="relative group">
                        <img
                            src="src/assets/img1.jpg"
                            alt="Contact Support"
                            className="w-full rounded-2xl shadow-2xl border border-white/10 drop-shadow-[0_0_20px_rgba(34,211,238,0.2)]"
                        />
                        <div className="absolute inset-0 bg-gradient-to-tr from-cyan-500/10 to-transparent rounded-2xl"></div>
                    </div> */}

                    {/* Contact Cards Grid */}
                    {/* <div className="grid sm:grid-cols-2 gap-4">
                        {contactInfo.map((info, index) => (
                            <div key={index} className="p-5 bg-white/5 border border-white/10 rounded-2xl hover:border-cyan-400/50 transition-colors">
                                <info.icon className="text-cyan-400 mb-3" size={24} />
                                <h4 className="font-bold text-lg">{info.title}</h4>
                                <p className="text-sm text-gray-300 mt-1">{info.details}</p>
                                <p className="text-xs text-gray-500 mt-2">{info.description}</p>
                            </div>
                        ))}
                    </div> */}
                {/* </div> */}
            </div>

            <Footer />
        </div>
    );
}

export default ContactPage;