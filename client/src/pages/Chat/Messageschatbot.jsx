import React, { useState, useEffect, useRef } from "react";
import { Send, Bot, User, Trash2, Download, Zap, ChevronRight, Sparkles } from "lucide-react";
import Navbar from "../../components/Navbar";
import Footer from "../../components/Footer";
import api from "../../services/api";

// ─── Suggested Questions ───────────────────────────────────────────────────────
const SUGGESTED = [
  "What is the best EV for long range?",
  "How does regenerative braking work?",
  "How long does it take to charge an EV?",
  "What is State of Health (SOH)?",
  "Compare BEV vs PHEV",
  "Tips to extend battery life?",
];

// ─── Single Message Bubble ─────────────────────────────────────────────────────
const MessageBubble = ({ msg }) => {
  const isUser = msg.role === "user";
  return (
    <div className={`flex gap-3 ${isUser ? "flex-row-reverse" : "flex-row"} items-end`}>
      {/* Avatar */}
      <div
        className={`w-8 h-8 rounded-full flex items-center justify-center shrink-0 border
          ${isUser
            ? "bg-gradient-to-br from-cyan-500 to-emerald-500 border-cyan-400/30"
            : "bg-[#071124] border-cyan-500/30"
          }`}
      >
        {isUser ? <User size={14} className="text-white" /> : <Bot size={14} className="text-cyan-400" />}
      </div>

      {/* Bubble */}
      <div
        className={`max-w-[75%] px-4 py-3 rounded-2xl text-sm leading-relaxed
          ${isUser
            ? "bg-gradient-to-br from-cyan-600/80 to-emerald-600/80 text-white rounded-br-sm border border-cyan-400/20 shadow-lg shadow-cyan-500/10"
            : "bg-white/[0.05] backdrop-blur-md border border-white/10 text-slate-200 rounded-bl-sm"
          }`}
      >
        {msg.content}
        <p className={`text-[10px] mt-1.5 ${isUser ? "text-white/50 text-right" : "text-slate-500"}`}>
          {msg.time}
        </p>
      </div>
    </div>
  );
};

// ─── Typing Indicator ──────────────────────────────────────────────────────────
const TypingIndicator = () => (
  <div className="flex gap-3 items-end">
    <div className="w-8 h-8 rounded-full flex items-center justify-center shrink-0 bg-[#071124] border border-cyan-500/30">
      <Bot size={14} className="text-cyan-400" />
    </div>
    <div className="px-4 py-3 rounded-2xl rounded-bl-sm bg-white/[0.05] border border-white/10 backdrop-blur-md">
      <div className="flex gap-1.5 items-center h-4">
        <span className="w-1.5 h-1.5 rounded-full bg-cyan-400 animate-bounce" style={{ animationDelay: "0ms" }} />
        <span className="w-1.5 h-1.5 rounded-full bg-cyan-400 animate-bounce" style={{ animationDelay: "150ms" }} />
        <span className="w-1.5 h-1.5 rounded-full bg-cyan-400 animate-bounce" style={{ animationDelay: "300ms" }} />
      </div>
    </div>
  </div>
);

