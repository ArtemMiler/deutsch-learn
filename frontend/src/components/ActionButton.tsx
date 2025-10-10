import React from 'react';

interface ActionButtonProps {
  children: React.ReactNode;
  onClick?: () => void;
}

const ActionButton: React.FC<ActionButtonProps> = ({ children, onClick }) => (
  <button
    onClick={onClick}
    type="button"
    className="w-full relative overflow-hidden py-4 px-8 rounded-xl
      bg-gradient-to-r from-blue-500 to-teal-500
      shadow-lg hover:shadow-xl
      text-lg font-semibold text-white
      transform transition-all duration-300 ease-out
      hover:scale-105 hover:-translate-y-0.5
      active:scale-95
      focus:outline-none focus:ring-2 focus:ring-blue-400 focus:ring-offset-2"
  >
    <span className="relative z-10">
      {children}
    </span>
    <div className="absolute inset-0 bg-gradient-to-r from-teal-500 to-blue-500 opacity-0 hover:opacity-100 transition-opacity duration-300" />
  </button>
);

export default ActionButton;
