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
  const [isPlural, setIsPlural] = useState(false);
  const [secondVerb, setSecondVerb] = useState('');
  const [thirdVerb, setThirdVerb] = useState('');
  const [plural, setPlural] = useState('');
  const [errors, setErrors] = useState<Record<string, string>>({});

  useEffect(() => {
    if (initialWord) {
      setGermanWord(initialWord.german_word);
      setTranslation(initialWord.translation);
      setImageUrl(initialWord.image || '');
      setIsVerb(initialWord.is_verb);
      setIsPlural(initialWord.is_plural);
      if (initialWord.is_verb && initialWord.second_verb && initialWord.third_verb) {
        setSecondVerb(initialWord.second_verb);
        setThirdVerb(initialWord.third_verb);
      }
      if (initialWord.is_plural && initialWord.plural) {
        setPlural(initialWord.plural);
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
    plural: {
      required: false,
      pattern: /^[a-zA-ZäöüÄÖÜß\s,()[\]/\\-]+$/,
      patternMessage: 'Только немецкие буквы и символы: , ( ) [ ] / \\ -',
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
    if (isPlural) {
      requiredFields.push(
        { name: 'plural', value: plural },
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

    let newWord: GermanWord;
    
    if (isVerb) {
      newWord = {
        id: initialWord?.id || 0,
        german_word: germanWord.trim(),
        translation: translation.trim(),
        image: imageUrl.trim() || undefined,
        hard_level: initialWord?.hard_level || 0,
        is_verb: true,
        second_verb: secondVerb.trim(),
        third_verb: thirdVerb.trim(),
        is_plural: false,
      };
    } else if (isPlural) {
      newWord = {
        id: initialWord?.id || 0,
        german_word: germanWord.trim(),
        translation: translation.trim(),
        image: imageUrl.trim() || undefined,
        hard_level: initialWord?.hard_level || 0,
        is_verb: false,
        is_plural: true,
        plural: plural.trim(),
      };
    } else {
      newWord = {
        id: initialWord?.id || 0,
        german_word: germanWord.trim(),
        translation: translation.trim(),
        image: imageUrl.trim() || undefined,
        hard_level: initialWord?.hard_level || 0,
        is_verb: false,
        is_plural: false,
      };
    }

    if (onSubmit) {
      onSubmit(newWord);
    }

    if (!initialWord) {
      setGermanWord('');
      setTranslation('');
      setImageUrl('');
      setIsVerb(false);
      setIsPlural(false);
      setSecondVerb('');
      setThirdVerb('');
      setPlural('');
    }
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

        <div className="bg-gradient-to-r from-blue-50 to-cyan-50 p-2 sm:p-4 rounded-xl border-2 border-blue-200/50">
          <div className="flex flex-row gap-2 sm:gap-4 justify-center items-center">
            <label className="flex items-center space-x-1.5 sm:space-x-2 cursor-pointer group">
              <div className="relative flex-shrink-0">
                <input
                  type="checkbox"
                  checked={isVerb}
                  onChange={(e) => {
                    setIsVerb(e.target.checked);
                    if (e.target.checked) setIsPlural(false);
                  }}
                  className="sr-only peer"
                />
                <div className="w-10 h-5 sm:w-11 sm:h-6 bg-gray-300 rounded-full peer 
                  peer-checked:bg-gradient-to-r peer-checked:from-blue-500 peer-checked:to-cyan-500
                  transition-all duration-300 shadow-inner">
                </div>
                <div className="absolute left-0.5 top-0.5 w-4 h-4 sm:w-5 sm:h-5 bg-white rounded-full 
                  transition-all duration-300 peer-checked:translate-x-5 shadow-md">
                </div>
              </div>
              <span className="text-[10px] sm:text-sm font-semibold text-gray-700 group-hover:text-blue-600 transition-colors whitespace-nowrap">
                Неправ. глагол
              </span>
            </label>
            <label className="flex items-center space-x-1.5 sm:space-x-2 cursor-pointer group">
              <div className="relative flex-shrink-0">
                <input
                  type="checkbox"
                  checked={isPlural}
                  onChange={(e) => {
                    setIsPlural(e.target.checked);
                    if (e.target.checked) setIsVerb(false);
                  }}
                  className="sr-only peer"
                />
                <div className="w-10 h-5 sm:w-11 sm:h-6 bg-gray-300 rounded-full peer 
                  peer-checked:bg-gradient-to-r peer-checked:from-blue-500 peer-checked:to-cyan-500
                  transition-all duration-300 shadow-inner">
                </div>
                <div className="absolute left-0.5 top-0.5 w-4 h-4 sm:w-5 sm:h-5 bg-white rounded-full 
                  transition-all duration-300 peer-checked:translate-x-5 shadow-md">
                </div>
              </div>
              <span className="text-[10px] sm:text-sm font-semibold text-gray-700 group-hover:text-blue-600 transition-colors whitespace-nowrap">
                Множ. число
              </span>
            </label>
          </div>
        </div>
      </div>

      <div className="relative min-h-0 mt-3 sm:mt-5 flex-shrink-0">
        {isVerb && (
          <div className="space-y-3 sm:space-y-4 animate-fadeIn bg-gradient-to-r from-blue-50 to-cyan-50 p-4 sm:p-5 rounded-xl border-2 border-blue-200/50">
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
        {isPlural && (
          <div className="space-y-3 sm:space-y-4 animate-fadeIn bg-gradient-to-r from-blue-50 to-cyan-50 p-4 sm:p-5 rounded-xl border-2 border-blue-200/50">
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">
                Множественное число <span className="text-red-500">*</span>
              </label>
              <InputField
                value={plural}
                onChange={(e) => handleFieldChange('plural', e.target.value, setPlural)}
                placeholder="Plural"
                error={errors.plural}
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

