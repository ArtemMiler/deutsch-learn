import React, { useState, useEffect } from 'react';
import InputField from '../components/InputField';
import ActionButton from '../components/ActionButton';
import type { GermanWord } from '../types/WordType';

interface AddWordFormProps {
  onSubmit?: (word: GermanWord) => void;
  initialWord?: GermanWord;
}

const AddWordForm: React.FC<AddWordFormProps> = ({ onSubmit, initialWord }) => {
  const [germanWord, setGermanWord] = useState('');
  const [translation, setTranslation] = useState('');
  const [imageUrl, setImageUrl] = useState('');
  const [isVerb, setIsVerb] = useState(false);
  const [secondVerb, setSecondVerb] = useState('');
  const [thirdVerb, setThirdVerb] = useState('');
  const [errors, setErrors] = useState<Record<string, string>>({});

  useEffect(() => {
    if (initialWord) {
      setGermanWord(initialWord.german_word);
      setTranslation(initialWord.translation);
      setImageUrl(initialWord.image || '');
      setIsVerb(initialWord.is_verb);
      if (initialWord.is_verb && initialWord.second_verb && initialWord.third_verb) {
        setSecondVerb(initialWord.second_verb);
        setThirdVerb(initialWord.third_verb);
      }
    }
  }, [initialWord]);

  const validationConfig = {
    germanWord: {
      required: true,
      pattern: /^[a-zA-ZäöüÄÖÜß\s,()[\]/\\-]+$/,
      patternMessage: 'Только немецкие буквы и символы: , ( ) [ ] / \\ -',
    },
    translation: {
      required: true,
      pattern: /^[а-яА-ЯёЁ\s,()[\]/\\-]+$/,
      patternMessage: 'Только кириллица и символы: , ( ) [ ] / \\ -',
    },
    secondVerb: {
      required: true,
      pattern: /^[a-zA-ZäöüÄÖÜß\s,()[\]/\\-]+$/,
      patternMessage: 'Только немецкие буквы и символы: , ( ) [ ] / \\ -',
    },
    thirdVerb: {
      required: true,
      pattern: /^[a-zA-ZäöüÄÖÜß\s,()[\]/\\-]+$/,
      patternMessage: 'Только немецкие буквы и символы: , ( ) [ ] / \\ -',
    },
    imageUrl: {
      required: false,
      pattern: /^https?:\/\/.+\..+/,
      patternMessage: 'Введите корректный URL',
    },
  };

  const validateField = (fieldName: string, value: string): string => {
    const config = validationConfig[fieldName as keyof typeof validationConfig];
    if (!config) return '';

    const trimmedValue = value.trim();

    if (!trimmedValue) {
      return '';
    }

    if (config.pattern && !config.pattern.test(value)) {
      return config.patternMessage;
    }

    return '';
  };

  const handleFieldChange = (fieldName: string, value: string, setter: (value: string) => void) => {
    setter(value);
    const error = validateField(fieldName, value);
    setErrors(prev => ({ ...prev, [fieldName]: error }));
  };

  const isFormValid = (() => {
    const requiredFields = [
      { name: 'germanWord', value: germanWord },
      { name: 'translation', value: translation },
    ];

    if (isVerb) {
      requiredFields.push(
        { name: 'secondVerb', value: secondVerb },
        { name: 'thirdVerb', value: thirdVerb }
      );
    }

    for (const field of requiredFields) {
      if (!field.value.trim()) {
        return false;
      }
      if (validateField(field.name, field.value)) {
        return false;
      }
    }

    if (imageUrl.trim() && validateField('imageUrl', imageUrl)) {
      return false;
    }

    return true;
  })();

  const handleFormSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    handleSubmit();
  };

  const handleSubmit = () => {
    if (!isFormValid) {
      return;
    }

    const newWord: GermanWord = isVerb
      ? {
          german_word: germanWord.trim(),
          translation: translation.trim(),
          image: imageUrl.trim() || undefined,
          hard_level: 0,
          is_verb: true,
          second_verb: secondVerb.trim(),
          third_verb: thirdVerb.trim(),
          is_checked: false,
        }
      : {
          german_word: germanWord.trim(),
          translation: translation.trim(),
          image: imageUrl.trim() || undefined,
          hard_level: 0,
          is_verb: false,
          is_checked: false,
        };

    if (onSubmit) {
      onSubmit(newWord);
    }

    setGermanWord('');
    setTranslation('');
    setImageUrl('');
    setIsVerb(false);
    setSecondVerb('');
    setThirdVerb('');
  };

  return (
    <form onSubmit={handleFormSubmit} className="w-full max-w-2xl mx-auto flex flex-col h-full">
      <div className="space-y-3 sm:space-y-5">
        <div>
          <label className="block text-sm font-semibold text-gray-700 mb-2">
            Новое слово <span className="text-red-500">*</span>
          </label>
          <InputField
            value={germanWord}
            onChange={(e) => handleFieldChange('germanWord', e.target.value, setGermanWord)}
            placeholder="Слово на немецком"
            error={errors.germanWord}
          />
        </div>

        <div>
          <label className="block text-sm font-semibold text-gray-700 mb-2">
            Перевод <span className="text-red-500">*</span>
          </label>
          <InputField
            value={translation}
            onChange={(e) => handleFieldChange('translation', e.target.value, setTranslation)}
            placeholder="Перевод на русский"
            error={errors.translation}
          />
        </div>

        <div className="bg-gradient-to-r from-blue-50 to-cyan-50 p-3 sm:p-4 rounded-xl border-2 border-blue-200/50">
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
            <span className="text-sm sm:text-base font-semibold text-gray-700 group-hover:text-blue-600 transition-colors">
              {isVerb ? 'Неправильный глагол' : 'Обычное слово'}
            </span>
          </label>
        </div>
      </div>

      <div className="relative min-h-0 mt-3 sm:mt-5 flex-shrink-0">
        {isVerb && (
          <div className="space-y-3 sm:space-y-4 animate-fadeIn bg-blue-50/50 p-4 sm:p-5 rounded-xl border-2 border-blue-200/50">
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">
                Вторая форма глагола <span className="text-red-500">*</span>
              </label>
              <InputField
                value={secondVerb}
                onChange={(e) => handleFieldChange('secondVerb', e.target.value, setSecondVerb)}
                placeholder="Präteritum"
                error={errors.secondVerb}
              />
            </div>
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">
                Третья форма глагола <span className="text-red-500">*</span>
              </label>
              <InputField
                value={thirdVerb}
                onChange={(e) => handleFieldChange('thirdVerb', e.target.value, setThirdVerb)}
                placeholder="Partizip II"
                error={errors.thirdVerb}
              />
            </div>
          </div>
        )}
      </div>

      <div className="space-y-3 sm:space-y-5 mt-auto pt-3 sm:pt-5">
        <div>
          <label className="block text-sm font-semibold text-gray-700 mb-2">
            Ссылка на изображение (необязательно)
          </label>
          <InputField
            value={imageUrl}
            onChange={(e) => handleFieldChange('imageUrl', e.target.value, setImageUrl)}
            placeholder="https://example.com/image.jpg"
            type="url"
            error={errors.imageUrl}
          />
        </div>

        <div className="pt-2 pb-2 sm:pb-4">
          <ActionButton
            text={initialWord ? 'Сохранить изменения' : 'Добавить слово'}
            color={isFormValid ? 'base' : 'disabled'}
            disabled={!isFormValid}
            type="submit"
          />
        </div>
      </div>
    </form>
  );
};

export default AddWordForm;

