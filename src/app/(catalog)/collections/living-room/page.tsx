'use client';

import Image from 'next/image';
import Link from 'next/link';
import { Heart, ShoppingBag, Eye } from 'lucide-react';
import { useWishlist } from '@/state/wishlist';

// Mock product data for living room
const livingRoomProducts = [
  {
    id: 1,
    name: 'Sectional Sofas',
    slug: 'sectional-sofas',
    price: 75000,
    originalPrice: 85000,
    image: '/api/placeholder/400/300',
    category: 'Seating',
    badge: 'Popular',
    description: 'L-shaped sectional sofa with chaise lounge and storage'
  },
  {
    id: 2,
    name: 'Recliners',
    slug: 'recliners',
    price: 25000,
    originalPrice: 30000,
    image: '/api/placeholder/400/300',
    category: 'Seating',
    badge: 'Comfort',
    description: 'Power recliner with heated massage and USB charging'
  },
  {
    id: 3,
    name: 'Coffee Tables',
    slug: 'coffee-tables',
    price: 12000,
    originalPrice: 15000,
    image: '/api/placeholder/400/300',
    category: 'Tables',
    badge: 'Modern',
    description: 'Glass top coffee table with wooden base and storage shelf'
  },
  {
    id: 4,
    name: 'TV Units',
    slug: 'tv-units',
    price: 18000,
    originalPrice: 22000,
    image: '/api/placeholder/400/300',
    category: 'Storage',
    badge: 'Essential',
    description: 'Modern TV unit with drawers and open shelving'
  },
  {
    id: 5,
    name: 'Bookshelves',
    slug: 'bookshelves',
    price: 8000,
    originalPrice: 10000,
    image: '/api/placeholder/400/300',
    category: 'Storage',
    badge: 'Organized',
    description: '5-tier wooden bookshelf with adjustable shelves'
  },
  {
    id: 6,
    name: 'Console Tables',
    slug: 'console-tables',
    price: 9000,
    originalPrice: 11000,
    image: '/api/placeholder/400/300',
    category: 'Tables',
    badge: 'Stylish',
    description: 'Narrow console table for entryway or behind sofa'
  },
  {
    id: 7,
    name: 'Side Tables',
    slug: 'side-tables',
    price: 4000,
    originalPrice: 5000,
    image: '/api/placeholder/400/300',
    category: 'Tables',
    badge: 'Versatile',
    description: 'Set of 2 matching side tables with modern design'
  },
  {
    id: 8,
    name: 'Display Cabinets',
    slug: 'display-cabinets',
    price: 15000,
    originalPrice: 18000,
    image: '/api/placeholder/400/300',
    category: 'Storage',
    badge: 'Elegant',
    description: 'Glass display cabinet with LED lighting and adjustable shelves'
  }
];

export default function LivingRoomPage() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-orange-50 to-white">
      {/* Hero Section */}
      <div className="relative bg-gradient-to-r from-orange-100 via-amber-50 to-orange-100 py-16 px-4">
        <div className="max-w-7xl mx-auto text-center">
          <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
            Living <span className="text-orange-600">Room</span>
          </h1>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Create your perfect living space with our curated collection of comfortable sofas, stylish tables, and smart storage solutions.
          </p>
        </div>
      </div>

      {/* Category Navigation */}
      <div className="max-w-7xl mx-auto px-4 py-8">
        <div className="flex flex-wrap gap-3 justify-center">
          {['All', 'Seating', 'Tables', 'Storage'].map((category) => (
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
          {livingRoomProducts.map((product) => (
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

      {/* Room Inspiration Section */}
      <div className="bg-gradient-to-r from-orange-100 to-amber-100 py-16 px-4 mt-16">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-3xl font-bold text-center text-gray-900 mb-12">
            Living Room Inspiration
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="text-center">
              <div className="aspect-video bg-gray-200 rounded-lg mb-4"></div>
              <h3 className="text-xl font-semibold mb-2">Modern Minimalist</h3>
              <p className="text-gray-600">Clean lines and neutral colors for a contemporary look</p>
            </div>
            <div className="text-center">
              <div className="aspect-video bg-gray-200 rounded-lg mb-4"></div>
              <h3 className="text-xl font-semibold mb-2">Cozy Traditional</h3>
              <p className="text-gray-600">Warm woods and comfortable seating for family time</p>
            </div>
            <div className="text-center">
              <div className="aspect-video bg-gray-200 rounded-lg mb-4"></div>
              <h3 className="text-xl font-semibold mb-2">Luxury Glam</h3>
              <p className="text-gray-600">Elegant pieces with metallic accents and rich fabrics</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
