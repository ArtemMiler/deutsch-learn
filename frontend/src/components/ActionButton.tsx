import React from 'react';

type ButtonColorVariant = 'base' | 'wrong' | 'correct';

interface ActionButtonProps {
  text: string;
  onClick?: () => void;
  color?: ButtonColorVariant;
}

const ActionButton: React.FC<ActionButtonProps> = ({ 
  text, 
  onClick, 
  color = 'base'
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
  };

  const { base: baseGradient, hover: hoverGradient, focus: focusRing } = colorStyles[color];

  return (
    <button
      onClick={onClick}
      type="button"
      aria-label={text}
      className={`w-full relative overflow-hidden py-4 px-8 rounded-xl
        text-xl font-semibold text-white
        transform transition-all duration-300 ease-out shadow-lg hover:shadow-xl
        hover:scale-105 hover:-translate-y-0.5 active:scale-95
        focus:outline-none focus:ring-2 focus:ring-offset-2 ${baseGradient} ${hoverGradient} ${focusRing}`}
    >
      <span className="relative z-10">
        {text}
      </span>
    </button>
  );
};

export default ActionButton;
