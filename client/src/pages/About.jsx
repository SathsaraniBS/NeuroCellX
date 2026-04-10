import React from 'react';

const HomeFeatures = () => {
  return (
    <div className="max-w-6xl mx-auto px-6 py-16 font-sans bg-white">
      {/* Main Heading */}
      <h2 className="text-center text-[#2b6cb0] font-bold text-xl md:text-2xl mb-14 uppercase tracking-wider">
        From the comfort of your home
      </h2>

      {/* Grid Container for the 3 columns */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-10 text-center">
        
        {/* Column 1: Easy and convenient */}
        <div className="flex flex-col items-center">
          {/* Icon */}
          <div className="text-[#38b2ac] mb-6">
            <svg width="80" height="80" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
              <path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"></path>
              <path d="M9 22V12h6v10"></path>
            </svg>
          </div>
          {/* Title */}
          <h3 className="text-2xl font-bold text-[#38a1c5] mb-4">Easy and convenient</h3>
          {/* Description */}
          <p className="text-gray-600 text-[15px] leading-relaxed">
            Just like your phones and computers, you can charge your EVs at home with an AC Fast Charger. These smart chargers are easy to operate through mobile apps and you can remotely start or stop your charging sessions.
          </p>
        </div>

        {/* Column 2: Less expensive */}
        <div className="flex flex-col items-center">
          {/* Icon */}
          <div className="text-[#38b2ac] mb-6">
            <svg width="80" height="80" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
              <path d="M19 14c1.49-1.46 3-3.21 3-5.5A5.5 5.5 0 0 0 16.5 3c-1.76 0-3 .5-4.5 2-1.5-1.5-2.74-2-4.5-2A5.5 5.5 0 0 0 2 8.5c0 2.3 1.5 4.05 3 5.5l7 7Z"></path>
            </svg>
          </div>
          {/* Title */}
          <h3 className="text-2xl font-bold text-[#38a1c5] mb-4">Less expensive</h3>
          {/* Description */}
          <p className="text-gray-600 text-[15px] leading-relaxed">
            Around 52%* Indians reported that fuel hikes have highly impacted them. With EVs, you can save more since the electricity tariff** at homes is much lower than conventional fuel rates!
            <br /><br />
            Most EVs come with a portable charging cable which is compatible with a 15 Ampere charging cable. Along with that, you can also get an AC Fast charger installed at home or
          </p>
        </div>

        {/* Column 3: Safe and Secure */}
        <div className="flex flex-col items-center">
          {/* Icon */}
          <div className="text-[#38b2ac] mb-6">
            <svg width="80" height="80" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
              <path d="M14 9V5a3 3 0 0 0-3-3l-4 9v11h11.28a2 2 0 0 0 2-1.7l1.38-9a2 2 0 0 0-2-2.3zM7 22H4a2 2 0 0 1-2-2v-7a2 2 0 0 1 2-2h3"></path>
            </svg>
          </div>
          {/* Title */}
          <h3 className="text-2xl font-bold text-[#38a1c5] mb-4">Safe and Secure</h3>
          {/* Description */}
          <p className="text-gray-600 text-[15px] leading-relaxed">
            By charging your EV at home/offices, you can charge in a familiar, safe and secure environment
          </p>
        </div>

      </div>
    </div>
  );
};

export default HomeFeatures;