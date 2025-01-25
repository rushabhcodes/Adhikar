from fastapi import FastAPI, File, Form, UploadFile, HTTPException
from fastapi.responses import JSONResponse
from fastapi.middleware.cors import CORSMiddleware
from chat import router as chat_router
from summarize import router as summarize_router
from pathlib import Path
from generate_quiz import extract_text_from_pdf, generate_quiz
from utils import clean_text
import os

app = FastAPI()

# Add CORS middleware for handling requests from the frontend
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],  # Adjust allowed origins as needed
    allow_methods=["*"],
    allow_headers=["*"],
)

# Directory for saving uploaded files
UPLOAD_DIR = "uploads"
os.makedirs(UPLOAD_DIR, exist_ok=True)


@app.get("/")
async def read_root():
    return {"message": "Welcome to the backend API"}

app.include_router(chat_router, prefix="/api")

app.include_router(summarize_router, prefix="/api")