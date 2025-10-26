import React, { useState, useEffect } from 'react';
import type { GermanWord } from '../types/WordType';
import InputField from '../components/InputField';
import ActionButton from '../components/ActionButton';
import HomeButton from '../components/HomeButton';
import ConfettiParticles from '../components/ConfettiParticles';

interface WordCardProps {
  word: GermanWord;
  onAnswerStateChange?: (state: AnswerState) => void;
}

type AnswerState = 'unanswered' | 'correct' | 'wrong';

const WordCard: React.FC<WordCardProps> = ({ word, onAnswerStateChange }) => {
  const [inputValue, setInputValue] = useState('');
  const [verbInputs, setVerbInputs] = useState({
    second: '',
    third: ''
  });
  const [answerState, setAnswerState] = useState<AnswerState>('unanswered');
  const [showConfetti, setShowConfetti] = useState(false);
  const [imageError, setImageError] = useState(false);

  useEffect(() => {
    if (onAnswerStateChange) {
      onAnswerStateChange(answerState);
    }
  }, [answerState, onAnswerStateChange]);

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

  const isFormValid = word.is_verb
    ? inputValue.trim() !== '' && verbInputs.second.trim() !== '' && verbInputs.third.trim() !== ''
    : inputValue.trim() !== '';

  const handleSubmit = () => {
    if (answerState !== 'unanswered') {
      window.location.reload();
      return;
    }

    if (isFormValid) {
      let isCorrect = false;
      let correctAnswer = '';

      if (word.is_verb) {
        isCorrect = inputValue.trim().toLowerCase() === word.german_word.toLowerCase() &&
                    verbInputs.second.trim().toLowerCase() === word.second_verb.toLowerCase() &&
                    verbInputs.third.trim().toLowerCase() === word.third_verb.toLowerCase();
        
        if (!isCorrect) {
          correctAnswer = 'Правильный ответ: ' + word.german_word + ' ' + word.second_verb + ' ' + word.third_verb;
        }
      } else {
        isCorrect = inputValue.trim().toLowerCase() === word.german_word.toLowerCase();
        
        if (!isCorrect) {
          correctAnswer = 'Правильный ответ: ' + word.german_word;
        }
      }

      setAnswerState(isCorrect ? 'correct' : 'wrong');
      setShowConfetti(true);

      if (!isCorrect && correctAnswer) {
        setTimeout(() => {
          alert(correctAnswer);
        }, 500);
      }
    }
  };

  const getGradientClass = () => {
    if (answerState === 'correct') {
      return 'bg-gradient-to-r from-emerald-500 via-lime-500 to-green-500';
    } else if (answerState === 'wrong') {
      return 'bg-gradient-to-r from-red-500 via-pink-500 to-yellow-500';
    }
    return 'bg-gradient-to-r from-blue-600 via-purple-600 to-cyan-600';
  };

  const getButtonText = () => {
    return answerState !== 'unanswered' ? 'Далее' : 'Подтвердить';
  };

  const getButtonColor = () => {
    if (answerState === 'correct') return 'correct';
    if (answerState === 'wrong') return 'wrong';
    return isFormValid ? 'base' : 'disabled';
  };

  return (
    <>
      {showConfetti && <ConfettiParticles type={answerState === 'correct' ? 'correct' : 'wrong'} />}
      
      <article 
        className="relative w-[90%] max-w-[350px] sm:max-w-[370px] md:max-w-[380px] mx-auto"
        role="region"
        aria-label={`Карточка слова: ${word.translation}`}
      >
        <div className={`absolute -inset-0.5 ${getGradientClass()} rounded-2xl opacity-90 blur-sm transition-all duration-500`} aria-hidden="true" />
      
      <div className="relative bg-white/95 backdrop-blur-sm rounded-2xl p-6 shadow-xl transition-shadow duration-300">
        <div className="w-full flex flex-col items-center">
          <div className="w-full flex items-center justify-between mb-1 mt-2">
            <HomeButton />
            <h2 className="text-3xl font-bold text-center bg-indigo-600 bg-clip-text text-transparent flex-1">
              {word.translation}
            </h2>
            <div className="w-10" />
          </div>

          {word.image && (
            <figure className="w-60 h-60 my-7 rounded-xl overflow-hidden flex items-center justify-center relative bg-gradient-to-br from-gray-100 to-gray-200">
              {imageError ? (
                <div className="text-center p-4">
                  <span className="text-6xl mb-2 block">📷</span>
                  <p className="text-sm text-gray-500">Изображение недоступно</p>
                </div>
              ) : (
                <img
                  src={word.image}
                  alt={`Изображение для слова ${word.translation}: ${word.translation}`}
                  className="w-full h-full object-contain"
                  loading="lazy"
                  onError={() => setImageError(true)}
                />
              )}
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
        <ActionButton 
          text={getButtonText()} 
          color={getButtonColor()} 
          disabled={answerState === 'unanswered' && !isFormValid}
          onClick={handleSubmit}
        />
      </div>
      </div>
    </article>
    </>
  );
};

export default WordCard;