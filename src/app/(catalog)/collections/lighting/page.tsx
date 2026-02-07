'use client';

import Image from 'next/image';
import Link from 'next/link';
import { Heart, ShoppingBag, Eye } from 'lucide-react';
import { useWishlist } from '@/state/wishlist';

// Mock product data for lighting
const lightingProducts = [
  {
    id: 1,
    name: 'Chandeliers',
    slug: 'chandeliers',
    price: 15000,
    originalPrice: 18000,
    image: '/api/placeholder/400/300',
    category: 'Ceiling',
    badge: 'Elegant',
    description: 'Crystal chandelier with multiple lights and adjustable chain'
  },
  {
    id: 2,
    name: 'Pendant Lights',
    slug: 'pendant-lights',
    price: 4000,
    originalPrice: 5000,
    image: '/api/placeholder/400/300',
    category: 'Ceiling',
    badge: 'Modern',
    description: 'Set of 3 pendant lights with glass shades and metal fixtures'
  },
  {
    id: 3,
    name: 'Floor Lamps',
    slug: 'floor-lamps',
    price: 6000,
    originalPrice: 7500,
    image: '/api/placeholder/400/300',
    category: 'Floor',
    badge: 'Ambient',
    description: 'Tri-light floor lamp with adjustable brightness and modern design'
  },
  {
    id: 4,
    name: 'Table Lamps',
    slug: 'table-lamps',
    price: 2500,
    originalPrice: 3000,
    image: '/api/placeholder/400/300',
    category: 'Table',
    badge: 'Versatile',
    description: 'Classic table lamp with fabric shade and wooden base'
  },
  {
    id: 5,
    name: 'Wall Sconces',
    slug: 'wall-sconces',
    price: 3000,
    originalPrice: 4000,
    image: '/api/placeholder/400/300',
    category: 'Wall',
    badge: 'Stylish',
    description: 'Modern wall sconces with upward lighting and metal finish'
  },
  {
    id: 6,
    name: 'Ceiling Lights',
    slug: 'ceiling-lights',
    price: 5000,
    originalPrice: 6000,
    image: '/api/placeholder/400/300',
    category: 'Ceiling',
    badge: 'Essential',
    description: 'Flush mount ceiling light with LED technology and dimmer'
  },
  {
    id: 7,
    name: 'Outdoor Lighting',
    slug: 'outdoor-lighting',
    price: 8000,
    originalPrice: 10000,
    image: '/api/placeholder/400/300',
    category: 'Outdoor',
    badge: 'Weatherproof',
    description: 'Weather-resistant outdoor lights with motion sensors'
  },
  {
    id: 8,
    name: 'Smart Lighting',
    slug: 'smart-lighting',
    price: 12000,
    originalPrice: 15000,
    image: '/api/placeholder/400/300',
    category: 'Smart',
    badge: 'Tech',
    description: 'Smart lighting system with app control and color changing'
  }
];

