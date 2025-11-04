import os
from contextlib import asynccontextmanager

from app.database import init_db
from app.words.controller import router as words_router
from dotenv import load_dotenv
from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware

load_dotenv()

def get_required_env(key: str) -> str:
    value = os.getenv(key)
    if not value:
        raise ValueError(f"{key} environment variable is required")
    return value

ALLOWED_ORIGINS = [origin.strip() for origin in get_required_env("ALLOWED_ORIGINS").split(",")]
API_PORT = int(get_required_env("API_PORT"))
API_HOST = get_required_env("API_HOST")

@asynccontextmanager
async def lifespan(app: FastAPI):
    await init_db()
    yield

app = FastAPI(
    title="Deutsch Learn API",
    lifespan=lifespan
)

app.add_middleware(
    CORSMiddleware,
    allow_origins=ALLOWED_ORIGINS,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

app.include_router(words_router)
