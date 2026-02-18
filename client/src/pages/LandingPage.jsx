import React from 'react';
// Note: Lucide-react is used for professional iconography
import { 
  Battery, Shield, Zap, Activity, Cpu, Database, 
  BarChart3, Lock, FileText, Share2, Server, Terminal, 
  UserCheck, HelpCircle, Mail, MessageSquare, Globe 
} from 'lucide-react';

const LandingPage = () => {
  return (
    <div className="bg-[#050a14] text-gray-200 font-sans min-h-screen selection:bg-blue-500/30">
      
      {/* --- 1. HERO SECTION --- */}
      <header className="relative overflow-hidden pt-20 pb-16 md:pt-32 md:pb-24 border-b border-white/5">
        <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-blue-600/10 blur-[120px] rounded-full -mr-48 -mt-48"></div>
        <div className="container mx-auto px-6 relative z-10 text-center">
          <div className="inline-flex items-center space-x-2 bg-blue-500/10 border border-blue-500/20 px-4 py-1.5 rounded-full mb-8">
            <Zap className="w-4 h-4 text-blue-400" />
            <span className="text-sm font-semibold text-blue-300 tracking-wide uppercase">VoltWise – Intelligent System</span>
          </div>
          <h1 className="text-5xl md:text-7xl font-bold mb-6 text-white tracking-tight leading-tight">
            AI-Powered Battery <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-emerald-400">Health Monitoring</span>
          </h1>
          <p className="text-xl md:text-2xl font-light mb-10 text-gray-400 max-w-3xl mx-auto leading-relaxed">
            Advanced machine learning models trained on real battery datasets to predict State of Charge (SOC), 
            State of Health (SOH), and Remaining Useful Life (RUL) with high accuracy.
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center space-y-4 sm:space-y-0 sm:space-x-6">
            <button className="px-10 py-4 bg-blue-600 hover:bg-blue-500 text-white font-bold rounded-lg transition-all transform hover:scale-105 shadow-[0_0_20px_rgba(37,99,235,0.4)]">
              Login
            </button>
            <button className="px-10 py-4 bg-white/5 hover:bg-white/10 border border-white/10 text-white font-bold rounded-lg flex items-center transition-all">
              <Zap className="w-5 h-5 mr-2 text-yellow-400" /> Explore Dashboard
            </button>
            <button className="px-8 py-4 text-gray-400 hover:text-white font-medium transition-colors">
              View Demo
            </button>
          </div>
          {/* Dashboard Mockup Placeholder */}
          <div className="mt-16 relative">
            <div className="bg-gradient-to-t from-[#050a14] to-transparent absolute inset-0 z-20 h-full w-full pointer-events-none"></div>
            <div className="rounded-xl border border-white/10 bg-white/5 p-2 shadow-2xl overflow-hidden max-w-5xl mx-auto">
               <div className="bg-[#0f172a] rounded-lg aspect-video flex items-center justify-center text-gray-600 italic">
                 [ Dashboard visualization: Graphs, 82% SOH, 24 days RUL ]
               </div>
            </div>
          </div>
        </div>
      </header>

      {/* --- 2 & 3. PROBLEM & SOLUTION SECTION --- */}
      <section className="py-24 bg-[#080f1d]">
        <div className="container mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-white mb-4">Why Battery Health Prediction Matters</h2>
            <p className="text-gray-400 max-w-2xl mx-auto italic underline decoration-blue-500/30">Understanding the real-world impact of degradation.</p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-20">
            {[
              { icon: <Battery className="text-orange-400" />, title: "Reduced EV Lifespan", text: "Battery degradation limits range and resale value." },
              { icon: <Shield className="text-red-400" />, title: "Unexpected Failures", text: "Risk of sudden power loss and roadside emergencies." },
              { icon: <Activity className="text-emerald-400" />, title: "Safety Concerns", text: "Real-time alerts to prevent thermal runaway risks." },
              { icon: <Zap className="text-blue-400" />, title: "Increased Maintenance", text: "Optimizing charging to extend cycle life." }
            ].map((item, idx) => (
              <div key={idx} className="bg-white/5 border border-white/10 p-6 rounded-xl hover:bg-white/[0.08] transition-all group">
                <div className="bg-white/5 w-12 h-12 rounded-lg flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                  {item.icon}
                </div>
                <h3 className="text-lg font-bold text-white mb-2">{item.title}</h3>
                <p className="text-sm text-gray-400 leading-relaxed">{item.text}</p>
              </div>
            ))}
          </div>

          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-white mb-4">Our Intelligent AI Solution</h2>
            <p className="text-gray-400 max-w-3xl mx-auto">
              We leverage state-of-the-art forecasting algorithms including **Random Forest**, **LSTM**, and **Gradient Boosting** to provide actionable insights.
            </p>
          </div>
        </div>
      </section>

      {/* --- 4. COMPREHENSIVE FEATURES --- */}
      <section className="py-24 border-t border-white/5">
        <div className="container mx-auto px-6">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              { icon: <BarChart3 className="text-blue-400" />, title: "Real-Time Analytics", desc: "Interactive dashboards with historical and predicted trends." },
              { icon: <Cpu className="text-purple-400" />, title: "ML Engine", desc: "Advanced regression and deep learning models for high accuracy." },
              { icon: <Database className="text-emerald-400" />, title: "Dataset Management", desc: "Upload, process, and validate multi-source battery datasets." },
              { icon: <Activity className="text-yellow-400" />, title: "Predictive Insights", desc: "Future degradation forecasting and early warning systems." },
              { icon: <UserCheck className="text-blue-300" />, title: "Role-Based Access", desc: "Custom views for Admins, Engineers, and Analysts." },
              { icon: <FileText className="text-orange-400" />, title: "Report Generation", desc: "Export CSV/PDF reports of SOH and RUL predictions." }
            ].map((feature, idx) => (
              <div key={idx} className="flex space-x-4 p-4 rounded-xl border border-transparent hover:border-white/10 hover:bg-white/5 transition-all">
                <div className="mt-1">{feature.icon}</div>
                <div>
                  <h4 className="text-white font-bold mb-1">{feature.title}</h4>
                  <p className="text-sm text-gray-400 leading-snug">{feature.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* --- 5. TECHNICAL SPECS & PERFORMANCE --- */}
      <section className="py-20 bg-blue-900/5">
        <div className="container mx-auto px-6">
          <h2 className="text-3xl font-bold text-white mb-10 text-center">Technical Specifications & Performance</h2>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 items-center">
            <div className="space-y-6">
              <div className="bg-white/5 border border-white/10 p-6 rounded-xl flex items-center justify-between">
                <div>
                  <h5 className="text-blue-400 font-bold">Algorithms Used</h5>
                  <p className="text-sm text-gray-400">Random Forest, LSTM, XGBoost</p>
                </div>
                <div className="text-right">
                  <span className="text-2xl font-bold text-white">97.8%</span>
                  <p className="text-xs text-gray-500 uppercase">Avg. Accuracy</p>
                </div>
              </div>
              <div className="bg-white/5 border border-white/10 p-6 rounded-xl">
                <h5 className="text-emerald-400 font-bold mb-2">System Architecture Flow</h5>
                <div className="flex items-center space-x-4 text-xs font-mono text-gray-400">
                  <span className="bg-white/10 p-2 rounded">Dataset</span>
                  <span className="text-blue-500">→</span>
                  <span className="bg-blue-500/20 p-2 rounded text-blue-300">FastAPI ML Model</span>
                  <span className="text-blue-500">→</span>
                  <span className="bg-emerald-500/20 p-2 rounded text-emerald-300">Prediction</span>
                  <span className="text-blue-500">→</span>
                  <span className="bg-white/10 p-2 rounded">React Dashboard</span>
                </div>
              </div>
            </div>
            {/* FAQ/Security preview */}
            <div className="bg-white/5 border border-white/10 p-8 rounded-xl">
              <div className="flex items-center mb-6">
                <Lock className="w-6 h-6 text-yellow-500 mr-3" />
                <h3 className="text-xl font-bold text-white">Data Security & Compliance</h3>
              </div>
              <p className="text-sm text-gray-400 mb-6 leading-relaxed">
                All uploaded battery data is encrypted using AES-256 standards. Our system is designed to be 
                GDPR compliant for institutional and academic research use.
              </p>
              <div className="space-y-4">
                <details className="group cursor-pointer">
                  <summary className="flex items-center justify-between text-white font-medium list-none">
                    How accurate is the RUL prediction?
                    <HelpCircle className="w-4 h-4 text-gray-500 group-open:rotate-180 transition-transform" />
                  </summary>
                  <p className="text-sm text-gray-500 mt-2 p-3 bg-white/5 rounded">Our models achieve less than 3% Mean Absolute Error on standard NASA datasets.</p>
                </details>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* --- 8. CTA SECTION --- */}
      <section className="py-24 relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-blue-900/40 to-emerald-900/40 opacity-30"></div>
        <div className="container mx-auto px-6 relative z-10 text-center">
          <h2 className="text-4xl font-bold text-white mb-6 tracking-tight">
            Start Monitoring Your EV Battery Intelligently Today
          </h2>
          <div className="flex flex-col sm:flex-row items-center justify-center space-y-4 sm:space-y-0 sm:space-x-4">
            <button className="px-12 py-4 bg-blue-600 hover:bg-blue-500 text-white font-bold rounded-lg shadow-xl">
              Login
            </button>
            <button className="px-12 py-4 bg-emerald-600 hover:bg-emerald-500 text-white font-bold rounded-lg shadow-xl">
              Request Access
            </button>
          </div>
        </div>
      </section>

      {/* --- 9. FOOTER --- */}
      <footer className="bg-[#030712] pt-20 pb-10 border-t border-white/5">
        <div className="container mx-auto px-6">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-12 mb-16">
            <div className="col-span-1 md:col-span-1">
              <div className="flex items-center space-x-2 mb-6">
                <div className="w-8 h-8 bg-blue-600 rounded flex items-center justify-center text-white font-bold">V</div>
                <span className="text-2xl font-bold text-white tracking-tighter">VoltWise</span>
              </div>
              <p className="text-sm text-gray-500 leading-relaxed">
                Advanced AI solutions for electric vehicle longevity and safety monitoring.
              </p>
            </div>
            <div>
              <h6 className="text-white font-bold mb-6 uppercase text-xs tracking-widest">Resources</h6>
              <ul className="space-y-4 text-sm text-gray-500">
                <li className="hover:text-blue-400 cursor-pointer">About Project</li>
                <li className="hover:text-blue-400 cursor-pointer">Research Paper</li>
                <li className="hover:text-blue-400 cursor-pointer">Documentation</li>
                <li className="hover:text-blue-400 cursor-pointer flex items-center">
                   <Share2 className="w-3 h-3 mr-2"/> GitHub
                </li>
              </ul>
            </div>
            <div>
              <h6 className="text-white font-bold mb-6 uppercase text-xs tracking-widest">Tech Stack</h6>
              <div className="flex flex-wrap gap-3">
                {['Python', 'FastAPI', 'React', 'TensorFlow', 'PostgreSQL'].map(tech => (
                  <span key={tech} className="px-2 py-1 bg-white/5 border border-white/10 rounded text-xs text-gray-400">{tech}</span>
                ))}
              </div>
            </div>
            <div>
              <h6 className="text-white font-bold mb-6 uppercase text-xs tracking-widest">Contact</h6>
              <ul className="space-y-4 text-sm text-gray-500">
                <li className="flex items-center"><Mail className="w-4 h-4 mr-2" /> contact@voltwise.com</li>
                <li className="flex items-center hover:text-blue-400 cursor-pointer"><MessageSquare className="w-4 h-4 mr-2" /> Send Message</li>
                <li className="flex items-center hover:text-blue-400 cursor-pointer"><Globe className="w-4 h-4 mr-2" /> Privacy Policy</li>
              </ul>
            </div>
          </div>
          <div className="border-t border-white/5 pt-8 flex flex-col md:flex-row items-center justify-between text-xs text-gray-600">
            <p>© 2026 VoltWise – All Rights Reserved. Built for Academic Research.</p>
            <div className="flex space-x-6 mt-4 md:mt-0">
               <span className="hover:text-white cursor-pointer">Security Status</span>
               <span className="hover:text-white cursor-pointer">API Docs</span>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default LandingPage;