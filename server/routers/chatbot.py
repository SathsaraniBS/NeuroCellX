from fastapi import APIRouter, HTTPException
from pydantic import BaseModel
from services.claude_service import get_ev_response

router = APIRouter()

class Message(BaseModel):
    role: str   # "user" or "assistant"
    content: str

class ChatRequest(BaseModel):
    messages: list[Message]

@router.post("/chat")
async def chat(request: ChatRequest):
    try:
        messages = [{"role": m.role, "content": m.content} for m in request.messages]
        reply = get_ev_response(messages)
        return {"reply": reply}
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))