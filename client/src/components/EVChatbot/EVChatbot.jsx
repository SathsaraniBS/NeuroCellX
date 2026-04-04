import { useState, useRef, useEffect } from "react";
import ChatMessage, { TypingIndicator } from "./ChatMessage";
import QuickTopics from "./QuickTopics";

const WELCOME = {
  role: "assistant",
  content:
    "👋 Welcome to **VoltIQ Learning Hub**!\n\nI'm **VoltBot**, your personal EV & battery expert.\n\nAsk me about:\n- **EV Basics** & vehicle types\n- **Battery types** & technologies\n- **Charging tips** for longer battery life\n- **EV & Battery user guides**\n\nSelect a topic above or type your question! ⚡",
};

export default function EVChatbot() {
  const [open, setOpen]         = useState(false);
  const [messages, setMessages] = useState([WELCOME]);
  const [input, setInput]       = useState("");
  const [loading, setLoading]   = useState(false);
  const bottomRef               = useRef(null);

  // Auto-scroll to latest message
  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages, loading]);

  // ── Send message to FastAPI backend ──────────────────────────
  const sendMessage = async (text) => {
    const userText = (text || input).trim();
    if (!userText || loading) return;

    setInput("");
    const updated = [...messages, { role: "user", content: userText }];
    setMessages(updated);
    setLoading(true);

    try {
      const apiMessages = updated
        .filter((m) => m.role === "user" || m.role === "assistant")
        .map((m) => ({ role: m.role, content: m.content }));

      const res = await fetch("http://localhost:8000/api/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ messages: apiMessages }),
      });

      if (!res.ok) throw new Error(`Server error: ${res.status}`);

      const data = await res.json();
      setMessages([...updated, { role: "assistant", content: data.reply }]);
    } catch (err) {
      setMessages([
        ...updated,
        {
          role: "assistant",
          content: `⚠️ **Connection error.** Make sure the VoltIQ backend is running on port 8000.\n\n_${err.message}_`,
        },
      ]);
    } finally {
      setLoading(false);
    }
  };

  const handleKey = (e) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      sendMessage();
    }
  };

  return (
    <>
      {/* ── New Glowing Avatar Toggle Button ── */}
      <div 
        onClick={() => setOpen(!open)}
        className="fixed bottom-6 right-6 z-50 cursor-pointer flex flex-col items-center justify-center hover:scale-110 transition-all duration-300 active:scale-95"
      >
        {/* Glow Ring */}
        <div className="absolute w-20 h-20 rounded-full border-[2px] border-cyan-400/50 blur-[2px] animate-pulse"></div>

        {/* Outer Glow */}
        <div className="absolute w-24 h-24 rounded-full bg-cyan-500/10 blur-xl"></div>

        {/* Avatar Image Container */}
        <div className="relative w-16 h-16 rounded-full overflow-hidden border border-cyan-400/60 shadow-[0_0_15px_rgba(34,211,238,0.4)] bg-[#0a1628]">
          <img
            src="src/assets/chatbot.png" 
            alt="VoltIQ Bot"
            className="w-full h-full object-cover"
          />
        </div>

        {/* Floating Chat Bubble - Optimized Position */}
        <div className="absolute -top-6 bg-cyan-950/80 backdrop-blur-md border border-cyan-400/40 rounded-full px-3 py-1 shadow-lg pointer-events-none">
          <div className="flex items-center gap-1.5 text-cyan-300">
            {open ? (
              <span className="text-[10px] font-bold uppercase tracking-wider whitespace-nowrap">Close</span>
            ) : (
              <>
                <div className="w-1.5 h-1.5 bg-cyan-400 rounded-full animate-bounce" />
                <span className="text-[10px] font-bold uppercase tracking-wider whitespace-nowrap">Ask Me</span>
              </>
            )}
          </div>
        </div>

        {/* Bottom Shadow/Glow */}
        <div className="absolute -bottom-2 w-10 h-4 bg-cyan-400/20 blur-md rounded-full"></div>
      </div>

      {/* ── Chat Window ── */}
      {open && (
        <div
          className="
            fixed bottom-28 right-6 z-40
            w-[380px] max-w-[calc(100vw-48px)]
            rounded-2xl overflow-hidden
            border border-white/[0.08]
            shadow-[0_20px_60px_rgba(0,0,0,0.7)]
            flex flex-col
            bg-[#070f1c]
          "
          style={{ animation: "fadeUp 0.3s cubic-bezier(0.16, 1, 0.3, 1)" }}
        >
          <style>{`
            @keyframes fadeUp {
              from { opacity: 0; transform: translateY(20px) scale(0.95); }
              to { opacity: 1; transform: translateY(0) scale(1); }
            }
          `}</style>

          {/* ── Header ── */}
          <div className="bg-[#0a1628] border-b border-white/[0.06] px-4 py-4 flex items-center gap-3">
            <span className="text-[15px] font-bold text-white tracking-tight select-none">
              Volt<span className="text-cyan-400">IQ</span>
            </span>

            <div className="flex items-center gap-2 bg-cyan-400/5 border border-cyan-400/20 rounded-full px-2.5 py-1">
              <div className="w-2 h-2 rounded-full bg-cyan-400 shadow-[0_0_8px_#22d3ee] animate-pulse" />
              <p className="text-[11px] font-bold text-cyan-100 uppercase tracking-widest">VoltBot</p>
            </div>

            <button 
              onClick={() => setOpen(false)}
              className="ml-auto text-gray-500 hover:text-white transition-colors"
            >
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><line x1="18" y1="6" x2="6" y2="18"></line><line x1="6" y1="6" x2="18" y2="18"></line></svg>
            </button>
          </div>

          {/* ── Quick Topics ── */}
          <div className="bg-[#0a1628]/50 border-b border-white/[0.03]">
            <QuickTopics onSelect={sendMessage} disabled={loading} />
          </div>

          {/* ── Messages Area ── */}
          <div className="min-h-[350px] max-h-[450px] overflow-y-auto px-4 py-6 flex flex-col gap-4 scroll-smooth [scrollbar-width:thin] [scrollbar-color:rgba(255,255,255,0.1)_transparent]">
            {messages.map((msg, i) => (
              <ChatMessage key={i} role={msg.role} content={msg.content} />
            ))}
            {loading && <TypingIndicator />}
            <div ref={bottomRef} />
          </div>

          {/* ── Input Area ── */}
          <div className="bg-[#0a1628] border-t border-white/[0.06] p-4 flex gap-2 items-center">
            <input
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={handleKey}
              disabled={loading}
              placeholder="Message VoltBot..."
              className="
                flex-1 bg-white/[0.03] border border-white/[0.08] rounded-xl
                px-4 py-3 text-sm text-white outline-none
                placeholder:text-gray-600
                focus:border-cyan-400/50 focus:bg-white/[0.05]
                disabled:opacity-50
                transition-all
              "
            />

            <button
              onClick={() => sendMessage()}
              disabled={loading || !input.trim()}
              className="
                w-11 h-11 rounded-xl flex items-center justify-center
                bg-gradient-to-br from-cyan-500 to-blue-600
                text-white shadow-lg shadow-cyan-900/20
                hover:shadow-cyan-500/40 hover:-translate-y-0.5
                disabled:opacity-30 disabled:hover:translate-y-0
                transition-all duration-200
              "
            >
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                <line x1="22" y1="2" x2="11" y2="13"></line>
                <polygon points="22 2 15 22 11 13 2 9 22 2"></polygon>
              </svg>
            </button>
          </div>

          {/* ── Footer ── */}
          <div className="bg-[#050b14] py-2 text-center text-[9px] text-gray-600 uppercase tracking-[0.2em] font-medium">
            VoltIQ Intelligent Battery Systems
          </div>
        </div>
      )}
    </>
  );
}