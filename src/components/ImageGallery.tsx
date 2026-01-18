import { useState, useEffect } from "react";
import { ChevronLeft, ChevronRight, Heart, X } from "lucide-react";
import { Button } from "@/components/ui/button";

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
      setTimeout(() => setShowImage(true), 100);
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
      }, 300);
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
      }, 300);
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-foreground/90 backdrop-blur-sm">
      <div className="relative w-full h-full flex flex-col items-center justify-center p-4">
        {/* Close button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 z-10 w-10 h-10 rounded-full bg-background/20 flex items-center justify-center text-primary-foreground hover:bg-background/30 transition-colors"
        >
          <X className="w-6 h-6" />
        </button>

        {/* Progress dots */}
        <div className="flex gap-2 mb-6">
          {images.map((_, i) => (
            <div
              key={i}
              className={`w-2 h-2 rounded-full transition-all duration-300 ${
                i === currentIndex ? "bg-primary w-6" : "bg-primary/30"
              }`}
            />
          ))}
        </div>

        {/* Image container */}
        <div className="relative w-full max-w-sm aspect-[3/4] overflow-hidden rounded-2xl shadow-romantic">
          <img
            src={images[currentIndex].src}
            alt={`Imagem romântica ${currentIndex + 1}`}
            className={`w-full h-full object-cover transition-all duration-500 ${
              showImage
                ? "opacity-100 scale-100 translate-x-0"
                : "opacity-0 scale-95 translate-x-8"
            }`}
          />

          {/* Overlay gradient */}
          <div className="absolute inset-0 bg-gradient-to-t from-foreground/60 via-transparent to-transparent" />

          {/* Message */}
          <div
            className={`absolute bottom-0 left-0 right-0 p-6 transition-all duration-700 delay-200 ${
              showImage ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"
            }`}
          >
            <p className="text-primary-foreground font-display text-xl text-center">
              {images[currentIndex].message}
            </p>
          </div>

          {/* Floating hearts */}
          <div className="absolute top-4 left-4">
            <Heart
              className="w-6 h-6 text-primary fill-primary animate-float-heart"
              style={{ animationDelay: "0s" }}
            />
          </div>
          <div className="absolute top-8 right-6">
            <Heart
              className="w-4 h-4 text-primary fill-primary animate-float-heart"
              style={{ animationDelay: "0.5s" }}
            />
          </div>
        </div>

        {/* Navigation */}
        <div className="flex items-center gap-4 mt-6">
          <Button
            variant="outline"
            size="icon"
            onClick={goToPrev}
            disabled={currentIndex === 0 || isAnimating}
            className="rounded-full bg-background/20 border-primary/30 text-primary-foreground hover:bg-background/30 disabled:opacity-30"
          >
            <ChevronLeft className="w-5 h-5" />
          </Button>

          <span className="text-primary-foreground font-body text-sm">
            {currentIndex + 1} / {images.length}
          </span>

          <Button
            variant="outline"
            size="icon"
            onClick={goToNext}
            disabled={currentIndex === images.length - 1 || isAnimating}
            className="rounded-full bg-background/20 border-primary/30 text-primary-foreground hover:bg-background/30 disabled:opacity-30"
          >
            <ChevronRight className="w-5 h-5" />
          </Button>
        </div>

        {currentIndex === images.length - 1 && (
          <p className="mt-6 text-primary-foreground/80 text-center font-body animate-fade-up">
            Te amo para sempre! ❤️
          </p>
        )}
      </div>
    </div>
  );
};

export default ImageGallery;
