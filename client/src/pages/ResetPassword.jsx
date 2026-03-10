import React from "react";

const ResetPassword = () => {
  return (
    <div
      className="min-h-screen w-full text-white flex flex-col"
      style={{
        backgroundImage:
          "url('https://images.unsplash.com/photo-1531306728370-e2ebd9d7bb99')",
        backgroundSize: "cover",
        backgroundPosition: "center",
      }}
    >
      {/* Navbar */}
      <div className="flex justify-between items-center px-10 py-5 bg-black/30 backdrop-blur-md">
        <h1 className="text-2xl font-bold text-cyan-400">VoltIQ</h1>

        <div className="flex gap-8 text-gray-300">
          <span className="cursor-pointer hover:text-cyan-400">Dashboard</span>
          <span className="cursor-pointer hover:text-cyan-400">Predictions</span>
          <span className="cursor-pointer hover:text-cyan-400">History</span>
          <span className="cursor-pointer hover:text-cyan-400">Reports</span>
          <span className="cursor-pointer hover:text-cyan-400">Settings</span>
        </div>

        <div className="flex items-center gap-4">
          <span>🔔</span>
          <img
            src="https://randomuser.me/api/portraits/women/44.jpg"
            alt="profile"
            className="w-10 h-10 rounded-full border border-cyan-400"
          />
        </div>
      </div>

      {/* Main Content */}
      <div className="flex flex-1 items-center justify-center px-10">
        <div className="max-w-xl w-full bg-black/40 backdrop-blur-lg p-10 rounded-2xl shadow-xl">

          {/* Title */}
          <h2 className="text-4xl font-bold mb-2">Reset your password</h2>
          <p className="text-gray-300 mb-6">
            Enter your new password below. Make sure it's strong and secure.
          </p>

          {/* Profile */}
          <div className="flex items-center gap-4 mb-8">
            <img
              src="https://randomuser.me/api/portraits/women/44.jpg"
              alt="profile"
              className="w-14 h-14 rounded-full border-2 border-cyan-400"
            />
            <p className="text-lg font-semibold">
              Sathsarani <span className="text-gray-400">Perera</span>
            </p>
          </div>

          {/* Form */}
          <form className="flex flex-col gap-6">

            {/* New Password */}
            <div>
              <input
                type="password"
                placeholder="New password"
                className="w-full p-4 rounded-xl bg-black/40 border border-cyan-400 focus:outline-none focus:ring-2 focus:ring-cyan-400"
              />
            </div>

            {/* Confirm Password */}
            <div>
              <input
                type="password"
                placeholder="Confirm new password"
                className="w-full p-4 rounded-xl bg-black/40 border border-cyan-400 focus:outline-none focus:ring-2 focus:ring-cyan-400"
              />
            </div>

            {/* Strength */}
            <div>
              <p className="text-sm mb-1">
                Strength: <span className="text-green-400">Strong</span>
              </p>
              <div className="w-full h-2 bg-gray-700 rounded-full">
                <div className="h-2 bg-green-400 rounded-full w-4/5"></div>
              </div>
            </div>

            {/* Button */}
            <button
              type="submit"
              className="mt-4 p-4 rounded-xl text-lg font-semibold bg-gradient-to-r from-cyan-400 to-green-400 text-black hover:opacity-90 transition"
            >
              Reset Password
            </button>

            <p className="text-center text-gray-400 hover:text-cyan-400 cursor-pointer">
              Back to Sign In
            </p>

          </form>
        </div>
      </div>

      {/* Footer */}
      <div className="text-center text-gray-400 text-sm pb-6">
        <div className="flex justify-center gap-6 mb-2">
          <span>About</span>
          <span>Research</span>
          <span>Documentation</span>
          <span>Privacy Policy</span>
          <span>Contact</span>
          <span>GitHub</span>
        </div>
        © 2026 VoltIQ. All rights reserved.
      </div>
    </div>
  );
};

export default ResetPassword;