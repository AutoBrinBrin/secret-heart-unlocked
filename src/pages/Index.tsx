import { useState, useEffect } from "react";
import { Heart, Sparkles } from "lucide-react";
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

  // Load unlocked keys from localStorage
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

  // Save unlocked keys to localStorage
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

      <div className="relative z-10 min-h-screen flex flex-col px-4 py-8 max-w-md mx-auto">
        {/* Header */}
        <header className="text-center mb-8">
          <div className="flex items-center justify-center gap-2 mb-2">
            <Sparkles className="w-5 h-5 text-romantic-gold" />
            <Heart className="w-8 h-8 text-primary fill-primary animate-heart-beat" />
            <Sparkles className="w-5 h-5 text-romantic-gold" />
          </div>
          <h1 className="font-display text-3xl font-bold text-romantic-deep mb-2">
            Um Presente Especial
          </h1>
          <p className="font-body text-muted-foreground">
            Para você, com todo meu amor 💕
          </p>
        </header>

        {/* Gift Box */}
        <section className="mb-8">
          <GiftBox
            unlockedCount={unlockedKeys.length}
            totalLocks={locks.length}
            isReady={allUnlocked}
            onOpen={handleOpenGift}
          />
        </section>

        {/* Locks Section */}
        <section className="flex-1 space-y-4">
          <h2 className="font-display text-xl text-center text-foreground mb-4">
            {allUnlocked ? (
              <span className="text-romantic-gold">
                ✨ Todas as chaves desbloqueadas! ✨
              </span>
            ) : (
              "Desbloqueie as chaves do meu coração"
            )}
          </h2>

          <div className="space-y-4">
            {locks.map((lock) => (
              <LockSeal
                key={lock.id}
                lockNumber={lock.id}
                hint={lock.hint}
                correctPassword={lock.password}
                isUnlocked={unlockedKeys.includes(lock.id)}
                onUnlock={() => handleUnlock(lock.id)}
              />
            ))}
          </div>
        </section>

        {/* Footer */}
        <footer className="mt-8 text-center">
          <p className="text-sm text-muted-foreground font-body">
            Feito com{" "}
            <Heart className="inline w-4 h-4 text-primary fill-primary" /> para
            você
          </p>
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
