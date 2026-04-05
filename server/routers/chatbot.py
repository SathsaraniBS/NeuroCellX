# server/routers/chatbot.py
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
        # Convert pydantic models to a normal dictionary list
        messages = [{"role": m.role, "content": m.content} for m in request.messages]
        
        # Get response from Claude
        reply = get_ev_response(messages)
        
        return {"reply": reply}
    except Exception as e:
        print(f"Chatbot Route Error: {str(e)}") 
        raise HTTPException(status_code=500, detail=str(e))