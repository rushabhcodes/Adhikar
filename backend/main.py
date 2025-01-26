from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from chat import router as chat_router
from summarize import router as summarize_router


app = FastAPI()

# Add CORS middleware for handling requests from the frontend
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],  # Adjust allowed origins as needed
    allow_methods=["*"],
    allow_headers=["*"],
)


@app.get("/")
async def read_root():
    return {"message": "Welcome to the backend API"}

app.include_router(chat_router, prefix="/api")

app.include_router(summarize_router, prefix="/api")