export default function LightingPage() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-orange-50 to-white">
      {/* Hero Section */}
      <div className="relative bg-gradient-to-r from-orange-100 via-amber-50 to-orange-100 py-16 px-4">
        <div className="max-w-7xl mx-auto text-center">
          <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
            <span className="text-orange-600">Lighting</span>
          </h1>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Illuminate your space with our stunning collection of lighting fixtures. From elegant chandeliers to modern smart lighting solutions.
          </p>
        </div>
      </div>

      {/* Category Navigation */}
      <div className="max-w-7xl mx-auto px-4 py-8">
        <div className="flex flex-wrap gap-3 justify-center">
          {['All', 'Ceiling', 'Floor', 'Table', 'Wall', 'Outdoor', 'Smart'].map((category) => (
            <button
              key={category}
              className={`px-6 py-2 rounded-full font-medium transition-all duration-200 ${
                category === 'All'
                  ? 'bg-orange-500 text-white'
                  : 'bg-gray-200 text-gray-700 hover:bg-orange-100'
              }`}
            >
              {category}
            </button>
          ))}
        </div>
      </div>

      {/* Products Grid */}
      <div className="max-w-7xl mx-auto px-4 py-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {lightingProducts.map((product) => (
            <div key={product.id} className="group relative bg-white rounded-lg shadow-md hover:shadow-xl transition-all duration-300 overflow-hidden">
              {/* Product Badge */}
              {product.badge && (
                <div className="absolute top-4 left-4 z-10 bg-orange-500 text-white px-3 py-1 rounded-full text-sm font-semibold">
                  {product.badge}
                </div>
              )}
              
              {/* Quick Actions */}
              <div className="absolute top-4 right-4 z-10 flex flex-col gap-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                <button className="bg-white p-2 rounded-full shadow-md hover:bg-orange-50 transition-colors duration-200">
                  <Heart className="w-4 h-4 text-gray-600 hover:text-red-500" />
                </button>
                <button className="bg-white p-2 rounded-full shadow-md hover:bg-orange-50 transition-colors duration-200">
                  <Eye className="w-4 h-4 text-gray-600 hover:text-orange-500" />
                </button>
              </div>

              {/* Product Image */}
              <div className="relative aspect-[4/3] overflow-hidden bg-gray-100">
                <Image
                  src={product.image}
                  alt={product.name}
                  fill
                  className="object-cover group-hover:scale-105 transition-transform duration-300"
                />
              </div>

              {/* Product Info */}
              <div className="p-4">
                <div className="mb-2">
                  <span className="text-xs text-orange-600 font-medium uppercase tracking-wide">
                    {product.category}
                  </span>
                </div>
                
                <h3 className="text-lg font-semibold text-gray-900 mb-2 line-clamp-2 group-hover:text-orange-600 transition-colors duration-200">
                  <Link href={`/products/${product.slug}`}>
                    {product.name}
                  </Link>
                </h3>
                
                <p className="text-sm text-gray-600 mb-3 line-clamp-2">
                  {product.description}
                </p>
                
                {/* Price */}
                <div className="flex items-center justify-between mb-3">
                  <div className="flex items-center gap-2">
                    <span className="text-xl font-bold text-gray-900">
                      ₹{product.price.toLocaleString()}
                    </span>
                    {product.originalPrice && (
                      <span className="text-sm text-gray-500 line-through">
                        ₹{product.originalPrice.toLocaleString()}
                      </span>
                    )}
                  </div>
                  {product.originalPrice && (
                    <span className="text-xs bg-red-100 text-red-600 px-2 py-1 rounded-full font-semibold">
                      {Math.round(((product.originalPrice - product.price) / product.originalPrice) * 100)}% OFF
                    </span>
                  )}
                </div>

                {/* Add to Cart Button */}
                <button className="w-full bg-orange-500 text-white py-2 px-4 rounded-lg hover:bg-orange-600 transition-colors duration-200 flex items-center justify-center gap-2 group-hover:bg-orange-600">
                  <ShoppingBag className="w-4 h-4" />
                  Add to Cart
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Lighting Tips Section */}
      <div className="bg-gradient-to-r from-orange-100 to-amber-100 py-16 px-4 mt-16">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-3xl font-bold text-center text-gray-900 mb-12">
            Lighting Design Tips
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="text-center">
              <div className="w-16 h-16 bg-orange-500 rounded-full flex items-center justify-center mx-auto mb-4">
                <Heart className="w-8 h-8 text-white" />
              </div>
              <h3 className="text-xl font-semibold mb-2">Layer Your Lighting</h3>
              <p className="text-gray-600">Combine ambient, task, and accent lighting for depth</p>
            </div>
            <div className="text-center">
              <div className="w-16 h-16 bg-orange-500 rounded-full flex items-center justify-center mx-auto mb-4">
                <ShoppingBag className="w-8 h-8 text-white" />
              </div>
              <h3 className="text-xl font-semibold mb-2">Dimmer Controls</h3>
              <p className="text-gray-600">Install dimmers for flexible lighting levels</p>
            </div>
            <div className="text-center">
              <div className="w-16 h-16 bg-orange-500 rounded-full flex items-center justify-center mx-auto mb-4">
                <Eye className="w-8 h-8 text-white" />
              </div>
              <h3 className="text-xl font-semibold mb-2">Color Temperature</h3>
              <p className="text-gray-600">Choose warm tones for cozy, cool for focus</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
