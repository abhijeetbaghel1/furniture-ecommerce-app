'use client';

import Image from 'next/image';
import Link from 'next/link';
import { Heart, ShoppingBag, Eye } from 'lucide-react';
import { useWishlist } from '@/state/wishlist';

// Mock product data for bedroom
const bedroomProducts = [
  {
    id: 1,
    name: 'King Size Beds',
    slug: 'king-beds',
    price: 45000,
    originalPrice: 55000,
    image: '/api/placeholder/400/300',
    category: 'Beds',
    badge: 'Luxury',
    description: 'Spacious king size bed with upholstered headboard and storage'
  },
  {
    id: 2,
    name: 'Queen Size Beds',
    slug: 'queen-beds',
    price: 35000,
    originalPrice: 42000,
    image: '/api/placeholder/400/300',
    category: 'Beds',
    badge: 'Popular',
    description: 'Comfortable queen size bed with modern design and wooden frame'
  },
  {
    id: 3,
    name: 'Wardrobes',
    slug: 'wardrobes',
    price: 28000,
    originalPrice: 35000,
    image: '/api/placeholder/400/300',
    category: 'Storage',
    badge: 'Essential',
    description: '3-door wardrobe with mirror and internal organizers'
  },
  {
    id: 4,
    name: 'Dressers',
    slug: 'dressers',
    price: 15000,
    originalPrice: 18000,
    image: '/api/placeholder/400/300',
    category: 'Storage',
    badge: 'Organized',
    description: '6-drawer dresser with soft-close mechanisms and elegant finish'
  },
  {
    id: 5,
    name: 'Nightstands',
    slug: 'nightstands',
    price: 6000,
    originalPrice: 7500,
    image: '/api/placeholder/400/300',
    category: 'Tables',
    badge: 'Convenient',
    description: 'Set of 2 nightstands with drawers and USB charging ports'
  },
  {
    id: 6,
    name: 'Vanities',
    slug: 'vanities',
    price: 12000,
    originalPrice: 15000,
    image: '/api/placeholder/400/300',
    category: 'Furniture',
    badge: 'Elegant',
    description: 'Makeup vanity with mirror, drawers, and matching stool'
  },
  {
    id: 7,
    name: 'Bedroom Benches',
    slug: 'benches',
    price: 8000,
    originalPrice: 10000,
    image: '/api/placeholder/400/300',
    category: 'Seating',
    badge: 'Comfort',
    description: 'Upholstered bedroom bench with storage compartment'
  },
  {
    id: 8,
    name: 'Chest of Drawers',
    slug: 'chest-drawers',
    price: 10000,
    originalPrice: 12000,
    image: '/api/placeholder/400/300',
    category: 'Storage',
    badge: 'Classic',
    description: '5-drawer chest with antique finish and modern hardware'
  }
];

export default function BedroomPage() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-orange-50 to-white">
      {/* Hero Section */}
      <div className="relative bg-gradient-to-r from-orange-100 via-amber-50 to-orange-100 py-16 px-4">
        <div className="max-w-7xl mx-auto text-center">
          <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
            <span className="text-orange-600">Bedroom</span> Furniture
          </h1>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Transform your bedroom into a peaceful sanctuary with our collection of comfortable beds, smart storage solutions, and elegant furniture.
          </p>
        </div>
      </div>

      {/* Category Navigation */}
      <div className="max-w-7xl mx-auto px-4 py-8">
        <div className="flex flex-wrap gap-3 justify-center">
          {['All', 'Beds', 'Storage', 'Tables', 'Furniture', 'Seating'].map((category) => (
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
          {bedroomProducts.map((product) => (
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

      {/* Bedroom Tips Section */}
      <div className="bg-gradient-to-r from-orange-100 to-amber-100 py-16 px-4 mt-16">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-3xl font-bold text-center text-gray-900 mb-12">
            Bedroom Design Tips
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="text-center">
              <div className="w-16 h-16 bg-orange-500 rounded-full flex items-center justify-center mx-auto mb-4">
                <Heart className="w-8 h-8 text-white" />
              </div>
              <h3 className="text-xl font-semibold mb-2">Comfort First</h3>
              <p className="text-gray-600">Choose comfortable mattresses and soft bedding for restful sleep</p>
            </div>
            <div className="text-center">
              <div className="w-16 h-16 bg-orange-500 rounded-full flex items-center justify-center mx-auto mb-4">
                <ShoppingBag className="w-8 h-8 text-white" />
              </div>
              <h3 className="text-xl font-semibold mb-2">Smart Storage</h3>
              <p className="text-gray-600">Maximize space with multi-functional furniture pieces</p>
            </div>
            <div className="text-center">
              <div className="w-16 h-16 bg-orange-500 rounded-full flex items-center justify-center mx-auto mb-4">
                <Eye className="w-8 h-8 text-white" />
              </div>
              <h3 className="text-xl font-semibold mb-2">Calm Colors</h3>
              <p className="text-gray-600">Use soothing colors and soft lighting for relaxation</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
