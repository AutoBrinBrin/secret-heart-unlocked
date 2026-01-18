import { Gift, Sparkles, Heart } from "lucide-react";

interface GiftBoxProps {
  unlockedCount: number;
  totalLocks: number;
  isReady: boolean;
  onOpen: () => void;
}

const GiftBox = ({ unlockedCount, totalLocks, isReady, onOpen }: GiftBoxProps) => {
  return (
    <div className="flex flex-col items-center py-4">
      {/* Progress indicator */}
      <div className="flex items-center gap-3 mb-6">
        {Array.from({ length: totalLocks }).map((_, i) => (
          <div
            key={i}
            className={`w-3 h-3 rounded-full transition-all duration-500 ${
              i < unlockedCount
                ? "bg-primary shadow-glow scale-110"
                : "bg-romantic-soft border border-romantic-medium"
            }`}
          />
        ))}
      </div>

      {/* Gift box */}
      <button
        onClick={isReady ? onOpen : undefined}
        disabled={!isReady}
        className={`relative transition-all duration-500 ${
          isReady ? "cursor-pointer" : "cursor-not-allowed"
        }`}
      >
        <div
          className={`w-32 h-32 rounded-2xl flex items-center justify-center transition-all duration-500 ${
            isReady
              ? "btn-romantic animate-heart-beat"
              : "bg-romantic-light border-2 border-romantic-soft"
          }`}
        >
          <Gift
            className={`w-14 h-14 transition-colors duration-500 ${
              isReady ? "text-primary-foreground" : "text-romantic-medium"
            }`}
          />
          
          {isReady && (
            <>
              <Sparkles className="absolute top-1 right-1 w-5 h-5 text-primary-foreground/80 animate-sparkle" />
              <Sparkles
                className="absolute bottom-2 left-2 w-4 h-4 text-primary-foreground/60 animate-sparkle"
                style={{ animationDelay: "0.5s" }}
              />
            </>
          )}
        </div>

        {isReady && (
          <div className="mt-5 text-center animate-gentle-bounce">
            <p className="font-display text-2xl text-romantic-deep flex items-center justify-center gap-2">
              <Heart className="w-5 h-5 text-primary fill-primary" />
              Toque para abrir!
              <Heart className="w-5 h-5 text-primary fill-primary" />
            </p>
          </div>
        )}
      </button>

      {!isReady && (
        <p className="mt-5 text-center text-muted-foreground text-sm font-body">
          Desbloqueie mais{" "}
          <span className="font-bold text-primary">
            {totalLocks - unlockedCount}
          </span>{" "}
          chave{totalLocks - unlockedCount > 1 ? "s" : ""} para abrir
        </p>
      )}
    </div>
  );
};

export default GiftBox;
