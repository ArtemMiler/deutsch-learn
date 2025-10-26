import React from 'react';

type AnswerState = 'unanswered' | 'correct' | 'wrong';

interface BgProps {
  answerState?: AnswerState;
}

const Bg: React.FC<BgProps> = ({ answerState = 'unanswered' }) => {
  const getGradientClass = () => {
    if (answerState === 'correct') {
      return 'bg-gradient-to-br from-emerald-950 via-lime-950 to-green-950';
    } else if (answerState === 'wrong') {
      return 'bg-gradient-to-br from-red-950 via-pink-950 to-yellow-950';
    }
    return 'bg-gradient-to-br from-gray-950 via-indigo-950 to-slate-950';
  };

  return (
    <>
      <div className={`fixed inset-0 -z-10 w-full h-full ${getGradientClass()} animate-gradient-shift transition-colors duration-700`} />

      <div className="fixed inset-0 -z-10 opacity-10">
        <div className="absolute inset-0" style={{
          backgroundImage: `linear-gradient(rgba(255,255,255,0.1) 1px, transparent 1px),
                           linear-gradient(90deg, rgba(255,255,255,0.1) 1px, transparent 1px)`,
          backgroundSize: '50px 50px'
        }} />
      </div>
    </>
  );
};

export default Bg;
