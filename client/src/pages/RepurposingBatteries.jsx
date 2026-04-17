import React, { useState } from 'react';
import { useLocation } from "react-router-dom";
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';

const RepurposingBatteries = () => {
  const location = useLocation(); // Ready to be used for route logic

  

  return (
    <div className="min-h-screen bg-[#050816] text-slate-200 flex flex-col font-sans selection:bg-cyan-500 selection:text-white relative z-0">
      <Navbar />

      <div className="flex-grow flex flex-col relative overflow-hidden">

        {/* Ambient Background Glows for EV Tech Feel */}
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[400px] bg-cyan-600/20 blur-[120px] rounded-full pointer-events-none -z-10"></div>
        <div className="absolute top-[40%] right-0 w-[400px] h-[400px] bg-emerald-600/10 blur-[100px] rounded-full pointer-events-none -z-10"></div>
        <div className="absolute bottom-0 left-[-10%] w-[500px] h-[500px] bg-blue-600/10 blur-[120px] rounded-full pointer-events-none -z-10"></div>

        {/* Hero Section */}
        <section className="relative flex-grow flex items-center justify-center pt-32 pb-16 px-6 sm:px-12 lg:px-24">
          <div className="max-w-4xl mx-auto text-center z-10">
            {/* Main Title with Gradient */}
            <h1 className="text-4xl md:text-5xl lg:text-7xl font-black mb-10 tracking-tight leading-tight uppercase">
                Breathe New Life: Repurposing Used Lithium-Ion Batteries (LIBs)
            </h1>

            {/* Glassmorphism Content Card */}
            <div className="bg-white/5 border border-white/10 rounded-3xl p-8 md:p-12 backdrop-blur-md shadow-2xl text-left transition-transform hover:scale-[1.01] duration-300">
              <h2 className="text-2xl md:text-3xl font-bold text-white mb-6 flex items-center gap-4">
                <span className="w-10 h-1.5 bg-gradient-to-r from-cyan-500 to-blue-500 rounded-full"></span>
                Introduction
              </h2>

              <div className="space-y-6">
                <p className="text-lg md:text-xl text-slate-300 leading-relaxed font-light">
                   With an objective to boost clean and sustainable transportation in India, the Ministry of Road Transport and Highways, Government of India, has unveiled an initiative known as EV30@30. The objective of this campaign is to reach the following electric vehicle adoption targets by 2030: 30% for newly registered private cars, 40% for buses, 70% for commercial vehicles, and 80% for two-wheelers and three-wheelers.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Core Architecture Section */}
        <section className="py-16 px-6 sm:px-12 lg:px-24 max-w-6xl mx-auto w-full relative">
          <div className="space-y-16">
            <div className="space-y-6">
             <h2 className="text-2xl md:text-3xl font-bold text-white mb-6 flex items-center gap-4">
                <span className="w-10 h-1.5 bg-gradient-to-r from-cyan-500 to-blue-500 rounded-full"></span>
                Structure of an EV battery:
              </h2>
              <p className="text-lg md:text-xl text-slate-300 leading-relaxed font-light">
                The lithium battery market in India is forecasted to register a CAGR of 17.21%. The market worth in 2020 was USD 1.66 billion, and the expectations for the year 2026 are USD 4.14 billion. The target of the Government of India is to achieve 30% EV sales by 2030 across all modes. (Source) India’s activeness towards the adoption of electric vehicles is driving the lithium battery market in India.

              </p>

                <p className="text-lg md:text-xl text-slate-300 leading-relaxed font-light">
                    According to a report by Bain & Co, around 12-13 million new 2-wheeler EVs and 1 million new 4-wheeler passenger vehicles will be sold in India annually by 2030. 

                </p>

                <P className="text-lg md:text-xl text-slate-300 leading-relaxed font-light">
                    This growth underscores the importance of lithium batteries in India’s EV revolution.

                </P>
            </div> 
          </div>
        </section>

        <section className="py-16 px-6 sm:px-12 lg:px-24 max-w-6xl mx-auto w-full relative">
          <div className="space-y-16">
            <div className="space-y-6">
             <h3 className="text-2xl md:text-3xl font-bold text-white mb-6 flex items-center gap-4">
                Add image
              </h3>
              <p className="text-lg md:text-xl text-slate-300 leading-relaxed font-light">
                As India steers towards a 30% EV adoption rate, the demand for lithium-ion batteries is escalating, requiring responsible disposal of used batteries. (Source)

              </p>
            </div> 

            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
              {/* Header Section */}
              <div className="text-center mb-16">
                <h2 className="text-2xl md:text-3xl font-bold text-[#38bdf8] mb-4">
                  Battery disposal and waste management
                </h2>
                <p className="text-base text-gray-800 max-w-4xl mx-auto">
                  Safe disposal of lithium batteries is imperative to avoid hazardous incidents and should be done in supervision of the authorised battery recycling experts Proper handling of EV batteries compliant with industry standards are essential. Failing to use appropriate and compliant packaging norms can lead to severe consequences, including fines, legal repercussions, and other damages.

                </p>

                <h2 className="text-2xl md:text-3xl font-bold text-[#38bdf8] mb-4">
                    Giving batteries a second life

                </h2>

                <p className="text-base text-gray-800 max-w-4xl mx-auto">
                  Used EV batteries which reach the ‘end of their life’ can be given a "second life" because they still retain a significant portion of their capacity. Instead of being discarded, these batteries can be repurposed for various applications, opening a world of possibilities for sustainable energy solutions.


                </p>

              </div>

            
            </div>
          </div>
        </section>
      </div>

      <Footer />
    </div>
  );
}

export default RepurposingBatteries;