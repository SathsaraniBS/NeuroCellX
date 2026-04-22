import React, { useState, useEffect } from 'react';
import { Battery, Zap, Clock, Coins, ChevronDown, Info } from 'lucide-react';

const EVCalculator = () => {
    const [rates, setRates] = useState({});
    const [capacity, setCapacity] = useState(40);
    const [tariff, setTariff] = useState(50);
    const [charger, setCharger] = useState(7.2);
    const [selectedCurrency, setSelectedCurrency] = useState('LKR');

    useEffect(() => {
        fetch("http://127.0.0.1:8000/api/calculator/get-rates")
            .then(res => res.json())
            .then(data => setRates(data))
            .catch(err => console.error("Error fetching rates. Falling back to default:", err));
    }, []);

    const calculateCost = () => {
        // Capacity (kWh) * Tariff (Price per kWh)
        const costInCurrentCurrency = capacity * tariff;
        return costInCurrentCurrency.toLocaleString(undefined, {
            minimumFractionDigits: 2,
            maximumFractionDigits: 2
        });
    };

    const chargingTime = (capacity / charger).toFixed(2);

    return (
        <div className="flex flex-col items-center justify-center p-6 bg-[#050816] min-h-[80vh] font-sans selection:bg-cyan-500/30 text-white relative overflow-hidden">

            {/* Background Glow Effects */}
            <div className="absolute top-1/4 left-1/4 w-[500px] h-[500px] bg-cyan-600/10 blur-[120px] rounded-full pointer-events-none" />
            <div className="absolute bottom-1/4 right-1/4 w-[500px] h-[500px] bg-emerald-600/10 blur-[120px] rounded-full pointer-events-none" />

            <div className="relative z-10 w-full max-w-5xl">
                <div className="text-center mb-10">
                    <div className="inline-flex items-center gap-2 px-4 py-2 mb-4 rounded-full border border-cyan-500/30 bg-cyan-500/10 text-cyan-400 font-bold tracking-widest uppercase text-xs shadow-[0_0_20px_rgba(6,182,212,0.2)]">
                        <Zap size={14} className="fill-cyan-400" />
                        <span>Cost Estimator</span>
                    </div>
                    <h1 className="text-3xl md:text-4xl font-black text-white uppercase tracking-tight">
                        Calculate Your <span className="text-cyan-400">Home Charging</span> Costs
                    </h1>
                </div>

                {/* Main Calculator Card */}
                <div className="bg-[#0a1122]/80 backdrop-blur-xl shadow-2xl rounded-3xl overflow-hidden border border-white/10 flex flex-col lg:flex-row">

                    {/* Inputs Section */}
                    <div className="p-8 lg:p-10 flex-1 grid grid-cols-1 gap-10">

                        {/* Battery Capacity Slider */}
                        <div className="group">
                            <div className="flex justify-between items-end mb-4">
                                <label className="text-cyan-400 text-xs font-bold uppercase tracking-wider flex items-center gap-2">
                                    <Battery size={16} /> Vehicle Battery Capacity
                                </label>
                                <div className="text-2xl font-black text-white">{capacity} <span className="text-sm text-slate-400 font-bold">kWh</span></div>
                            </div>
                            <input
                                type="range" min="10" max="100"
                                value={capacity}
                                onChange={(e) => setCapacity(Number(e.target.value))}
                                className="w-full h-2 bg-slate-800 rounded-lg appearance-none cursor-pointer accent-cyan-500 hover:accent-cyan-400 transition-all"
                            />
                            <div className="flex justify-between text-xs text-slate-500 mt-2 font-bold uppercase">
                                <span>10 kWh</span>
                                <span>100 kWh</span>
                            </div>
                        </div>

                        {/* Electricity Tariff Slider */}
                        <div className="group">
                            <div className="flex justify-between items-end mb-4">
                                <label className="text-cyan-400 text-xs font-bold uppercase tracking-wider flex items-center gap-2">
                                    <Coins size={16} /> Electricity Tariff
                                </label>
                                <div className="flex items-center gap-3">
                                    <div className="relative">
                                        <select
                                            className="appearance-none bg-slate-800 border border-slate-700 text-white text-sm font-bold py-1 pl-3 pr-8 rounded-lg focus:outline-none focus:border-cyan-500 cursor-pointer"
                                            value={selectedCurrency}
                                            onChange={(e) => setSelectedCurrency(e.target.value)}
                                        >
                                            {Object.keys(rates).length > 0 ? (
                                                Object.keys(rates).map(currency => (
                                                    <option key={currency} value={currency}>{currency}</option>
                                                ))
                                            ) : (
                                                <option value="LKR">LKR</option>
                                            )}
                                        </select>
                                        <ChevronDown size={14} className="absolute right-2 top-1/2 -translate-y-1/2 text-slate-400 pointer-events-none" />
                                    </div>
                                    <div className="text-2xl font-black text-white">{tariff} <span className="text-sm text-slate-400 font-bold">/ kWh</span></div>
                                </div>
                            </div>
                            <input
                                type="range" min="1" max="200"
                                value={tariff}
                                onChange={(e) => setTariff(Number(e.target.value))}
                                className="w-full h-2 bg-slate-800 rounded-lg appearance-none cursor-pointer accent-cyan-500 hover:accent-cyan-400 transition-all"
                            />
                            <div className="flex justify-between text-xs text-slate-500 mt-2 font-bold uppercase">
                                <span>1 Unit</span>
                                <span>200 Units</span>
                            </div>
                        </div>

                        {/* Charger Capacity Dropdown */}
                        <div>
                            <label className="text-cyan-400 text-xs font-bold uppercase tracking-wider flex items-center gap-2 mb-4">
                                <Zap size={16} /> Charger Capacity
                            </label>
                            <div className="relative">
                                <select
                                    className="w-full appearance-none bg-slate-800 border border-slate-700 py-4 pl-4 pr-10 rounded-xl font-bold text-white focus:outline-none focus:border-cyan-500 transition-colors cursor-pointer shadow-inner"
                                    value={charger}
                                    onChange={(e) => setCharger(parseFloat(e.target.value))}
                                >
                                    <option value="3.3">3.3 kWh (Standard / Slow)</option>
                                    <option value="7.2">7.2 kWh (Wallbox / Fast)</option>
                                    <option value="11.0">11.0 kWh (3-Phase / Very Fast)</option>
                                    <option value="22.0">22.0 kWh (Commercial AC)</option>
                                </select>
                                <ChevronDown size={20} className="absolute right-4 top-1/2 -translate-y-1/2 text-cyan-500 pointer-events-none" />
                            </div>
                        </div>
                    </div>

                    {/* Results Display Section */}
                    <div className="lg:w-[400px] flex flex-col border-t lg:border-t-0 lg:border-l border-white/10">

                        {/* Cost Result */}
                        <div className="flex-1 bg-gradient-to-br from-cyan-900/40 to-[#0a1122] p-8 flex flex-col justify-center items-center relative overflow-hidden group hover:from-cyan-900/60 transition-colors duration-500">
                            <div className="absolute top-0 right-0 w-32 h-32 bg-cyan-500/10 rounded-full blur-2xl group-hover:bg-cyan-500/20 transition-all" />
                            <p className="text-cyan-400 text-xs font-bold mb-4 uppercase tracking-widest">Total Charging Cost</p>
                            <div className="flex items-baseline gap-2">
                                <span className="text-2xl font-bold text-slate-400">{selectedCurrency}</span>
                                <span className="text-5xl lg:text-6xl font-black text-transparent bg-clip-text bg-gradient-to-b from-white to-cyan-100 tracking-tight">
                                    {calculateCost()}
                                </span>
                            </div>
                        </div>

                        {/* Time Result */}
                        <div className="bg-gradient-to-br from-emerald-900/40 to-[#0a1122] border-t border-white/5 p-8 flex flex-col justify-center items-center relative overflow-hidden group hover:from-emerald-900/60 transition-colors duration-500">
                            <div className="absolute bottom-0 left-0 w-32 h-32 bg-emerald-500/10 rounded-full blur-2xl group-hover:bg-emerald-500/20 transition-all" />
                            <p className="text-emerald-400 text-xs font-bold mb-4 uppercase tracking-widest flex items-center gap-2">
                                <Clock size={14} /> Estimated Time
                            </p>
                            <div className="flex items-baseline gap-1">
                                <span className="text-4xl lg:text-5xl font-black text-white tracking-tight">
                                    {chargingTime}
                                </span>
                                <span className="text-xl font-bold text-emerald-400">Hours</span>
                            </div>
                        </div>

                    </div>
                </div>

                {/* Fixed & Styled Bottom Information Section */}
                <div className="mt-6 w-full flex flex-col gap-4">
                    <p className="text-slate-500 text-lg font-italic px-2">
                        *Disclaimer: This calculator provides approximate time and cost estimates. Actual results may vary.
                    </p>

                    <div className="bg-[#0a1122]/60 backdrop-blur-md p-5 rounded-xl border border-cyan-500/20 shadow-[0_0_15px_rgba(6,182,212,0.05)] flex flex-col sm:flex-row gap-4 items-start">
                        <div className="bg-cyan-500/10 p-2 rounded-lg mt-1 hidden sm:block">
                            <Info size={24} className="text-cyan-400" />
                        </div>
                        <div>
                            <h3 className="text-cyan-400 font-bold text-lg mb-2 flex items-center gap-2">
                                <span className="sm:hidden"><Info size={16} /></span> Fun Fact
                            </h3>
                            <p className="text-slate-300 text-sm leading-relaxed">
                                Charging your EV regularly at home can be very pocket-friendly.
                                For example, the cost of running the <strong className="text-white">MG Comet EV</strong> is less than a large-sized cheese pizza.
                                It's <strong className="text-cyan-300">{selectedCurrency} {(2000 * (rates[selectedCurrency] / rates['LKR']) || 2000).toFixed(0)}*</strong> only!
                            </p>
                            <p className="text-slate-500 text-lg font-italic mt-2">
                                *Running cost calculated over 1000km/month based on average efficiency.
                            </p>
                        </div>
                    </div>
                </div>
            </div>

            <style>{`
        /* Customizing range slider thumbs for Webkit (Chrome, Safari, Edge) */
        input[type=range]::-webkit-slider-thumb {
          -webkit-appearance: none;
          appearance: none;
          width: 20px;
          height: 20px;
          border-radius: 50%;
          background: #06b6d4; /* Tailwind cyan-500 */
          cursor: pointer;
          box-shadow: 0 0 15px rgba(6, 182, 212, 0.6);
          border: 2px solid #fff;
        }
        
        /* Customizing range slider thumbs for Firefox */
        input[type=range]::-moz-range-thumb {
          width: 20px;
          height: 20px;
          border-radius: 50%;
          background: #06b6d4;
          cursor: pointer;
          box-shadow: 0 0 15px rgba(6, 182, 212, 0.6);
          border: 2px solid #fff;
        }
      `}</style>
        </div>
    );
};

export default EVCalculator;