import React, { useState, useEffect } from 'react';
import { Search, SlidersHorizontal, MapPin, Navigation, Heart, Share2, PenLine, X, Zap } from 'lucide-react'; // Make sure to npm install lucide-react
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
function FindStations() {
    const [stationDetails, setStationDetails] = useState(null);

    // In a real app, you would fetch this from your FastAPI backend:
    // useEffect(() => { fetch('http://localhost:8000/api/stations/1').then(res => res.json()).then(data => setStationDetails(data)) }, [])

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
            <div className="flex-1 p-6 flex flex-col">
                {/* Header & Filters */}
                <div className="mb-4">
                    <h1 className="text-2xl font-bold text-gray-900">Find Charging Stations</h1>
                    <p className="text-gray-500 text-sm mb-4">Locate and filter charging stations near you.</p>

                    <div className="flex flex-wrap gap-3 items-center">
                        <div className="relative flex-1 max-w-md">
                            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
                            <input type="text" placeholder="Search location or station name..." className="w-full pl-10 pr-4 py-2 border rounded-lg focus:outline-none focus:border-blue-500 text-sm" />
                        </div>
                        <button className="p-2 border rounded-lg hover:bg-gray-50"><SlidersHorizontal className="w-4 h-4 text-gray-600" /></button>
                        <div className="flex space-x-2">
                            <button className="px-4 py-2 bg-blue-600 text-white rounded-lg text-sm font-medium">All</button>
                            <button className="px-4 py-2 border bg-white text-gray-600 rounded-lg text-sm font-medium hover:bg-gray-50">DC Fast</button>
                            <button className="px-4 py-2 border bg-white text-gray-600 rounded-lg text-sm font-medium hover:bg-gray-50">Level 2</button>
                            <button className="px-4 py-2 border bg-white text-gray-600 rounded-lg text-sm font-medium hover:bg-gray-50">Available Now</button>
                            <button className="px-4 py-2 border bg-white text-gray-600 rounded-lg text-sm font-medium hover:bg-gray-50">Free</button>
                            <button className="px-4 py-2 border bg-white text-gray-600 rounded-lg text-sm font-medium hover:bg-gray-50">24/7</button>
                        </div>
                    </div>
                </div>

                {/* Map and Details Area */}
                <div className="flex-1 flex gap-6 min-h-[600px]">

                    {/* Map Area Placeholder */}
                    <div className="flex-1 bg-[#e5e7eb] rounded-xl relative overflow-hidden shadow-sm border border-gray-200">
                        {/* Note: Replace this div with Google Maps / React-Leaflet component */}
                        <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/cubes.png')] opacity-30 mix-blend-multiply"></div>

                        {/* Mock Pin */}
                        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-white p-2 rounded-lg shadow-lg flex items-center space-x-2 border">
                            <div className="bg-red-600 p-1.5 rounded-full"><Zap className="w-4 h-4 text-white" /></div>
                            <div>
                                <p className="text-sm font-bold text-gray-900">VoltIQ Supercharger</p>
                                <p className="text-xs text-gray-500">650 m away</p>
                                <p className="text-xs font-medium text-emerald-600 bg-emerald-50 inline-block px-1 rounded mt-1">2 / 4 free</p>
                            </div>
                        </div>

                        {/* Map Legend */}
                        <div className="absolute bottom-4 left-4 bg-white px-4 py-2 rounded-full shadow flex space-x-4 text-xs font-medium border">
                            <span className="flex items-center"><div className="w-2 h-2 rounded-full bg-emerald-500 mr-2"></div> Available</span>
                            <span className="flex items-center"><div className="w-2 h-2 rounded-full bg-yellow-500 mr-2"></div> In Use</span>
                            <span className="flex items-center"><div className="w-2 h-2 rounded-full bg-gray-400 mr-2"></div> Offline</span>
                            <span className="flex items-center"><div className="w-2 h-2 rounded-full bg-red-600 mr-2"></div> Tesla</span>
                        </div>
                    </div>

                    {/* Station Details Sidebar */}
                    {stationDetails && (
                        <div className="w-96 bg-white border rounded-xl shadow-sm p-5 flex flex-col h-full overflow-y-auto">
                            <div className="flex justify-between items-start mb-4">
                                <h2 className="font-bold text-gray-900">Station Details</h2>
                                <button className="text-gray-400 hover:text-gray-600"><X className="w-5 h-5" /></button>
                            </div>

                            <div className="flex items-center justify-between mb-6">
                                <div className="flex items-center space-x-3">
                                    <div className="w-10 h-10 bg-red-50 rounded flex items-center justify-center">
                                        <Zap className="w-6 h-6 text-red-600" />
                                    </div>
                                    <div>
                                        <h3 className="font-bold text-lg text-gray-900">{stationDetails.name}</h3>
                                        <div className="flex items-center text-xs text-gray-500">
                                            <span className="text-yellow-400 mr-1">★</span> {stationDetails.rating} <span className="text-blue-500 ml-1">({stationDetails.reviews} reviews)</span>
                                        </div>
                                    </div>
                                </div>
                                <div className="bg-emerald-50 text-emerald-600 text-xs font-bold px-2 py-1 rounded">
                                    {stationDetails.available} / {stationDetails.total} free
                                </div>
                            </div>

                            <div className="space-y-4 text-sm mb-6">
                                <div className="flex"><span className="w-24 text-gray-500">Operator</span><span className="font-medium">{stationDetails.operator}</span></div>
                                <div className="flex"><span className="w-24 text-gray-500">Address</span><span className="font-medium text-gray-800">{stationDetails.address}</span></div>
                                <div className="flex"><span className="w-24 text-gray-500">Distance</span><span className="font-medium">{stationDetails.distance} away</span></div>
                                <div className="flex"><span className="w-24 text-gray-500">Price per kWh</span><span className="font-medium">{stationDetails.price}</span></div>
                                <div className="flex"><span className="w-24 text-gray-500">Availability</span><span className="font-medium text-emerald-600">{stationDetails.available} / {stationDetails.total} free</span></div>

                                <div className="flex pt-2">
                                    <span className="w-24 text-gray-500">Connectors</span>
                                    <div className="flex space-x-4">
                                        <div className="text-center"><div className="w-8 h-8 bg-gray-100 rounded mb-1 mx-auto"></div><span className="text-[10px] text-gray-500">CCS1<br />(150kW)</span></div>
                                        <div className="text-center"><div className="w-8 h-8 bg-gray-100 rounded mb-1 mx-auto"></div><span className="text-[10px] text-gray-500">CCS2<br />(150kW)</span></div>
                                        <div className="text-center"><Zap className="w-8 h-8 text-red-600 mx-auto" /><span className="text-[10px] text-gray-500">Tesla<br />NACS</span></div>
                                    </div>
                                </div>

                                <div className="flex"><span className="w-24 text-gray-500">Hours</span><span className="font-medium">{stationDetails.hours}</span></div>
                            </div>

                            <div className="flex space-x-2 mb-6">
                                <span className="bg-blue-50 text-blue-600 text-xs px-3 py-1 rounded-full">Free Parking</span>
                                <span className="bg-blue-50 text-blue-600 text-xs px-3 py-1 rounded-full">Shopping</span>
                                <span className="bg-blue-50 text-blue-600 text-xs px-3 py-1 rounded-full">Restaurant</span>
                            </div>

                            <div className="mb-6">
                                <h4 className="text-sm font-bold mb-2">Photos</h4>
                                <div className="flex space-x-2 overflow-x-auto">
                                    {/* Placeholders for photos */}
                                    <div className="w-24 h-16 bg-gray-200 rounded shrink-0"></div>
                                    <div className="w-24 h-16 bg-gray-200 rounded shrink-0"></div>
                                    <div className="w-24 h-16 bg-gray-200 rounded shrink-0"></div>
                                </div>
                            </div>

                            <div className="mt-auto space-y-3">
                                <button className="w-full bg-blue-600 text-white font-medium py-3 rounded-lg flex justify-center items-center hover:bg-blue-700">
                                    <Navigation className="w-4 h-4 mr-2" /> Start navigation
                                </button>
                                <div className="flex space-x-3">
                                    <button className="flex-1 border text-gray-600 font-medium py-2 rounded-lg flex justify-center items-center hover:bg-gray-50">
                                        <Heart className="w-4 h-4 mr-2" /> Add to favorites
                                    </button>
                                    <button className="flex-1 border text-gray-600 font-medium py-2 rounded-lg flex justify-center items-center hover:bg-gray-50">
                                        <Share2 className="w-4 h-4 mr-2" /> Share
                                    </button>
                                </div>
                                <button className="w-full border text-blue-600 font-medium py-2 rounded-lg flex justify-center items-center hover:bg-blue-50">
                                    <PenLine className="w-4 h-4 mr-2" /> Write a review
                                </button>
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