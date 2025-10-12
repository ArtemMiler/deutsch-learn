import ActionButton from './components/ActionButton.tsx';
import Bg from './components/Bg.tsx';

function App() {
  return (
    <>
      <Bg />
      <main className="flex items-center justify-center min-h-screen w-full p-0">
        <div
          className="h-[95vh] w-full max-w-md sm:max-w-lg md:w-2/3 lg:w-2/5 flex flex-col items-center justify-start bg-white shadow-2xl rounded-xl sm:rounded-2xl lg:rounded-3xl px-4 sm:px-8 py-8 border-0 transition-all duration-500 my-0 sm:my-1 mx-4 sm:mx-8"
          style={{ animation: 'fadeIn 0.6s ease-out' }}
        >
          <div className="mb-8 text-center flex-1 flex items-center justify-center">
            <h1
              className="text-7xl sm:text-7xl md:text-7xl font-bold mb-2"
              style={{ animation: 'slideDown 0.8s ease-out' }}
            >
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-500 to-teal-500">
                Deutsch </span>
                <br /> 
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-500 to-teal-500">
                Learn
              </span>
              <span className="ml-2">🇩🇪</span>
            </h1>
          </div>
          <div className="w-full flex flex-col gap-6 max-w-xl mt-auto mb-6 px-4">
            <ActionButton color="2">Начать тренировку</ActionButton>
            <div className="flex flex-row gap-4">
              <ActionButton>Добавить слова</ActionButton>
              <ActionButton>Словарь</ActionButton>
            </div>
          </div>
        </div>
        <style>{`
          @keyframes fadeIn {
            from { opacity: 0; transform: translateY(20px); }
            to   { opacity: 1; transform: translateY(0); }
          }
          @keyframes slideDown {
            from { opacity: 0; transform: translateY(-20px); }
            to   { opacity: 1; transform: translateY(0); }
          }
          h1 {
            font-family: system-ui, -apple-system, "Segoe UI", "Apple Color Emoji", "Segoe UI Emoji", "Noto Color Emoji", sans-serif;
          }
        `}</style>
      </main>
    </>
  );
}

export default App;