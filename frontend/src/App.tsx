import React from 'react';
import { BrowserRouter as Router, Routes, Route, useNavigate } from 'react-router-dom';
import Bg from './components/Bg.tsx';
import WhiteCard from './components/WhiteCard.tsx';
import ActionButton from './components/ActionButton.tsx';
import Task from './pages/Task';

const HomePage: React.FC = () => {
  const navigate = useNavigate();

  const handleStartTraining = () => {
    navigate('/task');
  };

  return (
    <>
      <Bg />
      <main className="flex items-center justify-center min-h-screen w-full p-0 relative overflow-hidden">
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute top-20 left-10 w-2 h-2 bg-blue-400/40 rounded-full animate-float-particle" />
          <div className="absolute top-40 right-20 w-3 h-3 bg-purple-400/30 rounded-full animate-float-particle-slow" />
          <div className="absolute bottom-32 left-1/4 w-2 h-2 bg-cyan-400/40 rounded-full animate-float-particle-slower" />
          <div className="absolute top-1/3 right-1/3 w-1.5 h-1.5 bg-blue-300/50 rounded-full animate-float-particle" />
          <div className="absolute bottom-20 right-10 w-2.5 h-2.5 bg-purple-300/40 rounded-full animate-float-particle-slow" />
        </div>

        <WhiteCard>
          <div className="mb-8 text-center flex-1 flex items-center justify-center">
            <div className="animate-title-entrance">
              <h1 className="text-7xl sm:text-7xl md:text-7xl font-bold mb-2">
                <span className="inline-block text-transparent bg-clip-text bg-gradient-to-r from-blue-600 via-purple-600 to-cyan-600">
                  Deutsch
                </span>
                <br /> 
                <span className="inline-block text-transparent bg-clip-text bg-gradient-to-r from-blue-600 via-purple-600 to-cyan-600">
                  Learn
                </span>
                <span className="ml-3 inline-block animate-wave">🇩🇪</span>
              </h1>
            </div>
          </div>
          <div className="w-full flex flex-col gap-6 max-w-xl mt-auto mb-6 px-4">
            <div className="animate-button-entrance-1">
              <ActionButton 
                text="Начать тренировку"
                color="wrong" 
                onClick={handleStartTraining}
              />
            </div>
            <div className="flex flex-row gap-4 animate-button-entrance-2">
              <ActionButton text="Добавить слова" />
              <ActionButton text="Словарь" />
            </div>
          </div>
        </WhiteCard>
      </main>
    </>
  );
};

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/task" element={<Task />} />
      </Routes>
    </Router>
  );
}

export default App;