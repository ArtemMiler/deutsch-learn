import React from 'react';

interface WhiteCardProps {
  children: React.ReactNode;
}

const WhiteCard: React.FC<WhiteCardProps> = ({ children }) => {
  return (
    <div className="relative h-[95vh] w-full max-w-md sm:max-w-lg md:w-2/3 lg:w-2/5 flex flex-col items-center justify-start mx-4 sm:mx-8 my-0 sm:my-1 animate-scale-in">
      <div className="absolute inset-0 bg-gradient-to-br from-blue-500/30 via-purple-500/20 to-cyan-500/30 rounded-3xl blur-2xl opacity-50 animate-pulse-soft" />
      
      <div className="relative w-full h-full backdrop-blur-2xl bg-white/90 border border-white/20 shadow-[0_8px_32px_0_rgba(31,38,135,0.37)] rounded-3xl px-4 sm:px-8 py-8 transition-all duration-300">
        <div className="absolute inset-0 rounded-3xl bg-gradient-to-br from-blue-400/40 via-purple-400/40 to-cyan-400/40 opacity-0 -z-10 blur-xl" />
        
        <div className="relative h-full flex flex-col items-center justify-start">
          {children}
        </div>
      </div>
    </div>
  );
};

export default WhiteCard;
