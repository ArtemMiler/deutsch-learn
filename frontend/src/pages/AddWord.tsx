import React from 'react';
import { useLocation } from 'react-router-dom';
import Bg from '../components/Bg';
import WhiteCard from '../components/WhiteCard';
import HomeButton from '../components/HomeButton';
import AddWordForm from '../layout/AddWordForm';
import type { GermanWord } from '../types/WordType';

const AddWord: React.FC = () => {
  const location = useLocation();
  const editWord = location.state?.word as GermanWord | undefined;

  const handleAddWord = (word: GermanWord) => {
    if (editWord) {
      alert(`Слово "${word.german_word}" успешно обновлено!`);
    } else {
      alert(`Слово "${word.german_word}" успешно добавлено!`);
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
            <AddWordForm onSubmit={handleAddWord} initialWord={editWord} />
          </div>
        </WhiteCard>
      </main>
    </>
  );
};

export default AddWord;

