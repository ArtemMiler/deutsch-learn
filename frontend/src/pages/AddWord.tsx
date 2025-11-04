import React from 'react';
import { useLocation } from 'react-router-dom';
import Bg from '../components/Bg';
import WhiteCard from '../components/WhiteCard';
import HomeButton from '../components/HomeButton';
import AddWordForm from '../layout/AddWordForm';
import type { GermanWord } from '../types/WordType';
import { API_URL } from '../utils/api';

interface LocationState {
  word?: GermanWord;
}

const AddWord: React.FC = () => {
  const location = useLocation();
  const state = location.state as LocationState | null;
  const editWord = state?.word;

  const prepareWordData = (word: GermanWord) => ({
    german_word: word.german_word,
    translation: word.translation,
    image: word.image || null,
    hard_level: word.hard_level,
    is_verb: word.is_verb,
    second_verb: word.is_verb ? word.second_verb : null,
    third_verb: word.is_verb ? word.third_verb : null,
  });

  const handleAddWord = async (word: GermanWord) => {
    try {
      const wordData = prepareWordData(word);
      
      if (editWord) {
        const response = await fetch(`${API_URL}/api/words/${word.id}`, {
          method: 'PUT',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(wordData),
        });

        if (!response.ok) {
          const errorData = await response.json();
          throw new Error(errorData.detail || 'Ошибка при обновлении слова');
        }

        alert(`Слово "${word.german_word}" успешно обновлено!`);
      } else {
        const response = await fetch(`${API_URL}/api/words/`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(wordData),
        });

        if (!response.ok) {
          const errorData = await response.json();
          throw new Error(errorData.detail || 'Ошибка при добавлении слова');
        }

        alert(`Слово "${word.german_word}" успешно добавлено!`);
      }
    } catch (err) {
      alert(`Ошибка: ${err instanceof Error ? err.message : 'Неизвестная ошибка'}`);
    }
  };

  return (
    <>
      <Bg />
      <main className="flex items-center justify-center h-screen sm:min-h-screen w-full p-0 sm:p-4 overflow-hidden">
        <WhiteCard>
          <div className="absolute top-2 left-2 z-10">
            <HomeButton />
          </div>
          
          <div className="w-full text-center pt-2 pb-4">
            <h2 className="text-2xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-blue-600 via-purple-600 to-cyan-600">
              {editWord ? 'Редактировать слово' : 'Добавить слово'}
            </h2>
          </div>
          
          <div className="w-full flex-1 flex flex-col overflow-hidden px-4">
            <AddWordForm 
              onSubmit={handleAddWord} 
              initialWord={editWord} 
            />
          </div>
        </WhiteCard>
      </main>
    </>
  );
};

export default AddWord;

