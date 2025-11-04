from app.words.model import Word
from sqlalchemy import delete, func, select
from sqlalchemy.exc import IntegrityError
from sqlalchemy.ext.asyncio import AsyncSession


async def get_all_words(db: AsyncSession) -> list[Word]:
    result = await db.execute(select(Word).order_by(Word.id))
    return list(result.scalars().all())


async def get_mixed_words(db: AsyncSession) -> list[Word]:
    result = await db.execute(select(Word).order_by(func.random()))
    return list(result.scalars().all())


async def get_word_by_id(db: AsyncSession, id: int) -> Word | None:
    result = await db.execute(select(Word).where(Word.id == id))
    return result.scalar_one_or_none()


async def delete_words_by_id(db: AsyncSession, ids: list[int]) -> None:
    await db.execute(delete(Word).where(Word.id.in_(ids)))
    await db.commit()


async def create_word(db: AsyncSession, word_data: dict) -> Word | None:
    existing_word = await db.execute(
        select(Word).where(Word.translation == word_data.get("translation"))
    )
    if existing_word.scalar_one_or_none():
        return None
    
    try:
        new_word = Word(**word_data)
        db.add(new_word)
        await db.commit()
        await db.refresh(new_word)
        return new_word
    except IntegrityError:
        await db.rollback()
        return None


async def update_word(db: AsyncSession, word_id: int, word_data: dict) -> Word | None:
    
    result = await db.execute(select(Word).where(Word.id == word_id))
    existing_word = result.scalar_one_or_none()
    
    if not existing_word:
        return None
    
    if "translation" in word_data and word_data["translation"] != existing_word.translation:
        check_translation = await db.execute(
            select(Word).where(
                Word.translation == word_data["translation"],
                Word.id != word_id
            )
        )
        if check_translation.scalar_one_or_none():
            return None
    
    try:
        for key, value in word_data.items():
            if hasattr(existing_word, key):
                setattr(existing_word, key, value)
        
        await db.commit()
        await db.refresh(existing_word)
        return existing_word
    except IntegrityError:
        await db.rollback()
        return None
