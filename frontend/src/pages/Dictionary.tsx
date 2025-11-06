import React, { useState, useMemo, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Bg from '../components/Bg';
import WhiteCard from '../components/WhiteCard';
import HomeButton from '../components/HomeButton';
import ActionButton from '../components/ActionButton';
import DictionaryItem from '../components/DictionaryItem';
import InputField from '../components/InputField';
import type { GermanWord } from '../types/WordType';
import { removeArticle } from '../utils/deleteArticle';
import { API_URL } from '../utils/api';

const Dictionary: React.FC = () => {
  const navigate = useNavigate();

  const [words, setWords] = useState<GermanWord[]>([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedIds, setSelectedIds] = useState<Set<number>>(new Set());

  useEffect(() => {
    const fetchWords = async () => {
      try {
        const response = await fetch(`${API_URL}/api/words/all`);
        
        if (!response.ok) {
          throw new Error('Ошибка загрузки данных');
        }
        
        const data: GermanWord[] = await response.json();
        setWords(data);
      } catch (err) {
        console.error('Ошибка при загрузке слов:', err);
      } 
    };

    fetchWords();
  }, []);

  const handleDelete = async (ids: number[]) => {
    try {
      const response = await fetch(`${API_URL}/api/words/`, {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(ids),
      });
      if (!response.ok) {
        throw new Error('Ошибка при удалении слов');
      }
      setWords(prev => prev.filter(w => !ids.includes(w.id)));
      setSelectedIds(new Set());
    } catch (err) {
      console.error('Ошибка при удалении слов:', err);
    }
  };

  const sortedWords = useMemo(() => {
    let filtered = words;
    
    if (searchQuery.trim()) {
      const query = searchQuery.toLowerCase();
      filtered = words.filter(word => 
        removeArticle(word.german_word).toLowerCase().includes(query) || 
        word.translation.toLowerCase().includes(query) ||
        word.second_verb?.toLowerCase().includes(query) ||
        word.third_verb?.toLowerCase().includes(query) ||
        word.plural?.toLowerCase().includes(query)
      );
    }
  
    return [...filtered].sort((a, b) => {
      const wordA = removeArticle(a.german_word);
      const wordB = removeArticle(b.german_word);
      return wordA.localeCompare(wordB, 'de');
    });
  }, [words, searchQuery]);

  const handleCheck = (word: GermanWord) => {
    setSelectedIds(prev => {
      const newSet = new Set(prev);
      if (newSet.has(word.id)) {
        newSet.delete(word.id);
      } else {
        newSet.add(word.id);
      }
      return newSet;
    });
  };

  const handleEdit = (word: GermanWord) => {
    navigate('/add-word', { state: { word } });
  };

  const handleAddToTraining = () => {
    const selectedWords = words.filter(w => selectedIds.has(w.id));
    if (selectedWords.length > 0) {
      alert(`Добавлено в тренировку: ${selectedWords.length} слов(а)`);
    }
  };

  const selectedCount = selectedIds.size;
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
                    isChecked={selectedIds.has(word.id)}
                    onCheck={handleCheck}
                    onEdit={handleEdit}
                  />
                ))}
              </div>
            ) : (
              <div className="h-full flex flex-col items-center justify-center">
                {searchQuery ? (
                  <>
                    <p className="text-gray-400 text-2xl font-semibold">
                      Ничего не найдено
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

          <div className="w-full flex flex-col gap-6 mt-auto mb-6 px-4">
            <div className="relative animate-button-entrance-1">
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
            
            <div className="flex flex-row gap-4 animate-button-entrance-2">
              <ActionButton
                text={hasSelectedWords ? `Добавить (${selectedCount})` : 'Добавить в список'}
                color={hasSelectedWords ? 'base' : 'disabled'}
                disabled={!hasSelectedWords}
                onClick={handleAddToTraining}
              />
              <ActionButton
                text={hasSelectedWords ? `Удалить (${selectedCount})` : 'Удалить'}
                color={hasSelectedWords ? 'wrong' : 'disabled'}
                disabled={!hasSelectedWords}
                onClick={() => {
                  handleDelete(Array.from(selectedIds));
                }}
              />
            </div>
          </div>
        </WhiteCard>
      </main>
    </>
  );
};

export default Dictionary;

