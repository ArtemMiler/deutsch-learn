import React, { useState } from 'react';
import InputField from '../components/InputField';
import type { Word } from '../types/WordType';

interface AddWordFormProps {
  onSubmit?: (word: Word) => void;
}

const AddWordForm: React.FC<AddWordFormProps> = ({ onSubmit }) => {
  const [germanWord, setGermanWord] = useState('');
  const [translation, setTranslation] = useState('');
  const [imageUrl, setImageUrl] = useState('');
  const [isVerb, setIsVerb] = useState(false);
  const [secondVerb, setSecondVerb] = useState('');
  const [thirdVerb, setThirdVerb] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    const newWord: Word = isVerb
      ? {
          word: germanWord.trim(),
          translation: translation.trim(),
          image: imageUrl.trim() || undefined,
          hard_level: 0,
          is_verb: true,
          second_verb: secondVerb.trim(),
          third_verb: thirdVerb.trim(),
        }
      : {
          word: germanWord.trim(),
          translation: translation.trim(),
          image: imageUrl.trim() || undefined,
          hard_level: 0,
          is_verb: false,
        };

    if (onSubmit) {
      onSubmit(newWord);
    }

    // Очистка формы
    setGermanWord('');
    setTranslation('');
    setImageUrl('');
    setIsVerb(false);
    setSecondVerb('');
    setThirdVerb('');
  };

  return (
    <form onSubmit={handleSubmit} className="w-full max-w-2xl mx-auto flex flex-col h-full">
      {/* Верхние поля */}
      <div className="space-y-5">
        {/* Немецкое слово */}
        <div>
          <label className="block text-sm font-semibold text-gray-700 mb-2">
            Новое слово <span className="text-red-500">*</span>
          </label>
          <InputField
            value={germanWord}
            onChange={(e) => setGermanWord(e.target.value)}
            placeholder="Слово на немецком"
            pattern="^[a-zA-ZäöüÄÖÜß\s\-]+$"
            required
          />
        </div>

        {/* Перевод */}
        <div>
          <label className="block text-sm font-semibold text-gray-700 mb-2">
            Перевод <span className="text-red-500">*</span>
          </label>
          <InputField
            value={translation}
            onChange={(e) => setTranslation(e.target.value)}
            placeholder="Перевод на русский"
            pattern="^[а-яА-ЯёЁ\s\-,]+$"
            required
          />
        </div>

        {/* Переключатель типа слова */}
        <div className="bg-gradient-to-r from-blue-50 to-cyan-50 p-4 rounded-xl border-2 border-blue-200/50">
          <label className="flex items-center space-x-3 cursor-pointer group">
            <div className="relative">
              <input
                type="checkbox"
                checked={isVerb}
                onChange={(e) => setIsVerb(e.target.checked)}
                className="sr-only peer"
              />
              <div className="w-14 h-8 bg-gray-300 rounded-full peer 
                peer-checked:bg-gradient-to-r peer-checked:from-blue-500 peer-checked:to-cyan-500
                transition-all duration-300 shadow-inner">
              </div>
              <div className="absolute left-1 top-1 w-6 h-6 bg-white rounded-full 
                transition-all duration-300 peer-checked:translate-x-6 shadow-md">
              </div>
            </div>
            <span className="font-semibold text-gray-700 group-hover:text-blue-600 transition-colors">
              {isVerb ? 'Неправильный глагол' : 'Обычное слово'}
            </span>
          </label>
        </div>
      </div>

      {/* Средняя часть с фиксированной высотой для форм глагола */}
      <div className="relative h-[200px] mt-5">
        {isVerb && (
          <div className="space-y-4 animate-fadeIn bg-blue-50/50 p-5 rounded-xl border-2 border-blue-200/50">
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">
                Вторая форма глагола <span className="text-red-500">*</span>
              </label>
              <InputField
                value={secondVerb}
                onChange={(e) => setSecondVerb(e.target.value)}
                placeholder="Präteritum"
                pattern="^[a-zA-ZäöüÄÖÜß\s\-]+$"
                required={isVerb}
              />
            </div>
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">
                Третья форма глагола <span className="text-red-500">*</span>
              </label>
              <InputField
                value={thirdVerb}
                onChange={(e) => setThirdVerb(e.target.value)}
                placeholder="Partizip II"
                pattern="^[a-zA-ZäöüÄÖÜß\s\-]+$"
                required={isVerb}
              />
            </div>
          </div>
        )}
      </div>

      {/* Нижние элементы - всегда на одном месте */}
      <div className="space-y-5 mt-5">
        {/* Изображение (необязательно) */}
        <div>
          <label className="block text-sm font-semibold text-gray-700 mb-2">
            Ссылка на изображение (необязательно)
          </label>
          <InputField
            value={imageUrl}
            onChange={(e) => setImageUrl(e.target.value)}
            placeholder="https://example.com/image.jpg"
            type="url"
          />
        </div>

        {/* Кнопка добавления */}
        <div className="pt-2 pb-4">
          <button
            type="submit"
            className="w-full relative overflow-hidden py-4 px-8 rounded-xl
              text-xl font-semibold text-white
              transform transition-all duration-300 ease-out shadow-lg hover:shadow-xl
              hover:scale-105 hover:-translate-y-0.5 active:scale-95
              focus:outline-none focus:ring-2 focus:ring-offset-2
              bg-gradient-to-r from-blue-500 to-cyan-500
              hover:from-cyan-500 hover:to-blue-500
              focus:ring-blue-400"
          >
            <span className="relative z-10">
              Добавить слово
            </span>
          </button>
        </div>
      </div>
    </form>
  );
};

export default AddWordForm;

