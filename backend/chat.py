# backend/app/chat.py
from fastapi import APIRouter, HTTPException, Depends
from pydantic import BaseModel
from typing import Optional
import os
from langchain_ibm import WatsonxLLM

router = APIRouter()

# Request model
class ChatRequest(BaseModel):
    message: str
    conversation_id: Optional[str] = None
    temperature: float = 0.7
    max_tokens: int = 1000

# Response model
class ChatResponse(BaseModel):
    response: str
    conversation_id: str
    tokens_used: int

def get_watson_llm(max_tokens: int, temperature: float):
    return WatsonxLLM(
        model_id="meta-llama/llama-3-1-8b-instruct",
        url=os.getenv("WATSONX_URL"),
        project_id=os.getenv("PROJECT_ID"),
        apikey=os.getenv("WAX_API_KEY"),
        params={
            "decoding_method": "greedy",
            "max_new_tokens": max_tokens,
            "temperature": temperature,
        }
    )

@router.post("/chat", response_model=ChatResponse)
async def chat_endpoint(chat_request: ChatRequest):
    try:
        llm = get_watson_llm(
            chat_request.max_tokens,
            chat_request.temperature
        )
        response = llm.invoke(chat_request.message)
        
        return {
            "response": response.strip(),
            "conversation_id": chat_request.conversation_id or "new-conversation",
            "tokens_used": len(response.split())
        }
        
    except Exception as e:
        raise HTTPException(
            status_code=500,
            detail=f"Chat error: {str(e)}"
        )