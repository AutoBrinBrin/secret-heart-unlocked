import { useState } from "react";
import { Lock, Unlock, Heart } from "lucide-react";
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
      }, 700);
    } else {
      setIsShaking(true);
      setTimeout(() => setIsShaking(false), 500);
    }
  };

  if (isUnlocked) {
    return (
      <div className="p-5 rounded-2xl bg-romantic-light border-2 border-primary/30 shadow-romantic animate-fade-up">
        <div className="flex items-center gap-4">
          <div className="w-14 h-14 rounded-full btn-romantic flex items-center justify-center animate-unlock">
            <Unlock className="w-6 h-6 text-primary-foreground" />
          </div>
          <div>
            <p className="font-display text-2xl text-romantic-deep">
              Chave {lockNumber}
            </p>
            <p className="text-sm text-muted-foreground font-body flex items-center gap-1">
              <Heart className="w-4 h-4 fill-primary text-primary" />
              Desbloqueada!
            </p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div
      className={`p-5 rounded-2xl card-romantic ${
        isShaking ? "animate-shake" : ""
      } ${showSuccess ? "border-primary/40 shadow-romantic" : ""}`}
    >
      <div className="flex items-center gap-4 mb-4">
        <div className="w-14 h-14 rounded-full btn-romantic flex items-center justify-center animate-pulse-glow">
          <Lock className="w-6 h-6 text-primary-foreground" />
        </div>
        <div>
          <p className="font-display text-2xl text-foreground">Chave {lockNumber}</p>
          <p className="text-sm text-muted-foreground font-body">Descubra a senha</p>
        </div>
      </div>

      <div className="bg-romantic-blush rounded-xl p-3 mb-4 border border-romantic-soft">
        <p className="text-sm text-romantic-deep font-body">
          💝 <span className="italic">Dica:</span> {hint}
        </p>
      </div>

      <form onSubmit={handleSubmit} className="flex gap-3">
        <Input
          type="text"
          placeholder="Digite a senha..."
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="flex-1 h-12 bg-white border-romantic-soft focus:border-primary focus:ring-primary/20 rounded-xl font-body"
        />
        <button
          type="submit"
          className="h-12 px-5 rounded-xl btn-romantic text-primary-foreground flex items-center gap-2 font-body font-semibold"
        >
          <Heart className="w-4 h-4" />
          Abrir
        </button>
      </form>
    </div>
  );
};

export default LockSeal;