// ─── Main ChatPage ─────────────────────────────────────────────────────────────
export default function ChatPage() {
  const [messages, setMessages] = useState([
    {
      id: 1,
      role: "assistant",
      content: "Hello! I'm your EV Assistant powered by AI ⚡ Ask me anything about electric vehicles, charging, battery health, or EV comparisons!",
      time: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }),
    },
  ]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const [sessionId] = useState(() => `session_${Date.now()}`);
  const bottomRef = useRef(null);
  const inputRef = useRef(null);

  // Auto-scroll to bottom on new message
  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages, loading]);

  const sendMessage = async (text) => {
    const userText = (text || input).trim();
    if (!userText || loading) return;

    const userMsg = {
      id: Date.now(),
      role: "user",
      content: userText,
      time: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }),
    };

    setMessages((prev) => [...prev, userMsg]);
    setInput("");
    setLoading(true);

    try {
      // FastAPI backend call
      const res = await api.post("/api/chat/message", {
        session_id: sessionId,
        message: userText,
      });

      const botMsg = {
        id: Date.now() + 1,
        role: "assistant",
        content: res.data?.reply || "Sorry, I couldn't understand that. Please try again.",
        time: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }),
      };
      setMessages((prev) => [...prev, botMsg]);
    } catch (err) {
      console.error("Chat error:", err);
      setMessages((prev) => [
        ...prev,
        {
          id: Date.now() + 1,
          role: "assistant",
          content: "⚠️ Connection error. Please make sure the backend is running and try again.",
          time: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }),
        },
      ]);
    } finally {
      setLoading(false);
      inputRef.current?.focus();
    }
  };

  const handleKeyDown = (e) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      sendMessage();
    }
  };

  const clearChat = () => {
    setMessages([
      {
        id: Date.now(),
        role: "assistant",
        content: "Chat cleared! How can I help you with EVs today? ⚡",
        time: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }),
      },
    ]);
  };

  const exportChat = () => {
    const text = messages.map((m) => `[${m.role.toUpperCase()}] ${m.content}`).join("\n\n");
    const blob = new Blob([text], { type: "text/plain" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `ev-chat-${Date.now()}.txt`;
    a.click();
    URL.revokeObjectURL(url);
  };

  return (
    <div className="min-h-screen bg-[#050816] text-white font-sans flex flex-col">
      <Navbar />

      {/* Ambient Glows */}
      <div className="fixed top-1/4 left-1/4 w-[500px] h-[500px] bg-cyan-500/[0.06] blur-[120px] rounded-full pointer-events-none -z-0" />
      <div className="fixed bottom-1/4 right-1/4 w-[500px] h-[500px] bg-emerald-500/[0.06] blur-[120px] rounded-full pointer-events-none -z-0" />

      <div className="flex-1 max-w-6xl mx-auto w-full px-4 pt-28 pb-8 flex flex-col gap-6 relative z-10">

        {/* Page Header */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <p className="text-xs font-bold uppercase tracking-[0.3em] text-cyan-300/80 mb-2 flex items-center gap-2">
              <Sparkles size={12} /> AI Powered
            </p>
            <h1 className="text-4xl md:text-5xl font-black uppercase leading-tight">
              EV{" "}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-emerald-400">
                Assistant
              </span>
            </h1>
            <p className="text-slate-400 text-sm mt-2">Ask anything about electric vehicles, charging & battery health</p>
          </div>

          {/* Action Buttons */}
          <div className="flex gap-2">
            <button
              onClick={clearChat}
              className="flex items-center gap-2 px-4 py-2 rounded-xl bg-white/[0.05] border border-white/10 text-slate-300 hover:border-red-400/40 hover:text-red-400 transition-all text-sm font-medium"
            >
              <Trash2 size={15} /> Clear
            </button>
            <button
              onClick={exportChat}
              className="flex items-center gap-2 px-4 py-2 rounded-xl bg-white/[0.05] border border-white/10 text-slate-300 hover:border-cyan-400/40 hover:text-cyan-400 transition-all text-sm font-medium"
            >
              <Download size={15} /> Export
            </button>
          </div>
        </div>

        {/* Main Chat Layout */}
        <div className="flex gap-6 flex-col lg:flex-row flex-1">

          {/* ── Chat Window ─────────────────────────────────────────────────── */}
          <div className="flex-1 flex flex-col bg-[#0a1122]/80 backdrop-blur-xl border border-white/10 rounded-3xl overflow-hidden shadow-2xl min-h-[500px]">

            {/* Chat Header Bar */}
            <div className="flex items-center gap-3 px-6 py-4 border-b border-white/[0.07] bg-white/[0.02]">
              <div className="w-9 h-9 rounded-full bg-gradient-to-br from-cyan-500/30 to-emerald-500/30 border border-cyan-400/30 flex items-center justify-center">
                <Bot size={18} className="text-cyan-400" />
              </div>
              <div>
                <p className="font-bold text-sm text-white">EV Assistant</p>
                <p className="text-xs text-emerald-400 flex items-center gap-1">
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 inline-block animate-pulse" />
                  Online
                </p>
              </div>
              <div className="ml-auto flex items-center gap-2">
                <Zap size={14} className="text-cyan-400" />
                <span className="text-xs text-slate-400">{messages.length} messages</span>
              </div>
            </div>

            {/* Messages Area */}
            <div className="flex-1 overflow-y-auto p-6 space-y-4 scrollbar-thin scrollbar-thumb-white/10 scrollbar-track-transparent">
              {messages.map((msg) => (
                <MessageBubble key={msg.id} msg={msg} />
              ))}
              {loading && <TypingIndicator />}
              <div ref={bottomRef} />
            </div>

            {/* Input Bar */}
            <div className="px-4 py-4 border-t border-white/[0.07] bg-white/[0.02]">
              <div className="flex gap-3 items-end bg-white/[0.05] border border-white/10 rounded-2xl px-4 py-3 focus-within:border-cyan-500/50 focus-within:shadow-[0_0_20px_rgba(6,182,212,0.1)] transition-all">
                <textarea
                  ref={inputRef}
                  rows={1}
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  onKeyDown={handleKeyDown}
                  placeholder="Ask about EVs, charging, battery health..."
                  className="flex-1 bg-transparent text-sm text-white placeholder-slate-500 resize-none focus:outline-none leading-relaxed max-h-32"
                  style={{ overflow: "hidden" }}
                  onInput={(e) => {
                    e.target.style.height = "auto";
                    e.target.style.height = Math.min(e.target.scrollHeight, 128) + "px";
                  }}
                />
                <button
                  onClick={() => sendMessage()}
                  disabled={loading || !input.trim()}
                  className="w-9 h-9 rounded-xl bg-gradient-to-br from-cyan-500 to-emerald-500 flex items-center justify-center shrink-0 hover:from-cyan-400 hover:to-emerald-400 disabled:opacity-30 disabled:cursor-not-allowed transition-all shadow-lg shadow-cyan-500/20"
                >
                  <Send size={15} className="text-white" />
                </button>
              </div>
              <p className="text-center text-xs text-slate-600 mt-2">Press Enter to send · Shift+Enter for new line</p>
            </div>
          </div>

          {/* ── Sidebar: Suggested Questions ────────────────────────────────── */}
          <div className="w-full lg:w-72 flex flex-col gap-4">
            <div className="bg-[#0a1122]/80 backdrop-blur-xl border border-white/10 rounded-3xl p-5 shadow-2xl">
              <h3 className="text-xs font-bold uppercase tracking-[0.25em] text-cyan-300/80 mb-4 flex items-center gap-2">
                <Sparkles size={12} /> Suggested Questions
              </h3>
              <div className="flex flex-col gap-2">
                {SUGGESTED.map((q, i) => (
                  <button
                    key={i}
                    onClick={() => sendMessage(q)}
                    disabled={loading}
                    className="group flex items-center gap-2 text-left px-4 py-3 rounded-xl bg-white/[0.03] border border-white/[0.07] hover:border-cyan-500/30 hover:bg-cyan-500/[0.07] text-slate-300 hover:text-white text-xs transition-all disabled:opacity-40 disabled:cursor-not-allowed"
                  >
                    <ChevronRight size={12} className="text-cyan-400 shrink-0 group-hover:translate-x-0.5 transition-transform" />
                    {q}
                  </button>
                ))}
              </div>
            </div>

            {/* Tips Card */}
            <div className="bg-gradient-to-br from-cyan-900/20 to-emerald-900/20 border border-cyan-500/20 rounded-3xl p-5">
              <h3 className="text-xs font-bold uppercase tracking-[0.25em] text-cyan-300/80 mb-3 flex items-center gap-2">
                <Zap size={12} /> Pro Tips
              </h3>
              <ul className="space-y-2 text-xs text-slate-400">
                <li className="flex gap-2"><span className="text-cyan-400">•</span> Ask for EV comparisons by model</li>
                <li className="flex gap-2"><span className="text-cyan-400">•</span> Inquire about Sri Lanka charging stations</li>
                <li className="flex gap-2"><span className="text-cyan-400">•</span> Get charging cost estimates</li>
                <li className="flex gap-2"><span className="text-cyan-400">•</span> Ask about battery SOH & SOC explained</li>
              </ul>
            </div>
          </div>
        </div>
      </div>

      <Footer />
    </div>
  );
}