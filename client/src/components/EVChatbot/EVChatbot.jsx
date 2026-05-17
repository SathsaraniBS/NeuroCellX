import React, { useState, useEffect, useRef } from "react";
import { Bot, X, Send, ChevronRight, Minimize2, Maximize2 } from "lucide-react";
import api from "../../services/api";

// ─── Suggested quick prompts ───────────────────────────────────────────────────
const QUICK_PROMPTS = [
  "What is SOH?",
  "How to charge faster?",
  "Best EV in Sri Lanka?",
  "Battery tips?",
];

// ─── Message Bubble (compact for widget) ──────────────────────────────────────
const Bubble = ({ msg }) => {
  const isUser = msg.role === "user";
  return (
    <div className={`flex gap-2 ${isUser ? "flex-row-reverse" : "flex-row"} items-end`}>
      <div
        className={`w-6 h-6 rounded-full flex items-center justify-center shrink-0 text-[10px]
          ${isUser
            ? "bg-gradient-to-br from-cyan-500 to-emerald-500 text-white"
            : "bg-[#071124] border border-cyan-500/30 text-cyan-400"
          }`}
      >
        {isUser ? "U" : <Bot size={10} />}
      </div>
      <div
        className={`max-w-[80%] px-3 py-2 rounded-xl text-xs leading-relaxed
          ${isUser
            ? "bg-gradient-to-br from-cyan-600/80 to-emerald-600/80 text-white rounded-br-sm"
            : "bg-white/[0.06] border border-white/10 text-slate-200 rounded-bl-sm"
          }`}
      >
        {msg.content}
      </div>
    </div>
  );
};

// ─── Typing Dots ───────────────────────────────────────────────────────────────
const TypingDots = () => (
  <div className="flex gap-2 items-end">
    <div className="w-6 h-6 rounded-full bg-[#071124] border border-cyan-500/30 flex items-center justify-center shrink-0">
      <Bot size={10} className="text-cyan-400" />
    </div>
    <div className="px-3 py-2 rounded-xl rounded-bl-sm bg-white/[0.06] border border-white/10">
      <div className="flex gap-1 items-center h-3">
        <span className="w-1 h-1 rounded-full bg-cyan-400 animate-bounce" style={{ animationDelay: "0ms" }} />
        <span className="w-1 h-1 rounded-full bg-cyan-400 animate-bounce" style={{ animationDelay: "150ms" }} />
        <span className="w-1 h-1 rounded-full bg-cyan-400 animate-bounce" style={{ animationDelay: "300ms" }} />
      </div>
    </div>
  </div>
);

