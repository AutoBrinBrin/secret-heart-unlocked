import { useState, useEffect } from "react";
import { ChevronLeft, ChevronRight, Heart, X, Sparkles } from "lucide-react";

import romantic1 from "@/assets/romantic-1.jpg";
import romantic2 from "@/assets/romantic-2.jpg";
import romantic3 from "@/assets/romantic-3.jpg";
import romantic4 from "@/assets/romantic-4.jpg";
import romantic5 from "@/assets/romantic-5.jpg";

interface ImageGalleryProps {
  isOpen: boolean;
  onClose: () => void;
}

const images = [
  { src: romantic1, message: "Nosso amor é como o pôr do sol..." },
  { src: romantic2, message: "Floresce a cada dia que passa..." },
  { src: romantic3, message: "Juntos formamos um coração..." },
  { src: romantic4, message: "Cada momento contigo é uma carta de amor..." },
  { src: romantic5, message: "E nosso amor é infinito! 💕" },
];

const ImageGallery = ({ isOpen, onClose }: ImageGalleryProps) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isAnimating, setIsAnimating] = useState(false);
  const [showImage, setShowImage] = useState(false);

  useEffect(() => {
    if (isOpen) {
      setCurrentIndex(0);
      setShowImage(false);
      setTimeout(() => setShowImage(true), 200);
    }
  }, [isOpen]);

  const goToNext = () => {
    if (currentIndex < images.length - 1 && !isAnimating) {
      setIsAnimating(true);
      setShowImage(false);
      setTimeout(() => {
        setCurrentIndex((prev) => prev + 1);
        setShowImage(true);
        setIsAnimating(false);
      }, 400);
    }
  };

  const goToPrev = () => {
    if (currentIndex > 0 && !isAnimating) {
      setIsAnimating(true);
      setShowImage(false);
      setTimeout(() => {
        setCurrentIndex((prev) => prev - 1);
        setShowImage(true);
        setIsAnimating(false);
      }, 400);
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center">
      {/* Backdrop */}
      <div 
        className="absolute inset-0 bg-romantic-deep/95 backdrop-blur-md"
        onClick={onClose}
      />
      
      {/* Floating decorations */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        {Array.from({ length: 20 }).map((_, i) => (
          <Heart
            key={i}
            className="absolute text-primary/20 fill-primary/10 animate-petal-fall"
            style={{
              left: `${Math.random() * 100}%`,
              top: `-${Math.random() * 20}%`,
              width: 12 + Math.random() * 16,
              height: 12 + Math.random() * 16,
              animationDelay: `${Math.random() * 10}s`,
              animationDuration: `${12 + Math.random() * 8}s`,
            }}
          />
        ))}
      </div>

      <div className="relative w-full h-full flex flex-col items-center justify-center p-4 z-10">
        {/* Close button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 z-20 w-12 h-12 rounded-full glass-effect flex items-center justify-center text-primary-foreground hover:bg-primary/20 transition-all duration-300 border border-primary/20"
        >
          <X className="w-6 h-6" />
        </button>

        {/* Title */}
        <h2 className="font-display text-2xl text-primary-foreground mb-4 animate-text-shimmer">
          ✨ Nosso Amor ✨
        </h2>

        {/* Progress dots */}
        <div className="flex gap-2.5 mb-6">
          {images.map((_, i) => (
            <div
              key={i}
              className={`h-2 rounded-full transition-all duration-500 ${
                i === currentIndex 
                  ? "bg-primary w-8 shadow-glow" 
                  : i < currentIndex 
                    ? "bg-romantic-gold/60 w-2" 
                    : "bg-primary/30 w-2"
              }`}
            />
          ))}
        </div>

        {/* Image container */}
        <div className="relative w-full max-w-sm aspect-[3/4] overflow-hidden rounded-3xl shadow-romantic border-2 border-primary/20">
          {/* Decorative corners */}
          <Sparkles className="absolute top-3 left-3 w-5 h-5 text-romantic-gold z-10 animate-sparkle" />
          <Sparkles className="absolute top-3 right-3 w-5 h-5 text-romantic-gold z-10 animate-sparkle" style={{ animationDelay: '0.5s' }} />
          
          <img
            src={images[currentIndex].src}
            alt={`Imagem romântica ${currentIndex + 1}`}
            className={`w-full h-full object-cover transition-all duration-600 ${
              showImage
                ? "opacity-100 scale-100 blur-0"
                : "opacity-0 scale-110 blur-sm"
            }`}
          />

          {/* Overlay gradient */}
          <div className="absolute inset-0 bg-gradient-to-t from-romantic-deep/80 via-transparent to-romantic-deep/20" />

          {/* Vignette effect */}
          <div className="absolute inset-0 shadow-[inset_0_0_100px_rgba(0,0,0,0.3)]" />

          {/* Message */}
          <div
            className={`absolute bottom-0 left-0 right-0 p-6 transition-all duration-700 delay-300 ${
              showImage ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6"
            }`}
          >
            <p className="text-primary-foreground font-display text-2xl text-center leading-relaxed drop-shadow-lg">
              {images[currentIndex].message}
            </p>
          </div>

          {/* Floating hearts on image */}
          <div className="absolute top-6 left-6">
            <Heart
              className="w-7 h-7 text-primary fill-primary drop-shadow-lg animate-float-heart"
            />
          </div>
          <div className="absolute top-10 right-8">
            <Heart
              className="w-5 h-5 text-romantic-soft fill-romantic-soft drop-shadow animate-float-heart"
              style={{ animationDelay: "0.7s" }}
            />
          </div>
        </div>

        {/* Navigation */}
        <div className="flex items-center gap-6 mt-8">
          <button
            onClick={goToPrev}
            disabled={currentIndex === 0 || isAnimating}
            className="w-14 h-14 rounded-full btn-soft flex items-center justify-center disabled:opacity-30 disabled:cursor-not-allowed transition-all duration-300"
          >
            <ChevronLeft className="w-6 h-6 text-romantic-deep" />
          </button>

          <span className="text-primary-foreground font-display text-lg tracking-wider">
            {currentIndex + 1} de {images.length}
          </span>

          <button
            onClick={goToNext}
            disabled={currentIndex === images.length - 1 || isAnimating}
            className="w-14 h-14 rounded-full btn-soft flex items-center justify-center disabled:opacity-30 disabled:cursor-not-allowed transition-all duration-300"
          >
            <ChevronRight className="w-6 h-6 text-romantic-deep" />
          </button>
        </div>

        {currentIndex === images.length - 1 && (
          <div className="mt-8 text-center animate-fade-up">
            <p className="text-primary-foreground/90 font-display text-xl">
              Te amo para sempre! 
            </p>
            <div className="flex justify-center gap-2 mt-3">
              <Heart className="w-6 h-6 text-primary fill-primary animate-heart-beat" />
              <Heart className="w-6 h-6 text-primary fill-primary animate-heart-beat" style={{ animationDelay: '0.2s' }} />
              <Heart className="w-6 h-6 text-primary fill-primary animate-heart-beat" style={{ animationDelay: '0.4s' }} />
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default ImageGallery;
