import React from 'react';

type ButtonColorVariant = 'base' | 'wrong' | 'correct' | 'disabled';

interface ActionButtonProps {
  text: string;
  onClick?: () => void;
  color?: ButtonColorVariant;
  disabled?: boolean;
  type?: 'button' | 'submit';
}

const ActionButton: React.FC<ActionButtonProps> = ({ 
  text, 
  onClick, 
  color = 'base',
  disabled = false,
  type = 'button'
}) => {
  const colorStyles: Record<ButtonColorVariant, {
    base: string;
    hover: string;
    focus: string;
  }> = {
    base: {
      base: 'bg-gradient-to-r from-blue-500 to-cyan-500',
      hover: 'hover:from-cyan-500 hover:to-blue-500',
      focus: 'focus:ring-blue-400',
    },
    wrong: {
      base: 'bg-gradient-to-r from-red-500 via-pink-500 to-yellow-500',
      hover: 'hover:from-yellow-500 hover:via-pink-500 hover:to-red-500',
      focus: 'focus:ring-red-400',
    },
    correct: {
      base: 'bg-gradient-to-r from-emerald-500 to-lime-500',
      hover: 'hover:from-lime-500 hover:to-emerald-500',
      focus: 'focus:ring-emerald-400',
    },
    disabled: {
      base: 'bg-gradient-to-r from-gray-400 to-gray-500',
      hover: 'hover:from-gray-500 hover:to-gray-400',
      focus: 'focus:ring-gray-500',
    },
  };

  const { base: baseGradient, hover: hoverGradient, focus: focusRing } = colorStyles[color];

  return (
    <button
      onClick={disabled ? undefined : onClick}
      type={type}
      aria-label={text}
      disabled={disabled}
      className={`w-full relative overflow-hidden py-4 px-8 rounded-xl
        text-xl font-semibold text-white
        transform transition-all duration-300 ease-out shadow-lg
        focus:outline-none focus:ring-2 focus:ring-offset-2 ${baseGradient} ${focusRing}
        ${disabled ? 'cursor-not-allowed opacity-60' : `${hoverGradient} hover:shadow-xl hover:scale-105 hover:-translate-y-0.5 active:scale-95`}`}
    >
      <span className="relative z-10">
        {text}
      </span>
    </button>
  );
};

export default ActionButton;
