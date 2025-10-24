import React from 'react';
import Bg from '../components/Bg';
import WhiteCard from '../components/WhiteCard';
import WordCard from '../layout/WordCard';
import type { GermanWord } from '../types/WordType';

//test word
const Task: React.FC = () => {
  const sampleWord: GermanWord = {
    german_word: "Rot",
    translation: "красный",
    image: "https://as1.ftcdn.net/jpg/02/12/25/36/1000_F_212253647_wwPf6K1KCCyVSlemr1qMjpn0DjqDmSoY.jpg",
    hard_level: 80,
    is_verb: false,
    is_checked: false,
    //second_verb: "gtg",
    //third_verb: "gtg",
  };

  return (
    <>
      <Bg />
      <main className="flex items-center justify-center h-screen w-full p-0 sm:p-4 overflow-hidden">
        <WhiteCard>
          <div className="w-full h-full flex items-center justify-center">
            <WordCard word={sampleWord} />
          </div>
        </WhiteCard>
      </main>
    </>
  );
};

export default Task;
