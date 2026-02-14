'use client';

import { useState, useEffect, useRef, useCallback } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { siteConfig } from '@/lib/config/site';
import Button from '@/components/common/Button';
import Container from '@/components/common/Container';

export default function HeroBanner() {
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [isPaused, setIsPaused] = useState(false);
  const [mounted, setMounted] = useState(false);
  
  // Array of hero images with alt text
  const heroImages = [
    {
      src: 'https://images.pexels.com/photos/260922/pexels-photo-260922.jpeg',
      alt: 'Stylish rooftop cafe with modern furniture and city views'
    },
    {
      src: 'https://images.pexels.com/photos/1571459/pexels-photo-1571459.jpeg',
      alt: 'Luxury living room with modern furniture'
    },
    {
      src: 'https://images.pexels.com/photos/1643383/pexels-photo-1643383.jpeg',
      alt: 'Minimalist bedroom with wooden furniture'
    },
    {
      src: 'https://images.pexels.com/photos/1866149/pexels-photo-1866149.jpeg',
      alt: 'Elegant dining area with modern chairs'
    },
    {
      src: 'https://images.pexels.com/photos/1457842/pexels-photo-1457842.jpeg',
      alt: 'Cozy outdoor seating area'
    }
  ];

  // Navigation handlers
  const goToNext = useCallback(() => {
    setCurrentImageIndex(prev => (prev + 1) % heroImages.length);
  }, [heroImages.length]);

  const goToPrev = useCallback(() => {
    setCurrentImageIndex(prev => (prev - 1 + heroImages.length) % heroImages.length);
  }, [heroImages.length]);

  // Auto-advance slides with useRef to track current index without re-renders
  const currentIndexRef = useRef(0);
  
  useEffect(() => {
    setMounted(true);
  }, []);
  
  useEffect(() => {
    currentIndexRef.current = currentImageIndex;
  }, [currentImageIndex]);
  
  useEffect(() => {
    if (!mounted || isPaused) return;
    
    const timer = setInterval(() => {
      goToNext();
    }, 3000);

    return () => clearInterval(timer);
  }, [mounted, isPaused, goToNext]);

  const fallbackImage = 'https://images.pexels.com/photos/1571459/pexels-photo-1571459.jpeg';

  return (
    <section 
      className="relative bg-gradient-to-br from-neutral-50 via-white to-accent-sand/5 py-12 md:py-16 lg:py-20 overflow-hidden"
      onMouseEnter={() => setIsPaused(true)}
      onMouseLeave={() => setIsPaused(false)}
    >
      {/* Animated background elements */}
      <div className="absolute top-0 right-0 w-96 h-96 bg-accent-walnut/5 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2 animate-float-slow" />
      <div className="absolute bottom-0 left-0 w-96 h-96 bg-accent-sand/10 rounded-full blur-3xl translate-y-1/2 -translate-x-1/2 animate-float-slow [animation-delay:2s]" />
      <div className="absolute top-1/4 left-1/4 w-64 h-64 bg-accent-sand/5 rounded-full blur-2xl animate-float [animation-delay:1s]" />
      
      <Container>
        <div className="grid grid-cols-1 lg:grid-cols-5 gap-6 lg:gap-10 xl:gap-12 items-center min-h-[320px] lg:min-h-[400px]">
          {/* Text Content - Left Side */}
          <div className="relative z-10 text-left space-y-5 lg:space-y-6 lg:col-span-2 lg:pr-8">
            {/* Main Heading */}
            <div className="space-y-4">
              <div className="overflow-hidden">
                <h1 className="text-4xl md:text-5xl lg:text-5xl xl:text-6xl font-serif font-bold text-fg leading-[1.15] tracking-tight">
                  <span className="block overflow-hidden">
                    <span className="inline-block animate-slide-up-fade-in opacity-0 [animation-delay:0.1s] [animation-fill-mode:forwards]">
                      Rooftop Oasis
                    </span>
                  </span>
                  <span className="block overflow-hidden mt-2 md:mt-3">
                    <span className="inline-block text-accent-walnut/90 bg-clip-text bg-gradient-to-r from-accent-walnut to-accent-walnut/80 animate-slide-up-fade-in opacity-0 [animation-delay:0.3s] [animation-fill-mode:forwards]">
                      Elevate Your Cafe Experience
                    </span>
                  </span>
                </h1>
              </div>
              
              {/* Animated decorative line */}
              <div className="overflow-hidden">
                <div className="w-16 h-0.5 bg-gradient-to-r from-accent-walnut to-accent-sand rounded-full animate-slide-right-fade-in opacity-0 [animation-delay:0.5s] [animation-fill-mode:forwards]" />
              </div>
            </div>

            {/* Animated subtitle lines */}
            <div className="space-y-2.5 text-base md:text-lg lg:text-lg text-neutral-600 font-light">
              <p className="opacity-90 leading-relaxed animate-slide-up-fade-in opacity-0 [animation-delay:0.6s] [animation-fill-mode:forwards]">
                <span className="relative before:absolute before:bottom-0 before:left-0 before:w-0 before:h-px before:bg-accent-walnut/50 before:transition-all before:duration-300 hover:before:w-full">
                  Breathtaking views meet exceptional design
                </span>
              </p>
              <p className="opacity-85 leading-relaxed animate-slide-up-fade-in opacity-0 [animation-delay:0.7s] [animation-fill-mode:forwards]">
                <span className="relative before:absolute before:bottom-0 before:left-0 before:w-0 before:h-px before:bg-accent-walnut/50 before:transition-all before:duration-300 hover:before:w-full">
                  Premium rooftop furniture for the perfect ambiance
                </span>
              </p>
              <p className="opacity-80 leading-relaxed animate-slide-up-fade-in opacity-0 [animation-delay:0.8s] [animation-fill-mode:forwards]">
                <span className="relative before:absolute before:bottom-0 before:left-0 before:w-0 before:h-px before:bg-accent-walnut/50 before:transition-all before:duration-300 hover:before:w-full">
                  Create an unforgettable sky-high dining experience
                </span>
              </p>
            </div>

            {/* Animated CTA Buttons */}
            <div className="flex flex-col sm:flex-row gap-3 pt-6">
              <div className="animate-slide-up-fade-in opacity-0 [animation-delay:0.9s] [animation-fill-mode:forwards]">
                <Link href="/collections" className="group relative inline-block">
                  <div className="absolute -inset-1 bg-gradient-to-r from-accent-walnut/80 to-accent-sand/80 rounded-lg blur opacity-0 group-hover:opacity-100 transition-all duration-300"></div>
                  <Button 
                    size="lg" 
                    className="relative w-full sm:w-auto px-8 py-4 text-base font-medium bg-accent-walnut text-white hover:bg-accent-walnut/90 hover:shadow-lg transition-all duration-300 hover:scale-[1.02] hover:-translate-y-0.5"
                  >
                    <span className="relative z-10 flex items-center justify-center gap-2">
                      <span>Explore</span>
                      <svg className="w-4 h-4 transition-transform duration-300 group-hover:translate-x-1" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
                      </svg>
                    </span>
                  </Button>
                </Link>
              </div>
              <div className="animate-slide-up-fade-in opacity-0 [animation-delay:1s] [animation-fill-mode:forwards]">
                <Link href="/pages/about-us" className="group relative inline-block">
                  <Button 
                    size="lg" 
                    variant="outline" 
                    className="w-full sm:w-auto px-8 py-4 text-base font-medium border-2 border-accent-walnut/30 text-accent-walnut hover:bg-accent-walnut/5 hover:border-accent-walnut/70 hover:text-accent-walnut transition-all duration-300 hover:scale-[1.02] hover:-translate-y-0.5 group-hover:shadow-md"
                  >
                    <span className="relative z-10 flex items-center justify-center gap-2">
                      <span>Our Story</span>
                      <svg className="w-4 h-4 transition-transform duration-300 group-hover:translate-x-1" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                      </svg>
                    </span>
                  </Button>
                </Link>
              </div>
            </div>
          </div>

          {/* Hero Image Slider */}
          <div 
            className="relative w-full lg:col-span-3 h-[400px] lg:h-[500px] rounded-3xl overflow-hidden shadow-2xl group animate-slide-in-right-delay-400 opacity-0"
            onMouseEnter={() => setIsPaused(true)}
            onMouseLeave={() => setIsPaused(false)}
          >
            <div className="relative w-full h-full">
              <div className="absolute inset-0 bg-gray-100">
                {heroImages.map((image, index) => (
                  <div 
                    key={index}
                    className={`absolute inset-0 transition-opacity duration-1000 ease-in-out ${
                      index === currentImageIndex ? 'opacity-100 z-10' : 'opacity-0'
                    }`}
                    style={{
                      transition: 'opacity 0.7s ease-in-out',
                      willChange: 'opacity'
                    }}
                  >
                    <div className="relative w-full h-full">
                      <Image
                        src={image.src}
                        alt={image.alt}
                        fill
                        className="object-cover"
                        priority={index < 2} // Preload first 2 images
                        sizes="(max-width: 1024px) 80vw, 60vw"
                        quality={90}
                        onError={(e) => {
                          const target = e.currentTarget;
                          target.onerror = null; // Prevent infinite loop
                          target.src = fallbackImage;
                        }}
                      />
                    </div>
                  </div>
                ))}
              </div>
              <div className="absolute inset-0 bg-gradient-to-t from-black/10 via-transparent to-black/5 z-20 pointer-events-none" />
              
              {/* Decorative corner accent */}
              <div className="absolute top-6 right-6 w-16 h-16 border-2 border-white/30 rounded-lg rotate-12 opacity-60 group-hover:rotate-0 group-hover:opacity-100 transition-all duration-500 z-30" />
              
              {/* Navigation Arrows */}
              <button 
                onClick={(e) => {
                  e.stopPropagation();
                  goToPrev();
                }}
                className="absolute left-4 top-1/2 -translate-y-1/2 z-30 w-10 h-10 md:w-12 md:h-12 rounded-full bg-black/30 hover:bg-black/50 text-white flex items-center justify-center transition-all duration-300 opacity-0 group-hover:opacity-100"
                aria-label="Previous slide"
              >
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                </svg>
              </button>
              
              <button 
                onClick={(e) => {
                  e.stopPropagation();
                  goToNext();
                }}
                className="absolute right-4 top-1/2 -translate-y-1/2 z-30 w-10 h-10 md:w-12 md:h-12 rounded-full bg-black/30 hover:bg-black/50 text-white flex items-center justify-center transition-all duration-300 opacity-0 group-hover:opacity-100"
                aria-label="Next slide"
              >
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                </svg>
              </button>
              
              {/* Navigation Dots */}
              <div className="absolute bottom-6 left-1/2 -translate-x-1/2 flex space-x-2 z-30">
                {heroImages.map((_, index) => (
                  <button
                    key={index}
                    onClick={() => setCurrentImageIndex(index)}
                    className={`w-2.5 h-2.5 rounded-full transition-all ${
                      index === currentImageIndex ? 'bg-white w-8' : 'bg-white/50'
                    }`}
                    aria-label={`Go to slide ${index + 1}`}
                  />
                ))}
              </div>
            </div>
          </div>
        </div>
      </Container>
    </section>
  );
}