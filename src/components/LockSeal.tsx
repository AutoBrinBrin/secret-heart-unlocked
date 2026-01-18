import { useState } from "react";
import { Lock, Unlock, Heart, Sparkles } from "lucide-react";
import { Input } from "@/components/ui/input";

interface LockSealProps {
  lockNumber: number;
  hint: string;
  correctPassword: string;
  isUnlocked: boolean;
  onUnlock: () => void;
}

const LockSeal = ({
  lockNumber,
  hint,
  correctPassword,
  isUnlocked,
  onUnlock,
}: LockSealProps) => {
  const [password, setPassword] = useState("");
  const [isShaking, setIsShaking] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (password.toLowerCase().trim() === correctPassword.toLowerCase().trim()) {
      setShowSuccess(true);
      setTimeout(() => {
        onUnlock();
      }, 800);
    } else {
      setIsShaking(true);
      setTimeout(() => setIsShaking(false), 600);
    }
  };

  if (isUnlocked) {
    return (
      <div className="relative p-5 rounded-2xl card-romantic border-2 border-romantic-gold/40 transition-all duration-700 animate-fade-up">
        {/* Sparkle decorations */}
        <Sparkles 
          className="absolute -top-2 -right-2 w-5 h-5 text-romantic-gold animate-twinkle" 
        />
        <Sparkles 
          className="absolute -bottom-1 -left-1 w-4 h-4 text-primary animate-twinkle" 
          style={{ animationDelay: '0.5s' }}
        />
        
        <div className="flex items-center gap-4">
          <div className="relative">
            <div className="w-16 h-16 rounded-full btn-gold flex items-center justify-center animate-unlock">
              <Unlock className="w-7 h-7 text-primary-foreground" />
            </div>
            <div className="absolute inset-0 rounded-full bg-romantic-gold/30 animate-ping" style={{ animationDuration: '2s' }} />
          </div>
          <div>
            <p className="font-display text-xl text-romantic-deep tracking-wide">
              Chave {lockNumber}
            </p>
            <p className="text-sm text-muted-foreground flex items-center gap-1.5 font-body">
              <Heart className="w-4 h-4 fill-primary text-primary animate-heart-beat" />
              Desbloqueada com amor
            </p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div
      className={`relative p-5 rounded-2xl card-romantic transition-all duration-300 ${
        isShaking ? "animate-shake" : ""
      } ${showSuccess ? "animate-unlock border-romantic-gold/50 shadow-gold" : ""}`}
    >
      <style>{`
        @keyframes shake {
          0%, 100% { transform: translateX(0); }
          15%, 45%, 75% { transform: translateX(-10px); }
          30%, 60%, 90% { transform: translateX(10px); }
        }
        .animate-shake {
          animation: shake 0.6s cubic-bezier(0.36, 0.07, 0.19, 0.97);
        }
      `}</style>

      <div className="flex items-center gap-4 mb-4">
        <div className="relative group">
          <div className="w-16 h-16 rounded-full btn-romantic flex items-center justify-center transition-transform group-hover:scale-105">
            <Lock className="w-7 h-7 text-primary-foreground" />
          </div>
          <div className="absolute inset-0 rounded-full animate-pulse-glow opacity-50" />
        </div>
        <div>
          <p className="font-display text-xl text-foreground tracking-wide">Chave {lockNumber}</p>
          <p className="text-sm text-muted-foreground font-body font-light">Descubra a senha secreta</p>
        </div>
      </div>

      <div className="bg-romantic-blush/50 rounded-xl p-3 mb-4 border border-romantic-mauve/30">
        <p className="text-sm italic text-romantic-deep font-body leading-relaxed">
          <span className="not-italic">💝</span> Dica: {hint}
        </p>
      </div>

      <form onSubmit={handleSubmit} className="flex gap-3">
        <Input
          type="text"
          placeholder="Digite a senha..."
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="flex-1 h-12 bg-background/80 border-romantic-mauve/40 focus:border-primary focus:ring-primary/30 rounded-xl font-body placeholder:text-muted-foreground/50 transition-all duration-300 focus:shadow-glow"
        />
        <button
          type="submit"
          className="h-12 px-5 rounded-xl btn-romantic text-primary-foreground flex items-center gap-2 font-body font-medium"
        >
          <Heart className="w-4 h-4" />
          <span className="hidden sm:inline">Abrir</span>
        </button>
      </form>
    </div>
  );
};

export default LockSeal;
