import React from 'react';

interface InputFieldProps {
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  placeholder?: string;
  type?: 'text' | 'password' | 'email';
  className?: string;
}

const InputField: React.FC<InputFieldProps> = ({
  value,
  onChange,
  placeholder = '',
  type = 'text',
  className = '',
}) => {
  return (
    <div
      className={`relative rounded-xl bg-gradient-to-r from-blue-500 to-cyan-500 p-[3px] 
        transition-all duration-300 hover:shadow-lg hover:shadow-blue-500/25
        focus-within:shadow-lg focus-within:shadow-blue-500/25
        focus-within:scale-102 hover:scale-102 ${className}`}
    >
      <input
        type={type}
        value={value}
        onChange={onChange}
        placeholder={placeholder}
        aria-label={placeholder}
        className="
          w-full rounded-lg bg-white px-4 py-2 text-gray-800 font-medium 
          outline-none transition-all duration-300
          focus:bg-cyan-50 focus:ring-2 focus:ring-blue-500/20
          hover:bg-blue-50 hover:shadow-inner
          disabled:bg-gray-100 disabled:text-gray-400 disabled:cursor-not-allowed
          placeholder:text-gray-400 placeholder:transition-colors placeholder:duration-300
          focus:placeholder:text-blue-600
        "
      />
      <div className="absolute bottom-0 left-0 h-0.5 bg-gradient-to-r from-blue-500 to-cyan-500 
        w-0 transition-all duration-300 focus-within:w-full hover:w-full" />
    </div>
  );
};

export default InputField;