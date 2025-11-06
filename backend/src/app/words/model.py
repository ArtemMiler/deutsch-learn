from typing import Optional

from app.database import BaseModel
from sqlalchemy import CheckConstraint, String
from sqlalchemy.orm import Mapped, mapped_column


class Word(BaseModel):
    __tablename__ = "words"
    __table_args__ = (
        CheckConstraint("hard_level <= 100", name="check_hard_level_range"),
        CheckConstraint("length(german_word) > 0", name="check_german_word_not_empty"),
        CheckConstraint("length(translation) > 0", name="check_translation_not_empty"),
        CheckConstraint(
            "(is_verb = TRUE AND second_verb IS NOT NULL AND third_verb IS NOT NULL) OR "
            "(is_verb = FALSE AND second_verb IS NULL AND third_verb IS NULL)",
            name="check_verb_forms_consistency"
        ),
        CheckConstraint(
            "(is_plural = TRUE AND plural IS NOT NULL) OR "
            "(is_plural = FALSE AND plural IS NULL)",
            name="check_plural_consistency"
        ),
    )
    
    id: Mapped[int] = mapped_column(primary_key=True, init=False, autoincrement=True)
    german_word: Mapped[str] = mapped_column(String(100), index=True, nullable=False)
    translation: Mapped[str] = mapped_column(String(200), index=True, unique=True, nullable=False)
    image: Mapped[Optional[str]] = mapped_column(String(500), default=None)
    hard_level: Mapped[int] = mapped_column(default=0)
    is_verb: Mapped[bool] = mapped_column(default=False)
    second_verb: Mapped[Optional[str]] = mapped_column(String(100), default=None)
    third_verb: Mapped[Optional[str]] = mapped_column(String(100), default=None)
    is_plural: Mapped[bool] = mapped_column(default=False)
    plural: Mapped[Optional[str]] = mapped_column(String(100), default=None)
    
    def __repr__(self) -> str:
        return f"Word(id={self.id}, german_word='{self.german_word}', translation='{self.translation}')"