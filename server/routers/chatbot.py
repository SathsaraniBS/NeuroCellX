# routers/chatbot.py
# Rule-based EV Chatbot Router — Fixed to use existing database.py

from fastapi import APIRouter, Depends, HTTPException
from pydantic import BaseModel
from datetime import datetime
import re

from sqlalchemy import Column, Integer, String, Text, DateTime
from sqlalchemy.orm import Session

# ✅ ඔබේ existing database.py use කරනවා — duplicate engine නෑ!
from database import Base, engine, get_db


# ─────────────────────────────────────────────────────────────────────────────
# DATABASE MODELS
# ─────────────────────────────────────────────────────────────────────────────
class ChatSession(Base):
    __tablename__ = "chat_sessions"
    id         = Column(Integer, primary_key=True, index=True)
    session_id = Column(String(120), unique=True, index=True, nullable=False)
    title      = Column(String(255), nullable=True)
    created_at = Column(DateTime, default=datetime.utcnow)
    updated_at = Column(DateTime, default=datetime.utcnow, onupdate=datetime.utcnow)


class ChatMessage(Base):
    __tablename__ = "chat_messages"
    id         = Column(Integer, primary_key=True, index=True)
    session_id = Column(String(120), index=True, nullable=False)
    role       = Column(String(20),  nullable=False)
    content    = Column(Text,        nullable=False)
    created_at = Column(DateTime,    default=datetime.utcnow)


# ✅ ඔබේ existing engine use කරලා tables create කරනවා
Base.metadata.create_all(bind=engine)


# ─────────────────────────────────────────────────────────────────────────────
# PYDANTIC SCHEMAS
# ─────────────────────────────────────────────────────────────────────────────
class ChatRequest(BaseModel):
    session_id: str
    message:    str

class ChatResponse(BaseModel):
    session_id: str
    reply:      str


