import React from 'react'

const Footer = () => {
  return (
    <div className="bg-black text-white py-12 border-t border-white/10">
      <div className="max-w-7xl mx-auto px-6">
        <div className="flex flex-col md:flex-row justify-between items-center">
          <div className="text-2xl font-semibold tracking-wide mb-4 md:mb-0">
            <span className="bg-gradient-to-r from-cyan-400 to-lime-400 bg-clip-text text-transparent">
              VoltIQ
            </span>
          </div>
          <div className="text-gray-400 text-sm">
            © 2025 VoltIQ. All rights reserved.
          </div>
        </div>
      </div>
    </div>
  )
}

export default Footer
