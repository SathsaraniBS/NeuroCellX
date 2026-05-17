import React, { useState, useEffect } from "react";
import { MessageSquare, Trash2, ChevronRight, Search, Clock, Bot, AlertCircle } from "lucide-react";
import { Link, useNavigate } from "react-router-dom";
import Navbar from "../../components/Navbar";
import Footer from "../../components/Footer";
import api from "../../services/api";

// ─── Format date nicely ────────────────────────────────────────────────────────
const formatDate = (iso) => {
  const d = new Date(iso);
  const now = new Date();
  const diffMs = now - d;
  const diffMins = Math.floor(diffMs / 60000);
  if (diffMins < 1) return "Just now";
  if (diffMins < 60) return `${diffMins}m ago`;
  if (diffMins < 1440) return `${Math.floor(diffMins / 60)}h ago`;
  return d.toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric" });
};

// ─── Single History Card ───────────────────────────────────────────────────────
const HistoryCard = ({ session, onDelete, onClick }) => (
  <div
    className="group relative bg-[#0a1122]/80 backdrop-blur-xl border border-white/10 rounded-2xl p-5 hover:border-cyan-500/30 hover:-translate-y-1 hover:shadow-[0_8px_30px_rgba(6,182,212,0.08)] transition-all duration-300 cursor-pointer"
    onClick={() => onClick(session.session_id)}
  >
    {/* Top Row */}
    <div className="flex items-start justify-between gap-4 mb-3">
      <div className="flex items-center gap-3">
        <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-cyan-500/20 to-emerald-500/20 border border-cyan-500/20 flex items-center justify-center shrink-0">
          <Bot size={16} className="text-cyan-400" />
        </div>
        <div>
          <p className="font-bold text-sm text-white line-clamp-1">{session.title || "EV Chat Session"}</p>
          <p className="text-xs text-slate-500 flex items-center gap-1 mt-0.5">
            <Clock size={10} />
            {formatDate(session.created_at)}
          </p>
        </div>
      </div>

      {/* Delete Button */}
      <button
        onClick={(e) => { e.stopPropagation(); onDelete(session.session_id); }}
        className="opacity-0 group-hover:opacity-100 p-1.5 rounded-lg bg-red-500/10 border border-red-500/20 text-red-400 hover:bg-red-500/20 transition-all shrink-0"
      >
        <Trash2 size={13} />
      </button>
    </div>

    {/* Last Message Preview */}
    <p className="text-xs text-slate-400 line-clamp-2 leading-relaxed mb-4 pl-12">
      {session.last_message || "No messages yet"}
    </p>

    {/* Bottom Stats */}
    <div className="flex items-center justify-between pl-12">
      <div className="flex gap-3">
        <span className="flex items-center gap-1 text-[11px] text-slate-500">
          <MessageSquare size={10} />
          {session.message_count || 0} messages
        </span>
      </div>
      <ChevronRight
        size={14}
        className="text-cyan-400 opacity-0 group-hover:opacity-100 group-hover:translate-x-1 transition-all"
      />
    </div>
  </div>
);

// ─── Empty State ───────────────────────────────────────────────────────────────
const EmptyState = () => (
  <div className="flex flex-col items-center justify-center py-24 text-center">
    <div className="w-16 h-16 rounded-2xl bg-white/[0.04] border border-white/10 flex items-center justify-center mb-4">
      <MessageSquare size={28} className="text-slate-600" />
    </div>
    <h3 className="text-lg font-bold text-slate-300 mb-2">No chat history yet</h3>
    <p className="text-slate-500 text-sm mb-6 max-w-xs">
      Start a conversation with the EV Assistant to see your history here.
    </p>
    <Link
      to="/chat"
      className="flex items-center gap-2 px-6 py-3 rounded-xl bg-gradient-to-r from-cyan-500 to-emerald-500 text-white font-bold text-sm hover:from-cyan-400 hover:to-emerald-400 transition-all shadow-lg shadow-cyan-500/20"
    >
      Start Chatting <ChevronRight size={16} />
    </Link>
  </div>
);

