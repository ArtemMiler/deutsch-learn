import React, { useState } from 'react';
import type { Word } from '../types/WordType';
import InputField from '../components/InputField';
import ActionButton from '../components/ActionButton';
import BackButton from '../components/HomeButton';

interface WordCardProps {
  word: Word;
}

const WordCard: React.FC<WordCardProps> = ({ word }) => {
  const [inputValue, setInputValue] = useState('');
  const [verbInputs, setVerbInputs] = useState({
    second: '',
    third: ''
  });

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInputValue(e.target.value);
  };

  const handleVerbInputChange = (
    field: 'second' | 'third',
    e: React.ChangeEvent<HTMLInputElement>
  ) => {
    setVerbInputs((prev) => ({
      ...prev,
      [field]: e.target.value
    }));
  };

  return (
    <article 
      className="relative w-[380px] mx-auto"
      role="region"
      aria-label={`Карточка слова: ${word.word}`}
    >
      <div className="absolute -inset-0.5 bg-gradient-to-r from-blue-600 via-purple-600 to-cyan-600 rounded-2xl opacity-75 blur-sm" aria-hidden="true" />
      
      <div className="relative bg-white/95 backdrop-blur-sm rounded-2xl p-6 shadow-xl transition-shadow duration-300">
        <div className="w-full flex flex-col items-center">
          <div className="w-full flex items-center justify-between mb-1 mt-2">
            <BackButton />
            <h2 className="text-5xl font-bold text-center bg-indigo-600 bg-clip-text text-transparent flex-1">
              {word.word}
            </h2>
            <div className="w-10" />
          </div>

          {word.image && (
            <figure className="w-60 h-60 my-7 rounded-xl overflow-hidden flex items-center justify-center relative">
              <img
                src={word.image}
                alt={`Изображение для слова ${word.word}: ${word.translation}`}
                className="w-full h-full object-contain"
                loading="lazy"
              />
            </figure>
          )}
        </div>

      <div className="w-full grid grid-rows-3 gap-4 mt-2 animate-slide-up" role="form" aria-label="Форма ввода ответа">
        {word.is_verb ? (
          <>
            <div>
              <InputField
                value={inputValue}
                onChange={handleInputChange}
                placeholder="Введите первую форму"
              />
            </div>
            <div>
              <InputField
                value={verbInputs.second}
                onChange={(e) => handleVerbInputChange('second', e)}
                placeholder="Введите вторую форму"
              />
            </div>
            <div>
              <InputField
                value={verbInputs.third}
                onChange={(e) => handleVerbInputChange('third', e)}
                placeholder="Введите третью форму"
              />
            </div>
          </>
        ) : (
          <>
            <div aria-hidden="true" />
            <div>
              <InputField
                value={inputValue}
                onChange={handleInputChange}
                placeholder="Введите перевод"
              />
            </div>
            <div aria-hidden="true" />
          </>
        )}
      </div>
      
      <div className="w-full mt-6 animate-slide-up">
        <ActionButton text="Подтвердить" color="base" />
      </div>
      </div>
    </article>
  );
};

export default WordCard;