// ─── Main Widget Component ─────────────────────────────────────────────────────
export default function EVChatbot() {
  const [open, setOpen] = useState(false);
  const [expanded, setExpanded] = useState(false);
  const [messages, setMessages] = useState([
    {
      id: 1,
      role: "assistant",
      content: "Hi! I'm your EV Assistant ⚡ How can I help you today?",
    },
  ]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const [sessionId] = useState(() => `widget_${Date.now()}`);
  const bottomRef = useRef(null);
  const inputRef = useRef(null);

  useEffect(() => {
    if (open) {
      bottomRef.current?.scrollIntoView({ behavior: "smooth" });
      setTimeout(() => inputRef.current?.focus(), 100);
    }
  }, [messages, loading, open]);

  const sendMessage = async (text) => {
    const userText = (text || input).trim();
    if (!userText || loading) return;

    setMessages((prev) => [...prev, { id: Date.now(), role: "user", content: userText }]);
    setInput("");
    setLoading(true);

    try {
      const res = await api.post("/api/chat/message", {
        session_id: sessionId,
        message: userText,
      });
      setMessages((prev) => [
        ...prev,
        {
          id: Date.now() + 1,
          role: "assistant",
          content: res.data?.reply || "Sorry, I couldn't get a response. Please try again.",
        },
      ]);
    } catch {
      setMessages((prev) => [
        ...prev,
        {
          id: Date.now() + 1,
          role: "assistant",
          content: "⚠️ Connection issue. Please check the backend.",
        },
      ]);
    } finally {
      setLoading(false);
    }
  };

  const handleKeyDown = (e) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      sendMessage();
    }
  };

  // Widget dimensions based on expanded state
  const widgetW = expanded ? "w-96" : "w-80";
  const widgetH = expanded ? "h-[550px]" : "h-[440px]";

  return (
    <>
      {/* ── Chat Window ───────────────────────────────────────────────────────── */}
      {open && (
        <div
          className={`fixed bottom-24 right-6 z-50 ${widgetW} ${widgetH} flex flex-col
            bg-[#070e1e]/95 backdrop-blur-2xl border border-white/10 rounded-3xl
            shadow-[0_30px_80px_rgba(0,0,0,0.6),0_0_40px_rgba(6,182,212,0.08)]
            transition-all duration-300 origin-bottom-right`}
          style={{ animation: "widgetIn 0.2s ease-out" }}
        >
          {/* Header */}
          <div className="flex items-center gap-2.5 px-4 py-3 border-b border-white/[0.07] bg-white/[0.02] rounded-t-3xl">
            <div className="w-8 h-8 rounded-full bg-gradient-to-br from-cyan-500/30 to-emerald-500/30 border border-cyan-400/30 flex items-center justify-center">
              <Bot size={15} className="text-cyan-400" />
            </div>
            <div className="flex-1 min-w-0">
              <p className="text-xs font-bold text-white">EV Assistant</p>
              <p className="text-[10px] text-emerald-400 flex items-center gap-1">
                <span className="w-1 h-1 rounded-full bg-emerald-400 inline-block animate-pulse" />
                Online
              </p>
            </div>
            <button
              onClick={() => setExpanded((e) => !e)}
              className="p-1.5 rounded-lg text-slate-500 hover:text-cyan-400 hover:bg-white/5 transition-all"
              title={expanded ? "Collapse" : "Expand"}
            >
              {expanded ? <Minimize2 size={13} /> : <Maximize2 size={13} />}
            </button>
            <button
              onClick={() => setOpen(false)}
              className="p-1.5 rounded-lg text-slate-500 hover:text-red-400 hover:bg-white/5 transition-all"
            >
              <X size={13} />
            </button>
          </div>

          {/* Messages */}
          <div className="flex-1 overflow-y-auto p-4 space-y-3 scrollbar-thin scrollbar-thumb-white/10 scrollbar-track-transparent">
            {messages.map((msg) => (
              <Bubble key={msg.id} msg={msg} />
            ))}
            {loading && <TypingDots />}
            <div ref={bottomRef} />
          </div>

          {/* Quick Prompts — show only when no messages from user yet */}
          {messages.length <= 1 && (
            <div className="px-4 pb-2 flex flex-wrap gap-1.5">
              {QUICK_PROMPTS.map((q, i) => (
                <button
                  key={i}
                  onClick={() => sendMessage(q)}
                  className="flex items-center gap-1 text-[10px] px-2.5 py-1 rounded-lg bg-white/[0.04] border border-white/[0.08] text-slate-300 hover:border-cyan-500/30 hover:text-cyan-300 transition-all"
                >
                  <ChevronRight size={9} className="text-cyan-400 shrink-0" />
                  {q}
                </button>
              ))}
            </div>
          )}

          {/* Input */}
          <div className="px-3 py-3 border-t border-white/[0.07] bg-white/[0.02] rounded-b-3xl">
            <div className="flex gap-2 items-center bg-white/[0.04] border border-white/10 rounded-xl px-3 py-2 focus-within:border-cyan-500/40 transition-all">
              <input
                ref={inputRef}
                type="text"
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyDown={handleKeyDown}
                placeholder="Ask about EVs..."
                className="flex-1 bg-transparent text-xs text-white placeholder-slate-500 focus:outline-none"
              />
              <button
                onClick={() => sendMessage()}
                disabled={loading || !input.trim()}
                className="w-7 h-7 rounded-lg bg-gradient-to-br from-cyan-500 to-emerald-500 flex items-center justify-center shrink-0 hover:from-cyan-400 hover:to-emerald-400 disabled:opacity-30 disabled:cursor-not-allowed transition-all"
              >
                <Send size={11} className="text-white" />
              </button>
            </div>
          </div>
        </div>
      )}

      {/* ── Toggle Button ─────────────────────────────────────────────────────── */}
      <button
        onClick={() => setOpen((o) => !o)}
        className={`fixed bottom-6 right-6 z-50 w-14 h-14 rounded-full flex items-center justify-center
          bg-gradient-to-br from-cyan-500 to-emerald-500
          shadow-[0_8px_30px_rgba(6,182,212,0.4)]
          hover:from-cyan-400 hover:to-emerald-400 hover:scale-110
          transition-all duration-300
          ${open ? "rotate-0" : "rotate-0"}`}
        title="Open EV Assistant"
      >
        {open ? (
          <X size={22} className="text-white" />
        ) : (
          <Bot size={22} className="text-white" />
        )}
        {/* Pulse ring when closed */}
        {!open && (
          <span className="absolute inset-0 rounded-full border-2 border-cyan-400/50 animate-ping" />
        )}
      </button>

      {/* Widget open animation */}
      <style>{`
        @keyframes widgetIn {
          from { opacity: 0; transform: scale(0.92) translateY(10px); }
          to   { opacity: 1; transform: scale(1) translateY(0); }
        }
      `}</style>
    </>
  );
}