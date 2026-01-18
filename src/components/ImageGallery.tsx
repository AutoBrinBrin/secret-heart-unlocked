import { useState, useEffect } from "react";
import { ChevronLeft, ChevronRight, Heart, X } from "lucide-react";

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
      setTimeout(() => setShowImage(true), 150);
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
      }, 350);
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
      }, 350);
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-romantic-deep/95 backdrop-blur-sm">
      {/* Floating hearts background */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        {Array.from({ length: 15 }).map((_, i) => (
          <Heart
            key={i}
            className="absolute text-primary/15 fill-primary/10"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              width: 15 + Math.random() * 20,
              height: 15 + Math.random() * 20,
              animation: `floatUp ${15 + Math.random() * 10}s ease-in-out ${Math.random() * 5}s infinite`,
            }}
          />
        ))}
      </div>

      <div className="relative w-full h-full flex flex-col items-center justify-center p-4 z-10">
        {/* Close button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 z-20 w-11 h-11 rounded-full bg-white/10 backdrop-blur flex items-center justify-center text-white hover:bg-white/20 transition-colors border border-white/20"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Title */}
        <h2 className="font-display text-3xl text-white mb-4">
          ✨ Nosso Amor ✨
        </h2>

        {/* Progress dots */}
        <div className="flex gap-2 mb-5">
          {images.map((_, i) => (
            <div
              key={i}
              className={`h-2 rounded-full transition-all duration-400 ${
                i === currentIndex 
                  ? "bg-primary w-7" 
                  : i < currentIndex 
                    ? "bg-primary/50 w-2" 
                    : "bg-white/30 w-2"
              }`}
            />
          ))}
        </div>

        {/* Image container */}
        <div className="relative w-full max-w-sm aspect-[3/4] overflow-hidden rounded-3xl shadow-romantic border-2 border-primary/30">
          <img
            src={images[currentIndex].src}
            alt={`Imagem romântica ${currentIndex + 1}`}
            className={`w-full h-full object-cover transition-all duration-500 ${
              showImage
                ? "opacity-100 scale-100"
                : "opacity-0 scale-105"
            }`}
          />

          {/* Overlay gradient */}
          <div className="absolute inset-0 bg-gradient-to-t from-romantic-deep/70 via-transparent to-transparent" />

          {/* Message */}
          <div
            className={`absolute bottom-0 left-0 right-0 p-5 text-center transition-all duration-600 ${
              showImage ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"
            }`}
            style={{ transitionDelay: showImage ? "200ms" : "0ms" }}
          >
            <p className="text-white font-display text-2xl leading-relaxed drop-shadow-lg">
              {images[currentIndex].message}
            </p>
          </div>

          {/* Decorative hearts */}
          <Heart
            className="absolute top-4 left-4 w-6 h-6 text-primary fill-primary drop-shadow animate-float-heart"
          />
          <Heart
            className="absolute top-6 right-5 w-4 h-4 text-romantic-soft fill-romantic-soft drop-shadow animate-float-heart"
            style={{ animationDelay: "0.5s" }}
          />
        </div>

        {/* Navigation */}
        <div className="flex items-center gap-6 mt-6">
          <button
            onClick={goToPrev}
            disabled={currentIndex === 0 || isAnimating}
            className="w-12 h-12 rounded-full btn-soft flex items-center justify-center disabled:opacity-30 disabled:cursor-not-allowed"
          >
            <ChevronLeft className="w-5 h-5 text-romantic-deep" />
          </button>

          <span className="text-white font-body text-base">
            {currentIndex + 1} de {images.length}
          </span>

          <button
            onClick={goToNext}
            disabled={currentIndex === images.length - 1 || isAnimating}
            className="w-12 h-12 rounded-full btn-soft flex items-center justify-center disabled:opacity-30 disabled:cursor-not-allowed"
          >
            <ChevronRight className="w-5 h-5 text-romantic-deep" />
          </button>
        </div>

        {currentIndex === images.length - 1 && (
          <div className="mt-6 text-center animate-fade-up">
            <p className="text-white/90 font-display text-xl mb-3">
              Te amo para sempre!
            </p>
            <div className="flex justify-center gap-2">
              <Heart className="w-5 h-5 text-primary fill-primary animate-heart-beat" />
              <Heart className="w-5 h-5 text-primary fill-primary animate-heart-beat" style={{ animationDelay: '0.15s' }} />
              <Heart className="w-5 h-5 text-primary fill-primary animate-heart-beat" style={{ animationDelay: '0.3s' }} />
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default ImageGallery;
