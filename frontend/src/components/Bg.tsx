import React from 'react';

const Bg: React.FC = () => (
  <>
    <div className="fixed inset-0 -z-10 w-full h-full bg-gradient-to-br from-gray-950 via-indigo-950 to-slate-950 animate-gradient-shift" />

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
