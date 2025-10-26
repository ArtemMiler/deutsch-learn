import React from 'react';

interface InputFieldProps {
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  placeholder?: string;
  type?: 'text' | 'password' | 'email' | 'url';
  error?: string;
}

const InputField: React.FC<InputFieldProps> = ({
  value,
  onChange,
  placeholder = '',
  type = 'text',
  error,
}) => {
  const hasError = Boolean(error);
  
  return (
    <div className="w-full relative">
      <div
        className={`relative rounded-xl p-[3px] 
          transition-all duration-300
          ${hasError 
            ? 'bg-gradient-to-r from-red-500 to-pink-500 shadow-lg shadow-red-500/25' 
            : 'bg-gradient-to-r from-blue-500 to-cyan-500 hover:shadow-lg hover:shadow-blue-500/25 focus-within:shadow-lg focus-within:shadow-blue-500/25'
          }
          focus-within:scale-102 hover:scale-102`}
      >
        <input
          type={type}
          value={value}
          onChange={onChange}
          placeholder={placeholder}
          aria-label={placeholder}
          aria-invalid={hasError}
          aria-describedby={hasError ? `${placeholder}-error` : undefined}
          className={`
            w-full rounded-lg bg-white px-4 py-2 text-gray-800 font-medium 
            outline-none transition-all duration-300
            hover:shadow-inner
            disabled:bg-gray-100 disabled:text-gray-400 disabled:cursor-not-allowed
            placeholder:text-gray-400 placeholder:transition-colors placeholder:duration-300
            ${hasError 
              ? 'focus:bg-red-50 focus:ring-2 focus:ring-red-500/20 focus:placeholder:text-red-600' 
              : 'focus:bg-cyan-50 focus:ring-2 focus:ring-blue-500/20 focus:placeholder:text-blue-600 hover:bg-blue-50'
            }
          `}
        />
        <div className={`absolute bottom-0 left-0 h-0.5 w-0 transition-all duration-300 focus-within:w-full hover:w-full
          ${hasError ? 'bg-gradient-to-r from-red-500 to-pink-500' : 'bg-gradient-to-r from-blue-500 to-cyan-500'}`} />
      </div>
      
      {hasError && (
        <p 
          id={`${placeholder}-error`}
          className="absolute left-0 top-full mt-1 text-xs text-red-600 font-medium animate-fadeIn flex items-center gap-1 bg-white/95 backdrop-blur-sm px-2 py-0.5 rounded shadow-sm z-10"
          role="alert"
        >
          <span className="text-sm">⚠️</span>
          {error}
        </p>
      )}
    </div>
  );
};

export default InputField;