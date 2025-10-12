import React from 'react';

interface ActionButtonProps {
  children: React.ReactNode;
  onClick?: () => void;
  color?: '1' | '2';
}

const ActionButton: React.FC<ActionButtonProps> = ({ children, onClick, color = '1' }) => {

  const baseGradient = color === '2'
    ? 'bg-gradient-to-r from-red-500 via-pink-500 to-yellow-500'
    : 'bg-gradient-to-r from-blue-500 to-teal-500';
  const hoverGradient = color === '2'
    ? 'hover:from-yellow-500 hover:via-pink-500 hover:to-red-500'
    : 'hover:from-teal-500 hover:to-blue-500';
  const focusRing = color === '2' ? 'focus:ring-red-400' : 'focus:ring-blue-400';

  return (
    <button
      onClick={onClick}
      type="button"
      className={`w-full relative overflow-hidden py-4 px-8 rounded-xl
        text-lg font-semibold text-white
        transform transition-all duration-300 ease-out shadow-lg hover:shadow-xl
        hover:scale-105 hover:-translate-y-0.5 active:scale-95
        focus:outline-none focus:ring-2 focus:ring-offset-2 ${baseGradient} ${hoverGradient} ${focusRing}`}
    >
      <span className="relative z-10">
        {children}
      </span>
    </button>
  );
};

export default ActionButton;
