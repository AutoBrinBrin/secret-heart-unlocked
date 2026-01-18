import { Heart } from "lucide-react";
import { useEffect, useState } from "react";

interface FloatingHeart {
  id: number;
  left: number;
  delay: number;
  duration: number;
  size: number;
}

const FloatingHearts = () => {
  const [hearts, setHearts] = useState<FloatingHeart[]>([]);

  useEffect(() => {
    const newHearts: FloatingHeart[] = Array.from({ length: 15 }, (_, i) => ({
      id: i,
      left: Math.random() * 100,
      delay: Math.random() * 5,
      duration: 8 + Math.random() * 4,
      size: 12 + Math.random() * 16,
    }));
    setHearts(newHearts);
  }, []);

  return (
    <div className="fixed inset-0 pointer-events-none overflow-hidden z-0">
      {hearts.map((heart) => (
        <div
          key={heart.id}
          className="absolute opacity-20"
          style={{
            left: `${heart.left}%`,
            bottom: "-50px",
            animation: `floatUp ${heart.duration}s ease-in-out ${heart.delay}s infinite`,
          }}
        >
          <Heart
            className="text-primary fill-primary"
            style={{ width: heart.size, height: heart.size }}
          />
        </div>
      ))}
      <style>{`
        @keyframes floatUp {
          0% {
            transform: translateY(0) rotate(0deg);
            opacity: 0;
          }
          10% {
            opacity: 0.3;
          }
          90% {
            opacity: 0.2;
          }
          100% {
            transform: translateY(-100vh) rotate(360deg);
            opacity: 0;
          }
        }
      `}</style>
    </div>
  );
};

export default FloatingHearts;
