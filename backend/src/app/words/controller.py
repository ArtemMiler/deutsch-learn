from app.database import get_db
from app.words.schemas import WordCreate, WordResponse, WordUpdate
from app.words.service import (create_word, delete_words_by_id, get_all_words,
                               get_mixed_words, get_word_by_id, update_word)
from fastapi import APIRouter, Body, Depends, HTTPException
from sqlalchemy.ext.asyncio import AsyncSession

router = APIRouter(
    prefix="/api/words",
)

@router.get("/all", response_model=list[WordResponse])
async def get_all_words_route(db: AsyncSession = Depends(get_db)):
    return await get_all_words(db)

@router.get("/all-mixed", response_model=list[WordResponse])
async def get_mixed_words_route(db: AsyncSession = Depends(get_db)):
    return await get_mixed_words(db)

@router.get("/{id}", response_model=WordResponse)
async def get_word_by_id_route(id: int, db: AsyncSession = Depends(get_db)):
    word = await get_word_by_id(db, id)
    if not word:
        raise HTTPException(status_code=404, detail="Word not found")
    return word

@router.delete("/", status_code=204)
async def delete_words_by_ids_route(
    ids: list[int] = Body(...), 
    db: AsyncSession = Depends(get_db)
):
    await delete_words_by_id(db, ids)


@router.post("/", response_model=WordResponse, status_code=201)
async def create_word_route(
    word_data: WordCreate,
    db: AsyncSession = Depends(get_db)
):
    word = await create_word(db, word_data.model_dump())
    if not word:
        raise HTTPException(
            status_code=400, 
            detail="Word with this translation already exists"
        )
    return word

@router.put("/{id}", response_model=WordResponse)
async def update_word_route(
    id: int,
    word_data: WordUpdate,
    db: AsyncSession = Depends(get_db)
):
    word = await update_word(db, id, word_data.model_dump(exclude_unset=True))
    if not word:
        raise HTTPException(
            status_code=404, 
            detail="Word not found or translation already exists"
        )
    return word