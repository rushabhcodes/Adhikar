from fastapi import APIRouter, File, Form, UploadFile, HTTPException
from fastapi.responses import JSONResponse
from pathlib import Path
from pypdf import PdfReader
from langchain.chains.summarize import load_summarize_chain
from langchain.text_splitter import RecursiveCharacterTextSplitter
from langchain_ibm import WatsonxLLM
from langchain_core.prompts import PromptTemplate
from dotenv import load_dotenv
import os
from utils import clean_text, token_calculator  # Assuming these are generic utils

load_dotenv()

router = APIRouter()

# Configuration for summarization
sum_parameters = {
    "decoding_method": "greedy",
    "max_new_tokens": 8000,
    "min_new_tokens": 1,
    "repetition_penalty": 1,
}

def extract_text(pdf_path: str, from_page: int = None, to_page: int = None):
    """Extract and clean text from PDF with page range support"""
    reader = PdfReader(pdf_path)
    raw_text = ""
    
    start_page = max(0, from_page - 1) if from_page else 0
    end_page = to_page if to_page else len(reader.pages)

    for page_num in range(start_page, end_page):
        page = reader.pages[page_num]
        raw_text += page.extract_text() + "\n"
    
    return clean_text(raw_text)

def summarize_content(text: str):
    """Summarize text using WatsonxLLM"""
    # Initialize LLM
    llm = WatsonxLLM(
        model_id="mistralai/mixtral-8x7b-instruct-v01",
        url=os.getenv("WATSONX_URL"),
        project_id=os.getenv("PROJECT_ID"),
        apikey=os.getenv("WAX_API_KEY"),
        params=sum_parameters,
    )

    # Split text into chunks
    text_splitter = RecursiveCharacterTextSplitter(
        separators=["\n\n", "\n", ". ", " "],
        chunk_size=10000,
        chunk_overlap=500
    )
    docs = text_splitter.create_documents([text])

    # Create summarization chain
    map_prompt = "Summarize this text:\n{text}\nSUMMARY:"
    combine_prompt = "Combine these summaries into one coherent summary:\n{text}\nFINAL SUMMARY:"
    
    chain = load_summarize_chain(
        llm=llm,
        chain_type="map_reduce",
        map_prompt=PromptTemplate.from_template(map_prompt),
        combine_prompt=PromptTemplate.from_template(combine_prompt),
    )

    return chain.run(docs)

@router.post("/summarize")
async def summarize_pdf(
    file: UploadFile = File(...),
    from_page: int = Form(None),
    to_page: int = Form(None)
):
    """Summarize a PDF document"""
    try:
        # Validate PDF
        if not file.filename.endswith(".pdf"):
            raise HTTPException(400, "Only PDF files are allowed")

        # Save uploaded file temporarily
        file_path = Path("uploads") / file.filename
        file_path.parent.mkdir(exist_ok=True)
        
        with file_path.open("wb") as buffer:
            buffer.write(await file.read())

        # Process PDF
        text = extract_text(file_path, from_page, to_page)
        os.remove(file_path)  # Cleanup temp file

        # Check token length
        if token_calculator(text) > 70000:
            raise HTTPException(400, "Document too large. Max 70,000 tokens allowed.")

        # Generate summary
        summary = summarize_content(text)
        return JSONResponse(content={"summary": summary})

    except HTTPException:
        raise
    except Exception as e:
        if file_path.exists():
            os.remove(file_path)
        raise HTTPException(500, f"Summarization failed: {str(e)}")