import { Gift, Sparkles } from "lucide-react";

interface GiftBoxProps {
  unlockedCount: number;
  totalLocks: number;
  isReady: boolean;
  onOpen: () => void;
}

const GiftBox = ({ unlockedCount, totalLocks, isReady, onOpen }: GiftBoxProps) => {
  return (
    <div className="relative flex flex-col items-center">
      {/* Progress indicator */}
      <div className="flex gap-2 mb-6">
        {Array.from({ length: totalLocks }).map((_, i) => (
          <div
            key={i}
            className={`w-3 h-3 rounded-full transition-all duration-500 ${
              i < unlockedCount
                ? "bg-romantic-gold shadow-gold scale-110"
                : "bg-muted"
            }`}
          />
        ))}
      </div>

      {/* Gift box */}
      <button
        onClick={isReady ? onOpen : undefined}
        disabled={!isReady}
        className={`relative group transition-all duration-500 ${
          isReady ? "cursor-pointer" : "cursor-not-allowed"
        }`}
      >
        <div
          className={`w-32 h-32 rounded-2xl flex items-center justify-center transition-all duration-500 ${
            isReady
              ? "bg-gold-gradient shadow-gold animate-heart-beat"
              : "bg-muted"
          }`}
        >
          <Gift
            className={`w-16 h-16 transition-all duration-500 ${
              isReady ? "text-primary-foreground" : "text-muted-foreground"
            }`}
          />
          {isReady && (
            <>
              <Sparkles className="absolute top-0 right-0 w-6 h-6 text-romantic-gold animate-sparkle" />
              <Sparkles
                className="absolute bottom-0 left-0 w-5 h-5 text-primary animate-sparkle"
                style={{ animationDelay: "0.5s" }}
              />
              <Sparkles
                className="absolute top-1/2 left-0 w-4 h-4 text-romantic-gold animate-sparkle"
                style={{ animationDelay: "1s" }}
              />
            </>
          )}
        </div>

        {isReady && (
          <p className="mt-4 text-center font-display text-lg text-romantic-deep animate-pulse">
            Toque para abrir! 💝
          </p>
        )}
      </button>

      {!isReady && (
        <p className="mt-4 text-center text-muted-foreground text-sm">
          Desbloqueie {totalLocks - unlockedCount} chave
          {totalLocks - unlockedCount > 1 ? "s" : ""} para abrir
        </p>
      )}
    </div>
  );
};

export default GiftBox;
