import React from 'react';
import { useNavigate } from 'react-router-dom';
import { IoHome } from 'react-icons/io5';

const HomeButton: React.FC = () => {
  const navigate = useNavigate();

  const handleBack = () => {
    navigate('/');
  };

  return (
    <button
      onClick={handleBack}
      aria-label="Вернуться на главную"
      className="p-2 rounded-lg transition-all duration-300 hover:scale-110 active:scale-95 focus:outline-none focus:ring-2 focus:ring-blue-400 focus:ring-offset-2"
    >
      <IoHome size={24} className="text-blue-500" />
    </button>
  );
};

export default HomeButton;

