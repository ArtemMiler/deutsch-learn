import ActionButton from './components/ActionButton.tsx';

function App() {
  return (
    <main className="flex flex-col items-center justify-center min-h-screen w-full bg-gradient-to-br from-blue-50 via-purple-50 to-pink-50 p-4">
      <div className="w-full max-w-sm">
        <div
          className="bg-white/90 backdrop-blur-sm shadow-2xl rounded-3xl flex flex-col items-center w-full px-8 py-12
          border border-white/60 transform transition-all duration-500 hover:shadow-3xl"
          style={{
            animation: 'fadeIn 0.6s ease-out'
          }}
        >
          <div className="mb-12 text-center">
            <h1
              className="text-5xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 mb-2"
              style={{
                animation: 'slideDown 0.8s ease-out'
              }}
            >
              Deutsch Learn
            </h1>
            
          </div>
          
          <div className="w-full flex flex-col gap-4">
            <ActionButton>Начать тренировку</ActionButton>
            <ActionButton>Добавить слова</ActionButton>
            <ActionButton>Словарь</ActionButton>
          </div>
        </div>
      </div>

      <style>{`
        @keyframes fadeIn {
          from {
            opacity: 0;
            transform: translateY(20px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
        
        @keyframes slideDown {
          from {
            opacity: 0;
            transform: translateY(-20px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
      `}</style>
    </main>
  );
}

export default App;