import { useState } from "react";
import { Lock, Unlock, Heart } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

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
      }, 600);
    } else {
      setIsShaking(true);
      setTimeout(() => setIsShaking(false), 500);
    }
  };

  if (isUnlocked) {
    return (
      <div className="relative p-6 rounded-2xl bg-romantic-blush/50 border-2 border-romantic-gold/30 shadow-gold transition-all duration-500">
        <div className="flex items-center gap-3">
          <div className="w-14 h-14 rounded-full bg-gold-gradient flex items-center justify-center shadow-gold animate-unlock">
            <Unlock className="w-7 h-7 text-primary-foreground" />
          </div>
          <div>
            <p className="font-display text-lg text-romantic-deep">
              Chave {lockNumber}
            </p>
            <p className="text-sm text-muted-foreground flex items-center gap-1">
              <Heart className="w-4 h-4 fill-primary text-primary" />
              Desbloqueada
            </p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div
      className={`relative p-6 rounded-2xl bg-card border-2 border-border shadow-soft transition-all duration-300 ${
        isShaking ? "animate-shake" : ""
      } ${showSuccess ? "animate-unlock border-romantic-gold" : ""}`}
    >
      <style>{`
        @keyframes shake {
          0%, 100% { transform: translateX(0); }
          20%, 60% { transform: translateX(-8px); }
          40%, 80% { transform: translateX(8px); }
        }
        .animate-shake {
          animation: shake 0.5s ease-in-out;
        }
      `}</style>

      <div className="flex items-center gap-3 mb-4">
        <div className="w-14 h-14 rounded-full bg-romantic-gradient flex items-center justify-center shadow-romantic animate-pulse-glow">
          <Lock className="w-7 h-7 text-primary-foreground" />
        </div>
        <div>
          <p className="font-display text-lg text-foreground">Chave {lockNumber}</p>
          <p className="text-sm text-muted-foreground">Descubra a senha</p>
        </div>
      </div>

      <p className="text-sm italic text-muted-foreground mb-4 pl-1">
        💝 Dica: {hint}
      </p>

      <form onSubmit={handleSubmit} className="flex gap-2">
        <Input
          type="text"
          placeholder="Digite a senha..."
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="flex-1 bg-background border-border focus:border-primary focus:ring-primary"
        />
        <Button
          type="submit"
          className="bg-romantic-gradient hover:opacity-90 text-primary-foreground shadow-romantic"
        >
          <Heart className="w-4 h-4" />
        </Button>
      </form>
    </div>
  );
};

export default LockSeal;
