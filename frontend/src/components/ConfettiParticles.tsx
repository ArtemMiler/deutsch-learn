import React, { useEffect, useState } from 'react';

interface ConfettiParticlesProps {
  type: 'correct' | 'wrong';
}

interface Particle {
  id: number;
  x: number;
  y: number;
  rotation: number;
  delay: number;
  color: string;
  size: number;
}

const ConfettiParticles: React.FC<ConfettiParticlesProps> = ({ type }) => {
  const [particles, setParticles] = useState<Particle[]>([]);

  useEffect(() => {
    const colors = type === 'correct' 
      ? [
          'bg-emerald-500',
          'bg-emerald-400',
          'bg-emerald-300',
          'bg-lime-500',
          'bg-lime-400',
          'bg-lime-300',
        ]
      : [
          'bg-red-500',
          'bg-red-400',
          'bg-red-300',
          'bg-pink-500',
          'bg-pink-400',
          'bg-yellow-500',
          'bg-yellow-400',
        ];

    const particleCount = 50;
    const newParticles: Particle[] = [];

    for (let i = 0; i < particleCount; i++) {
      const angle = (Math.PI * 2 * i) / particleCount;
      const velocity = 150 + Math.random() * 200;
      
      newParticles.push({
        id: i,
        x: Math.cos(angle) * velocity,
        y: Math.sin(angle) * velocity - Math.random() * 100,
        rotation: Math.random() * 720 - 360,
        delay: Math.random() * 0.2,
        color: colors[Math.floor(Math.random() * colors.length)],
        size: 8 + Math.random() * 8
      });
    }

    setParticles(newParticles);
  }, [type]);

  return (
    <div 
      className="fixed inset-0 pointer-events-none overflow-hidden"
      style={{ zIndex: 1 }}
      aria-hidden="true"
    >
      {particles.map((particle) => (
        <div
          key={particle.id}
          className={`absolute top-1/2 left-1/2 animate-confetti-burst ${particle.color}`}
          style={{
            width: `${particle.size}px`,
            height: `${particle.size}px`,
            transform: `translate(-50%, -50%) translate(${particle.x}px, ${particle.y}px) rotate(${particle.rotation}deg)`,
            animationDelay: `${particle.delay}s`,
            opacity: 0,
            borderRadius: Math.random() > 0.5 ? '50%' : '2px',
          }}
        />
      ))}
      
      <style>{`
        @keyframes confetti-burst {
          0% {
            transform: translate(-50%, -50%) translate(0, 0) rotate(0deg);
            opacity: 1;
          }
          50% {
            opacity: 1;
          }
          100% {
            transform: translate(-50%, -50%) translate(var(--x), var(--y)) rotate(var(--rotation));
            opacity: 0;
          }
        }
        
        .animate-confetti-burst {
          animation: confetti-burst 1.5s ease-out forwards;
          --x: ${particles[0]?.x || 0}px;
          --y: ${particles[0]?.y || 0}px;
          --rotation: ${particles[0]?.rotation || 0}deg;
        }
      `}</style>
      
      {particles.map((particle) => (
        <style key={`style-${particle.id}`}>
          {`
            .animate-confetti-burst:nth-child(${particle.id + 1}) {
              --x: ${particle.x}px;
              --y: ${particle.y}px;
              --rotation: ${particle.rotation}deg;
            }
          `}
        </style>
      ))}
    </div>
  );
};

export default ConfettiParticles;

