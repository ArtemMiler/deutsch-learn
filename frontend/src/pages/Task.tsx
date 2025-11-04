import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Bg from '../components/Bg';
import WhiteCard from '../components/WhiteCard';
import HomeButton from '../components/HomeButton';
import WordCard from '../layout/WordCard';
import type { GermanWord } from '../types/WordType';
import { API_URL } from '../utils/api';

type AnswerState = 'unanswered' | 'correct' | 'wrong';

const Task: React.FC = () => {
  const navigate = useNavigate();
  const [answerState, setAnswerState] = useState<AnswerState>('unanswered');
  const [randomWords, setRandomWords] = useState<GermanWord[]>([]);

  useEffect(() => {
    const fetchWords = async () => {
      try {
        const response = await fetch(`${API_URL}/api/words/all-mixed`);
        
        if (!response.ok) {
          throw new Error('Ошибка загрузки данных');
        }
        
        const data: GermanWord[] = await response.json();
        setRandomWords(data);
      } catch (err) {
        console.error('Ошибка при загрузке слов:', err);
      } 
    };

    fetchWords();
  }, []);

  const handleAnswerStateChange = (state: AnswerState) => {
    setAnswerState(state);
  };

  return (
    <>
      <Bg answerState={answerState} />
      <main className="flex items-center justify-center h-screen w-full p-0 sm:p-4 overflow-hidden">
        <WhiteCard>
          <div className="absolute top-2 left-2 z-10">
            <HomeButton />
          </div>
          
          <div className="w-full h-full flex items-center justify-center">
            {randomWords.length === 0 ? (
              <div className="text-center px-4">
                <p className="text-gray-400 text-2xl font-semibold">
                  📚 Нет слов для тренировки
                </p>
                <button
                  onClick={() => navigate('/add-word')}
                  className="text-transparent bg-clip-text bg-gradient-to-r font-semibold text-xl from-blue-600 via-purple-600 to-cyan-600 mt-3 hover:underline transition-all duration-200 hover:scale-105"
                >
                  Добавить первое слово
                </button>
              </div>
            ) : (
              <WordCard 
                words={randomWords} 
                onAnswerStateChange={handleAnswerStateChange}
              />
            )}
          </div>
        </WhiteCard>
      </main>
    </>
  );
};

export default Task;
