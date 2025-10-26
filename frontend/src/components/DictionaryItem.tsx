import React from 'react';
import { HiCheck, HiPencil } from 'react-icons/hi';
import type { GermanWord } from '../types/WordType';
import { removeArticle } from '../utils/DeleteArticle';

interface DictionaryItemProps {
  word: GermanWord;
  onCheck: (word: string) => void;
  onEdit: (word: string) => void;
}

const DictionaryItem: React.FC<DictionaryItemProps> = ({ 
  word, 
  onCheck, 
  onEdit
}) => {
  const displayWord = removeArticle(word.german_word);

  return (
    <div className="w-full bg-white rounded-xl p-4 shadow-md hover:shadow-lg transition-all duration-300 border border-gray-100">
      <div className="flex items-center justify-between gap-4">
        <div className="flex-1 min-w-0">
          <div className="flex items-baseline gap-2 mb-1">
            <h3 className="text-lg font-semibold text-gray-800 truncate">
              {displayWord}
            </h3>
            {word.is_verb && (
              <span className="text-xs font-medium text-purple-600 bg-purple-50 px-2 py-0.5 rounded-full">
                irregular verb
              </span>
            )}
          </div>
          <p className="text-sm text-gray-600 truncate">
            {word.translation}
          </p>
          {word.is_verb && (
            <p className="text-xs text-gray-500 mt-1 truncate">
              {word.second_verb} · {word.third_verb}
            </p>
          )}
        </div>

        <div className="flex items-center gap-2 flex-shrink-0">
          <button
            onClick={() => onCheck(word.german_word)}
            className={`p-2 rounded-lg transition-all duration-200 ${
              word.is_checked
                ? 'bg-gradient-to-r from-blue-500 via-purple-500 to-cyan-500 text-white hover:from-blue-600 hover:via-purple-600 hover:to-cyan-600'
                : 'bg-gray-100 text-gray-400 hover:bg-gray-200 hover:text-gray-600'
            }`}
            aria-label="Mark as learned"
          >
            <HiCheck className="h-5 w-5" />
          </button>

          <button
            onClick={() => onEdit(word.german_word)}
            className="p-2 rounded-lg bg-blue-50 text-blue-600 hover:bg-blue-100 hover:text-blue-700 transition-all duration-200"
            aria-label="Edit word"
          >
            <HiPencil className="h-5 w-5" />
          </button>
        </div>
      </div>
    </div>
  );
};

export default DictionaryItem;

