import React from 'react';

const Bg: React.FC = () => (
  <>
    <div className="fixed inset-0 -z-10 w-full h-full bg-gradient-to-br from-gray-950 via-indigo-950 to-slate-950 animate-gradient-shift" />
    
    <div className="fixed inset-0 -z-10 overflow-hidden pointer-events-none">
      <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-blue-500/20 rounded-full blur-3xl animate-float-slow" />
      <div className="absolute bottom-1/4 right-1/4 w-80 h-80 bg-purple-500/20 rounded-full blur-3xl animate-float-slower" />
      <div className="absolute top-1/2 right-1/3 w-64 h-64 bg-cyan-500/15 rounded-full blur-3xl animate-float" />
    </div>

    <div className="fixed inset-0 -z-10 opacity-10">
      <div className="absolute inset-0" style={{
        backgroundImage: `linear-gradient(rgba(255,255,255,0.1) 1px, transparent 1px),
                         linear-gradient(90deg, rgba(255,255,255,0.1) 1px, transparent 1px)`,
        backgroundSize: '50px 50px'
      }} />
    </div>
  </>
);

export default Bg;
