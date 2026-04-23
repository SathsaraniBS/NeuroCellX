import React, { useState, useEffect } from 'react';
import { Search, SlidersHorizontal, MapPin, Navigation, Heart, Share2, X, Zap } from 'lucide-react';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';

// Leaflet Imports
import { MapContainer, TileLayer, Marker, useMap } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import L from 'leaflet';

// Leaflet Marker Icon 
const markerIcon = new L.Icon({
    iconUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon.png',
    iconSize: [25, 41],
    iconAnchor: [12, 41],
});

// Leaflet Map Updater
function MapUpdater({ center }) {
    const map = useMap();
    useEffect(() => {
        if (center) {
            map.flyTo(center, 13);
        }
    }, [center, map]);
    return null;
}

function FindStations() {
    const [stationDetails, setStationDetails] = useState(null);
    const [stations, setStations] = useState([]);
    const [userLocation, setUserLocation] = useState([6.9271, 79.8612]); // Default: Colombo
    const [searchQuery, setSearchQuery] = useState(""); 
    const [activeFilter, setActiveFilter] = useState('All'); // Filter state

    useEffect(() => {
        navigator.geolocation.getCurrentPosition(
            (pos) => {
                const { latitude, longitude } = pos.coords;
                const initialLoc = [latitude, longitude];
                setUserLocation(initialLoc);
                fetchStations(latitude, longitude, 'All');
            },
            (err) => {
                console.error("Location access denied:", err);
                fetchStations(userLocation[0], userLocation[1], 'All');
            }
        );
    }, []);

    // Updated fetch function to include filters
    const fetchStations = async (lat, lng, filterType) => {
        try {
            // Passing filter to the backend
            const res = await fetch(`http://localhost:8000/api/nearby-stations?lat=${lat}&lng=${lng}&filter=${filterType}`);
            const data = await res.json();
            if (Array.isArray(data)) {
                setStations(data);
            }
        } catch (err) {
            console.error("Error fetching stations:", err);
        }
    };

    const handleFilterClick = (filter) => {
        setActiveFilter(filter);
        fetchStations(userLocation[0], userLocation[1], filter);
    };

    const searchCity = async () => {
        if (!searchQuery.trim()) return;
        try {
            const geoRes = await fetch(`https://nominatim.openstreetmap.org/search?format=json&q=${searchQuery}+Sri+Lanka`);
            const geoData = await geoRes.json();

            if (geoData && geoData.length > 0) {
                const newLat = parseFloat(geoData[0].lat);
                const newLng = parseFloat(geoData[0].lon);
                
                setUserLocation([newLat, newLng]);
                fetchStations(newLat, newLng, activeFilter); 
                setStationDetails(null);
            } else {
                alert("City not found. Please try again.");
            }
        } catch (error) {
            console.error("Search error:", error);
        }
    };

    const handleKeyPress = (e) => {
        if (e.key === 'Enter') searchCity();
    };

    const handleMarkerClick = (station) => {
        setStationDetails({
            name: station.AddressInfo.Title || "Unknown Station",
            rating: 4.6,
            reviews: Math.floor(Math.random() * 50) + 10,
            operator: station.OperatorInfo ? station.OperatorInfo.Title : "Independent Operator",
            address: `${station.AddressInfo.AddressLine1 || ''}, ${station.AddressInfo.Town || ''}`,
            distance: station.AddressInfo.Distance ? `${station.AddressInfo.Distance.toFixed(2)} km` : "N/A",
            price: station.UsageCost || "Check App / Free",
            available: Math.floor(Math.random() * 3) + 1, 
            total: station.NumberOfPoints || 2,
            hours: "Open 24/7",
            lat: station.AddressInfo.Latitude,
            lng: station.AddressInfo.Longitude
        });
    };

    return (
        <div className="min-h-screen bg-[#050816] text-white font-sans selection:bg-cyan-500/30 flex flex-col">
            <Navbar />

            <div className="flex-1 p-4 lg:p-6 flex flex-col max-w-[1600px] mx-auto w-full">
                <div className="mt-20 mb-8">
                    <h1 className="text-3xl font-bold text-white tracking-tight mb-1">Find Charging Stations</h1>
                    <p className="text-gray-400 text-sm mb-6">Locate and filter charging stations near you.</p>

                    <div className="flex flex-col md:flex-row gap-4 items-start md:items-center">
                        <div className="relative w-full md:max-w-md">
                            <Search 
                                className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4 cursor-pointer hover:text-cyan-400" 
                                onClick={searchCity}
                            />
                            <input 
                                type="text" 
                                placeholder="Search location (e.g. Kandy, Galle)..." 
                                value={searchQuery}
                                onChange={(e) => setSearchQuery(e.target.value)}
                                onKeyDown={handleKeyPress}
                                className="w-full pl-10 pr-4 py-2.5 bg-[#0f172a] border border-gray-700 rounded-xl focus:outline-none focus:border-cyan-500 focus:ring-1 focus:ring-cyan-500 text-sm text-white placeholder-gray-500 transition-all" 
                            />
                        </div>
                        
                        <button className="p-2.5 bg-[#0f172a] border border-gray-700 rounded-xl hover:border-gray-500 transition-colors">
                            <SlidersHorizontal className="w-4 h-4 text-gray-300" />
                        </button>

                        <div className="flex flex-wrap gap-2">
                            {['All', 'DC Fast', 'Level 2', 'Available Now', 'Free', '24/7'].map((filter) => (
                                <button 
                                    key={filter} 
                                    onClick={() => handleFilterClick(filter)}
                                    className={`px-4 py-2 rounded-lg text-sm font-medium transition-all border ${
                                        activeFilter === filter 
                                        ? "bg-gradient-to-r from-cyan-500 to-blue-500 text-white border-transparent shadow-lg shadow-cyan-500/20" 
                                        : "bg-[#0f172a] border-gray-700 text-gray-300 hover:bg-gray-800 hover:text-white"
                                    }`}
                                >
                                    {filter}
                                </button>
                            ))}
                        </div>
                    </div>
                </div>

                <div className="flex-1 flex flex-col lg:flex-row gap-6 min-h-[600px]">
                    <div className="flex-1 bg-[#0b0f19] rounded-2xl relative overflow-hidden shadow-xl border border-gray-800/60">
                        <MapContainer 
                            center={userLocation} 
                            zoom={12} 
                            style={{ height: '100%', width: '100%', zIndex: 0 }}
                        >
                            <MapUpdater center={userLocation} />
                            <TileLayer
                                attribution='© <a href="https://carto.com/">CartoDB</a>'
                                url="https://{s}.basemaps.cartocdn.com/dark_all/{z}/{x}/{y}{r}.png"
                            />
                            {stations.map((station) => (
                                <Marker 
                                    key={station.ID} 
                                    position={[station.AddressInfo.Latitude, station.AddressInfo.Longitude]}
                                    icon={markerIcon}
                                    eventHandlers={{
                                        click: () => handleMarkerClick(station),
                                    }}
                                />
                            ))}
                        </MapContainer>

                        <div className="absolute bottom-6 left-6 bg-[#0f172a]/90 backdrop-blur-md px-5 py-3 rounded-xl shadow-xl flex space-x-6 text-xs font-medium border border-gray-700/50 z-[1000]">
                            <span className="flex items-center text-gray-300"><div className="w-2.5 h-2.5 rounded-full bg-emerald-400 mr-2"></div> Available</span>
                            <span className="flex items-center text-gray-300"><div className="w-2.5 h-2.5 rounded-full bg-yellow-400 mr-2"></div> In Use</span>
                            <span className="flex items-center text-gray-300"><div className="w-2.5 h-2.5 rounded-full bg-gray-500 mr-2"></div> Offline</span>
                        </div>
                    </div>

                    {stationDetails && (
                        <div className="w-full lg:w-[400px] bg-[#0b0f19] border border-gray-800 rounded-2xl shadow-2xl p-6 flex flex-col h-full overflow-y-auto animate-fadeIn">
                            <div className="flex justify-between items-center mb-6">
                                <h2 className="text-lg font-bold text-white flex items-center">
                                    <MapPin className="w-5 h-5 mr-2 text-cyan-500" />
                                    Station Details
                                </h2>
                                <button onClick={() => setStationDetails(null)} className="text-gray-500 hover:text-white transition-colors bg-gray-800/50 p-1.5 rounded-lg">
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
                                            <span className="text-cyan-500 ml-1.5">({stationDetails.reviews} reviews)</span>
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
                                <div className="flex"><span className="w-28 text-gray-400 shrink-0">Address</span><span className="font-medium text-gray-200">{stationDetails.address}</span></div>
                                <div className="flex"><span className="w-28 text-gray-400 shrink-0">Distance</span><span className="font-medium text-gray-200">{stationDetails.distance}</span></div>
                                <div className="flex"><span className="w-28 text-gray-400 shrink-0">Price</span><span className="font-medium text-cyan-400">{stationDetails.price}</span></div>
                                <div className="flex"><span className="w-28 text-gray-400 shrink-0">Hours</span><span className="font-medium text-gray-200">{stationDetails.hours}</span></div>
                            </div>

                            <div className="mt-auto space-y-3">
                                <button 
                                    onClick={() => window.open(`https://www.google.com/maps/dir/?api=1&destination=${stationDetails.lat},${stationDetails.lng}`, '_blank')}
                                    className="w-full bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-400 hover:to-blue-500 text-white font-bold py-3.5 rounded-xl flex justify-center items-center shadow-lg shadow-blue-500/25 transition-all transform hover:-translate-y-0.5"
                                >
                                    <Navigation className="w-5 h-5 mr-2" /> Start Navigation
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