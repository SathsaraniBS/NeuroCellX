import { Mail, Phone, MapPin, Send, Clock, MessageSquare, User, Tag } from 'lucide-react';
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
            details: settings.address || '123 Luxury Lane, Cinema District Star City, SC 90210',
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
            details: settings.contactEmail || 'support@voltIQ.com',
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
        <div className="pt-24 pb-20 min-h-screen bg-[#050816] text-white font-sans">
            <Navbar />

            <div className="max-w-7xl mx-auto grid md:grid-cols-2 gap-10 px-6 py-12">

                {/* LEFT SIDE - FORM */}
                <div>
                    <h2 className="text-4xl font-bold mb-4">Contact Us</h2>
                    <p className="text-gray-400 mb-8">
                        Have questions or need support? Reach out to us and we'll help you out.
                    </p>

                    <form onSubmit={handleSubmit} className=" space-y-5">
                        <div className="mt-8 bg-white/5 backdrop-blur-xl p-6 rounded-2xl border border-white/10 shadow-xl ">

                            {/* Name */}
                            <div className="relative mb-4">
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
                            <div className="relative mb-4">
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
                            <div className="relative mb-4">
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
                            <div className="relative mb-6">
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

                            {/* Submit Button */}
                            <button
                                type="submit"
                                disabled={sending}
                                className="w-full py-4 rounded-xl font-bold text-lg bg-gradient-to-r from-cyan-400 to-green-400 text-black hover:opacity-90 transition duration-300 shadow-lg shadow-cyan-500/20 flex justify-center items-center gap-2">
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
                <div className="space-y-8">
                    {/* Visual Element */}
                    <div className="relative group">
                        <img
                            src="src/assets/img1.jpg"
                            alt="Contact Support"
                            className="w-full rounded-2xl shadow-2xl border border-white/10 drop-shadow-[0_0_20px_rgba(34,211,238,0.2)]"
                        />
                        <div className="absolute inset-0 bg-gradient-to-tr from-cyan-500/10 to-transparent rounded-2xl"></div>
                    </div>

                    {/* Contact Cards Grid */}
                    <div className="grid sm:grid-cols-2 gap-4">
                        {contactInfo.map((info, index) => (
                            <div key={index} className="p-5 bg-white/5 border border-white/10 rounded-2xl hover:border-cyan-400/50 transition-colors">
                                <info.icon className="text-cyan-400 mb-3" size={24} />
                                <h4 className="font-bold text-lg">{info.title}</h4>
                                <p className="text-sm text-gray-300 mt-1">{info.details}</p>
                                <p className="text-xs text-gray-500 mt-2">{info.description}</p>
                            </div>
                        ))}
                    </div>
                </div>
            </div>

            <Footer />
        </div>
    );
}

export default ContactPage;