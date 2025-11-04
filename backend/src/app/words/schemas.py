from typing import Optional

from pydantic import BaseModel, Field, model_validator


def validate_verb_consistency(obj):
    is_verb = obj.is_verb
    
    if is_verb is None:
        return obj
    
    if is_verb:
        if not obj.second_verb or not obj.third_verb:
            raise ValueError("second_verb and third_verb are required when is_verb is True")
    else:
        obj.second_verb = None
        obj.third_verb = None
    
    return obj

class WordBase(BaseModel):
    german_word: str = Field(..., min_length=1, max_length=100)
    translation: str = Field(..., min_length=1, max_length=200)
    image: Optional[str] = Field(None, max_length=500)
    hard_level: int = Field(0, ge=0, le=100)
    is_verb: bool = False
    second_verb: Optional[str] = Field(None, max_length=100)
    third_verb: Optional[str] = Field(None, max_length=100)


class WordCreate(WordBase):
    @model_validator(mode='after')
    def validate_verb_forms(self):
        return validate_verb_consistency(self)


class WordUpdate(BaseModel):
    german_word: Optional[str] = Field(None, min_length=1, max_length=100)
    translation: Optional[str] = Field(None, min_length=1, max_length=200)
    image: Optional[str] = Field(None, max_length=500)
    hard_level: Optional[int] = Field(None, ge=0, le=100)
    is_verb: Optional[bool] = None
    second_verb: Optional[str] = Field(None, max_length=100)
    third_verb: Optional[str] = Field(None, max_length=100)

    @model_validator(mode='after')
    def validate_verb_forms(self):
        return validate_verb_consistency(self)



class WordResponse(WordBase):
    id: int

    class Config:
        from_attributes = True  