// ─── Main Component ────────────────────────────────────────────────────────────
export default function ChatHistoryPage() {
  const [sessions, setSessions] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [searchQuery, setSearchQuery] = useState("");
  const [deleting, setDeleting] = useState(null);
  const navigate = useNavigate();

  // Fetch all sessions
  useEffect(() => {
    const fetchSessions = async () => {
      try {
        const res = await api.get("/api/chat/sessions");
        setSessions(res.data?.sessions || []);
      } catch (err) {
        setError("Failed to load chat history. Please try again.");
        console.error("History fetch error:", err);
      } finally {
        setLoading(false);
      }
    };
    fetchSessions();
  }, []);

  // Delete a session
  const handleDelete = async (sessionId) => {
    if (!window.confirm("Delete this chat session?")) return;
    setDeleting(sessionId);
    try {
      await api.delete(`/api/chat/sessions/${sessionId}`);
      setSessions((prev) => prev.filter((s) => s.session_id !== sessionId));
    } catch (err) {
      console.error("Delete error:", err);
      alert("Failed to delete session.");
    } finally {
      setDeleting(null);
    }
  };

  // Open a session → go to chat with session id in state
  const handleOpen = (sessionId) => {
    navigate("/chat", { state: { sessionId } });
  };

  // Filter
  const filtered = sessions.filter(
    (s) =>
      (s.title || "").toLowerCase().includes(searchQuery.toLowerCase()) ||
      (s.last_message || "").toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="min-h-screen bg-[#050816] text-white font-sans flex flex-col">
      <Navbar />

      {/* Ambient Glows */}
      <div className="fixed top-1/3 left-1/4 w-[500px] h-[500px] bg-cyan-500/[0.05] blur-[120px] rounded-full pointer-events-none -z-0" />
      <div className="fixed bottom-1/3 right-1/4 w-[500px] h-[500px] bg-emerald-500/[0.05] blur-[120px] rounded-full pointer-events-none -z-0" />

      <div className="flex-1 max-w-5xl mx-auto w-full px-4 pt-28 pb-12 relative z-10">

        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-10">
          <div>
            <p className="text-xs font-bold uppercase tracking-[0.3em] text-cyan-300/80 mb-2">
              Your Conversations
            </p>
            <h1 className="text-4xl md:text-5xl font-black uppercase leading-tight">
              Chat{" "}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-emerald-400">
                History
              </span>
            </h1>
            <p className="text-slate-400 text-sm mt-2">
              {sessions.length} total conversation{sessions.length !== 1 ? "s" : ""}
            </p>
          </div>

          <Link
            to="/chat"
            className="flex items-center gap-2 px-5 py-2.5 rounded-xl bg-gradient-to-r from-cyan-500 to-emerald-500 text-white font-bold text-sm hover:from-cyan-400 hover:to-emerald-400 transition-all shadow-lg shadow-cyan-500/20 self-start sm:self-auto"
          >
            + New Chat
          </Link>
        </div>

        {/* Search Bar */}
        {sessions.length > 0 && (
          <div className="relative mb-8">
            <Search size={16} className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-500" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search conversations..."
              className="w-full pl-11 pr-4 py-3 rounded-xl bg-white/[0.04] border border-white/10 text-sm text-white placeholder-slate-500 focus:outline-none focus:border-cyan-500/50 focus:shadow-[0_0_20px_rgba(6,182,212,0.08)] transition-all"
            />
          </div>
        )}

        {/* Content */}
        {loading ? (
          <div className="flex flex-col items-center justify-center py-24 gap-3">
            <div className="w-8 h-8 border-4 border-cyan-500 border-t-transparent rounded-full animate-spin" />
            <p className="text-slate-400 text-sm">Loading history...</p>
          </div>
        ) : error ? (
          <div className="flex flex-col items-center justify-center py-24 text-center gap-3">
            <AlertCircle size={32} className="text-red-400" />
            <p className="text-red-400 font-medium">{error}</p>
            <button
              onClick={() => window.location.reload()}
              className="text-sm text-cyan-400 hover:text-cyan-300 underline"
            >
              Try again
            </button>
          </div>
        ) : filtered.length === 0 ? (
          <EmptyState />
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {filtered.map((session) => (
              <div
                key={session.session_id}
                className={`transition-opacity duration-300 ${deleting === session.session_id ? "opacity-40 pointer-events-none" : ""}`}
              >
                <HistoryCard session={session} onDelete={handleDelete} onClick={handleOpen} />
              </div>
            ))}
          </div>
        )}
      </div>

      <Footer />
    </div>
  );
}