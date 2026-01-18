import { Heart, Sparkle } from "lucide-react";
import { useEffect, useState } from "react";

interface FloatingElement {
  id: number;
  left: number;
  delay: number;
  duration: number;
  size: number;
  type: 'heart' | 'sparkle' | 'petal';
}

const FloatingHearts = () => {
  const [elements, setElements] = useState<FloatingElement[]>([]);

  useEffect(() => {
    const newElements: FloatingElement[] = Array.from({ length: 25 }, (_, i) => ({
      id: i,
      left: Math.random() * 100,
      delay: Math.random() * 8,
      duration: 10 + Math.random() * 8,
      size: 10 + Math.random() * 18,
      type: i % 3 === 0 ? 'sparkle' : i % 5 === 0 ? 'petal' : 'heart',
    }));
    setElements(newElements);
  }, []);

  return (
    <div className="fixed inset-0 pointer-events-none overflow-hidden z-0">
      {elements.map((el) => (
        <div
          key={el.id}
          className="absolute"
          style={{
            left: `${el.left}%`,
            bottom: "-60px",
            animation: `floatUp ${el.duration}s ease-in-out ${el.delay}s infinite`,
          }}
        >
          {el.type === 'heart' ? (
            <Heart
              className="text-primary fill-primary opacity-25"
              style={{ width: el.size, height: el.size }}
            />
          ) : el.type === 'sparkle' ? (
            <Sparkle
              className="text-romantic-gold opacity-40"
              style={{ width: el.size * 0.8, height: el.size * 0.8 }}
            />
          ) : (
            <div 
              className="rounded-full bg-romantic-soft opacity-30"
              style={{ 
                width: el.size * 0.6, 
                height: el.size * 0.8,
                transform: `rotate(${Math.random() * 360}deg)`,
              }}
            />
          )}
        </div>
      ))}
      
      {/* Decorative rings */}
      <div className="decorative-ring w-64 h-64 -top-32 -right-32" style={{ animationDelay: '0s' }} />
      <div className="decorative-ring w-48 h-48 top-1/3 -left-24" style={{ animationDelay: '1s' }} />
      <div className="decorative-ring w-32 h-32 bottom-20 right-10" style={{ animationDelay: '2s' }} />
      
      <style>{`
        @keyframes floatUp {
          0% {
            transform: translateY(0) rotate(0deg) scale(0.8);
            opacity: 0;
          }
          10% {
            opacity: 0.4;
            transform: translateY(-10vh) rotate(20deg) scale(1);
          }
          50% {
            transform: translateY(-50vh) rotate(-10deg) scale(1.1);
          }
          90% {
            opacity: 0.3;
          }
          100% {
            transform: translateY(-110vh) rotate(360deg) scale(0.9);
            opacity: 0;
          }
        }
      `}</style>
    </div>
  );
};

export default FloatingHearts;
