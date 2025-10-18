import React from 'react';
import Bg from '../components/Bg';
import WhiteCard from '../components/WhiteCard';
import HomeButton from '../components/HomeButton';
import AddWordForm from '../layout/AddWordForm';
import type { Word } from '../types/WordType';

const AddWord: React.FC = () => {
  const handleAddWord = (word: Word) => {
    alert(`Слово "${word.word}" успешно добавлено!`);
  };

  return (
    <>
      <Bg />
      <main className="flex items-center justify-center min-h-screen w-full p-4">
        <WhiteCard>
          <div className="absolute top-0.5 left-2">
            <HomeButton />
          </div>
          
          {/* Заголовок */}
          <div className="w-full text-center pt-2 pb-4">
            <h2 className="text-2xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-blue-600 via-purple-600 to-cyan-600">
              Добавить слово
            </h2>
          </div>
          
          {/* Форма */}
          <div className="w-full flex-1 flex flex-col overflow-hidden px-4">
            <AddWordForm onSubmit={handleAddWord} />
          </div>
        </WhiteCard>
      </main>
    </>
  );
};

export default AddWord;

