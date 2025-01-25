# backend/app/chat.py
from fastapi import APIRouter, HTTPException
from pydantic import BaseModel
from typing import Optional
import os
from langchain_ibm import WatsonxLLM

router = APIRouter()

SYSTEM_PROMPT = """You are an AI legal assistant specialized in Indian law. Your responses must:
1. Cite relevant sections of Indian statutes and case laws
2. Maintain strict accuracy and avoid speculation
3. Clearly distinguish between established law and legal opinion
5. Recommend consulting a qualified advocate for specific cases
6. Use plain language while maintaining legal precision"""
class ChatRequest(BaseModel):
    message: str
    conversation_id: Optional[str] = None
    temperature: float = 0.7
    max_tokens: int = 1000

class ChatResponse(BaseModel):
    response: str
    conversation_id: str
    tokens_used: int

def format_legal_prompt(user_input: str) -> str:
    return f"""<s>[INST] <<SYS>>
{SYSTEM_PROMPT}
<</SYS>>

{user_input} [/INST]"""

def get_watson_llm(max_tokens: int, temperature: float):
    return WatsonxLLM(
        model_id="mistralai/mixtral-8x7b-instruct-v01",
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
        
        formatted_prompt = format_legal_prompt(chat_request.message)
        response = llm.invoke(formatted_prompt)
        
        clean_response = response.strip().replace("</s>", "")
        

        return {
            "response": clean_response,
            "conversation_id": chat_request.conversation_id or "new-conversation",
            "tokens_used": len(clean_response.split())
        }
        
    except Exception as e:
        raise HTTPException(
            status_code=500,
            detail=f"Legal consultation error: {str(e)}"
        )