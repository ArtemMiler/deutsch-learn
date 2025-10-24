import React from 'react';
import { BrowserRouter as Router, Routes, Route, useNavigate } from 'react-router-dom';
import Bg from './components/Bg.tsx';
import WhiteCard from './components/WhiteCard.tsx';
import ActionButton from './components/ActionButton.tsx';
import Task from './pages/Task';
import AddWord from './pages/AddWord';
import Dictionary from './pages/Dictionary';

const HomePage: React.FC = () => {
  const navigate = useNavigate();

  const handleStartTraining = () => {
    navigate('/task');
  };

  const handleAddWords = () => {
    navigate('/add-word');
  };

  const handleDictionary = () => {
    navigate('/dictionary');
  };

  return (
    <>
      <Bg />
      <main className="flex items-center justify-center h-screen sm:min-h-screen w-full p-0 sm:p-4 relative overflow-hidden">
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
              <ActionButton text="Добавить слова" onClick={handleAddWords} />
              <ActionButton text="Словарь" onClick={handleDictionary} />
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
        <Route path="/add-word" element={<AddWord />} />
        <Route path="/dictionary" element={<Dictionary />} />
      </Routes>
    </Router>
  );
}

export default App;