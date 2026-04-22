import React, { useState, useEffect } from 'react';
import { Search, SlidersHorizontal, MapPin, Navigation, Heart, Share2, PenLine, X, Zap, Info } from 'lucide-react';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';

function FindStations() {
    const [stationDetails, setStationDetails] = useState(null);

    // Mocking the data load for the UI demonstration
    useEffect(() => {
        setStationDetails({
            name: "VoltIQ Supercharger",
            rating: 4.6,
            reviews: 128,
            operator: "VoltIQ Network",
            address: "123 Greenway Blvd, San Jose, CA 95111",
            distance: "650 m",
            price: "$0.28 / kWh",
            available: 2,
            total: 4,
            hours: "Open 24/7"
        });
    }, []);

    return (
        <div className="min-h-screen bg-[#050816] text-white font-sans selection:bg-cyan-500/30 flex flex-col">
            <Navbar />

            {/* Main Content */}
            <div className="flex-1 p-4 lg:p-6 flex flex-col max-w-[1600px] mx-auto w-full">
                {/* Header & Filters */}
                <div className="mt-20 mb-8">
                    <h1 className="text-3xl font-bold text-white tracking-tight mb-1">Find Charging Stations</h1>
                    <p className="text-gray-400 text-sm mb-6">Locate and filter charging stations near you.</p>

                    <div className="flex flex-col md:flex-row gap-4 items-start md:items-center">
                        {/* Search Bar */}
                        <div className="relative w-full md:max-w-md">
                            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
                            <input 
                                type="text" 
                                placeholder="Search location or station name..." 
                                className="w-full pl-10 pr-4 py-2.5 bg-[#0f172a] border border-gray-700 rounded-xl focus:outline-none focus:border-cyan-500 focus:ring-1 focus:ring-cyan-500 text-sm text-white placeholder-gray-500 transition-all" 
                            />
                        </div>
                        
                        {/* Filter Toggle */}
                        <button className="p-2.5 bg-[#0f172a] border border-gray-700 rounded-xl hover:border-gray-500 transition-colors">
                            <SlidersHorizontal className="w-4 h-4 text-gray-300" />
                        </button>

                        {/* Filter Pills */}
                        <div className="flex flex-wrap gap-2">
                            <button className="px-4 py-2 bg-gradient-to-r from-cyan-500 to-blue-500 text-white rounded-lg text-sm font-semibold shadow-lg shadow-cyan-500/20 border border-transparent">
                                All
                            </button>
                            {['DC Fast', 'Level 2', 'Available Now', 'Free', '24/7'].map((filter) => (
                                <button key={filter} className="px-4 py-2 bg-[#0f172a] border border-gray-700 text-gray-300 rounded-lg text-sm font-medium hover:bg-gray-800 hover:text-white transition-colors">
                                    {filter}
                                </button>
                            ))}
                        </div>
                    </div>
                </div>

                {/* Map and Details Area */}
                <div className="flex-1 flex flex-col lg:flex-row gap-6 min-h-[600px]">

                    {/* Map Area Placeholder */}
                    <div className="flex-1 bg-[#0b0f19] rounded-2xl relative overflow-hidden shadow-xl border border-gray-800/60 flex items-center justify-center">
                        {/* Note: Replace this div with Google Maps / React-Leaflet component configured for Dark Mode */}
                        <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/cubes.png')] opacity-10 mix-blend-screen"></div>

                        {/* Mock Map Grid lines for visual structure */}
                        <div className="absolute inset-0" style={{ backgroundImage: 'linear-gradient(#1e293b 1px, transparent 1px), linear-gradient(90deg, #1e293b 1px, transparent 1px)', backgroundSize: '40px 40px', opacity: 0.3 }}></div>

                        {/* Mock Pin */}
                        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-[#0f172a] p-2.5 rounded-xl shadow-2xl flex items-center space-x-3 border border-gray-700 z-10 hover:border-cyan-500 transition-colors cursor-pointer">
                            <div className="bg-gradient-to-br from-cyan-400 to-blue-500 p-2 rounded-lg shadow-inner">
                                <Zap className="w-5 h-5 text-white" />
                            </div>
                            <div className="pr-2">
                                <p className="text-sm font-bold text-white">VoltIQ Supercharger</p>
                                <p className="text-xs text-gray-400 mb-1">650 m away</p>
                                <span className="text-[10px] font-bold text-emerald-400 bg-emerald-400/10 px-2 py-0.5 rounded-md border border-emerald-400/20">
                                    2 / 4 free
                                </span>
                            </div>
                        </div>

                        {/* Map Legend */}
                        <div className="absolute bottom-6 left-6 bg-[#0f172a]/90 backdrop-blur-md px-5 py-3 rounded-xl shadow-xl flex space-x-6 text-xs font-medium border border-gray-700/50">
                            <span className="flex items-center text-gray-300"><div className="w-2.5 h-2.5 rounded-full bg-emerald-400 mr-2 shadow-[0_0_8px_rgba(52,211,153,0.6)]"></div> Available</span>
                            <span className="flex items-center text-gray-300"><div className="w-2.5 h-2.5 rounded-full bg-yellow-400 mr-2 shadow-[0_0_8px_rgba(250,204,21,0.6)]"></div> In Use</span>
                            <span className="flex items-center text-gray-300"><div className="w-2.5 h-2.5 rounded-full bg-gray-500 mr-2"></div> Offline</span>
                        </div>
                    </div>

                    {/* Station Details Sidebar */}
                    {stationDetails && (
                        <div className="w-full lg:w-[400px] bg-[#0b0f19] border border-gray-800 rounded-2xl shadow-2xl p-6 flex flex-col h-full overflow-y-auto">
                            <div className="flex justify-between items-center mb-6">
                                <h2 className="text-lg font-bold text-white flex items-center">
                                    <MapPin className="w-5 h-5 mr-2 text-cyan-500" />
                                    Station Details
                                </h2>
                                <button className="text-gray-500 hover:text-white transition-colors bg-gray-800/50 p-1.5 rounded-lg">
                                    <X className="w-4 h-4" />
                                </button>
                            </div>

                            <div className="flex items-start justify-between mb-8 pb-6 border-b border-gray-800">
                                <div className="flex items-start space-x-4">
                                    <div className="w-12 h-12 bg-gradient-to-br from-cyan-500/20 to-blue-500/20 border border-cyan-500/30 rounded-xl flex items-center justify-center shrink-0">
                                        <Zap className="w-6 h-6 text-cyan-400" />
                                    </div>
                                    <div>
                                        <h3 className="font-bold text-xl text-white tracking-tight">{stationDetails.name}</h3>
                                        <div className="flex items-center text-sm text-gray-400 mt-1">
                                            <span className="text-yellow-400 mr-1.5">★</span> {stationDetails.rating} 
                                            <span className="text-cyan-500 hover:text-cyan-400 cursor-pointer ml-1.5 transition-colors">({stationDetails.reviews} reviews)</span>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            <div className="space-y-5 text-sm mb-8">
                                <div className="flex justify-between items-center">
                                    <span className="text-gray-400">Availability</span>
                                    <span className="font-semibold text-emerald-400 bg-emerald-400/10 px-3 py-1 rounded-lg border border-emerald-400/20">
                                        {stationDetails.available} / {stationDetails.total} free
                                    </span>
                                </div>
                                <div className="flex"><span className="w-28 text-gray-400 shrink-0">Operator</span><span className="font-medium text-gray-200">{stationDetails.operator}</span></div>
                                <div className="flex"><span className="w-28 text-gray-400 shrink-0">Address</span><span className="font-medium text-gray-200 leading-relaxed">{stationDetails.address}</span></div>
                                <div className="flex"><span className="w-28 text-gray-400 shrink-0">Distance</span><span className="font-medium text-gray-200">{stationDetails.distance} away</span></div>
                                <div className="flex"><span className="w-28 text-gray-400 shrink-0">Price</span><span className="font-medium text-cyan-400">{stationDetails.price}</span></div>
                                
                                <div className="pt-3 pb-1">
                                    <span className="block text-gray-400 mb-3">Connectors</span>
                                    <div className="flex space-x-3">
                                        <div className="flex-1 bg-[#151b2b] border border-gray-800 rounded-xl p-3 text-center flex flex-col items-center justify-center hover:border-gray-600 transition-colors">
                                            <div className="w-8 h-8 bg-gray-700/50 rounded-full mb-2 flex items-center justify-center text-xs font-bold text-gray-400">CC</div>
                                            <span className="text-[11px] text-gray-400 font-medium">CCS1<br /><span className="text-white">150kW</span></span>
                                        </div>
                                        <div className="flex-1 bg-[#151b2b] border border-gray-800 rounded-xl p-3 text-center flex flex-col items-center justify-center hover:border-gray-600 transition-colors">
                                            <div className="w-8 h-8 bg-gray-700/50 rounded-full mb-2 flex items-center justify-center text-xs font-bold text-gray-400">CC</div>
                                            <span className="text-[11px] text-gray-400 font-medium">CCS2<br /><span className="text-white">150kW</span></span>
                                        </div>
                                        <div className="flex-1 bg-red-500/5 border border-red-500/20 rounded-xl p-3 text-center flex flex-col items-center justify-center hover:border-red-500/40 transition-colors">
                                            <Zap className="w-7 h-7 text-red-500 mb-2" />
                                            <span className="text-[11px] text-gray-400 font-medium">Tesla<br /><span className="text-white">NACS</span></span>
                                        </div>
                                    </div>
                                </div>

                                <div className="flex"><span className="w-28 text-gray-400 shrink-0">Hours</span><span className="font-medium text-gray-200">{stationDetails.hours}</span></div>
                            </div>

                            <div className="flex flex-wrap gap-2 mb-8">
                                {['Free Parking', 'Shopping', 'Restaurant'].map((amenity) => (
                                    <span key={amenity} className="bg-cyan-500/10 text-cyan-400 border border-cyan-500/20 text-xs font-medium px-3 py-1.5 rounded-lg">
                                        {amenity}
                                    </span>
                                ))}
                            </div>

                            <div className="mt-auto space-y-3">
                                <button className="w-full bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-400 hover:to-blue-500 text-white font-bold py-3.5 rounded-xl flex justify-center items-center shadow-lg shadow-blue-500/25 transition-all transform hover:-translate-y-0.5">
                                    <Navigation className="w-5 h-5 mr-2" /> Start Navigation
                                </button>
                                <div className="flex space-x-3">
                                    <button className="flex-1 bg-[#0f172a] border border-gray-700 text-gray-300 font-medium py-3 rounded-xl flex justify-center items-center hover:bg-gray-800 hover:text-white transition-colors">
                                        <Heart className="w-4 h-4 mr-2 text-gray-400" /> Save
                                    </button>
                                    <button className="flex-1 bg-[#0f172a] border border-gray-700 text-gray-300 font-medium py-3 rounded-xl flex justify-center items-center hover:bg-gray-800 hover:text-white transition-colors">
                                        <Share2 className="w-4 h-4 mr-2 text-gray-400" /> Share
                                    </button>
                                </div>
                            </div>
                        </div>
                    )}
                </div>
                </div>

            <Footer />
        </div>
    );
}

export default FindStations;