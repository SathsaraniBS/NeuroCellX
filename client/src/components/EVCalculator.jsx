import React, { useState, useEffect } from 'react';
import axios from 'axios';

const EVCalculator = () => {
    const [battery, setBattery] = useState(30); // kWh
    const [tariff, setTariff] = useState(4);    // Per unit price
    const [charger, setCharger] = useState(3.3); // kW
    const [results, setResults] = useState({ cost: 120, time: 9.09 });
    const [currency, setCurrency] = useState("INR");

    // Backend එකට කතා කර දත්ත ලබා ගැනීම
    const calculateData = async () => {
        try {
            const response = await axios.get(`http://localhost:8000/api/calculator/calculate`, {
                params: {
                    battery_kwh: battery,
                    charger_kw: charger,
                    country_code: "ANY"
                }
            });
            setResults({
                cost: response.data.total_cost,
                time: response.data.charging_time_hours
            });
        } catch (error) {
            console.error("Error fetching data:", error);
        }
    };

    // Slider එකක් වෙනස් කරන සෑම විටම ගණනය කිරීම සිදු කරයි
    useEffect(() => {
        calculateData();
    }, [battery, tariff, charger]);

    return (
        <div className="flex flex-col items-center p-10 bg-gray-50 min-h-screen">
            <h1 className="text-2xl font-bold text-blue-900 mb-8 uppercase tracking-wide">
                Wondering how much will you be spending on charging your EV at home?
            </h1>

            <div className="bg-white shadow-2xl rounded-xl flex flex-col md:flex-row w-full max-w-5xl overflow-hidden border border-gray-100">
                {/* Inputs Section */}
                <div className="flex-1 p-8 grid grid-cols-1 md:grid-cols-2 gap-10">
                    <div className="flex items-center space-x-4 col-span-2 border-b pb-4">
                         <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center text-blue-600 font-bold text-xl">₹</div>
                         <h2 className="text-gray-500 font-medium">Home Charging Calculator</h2>
                    </div>

                    {/* Battery Slider */}
                    <div>
                        <label className="block text-blue-900 font-bold mb-2 text-sm">Vehicle battery capacity</label>
                        <div className="text-2xl font-black text-blue-800 mb-2">{battery}KWh</div>
                        <input type="range" min="10" max="100" value={battery} onChange={(e) => setBattery(e.target.value)}
                            className="w-full h-1.5 bg-blue-200 rounded-lg appearance-none cursor-pointer accent-blue-600" />
                        <div className="flex justify-between text-xs text-gray-400 mt-2"><span>from 10KWh</span><span>to 100KWh</span></div>
                    </div>

                    {/* Tariff Slider */}
                    <div>
                        <label className="block text-blue-900 font-bold mb-2 text-sm">Electricity tariff in your state</label>
                        <div className="text-2xl font-black text-blue-800 mb-2">₹{tariff}</div>
                        <input type="range" min="1" max="50" value={tariff} onChange={(e) => setTariff(e.target.value)}
                            className="w-full h-1.5 bg-blue-200 rounded-lg appearance-none cursor-pointer accent-blue-600" />
                        <div className="flex justify-between text-xs text-gray-400 mt-2"><span>from ₹1</span><span>to ₹50</span></div>
                    </div>

                    {/* Charger Selection */}
                    <div className="col-span-1">
                        <label className="block text-blue-900 font-bold mb-2 text-sm">Charger Capacity</label>
                        <select className="w-full border-b-2 border-blue-200 py-2 outline-none focus:border-blue-600 font-semibold" 
                                value={charger} onChange={(e) => setCharger(e.target.value)}>
                            <option value="3.3">3.3KWh</option>
                            <option value="7.2">7.2KWh</option>
                            <option value="11">11KWh</option>
                        </select>
                    </div>

                    {/* Time Display (Green Box) */}
                    <div className="col-span-2 bg-green-700 text-white p-6 rounded-lg mt-4">
                        <p className="text-sm font-bold opacity-80 uppercase">Charging time</p>
                        <h3 className="text-4xl font-black">{results.time}h</h3>
                    </div>
                </div>

                {/* Right Result Section */}
                <div className="w-full md:w-64 bg-blue-600 text-white p-10 flex flex-col justify-center items-center text-center">
                    <p className="text-lg font-bold opacity-90 mb-4">Charging cost</p>
                    <h1 className="text-5xl font-black">₹{results.cost}</h1>
                </div>
            </div>
            
            <p className="mt-6 text-sm text-gray-500 italic">*Disclaimer: This calculator provides approximate time and cost estimates.</p>
        </div>
    );
};

export default EVCalculator;