# ─────────────────────────────────────────────────────────────────────────────
# RULE-BASED EV KNOWLEDGE BASE
# ─────────────────────────────────────────────────────────────────────────────
EV_RULES = [
    (["soh", "state of health", "battery health"],
     "🔋 State of Health (SOH) measures how much capacity your battery has vs when it was new.\n\n"
     "• 100% SOH = brand new\n• 80% SOH = still good\n• Below 70% = consider service\n\n"
     "Check SOH in your Dashboard under Battery Logs."),

    (["soc", "state of charge", "charge level", "battery percentage"],
     "⚡ State of Charge (SOC) is your current battery level — like a fuel gauge.\n\n"
     "• 20–80% = optimal daily range\n• Below 10% = charge immediately\n\n"
     "💡 Avoid charging to 100% daily — reduces degradation."),

    (["rul", "remaining useful life"],
     "📊 Remaining Useful Life (RUL) estimates charge cycles remaining.\n\n"
     "• Typical EV batteries: 500–1500 cycles\n• Check RUL in your Dashboard."),

    (["how long", "charging time", "time to charge", "hours to charge"],
     "⏱️ Charging Time by charger type:\n\n"
     "• 🐢 Standard (3.3 kW)    — 10–12 hours\n"
     "• 🏠 Home Wallbox (7.2 kW) — 5–6 hours\n"
     "• ⚡ Fast Charger (22 kW)  — 1.5–2 hours\n"
     "• 🚀 DC Fast (50+ kW)     — 30–45 minutes\n\n"
     "Use our EV Calculator for your exact time!"),

    (["charging cost", "cost to charge", "electricity cost", "lkr"],
     "💰 Charging cost in Sri Lanka:\n\n"
     "• Tariff: ~Rs. 25–45 per kWh\n"
     "• Small EV (30 kWh): ~Rs. 750–1,350\n"
     "• Large EV (75 kWh): ~Rs. 1,875–3,375\n\n"
     "Use our EV Calculator for exact costs!"),

    (["home charging", "charge at home", "wallbox"],
     "🏠 Home Charging:\n\n"
     "• Install Level 2 wallbox (7.2 kW)\n"
     "• Charge overnight — ready every morning\n"
     "• Use dedicated 32A circuit for safety\n"
     "• Installation cost: Rs. 15,000–50,000"),

    (["public charging", "charging station", "find station", "near me"],
     "🗺️ Public Charging in Sri Lanka:\n\n"
     "• Use our Find Stations page\n"
     "• Available in Colombo, Kandy, Galle, Negombo\n"
     "• Some hotels & malls offer free charging"),

    (["dc fast", "fast charging", "rapid charge"],
     "🚀 DC Fast Charging:\n\n"
     "• 80% charge in 30–45 minutes\n"
     "• ⚠️ Avoid daily use — degrades battery faster\n"
     "• Best for long trips only"),

    (["bev", "battery electric", "fully electric"],
     "🚗 BEV (Battery Electric Vehicle):\n\n"
     "• 100% electric, zero emissions\n"
     "• Examples: Tesla Model 3, Nissan Leaf, BYD Seal\n"
     "• Range: 200–600+ km per charge"),

    (["phev", "plug-in hybrid"],
     "🔌 PHEV (Plug-in Hybrid):\n\n"
     "• Electric + petrol engine combined\n"
     "• Electric range: 40–80 km\n"
     "• Examples: Toyota Prius PHEV, Mitsubishi Outlander PHEV"),

    (["ev type", "types of ev", "bev vs phev", "compare ev"],
     "🚗 EV Types:\n\n"
     "• BEV  — fully electric, plug-in, no petrol\n"
     "• PHEV — plug-in + petrol backup\n"
     "• HEV  — self-charging hybrid, needs petrol\n\n"
     "Visit our EV Types page for full details!"),

    (["battery tip", "extend battery", "battery care", "improve battery"],
     "💡 Extend Your Battery Life:\n\n"
     "1. Charge between 20%–80% daily\n"
     "2. Avoid frequent DC fast charging\n"
     "3. Keep above 10% always\n"
     "4. Park in shade / cool areas\n"
     "5. Use off-peak scheduled charging"),

    (["battery degrad", "battery wear", "capacity loss"],
     "📉 Battery Degradation:\n\n"
     "• Year 1: ~2–3% loss | Year 5: ~10–15% | Year 10: ~20–25%\n\n"
     "Causes: frequent fast charging, extreme heat, always at 100%"),

    (["sri lanka", "lanka", "colombo", "lk"],
     "🇱🇰 EV in Sri Lanka:\n\n"
     "• Popular: Nissan Leaf, BYD Atto 3, MG ZS EV\n"
     "• Stations: Colombo, Kandy, Galle, Negombo\n"
     "• Tariff: ~Rs. 25–45/kWh | Tax exemptions available"),

    (["mg", "nissan leaf", "byd", "tesla", "best ev"],
     "🏆 Popular EVs in Sri Lanka:\n\n"
     "• 🥇 Nissan Leaf   — affordable, most common\n"
     "• 🥈 MG ZS EV      — great range\n"
     "• 🥉 BYD Atto 3    — long range, latest tech\n"
     "• ⭐ MG Comet EV   — budget city car\n"
     "• 🚀 Tesla Model 3 — premium"),

    (["regenerative", "regen", "regen braking"],
     "♻️ Regenerative Braking:\n\n"
     "• Recovers 10–25% of energy in city driving\n"
     "• Motor acts as generator when you lift off\n"
     "• Reduces brake pad wear\n"
     "• Use one-pedal driving for max benefit!"),

    (["maintenance", "service", "repair"],
     "🔧 EV vs Petrol Maintenance:\n\n"
     "✅ No oil changes  ✅ No spark plugs\n"
     "✅ Longer brake life  ✅ Fewer moving parts\n\n"
     "Still needed: tyres, brake fluid, cabin air filter"),

    (["range", "how far", "km range", "range anxiety"],
     "📏 EV Ranges:\n\n"
     "• Nissan Leaf:   150–385 km\n"
     "• MG ZS EV:     320–440 km\n"
     "• BYD Atto 3:   420–480 km\n"
     "• Tesla Model 3: 500–600 km"),

    (["calculator", "calculate"],
     "🧮 EV Calculator — find it in the navigation menu to:\n\n"
     "• Calculate exact charging cost (LKR)\n"
     "• Estimate charging time by charger type"),

    (["hello", "hi", "hey", "good morning", "ayubowan"],
     "👋 Hello! I'm your EV Assistant!\n\n"
     "Ask me about: 🔋 Battery health · ⚡ Charging · 🚗 EV types · 💰 Costs · 🔧 Maintenance"),

    (["thank", "thanks", "thank you"],
     "😊 You're welcome! Happy to help with EV questions anytime! ⚡"),

    (["bye", "goodbye"],
     "👋 Goodbye! Drive electric, save the planet! ⚡🌿"),
]

