'use client';

import { Metadata } from 'next';
import Image from 'next/image';
import Link from 'next/link';
import { Heart, ShoppingBag, Eye } from 'lucide-react';

export const metadata: Metadata = {
  title: 'Outdoor Furniture - Das Cane Art',
  description: 'Shop our outdoor collection including patio sets, outdoor sofas, garden benches, and weather-resistant furniture. Create your perfect outdoor space.',
  keywords: 'outdoor furniture, patio sets, garden furniture, outdoor dining, lounge chairs',
};

// Mock product data for outdoor
const outdoorProducts = [
  {
    id: 1,
    name: 'Patio Sets',
    slug: 'patio-sets',
    price: 35000,
    originalPrice: 42000,
    image: '/api/placeholder/400/300',
    category: 'Sets',
    badge: 'Complete',
    description: '6-piece patio set with table, chairs, and cushions'
  },
  {
    id: 2,
    name: 'Outdoor Sofas',
    slug: 'outdoor-sofas',
    price: 25000,
    originalPrice: 30000,
    image: '/api/placeholder/400/300',
    category: 'Seating',
    badge: 'Comfort',
    description: 'Weather-resistant 3-seater outdoor sofa with removable cushions'
  },
  {
    id: 3,
    name: 'Garden Benches',
    slug: 'garden-benches',
    price: 8000,
    originalPrice: 10000,
    image: '/api/placeholder/400/300',
    category: 'Seating',
    badge: 'Classic',
    description: 'Wooden garden bench with natural finish and weather protection'
  },
  {
    id: 4,
    name: 'Outdoor Dining',
    slug: 'outdoor-dining',
    price: 22000,
    originalPrice: 28000,
    image: '/api/placeholder/400/300',
    category: 'Dining',
    badge: 'Al Fresco',
    description: 'Outdoor dining table for 6 people with umbrella hole'
  },
  {
    id: 5,
    name: 'Lounge Chairs',
    slug: 'lounge-chairs',
    price: 6000,
    originalPrice: 7500,
    image: '/api/placeholder/400/300',
    category: 'Seating',
    badge: 'Relaxing',
    description: 'Adjustable lounge chairs with reclining back and armrests'
  },
  {
    id: 6,
    name: 'Outdoor Tables',
    slug: 'outdoor-tables',
    price: 10000,
    originalPrice: 12000,
    image: '/api/placeholder/400/300',
    category: 'Tables',
    badge: 'Versatile',
    description: 'Side tables and coffee tables for outdoor entertaining'
  },
  {
    id: 7,
    name: 'Umbrellas',
    slug: 'umbrellas',
    price: 4000,
    originalPrice: 5000,
    image: '/api/placeholder/400/300',
    category: 'Shade',
    badge: 'Protection',
    description: 'Large outdoor umbrella with tilt and crank mechanism'
  },
  {
    id: 8,
    name: 'Planters',
    slug: 'planters',
    price: 3000,
    originalPrice: 4000,
    image: '/api/placeholder/400/300',
    category: 'Garden',
    badge: 'Green',
    description: 'Decorative planters in various sizes and styles'
  }
];

export default function OutdoorPage() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-orange-50 to-white">
      {/* Hero Section */}
      <div className="relative bg-gradient-to-r from-orange-100 via-amber-50 to-orange-100 py-16 px-4">
        <div className="max-w-7xl mx-auto text-center">
          <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
            <span className="text-orange-600">Outdoor</span> Furniture
          </h1>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Transform your outdoor space into a beautiful retreat with our weather-resistant furniture designed for comfort and durability.
          </p>
        </div>
      </div>

      {/* Category Navigation */}
      <div className="max-w-7xl mx-auto px-4 py-8">
        <div className="flex flex-wrap gap-3 justify-center">
          {['All', 'Sets', 'Seating', 'Dining', 'Tables', 'Shade', 'Garden'].map((category) => (
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
          {outdoorProducts.map((product) => (
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

      {/* Outdoor Living Tips Section */}
      <div className="bg-gradient-to-r from-orange-100 to-amber-100 py-16 px-4 mt-16">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-3xl font-bold text-center text-gray-900 mb-12">
            Outdoor Living Ideas
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="text-center">
              <div className="w-16 h-16 bg-orange-500 rounded-full flex items-center justify-center mx-auto mb-4">
                <Heart className="w-8 h-8 text-white" />
              </div>
              <h3 className="text-xl font-semibold mb-2">Weather Ready</h3>
              <p className="text-gray-600">Choose weather-resistant materials for year-round enjoyment</p>
            </div>
            <div className="text-center">
              <div className="w-16 h-16 bg-orange-500 rounded-full flex items-center justify-center mx-auto mb-4">
                <ShoppingBag className="w-8 h-8 text-white" />
              </div>
              <h3 className="text-xl font-semibold mb-2">Comfort Zones</h3>
              <p className="text-gray-600">Create different areas for dining, lounging, and entertaining</p>
            </div>
            <div className="text-center">
              <div className="w-16 h-16 bg-orange-500 rounded-full flex items-center justify-center mx-auto mb-4">
                <Eye className="w-8 h-8 text-white" />
              </div>
              <h3 className="text-xl font-semibold mb-2">Natural Elements</h3>
              <p className="text-gray-600">Incorporate plants and natural materials for harmony</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
