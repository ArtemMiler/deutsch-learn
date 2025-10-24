import React, { useState, useMemo } from 'react';
import { useNavigate } from 'react-router-dom';
import Bg from '../components/Bg';
import WhiteCard from '../components/WhiteCard';
import HomeButton from '../components/HomeButton';
import ActionButton from '../components/ActionButton';
import DictionaryItem from '../components/DictionaryItem';
import InputField from '../components/InputField';
import type { GermanWord } from '../types/WordType';
import { removeArticle } from '../utils/DeleteArticle';

// Тестовые данные
const mockWords: GermanWord[] = [
  {
    german_word: 'das Haus',
    translation: 'дом',
    is_verb: false,
    hard_level: 1,
    is_checked: false,
  },
  {
    german_word: 'lernen',
    translation: 'учить',
    is_verb: true,
    second_verb: 'lernte',
    third_verb: 'gelernt',
    hard_level: 2,
    is_checked: false,
  },
  {
    german_word: 'der Apfel',
    translation: 'яблоко',
    is_verb: false,
    hard_level: 1,
    is_checked: false,
  },
  {
    german_word: 'sprechen',
    translation: 'говорить',
    is_verb: true,
    second_verb: 'sprach',
    third_verb: 'gesprochen',
    hard_level: 3,
    is_checked: false,
  },
  {
    german_word: 'das Buch',
    translation: 'книга',
    is_verb: false,
    hard_level: 1,
    is_checked: false,
  },
  {
    german_word: 'die Katze',
    translation: 'кошка',
    is_verb: false,
    hard_level: 1,
    is_checked: false,
  },
  {
    german_word: 'der Hund',
    translation: 'собака',
    is_verb: false,
    hard_level: 1,
    is_checked: false,
  },
];

const Dictionary: React.FC = () => {
  const navigate = useNavigate();

  const [words, setWords] = useState<GermanWord[]>(mockWords);
  const [searchQuery, setSearchQuery] = useState('');

  const sortedWords = useMemo(() => {
    let filtered = words;
    
    if (searchQuery.trim()) {
      const query = searchQuery.toLowerCase();
      filtered = words.filter(word => 
        removeArticle(word.german_word).toLowerCase().includes(query) || 
        word.translation.toLowerCase().includes(query) ||
        word.second_verb?.toLowerCase().includes(query) ||
        word.third_verb?.toLowerCase().includes(query)
      );
    }
  
    return [...filtered].sort((a, b) => {
      const wordA = removeArticle(a.german_word);
      const wordB = removeArticle(b.german_word);
      return wordA.localeCompare(wordB, 'de');
    });
  }, [words, searchQuery]);

  const handleCheck = (word: string) => {
    setWords(prev => prev.map(w => 
      w.german_word === word ? { ...w, is_checked: !w.is_checked } : w
    ));
  };

  const handleEdit = (wordText: string) => {
    const wordToEdit = words.find(w => w.german_word === wordText);
    if (wordToEdit) {
      navigate('/add-word', { state: { word: wordToEdit } });
    }
  };

  const handleAddToTraining = () => {
    const selectedWords = words.filter(w => w.is_checked);
    if (selectedWords.length > 0) {
      alert(`Добавлено в тренировку: ${selectedWords.length} слов(а)`);
    }
  };

  const selectedCount = words.filter(w => w.is_checked).length;
  const hasSelectedWords = selectedCount > 0;

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
              Словарь
            </h2>
            <p className="text-sm text-gray-500 mt-1">
              {searchQuery ? `Найдено: ${sortedWords.length} из ${words.length}` : `Всего слов: ${sortedWords.length}`}
            </p>
          </div>
          
          <div className="w-full flex-1 overflow-y-auto px-4 pb-4">
            {sortedWords.length > 0 ? (
              <div className="space-y-3">
                {sortedWords.map((word, index) => (
                  <DictionaryItem
                    key={`${word.german_word}-${index}`}
                    word={word}
                    on_check={handleCheck}
                    onEdit={handleEdit}
                  />
                ))}
              </div>
            ) : (
              <div className="h-full flex flex-col items-center justify-center">
                {searchQuery ? (
                  <>
                    <p className="text-gray-400 text-2xl font-semibold">
                      🔍 Ничего не найдено
                    </p>
                    <button
                      onClick={() => setSearchQuery('')}
                      className="text-transparent bg-clip-text bg-gradient-to-r font-semibold text-lg from-blue-600 via-purple-600 to-cyan-600 mt-3 hover:underline transition-all duration-200 hover:scale-105"
                    >
                      Очистить поиск
                    </button>
                  </>
                ) : (
                  <>
                    <p className="text-gray-400 text-2xl font-semibold">
                      📚 Словарь пока пуст
                    </p>
                    <button
                      onClick={() => navigate('/add-word')}
                      className="text-transparent bg-clip-text bg-gradient-to-r font-semibold text-xl from-blue-600 via-purple-600 to-cyan-600 mt-3 hover:underline transition-all duration-200 hover:scale-105"
                    >
                      Добавить первое слово
                    </button>
                  </>
                )}
              </div>
            )}
          </div>

          <div className="w-full px-4 pb-3 mt-4">
            <div className="relative">
              <InputField
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="🔍 Поиск слов..."
              />
              {searchQuery && (
                <button
                  onClick={() => setSearchQuery('')}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600 transition-colors text-xl font-bold"
                  aria-label="Очистить поиск"
                >
                  ✕
                </button>
              )}
            </div>
          </div>

          <div className="w-full px-4 pb-4">
            <ActionButton
              text={hasSelectedWords ? `Добавить в тренировку (${selectedCount})` : 'Добавить в тренировку'}
              color={hasSelectedWords ? 'base' : 'disabled'}
              disabled={!hasSelectedWords}
              onClick={handleAddToTraining}
            />
          </div>
        </WhiteCard>
      </main>
    </>
  );
};

export default Dictionary;

