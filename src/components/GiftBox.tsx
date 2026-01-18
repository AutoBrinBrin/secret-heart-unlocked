import { Gift, Sparkles, Star, Heart } from "lucide-react";

interface GiftBoxProps {
  unlockedCount: number;
  totalLocks: number;
  isReady: boolean;
  onOpen: () => void;
}

const GiftBox = ({ unlockedCount, totalLocks, isReady, onOpen }: GiftBoxProps) => {
  return (
    <div className="relative flex flex-col items-center py-6">
      {/* Decorative background glow */}
      {isReady && (
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="w-48 h-48 rounded-full bg-romantic-gold/10 blur-3xl animate-scale-pulse" />
        </div>
      )}
      
      {/* Progress indicator */}
      <div className="flex gap-3 mb-8 relative z-10">
        {Array.from({ length: totalLocks }).map((_, i) => (
          <div key={i} className="relative">
            <div
              className={`w-4 h-4 rounded-full transition-all duration-700 ${
                i < unlockedCount
                  ? "bg-romantic-gold shadow-gold scale-110"
                  : "bg-muted border-2 border-romantic-mauve/30"
              }`}
            />
            {i < unlockedCount && (
              <Star 
                className="absolute -top-1 -right-1 w-3 h-3 text-romantic-gold fill-romantic-gold animate-twinkle" 
                style={{ animationDelay: `${i * 0.3}s` }}
              />
            )}
          </div>
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
        {/* Outer glow ring */}
        {isReady && (
          <div className="absolute -inset-4 rounded-3xl bg-romantic-gold/20 blur-xl animate-pulse-glow" />
        )}
        
        {/* Gift container */}
        <div
          className={`relative w-36 h-36 rounded-3xl flex items-center justify-center transition-all duration-500 overflow-hidden ${
            isReady
              ? "btn-gold animate-heart-beat shadow-gold"
              : "bg-muted/50 border-2 border-romantic-mauve/30"
          }`}
        >
          {/* Shimmer effect */}
          {isReady && (
            <div className="absolute inset-0 shimmer" />
          )}
          
          <Gift
            className={`relative z-10 w-16 h-16 transition-all duration-500 ${
              isReady 
                ? "text-primary-foreground drop-shadow-lg" 
                : "text-muted-foreground"
            }`}
          />
          
          {/* Sparkle decorations */}
          {isReady && (
            <>
              <Sparkles 
                className="absolute top-2 right-2 w-6 h-6 text-primary-foreground/80 animate-sparkle" 
              />
              <Sparkles
                className="absolute bottom-3 left-3 w-5 h-5 text-primary-foreground/60 animate-sparkle"
                style={{ animationDelay: "0.7s" }}
              />
              <Star
                className="absolute top-3 left-4 w-4 h-4 text-primary-foreground/70 animate-twinkle"
                style={{ animationDelay: "1.2s" }}
              />
            </>
          )}
        </div>

        {/* Call to action */}
        {isReady && (
          <div className="mt-6 text-center animate-gentle-bounce">
            <p className="font-display text-xl text-romantic-deep flex items-center justify-center gap-2">
              <Heart className="w-5 h-5 text-primary fill-primary" />
              Toque para abrir!
              <Heart className="w-5 h-5 text-primary fill-primary" />
            </p>
          </div>
        )}
      </button>

      {!isReady && (
        <p className="mt-6 text-center text-muted-foreground text-sm font-body">
          Desbloqueie mais{" "}
          <span className="font-semibold text-primary">
            {totalLocks - unlockedCount}
          </span>{" "}
          chave{totalLocks - unlockedCount > 1 ? "s" : ""} para abrir seu presente
        </p>
      )}
    </div>
  );
};

export default GiftBox;