DEFAULT_REPLY = (
    "🤔 I'm not sure about that.\n\n"
    "Try asking:\n"
    "• 'What is SOH?' · 'How long to charge?'\n"
    "• 'Best EV in Sri Lanka?' · 'Battery tips?'"
)


# ─────────────────────────────────────────────────────────────────────────────
# RULE MATCHING
# ─────────────────────────────────────────────────────────────────────────────
def get_rule_based_reply(user_message: str) -> str:
    msg = re.sub(r"[^\w\s]", " ", user_message.lower().strip())
    for keywords, answer in EV_RULES:
        for keyword in keywords:
            if keyword in msg:
                return answer
    return DEFAULT_REPLY


# ─────────────────────────────────────────────────────────────────────────────
# ROUTER
# ─────────────────────────────────────────────────────────────────────────────
router = APIRouter(prefix="/api/chat", tags=["Chatbot"])


@router.post("/message", response_model=ChatResponse)
def send_message(req: ChatRequest, db: Session = Depends(get_db)):
    if not req.message.strip():
        raise HTTPException(status_code=400, detail="Message cannot be empty")

    session = db.query(ChatSession).filter_by(session_id=req.session_id).first()
    if not session:
        words = req.message.split()[:6]
        title = " ".join(words) + ("..." if len(req.message.split()) > 6 else "")
        session = ChatSession(session_id=req.session_id, title=title)
        db.add(session)
        db.commit()
        db.refresh(session)

    reply = get_rule_based_reply(req.message)
    db.add(ChatMessage(session_id=req.session_id, role="user",      content=req.message))
    db.add(ChatMessage(session_id=req.session_id, role="assistant", content=reply))
    session.updated_at = datetime.utcnow()
    db.commit()
    return ChatResponse(session_id=req.session_id, reply=reply)


@router.get("/sessions")
def list_sessions(db: Session = Depends(get_db)):
    sessions = db.query(ChatSession).order_by(ChatSession.updated_at.desc()).all()
    result = []
    for s in sessions:
        last_msg = (
            db.query(ChatMessage)
            .filter_by(session_id=s.session_id)
            .order_by(ChatMessage.created_at.desc())
            .first()
        )
        count = db.query(ChatMessage).filter_by(session_id=s.session_id).count()
        result.append({
            "session_id":    s.session_id,
            "title":         s.title,
            "last_message":  last_msg.content if last_msg else None,
            "message_count": count,
            "created_at":    s.created_at,
        })
    return {"sessions": result}


@router.get("/sessions/{session_id}")
def get_session(session_id: str, db: Session = Depends(get_db)):
    messages = (
        db.query(ChatMessage)
        .filter_by(session_id=session_id)
        .order_by(ChatMessage.created_at.asc())
        .all()
    )
    if not messages:
        raise HTTPException(status_code=404, detail="Session not found")
    return {
        "session_id": session_id,
        "messages": [
            {"role": m.role, "content": m.content, "created_at": m.created_at}
            for m in messages
        ],
    }


@router.delete("/sessions/{session_id}")
def delete_session(session_id: str, db: Session = Depends(get_db)):
    msgs_deleted = db.query(ChatMessage).filter_by(session_id=session_id).delete()
    sess_deleted = db.query(ChatSession).filter_by(session_id=session_id).delete()
    db.commit()
    if not sess_deleted:
        raise HTTPException(status_code=404, detail="Session not found")
    return {"detail": f"Session deleted. ({msgs_deleted} messages removed)"}


@router.get("/health")
def chatbot_health():
    return {"status": "ok", "engine": "rule-based", "rules": len(EV_RULES)}