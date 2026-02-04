'use client';

import Link from 'next/link';
import { useState, useRef, useEffect } from 'react';
const VideoPlayer = ({ src }: { src: string }) => {
  return (
    <video
      className="w-full h-full object-cover transition-transform duration-300 hover:scale-105"
      muted
      loop
      autoPlay
      playsInline
      disablePictureInPicture
      disableRemotePlayback
    >
      <source src={src} type="video/mp4" />
      Your browser does not support the video tag.
    </video>
  );
};

const categories = [
  {
    name: 'Furniture',
    href: '/collections/furniture',
    video: '/videos/furniture.mp4',
    image: 'https://images.unsplash.com/photo-1618221195710-dd6b41faaea6?w=1200&auto=format&fit=crop&q=80',
  },
  {
    name: 'Lighting',
    href: '/collections/lighting',
    video: '/videos/furniture.mp4', // Same video for all
    image: 'https://images.unsplash.com/photo-1605000797499-95a51c5269ae?w=1200&auto=format&fit=crop&q=80',
  },
  {
    name: 'Decor',
    href: '/collections/decor',
    video: '/videos/furniture.mp4', // Same video for all
    image: 'https://images.unsplash.com/photo-1618220179428-22790b461013?w=1200&auto=format&fit=crop&q=80',
  },
  {
    name: 'Garden',
    href: '/collections/garden',
    video: '/videos/furniture.mp4', // Same video for all
    image: 'https://images.unsplash.com/photo-1585320806297-9794b3e4eeae?w=1200&auto=format&fit=crop&q=80',
  },
];
export default function CategoryTiles() {
  return (
    <section className="py-16 bg-white">
      // Update the container and grid layout
<div className="container mx-auto px-4">
  <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-6">
    {categories.map((category) => (
      <div 
        key={category.href}
        className="relative aspect-[640/427] overflow-hidden rounded-lg bg-neutral-100 
                 transition-all duration-300 hover:scale-[1.02] hover:shadow-md"
      >
        <Link href={category.href} className="block w-full h-full">
          <div className="w-full h-full">
            <VideoPlayer src={category.video} />
            <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/10 to-transparent" />
            <div className="absolute bottom-4 left-4 right-4 z-20">
              <h3 className="text-white font-sans text-lg font-medium">
                {category.name}
              </h3>
            </div>
          </div>
        </Link>
      </div>
    ))}
  </div>
</div>   </section>
  );
}