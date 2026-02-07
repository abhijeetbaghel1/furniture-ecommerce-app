'use client';

import Image from 'next/image';
import Link from 'next/link';
import { Heart, ShoppingBag, Eye } from 'lucide-react';
import { useWishlist } from '@/state/wishlist';

// Mock product data for office
const officeProducts = [
  {
    id: 1,
    name: 'Executive Desks',
    slug: 'executive-desks',
    price: 25000,
    originalPrice: 30000,
    image: '/api/placeholder/400/300',
    category: 'Desks',
    badge: 'Premium',
    description: 'Large executive desk with drawers and cable management system'
  },
  {
    id: 2,
    name: 'Office Chairs',
    slug: 'office-chairs',
    price: 12000,
    originalPrice: 15000,
    image: '/api/placeholder/400/300',
    category: 'Seating',
    badge: 'Ergonomic',
    description: 'High-back office chair with lumbar support and adjustable height'
  },
  {
    id: 3,
    name: 'Bookcases',
    slug: 'bookcases',
    price: 8000,
    originalPrice: 10000,
    image: '/api/placeholder/400/300',
    category: 'Storage',
    badge: 'Organized',
    description: '5-shelf bookcase with adjustable height and sturdy construction'
  },
  {
    id: 4,
    name: 'Filing Cabinets',
    slug: 'filing-cabinets',
    price: 6000,
    originalPrice: 7500,
    image: '/api/placeholder/400/300',
    category: 'Storage',
    badge: 'Professional',
    description: '3-drawer filing cabinet with lock and smooth glide drawers'
  },
  {
    id: 5,
    name: 'Conference Tables',
    slug: 'conference-tables',
    price: 35000,
    originalPrice: 42000,
    image: '/api/placeholder/400/300',
    category: 'Tables',
    badge: 'Meeting',
    description: 'Large conference table for 8-10 people with power outlets'
  },
  {
    id: 6,
    name: 'Office Storage',
    slug: 'storage',
    price: 10000,
    originalPrice: 12000,
    image: '/api/placeholder/400/300',
    category: 'Storage',
    badge: 'Versatile',
    description: 'Multi-purpose storage cabinet with shelves and compartments'
  },
  {
    id: 7,
    name: 'Reception Desks',
    slug: 'reception-desks',
    price: 20000,
    originalPrice: 25000,
    image: '/api/placeholder/400/300',
    category: 'Desks',
    badge: 'Welcome',
    description: 'Modern reception desk with storage and professional appearance'
  },
  {
    id: 8,
    name: 'Office Sofas',
    slug: 'office-sofas',
    price: 18000,
    originalPrice: 22000,
    image: '/api/placeholder/400/300',
    category: 'Seating',
    badge: 'Comfort',
    description: 'Comfortable 2-seater sofa for reception or lounge areas'
  }
];

export default function OfficePage() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-orange-50 to-white">
      {/* Hero Section */}
      <div className="relative bg-gradient-to-r from-orange-100 via-amber-50 to-orange-100 py-16 px-4">
        <div className="max-w-7xl mx-auto text-center">
          <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
            <span className="text-orange-600">Office</span> Furniture
          </h1>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Create a productive and comfortable workspace with our collection of ergonomic chairs, spacious desks, and smart storage solutions.
          </p>
        </div>
      </div>

      {/* Category Navigation */}
      <div className="max-w-7xl mx-auto px-4 py-8">
        <div className="flex flex-wrap gap-3 justify-center">
          {['All', 'Desks', 'Seating', 'Storage', 'Tables'].map((category) => (
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
          {officeProducts.map((product) => (
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

      {/* Workspace Tips Section */}
      <div className="bg-gradient-to-r from-orange-100 to-amber-100 py-16 px-4 mt-16">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-3xl font-bold text-center text-gray-900 mb-12">
            Workspace Optimization Tips
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="text-center">
              <div className="w-16 h-16 bg-orange-500 rounded-full flex items-center justify-center mx-auto mb-4">
                <Heart className="w-8 h-8 text-white" />
              </div>
              <h3 className="text-xl font-semibold mb-2">Ergonomics First</h3>
              <p className="text-gray-600">Choose adjustable chairs and desks for proper posture and comfort</p>
            </div>
            <div className="text-center">
              <div className="w-16 h-16 bg-orange-500 rounded-full flex items-center justify-center mx-auto mb-4">
                <ShoppingBag className="w-8 h-8 text-white" />
              </div>
              <h3 className="text-xl font-semibold mb-2">Smart Storage</h3>
              <p className="text-gray-600">Keep your workspace organized with efficient storage solutions</p>
            </div>
            <div className="text-center">
              <div className="w-16 h-16 bg-orange-500 rounded-full flex items-center justify-center mx-auto mb-4">
                <Eye className="w-8 h-8 text-white" />
              </div>
              <h3 className="text-xl font-semibold mb-2">Good Lighting</h3>
              <p className="text-gray-600">Ensure proper lighting to reduce eye strain and boost productivity</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
