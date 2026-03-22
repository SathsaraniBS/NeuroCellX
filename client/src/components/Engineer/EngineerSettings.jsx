import React from 'react'

function EngineerSettings() {
  return (
    <div className="min-h-screen w-full bg-gradient-to-br from-[#050b18] via-[#071b2f] to-[#020617] text-white flex flex-col items-center justify-center relative overflow-hidden">
        <h1 className="text-4xl font-bold mb-4">Engineer Settings</h1>
        <p className="text-gray-400 mb-8">Manage your account settings and preferences.</p>

        <div className="w-full max-w-md bg-white/5 backdrop-blur-xl p-6 rounded-2xl border border-white/10 shadow-xl">
            <h2 className="text-2xl font-semibold mb-4">Account Settings</h2>
            <form className="space-y-6">
                <div>
                    <label className="block text-sm font-medium mb-1" htmlFor="name">Name</label>
                    <input type="text" id="name" className="w-full px-4 py-3 bg-transparent border border-white/20 rounded-xl focus:outline-none focus:ring-2 focus:ring-cyan-400 text-white placeholder-gray-400" placeholder="Your Name" />
                </div>
                <div>
                    <label className="block text-sm font-medium mb-1" htmlFor="email">Email</label>
                    <input type="email" id="email" className="w-full px-4 py-3 bg-transparent border border-white/20 rounded-xl focus:outline-none focus:ring-2 focus:ring-cyan-400 text-white placeholder-gray-400" placeholder="Your Email" />
                </div>
                <div>
                    <label className="block text-sm font-medium mb-1" htmlFor="password">Password</label>
                    <input type="password" id="password" className="w-full px-4 py-3 bg-transparent border border-white/20 rounded-xl focus:outline-none focus:ring-2 focus:ring-cyan-400 text-white placeholder-gray-400" placeholder="New Password" />
                </div>
                <button type="submit" className="w-full py-3 bg-gradient-to-r from-cyan-400 to-green-400 text-black font-semibold rounded-xl hover:opacity-90 transition">
                    Update Settings
                </button>
            </form>
        </div>
      
    </div>
  )
}

export default EngineerSettings
