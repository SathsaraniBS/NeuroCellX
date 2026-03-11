import React from "react";
import Footer from "../components/Footer";

const ResetPassword = () => {
  return (
     <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-[#030712] via-[#071b2f] to-[#020617] text-white relative overflow-hidden">
      {/* Background glow */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(0,255,255,0.08),transparent_70%)]" />

      <div className="mt-10 relative z-10 w-full max-w-md px-6">
        {/* Logo */}
        <h1 className="text-4xl font-semibold text-center tracking-wide">
          <span className="text-white">Volt</span>
          <span className="bg-gradient-to-r from-cyan-400 to-green-400 bg-clip-text text-transparent">
            IQ
          </span>
        </h1>


        

        

      {/* Main Content */}
      <div className="flex flex-1 items-center justify-center px-10">

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
              BSS <span className="text-gray-400">Bandara</span>
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

      <Footer />
    </div>
  );
};

export default ResetPassword;