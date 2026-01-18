import { useState, useEffect } from "react";
import { Heart, Sparkles, Star } from "lucide-react";
import FloatingHearts from "@/components/FloatingHearts";
import LockSeal from "@/components/LockSeal";
import GiftBox from "@/components/GiftBox";
import ImageGallery from "@/components/ImageGallery";

const STORAGE_KEY = "romantic-gift-unlocked-keys";

const locks = [
  {
    id: 1,
    hint: "O mês especial do nosso primeiro encontro",
    password: "janeiro",
  },
  {
    id: 2,
    hint: "A cor dos meus olhos quando olho para você",
    password: "castanho",
  },
  {
    id: 3,
    hint: "O que você é para mim... meu grande ___",
    password: "amor",
  },
];

const Index = () => {
  const [unlockedKeys, setUnlockedKeys] = useState<number[]>([]);
  const [isGalleryOpen, setIsGalleryOpen] = useState(false);
  const [hasOpenedGift, setHasOpenedGift] = useState(false);

  useEffect(() => {
    const saved = localStorage.getItem(STORAGE_KEY);
    if (saved) {
      try {
        const parsed = JSON.parse(saved);
        if (Array.isArray(parsed)) {
          setUnlockedKeys(parsed);
        }
      } catch {
        // Invalid data, start fresh
      }
    }
  }, []);

  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(unlockedKeys));
  }, [unlockedKeys]);

  const handleUnlock = (lockId: number) => {
    if (!unlockedKeys.includes(lockId)) {
      setUnlockedKeys((prev) => [...prev, lockId]);
    }
  };

  const handleOpenGift = () => {
    setHasOpenedGift(true);
    setIsGalleryOpen(true);
  };

  const allUnlocked = unlockedKeys.length === locks.length;

  return (
    <div className="min-h-screen bg-blush-gradient relative overflow-x-hidden">
      <FloatingHearts />

      {/* Decorative top fade */}
      <div className="absolute top-0 left-0 right-0 h-32 bg-gradient-to-b from-romantic-soft/30 to-transparent pointer-events-none" />

      <div className="relative z-10 min-h-screen flex flex-col px-4 py-8 max-w-md mx-auto">
        {/* Header */}
        <header className="text-center mb-10 pt-4">
          <div className="flex items-center justify-center gap-3 mb-4">
            <Star className="w-5 h-5 text-romantic-gold animate-twinkle" />
            <Sparkles className="w-6 h-6 text-romantic-gold animate-sparkle" />
            <Heart className="w-10 h-10 text-primary fill-primary animate-heart-beat drop-shadow-lg animate-glow-pulse" />
            <Sparkles className="w-6 h-6 text-romantic-gold animate-sparkle" style={{ animationDelay: '0.5s' }} />
            <Star className="w-5 h-5 text-romantic-gold animate-twinkle" style={{ animationDelay: '1s' }} />
          </div>
          <h1 className="font-display text-4xl font-bold mb-3 animate-text-shimmer">
            Um Presente Especial
          </h1>
          <p className="font-body text-lg text-muted-foreground tracking-wide">
            Para você, com todo meu amor
          </p>
          <div className="flex justify-center gap-1 mt-2">
            <Heart className="w-4 h-4 text-primary fill-primary opacity-60" />
            <Heart className="w-4 h-4 text-primary fill-primary opacity-80" />
            <Heart className="w-4 h-4 text-primary fill-primary" />
            <Heart className="w-4 h-4 text-primary fill-primary opacity-80" />
            <Heart className="w-4 h-4 text-primary fill-primary opacity-60" />
          </div>
        </header>

        {/* Gift Box */}
        <section className="mb-10">
          <GiftBox
            unlockedCount={unlockedKeys.length}
            totalLocks={locks.length}
            isReady={allUnlocked}
            onOpen={handleOpenGift}
          />
        </section>

        {/* Divider */}
        <div className="flex items-center gap-4 mb-8">
          <div className="flex-1 h-px bg-gradient-to-r from-transparent via-romantic-mauve to-transparent" />
          <Heart className="w-5 h-5 text-romantic-mauve" />
          <div className="flex-1 h-px bg-gradient-to-r from-transparent via-romantic-mauve to-transparent" />
        </div>

        {/* Locks Section */}
        <section className="flex-1 space-y-5">
          <h2 className="font-display text-2xl text-center text-foreground mb-6">
            {allUnlocked ? (
              <span className="animate-text-shimmer inline-block">
                ✨ Todas as chaves desbloqueadas! ✨
              </span>
            ) : (
              <span className="text-romantic-deep">
                Desbloqueie as chaves do meu coração
              </span>
            )}
          </h2>

          <div className="space-y-5">
            {locks.map((lock, index) => (
              <div
                key={lock.id}
                className="animate-fade-up"
                style={{ animationDelay: `${index * 0.1}s` }}
              >
                <LockSeal
                  lockNumber={lock.id}
                  hint={lock.hint}
                  correctPassword={lock.password}
                  isUnlocked={unlockedKeys.includes(lock.id)}
                  onUnlock={() => handleUnlock(lock.id)}
                />
              </div>
            ))}
          </div>
        </section>

        {/* Footer */}
        <footer className="mt-12 text-center pb-4">
          <div className="flex items-center justify-center gap-2 text-muted-foreground">
            <span className="font-body text-sm tracking-wide">Feito com</span>
            <Heart className="w-4 h-4 text-primary fill-primary animate-heart-beat" />
            <span className="font-body text-sm tracking-wide">para você</span>
          </div>
        </footer>
      </div>

      {/* Image Gallery Modal */}
      <ImageGallery
        isOpen={isGalleryOpen}
        onClose={() => setIsGalleryOpen(false)}
      />
    </div>
  );
};

export default Index;
