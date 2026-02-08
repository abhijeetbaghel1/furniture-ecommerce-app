'use client';

import Image from 'next/image';
import Link from 'next/link';
import { Heart, ShoppingBag, Eye } from 'lucide-react';
import { useWishlist } from '@/state/wishlist';

// Mock product data for furniture collection
const furnitureProducts = [
  {
    id: '1',
    title: 'Modern Sectional Sofa',
    handle: 'modern-sectional-sofa',
    price: 65000,
    originalPrice: 75000,
    image: '/api/placeholder/400/300',
    category: 'Living Room',
    badge: 'Bestseller',
    description: 'Contemporary L-shaped sectional sofa with premium fabric upholstery and chaise lounge',
    variants: [{ id: 'default-1', title: 'Default', price: { amount: 65000, currency: 'INR' }, available: true }]
  },
  {
    id: '2',
    title: 'Luxury King Size Bed',
    handle: 'luxury-king-bed',
    price: 45000,
    originalPrice: 55000,
    image: '/api/placeholder/400/300',
    category: 'Bedroom',
    badge: 'Premium',
    description: 'Solid wood king size bed with upholstered headboard and storage drawers',
    variants: [{ id: 'default-2', title: 'Default', price: { amount: 45000, currency: 'INR' }, available: true }]
  },
  {
    id: '3',
    title: 'Executive Office Desk',
    handle: 'executive-office-desk',
    price: 25000,
    originalPrice: 30000,
    image: '/api/placeholder/400/300',
    category: 'Office',
    badge: 'Popular',
    description: 'Spacious executive desk with built-in cable management and drawer storage',
    variants: [{ id: 'default-3', title: 'Default', price: { amount: 25000, currency: 'INR' }, available: true }]
  },
  {
    id: '4',
    title: 'Glass Dining Table Set',
    handle: 'glass-dining-set',
    price: 35000,
    originalPrice: 42000,
    image: '/api/placeholder/400/300',
    category: 'Dining Room',
    badge: 'New',
    description: 'Modern glass top dining table with 6 matching chairs and chrome legs',
    variants: [{ id: 'default-4', title: 'Default', price: { amount: 35000, currency: 'INR' }, available: true }]
  },
  {
    id: '5',
    title: 'Recliner Armchair',
    handle: 'recliner-armchair',
    price: 18000,
    originalPrice: 22000,
    image: '/api/placeholder/400/300',
    category: 'Living Room',
    badge: 'Comfort',
    description: 'Plush recliner armchair with multiple reclining positions and cup holder',
    variants: [{ id: 'default-5', title: 'Default', price: { amount: 18000, currency: 'INR' }, available: true }]
  },
  {
    id: '6',
    title: 'Wardrobe with Mirror',
    handle: 'wardrobe-mirror',
    price: 28000,
    originalPrice: 32000,
    image: '/api/placeholder/400/300',
    category: 'Bedroom',
    badge: 'Storage',
    description: '3-door wooden wardrobe with built-in mirror and internal organizers',
    variants: [{ id: 'default-6', title: 'Default', price: { amount: 28000, currency: 'INR' }, available: true }]
  },
  {
    id: '7',
    title: 'Outdoor Patio Set',
    handle: 'outdoor-patio-set',
    price: 32000,
    originalPrice: 38000,
    image: '/api/placeholder/400/300',
    category: 'Outdoor',
    badge: 'Weatherproof',
    description: '4-piece outdoor patio set with table and chairs, weather-resistant materials',
    variants: [{ id: 'default-7', title: 'Default', price: { amount: 32000, currency: 'INR' }, available: true }]
  },
  {
    id: '8',
    title: 'Crystal Chandelier',
    handle: 'crystal-chandelier',
    price: 15000,
    originalPrice: 18000,
    image: '/api/placeholder/400/300',
    category: 'Lighting',
    badge: 'Elegant',
    description: 'Elegant crystal chandelier with LED lighting and adjustable brightness',
    variants: [{ id: 'default-8', title: 'Default', price: { amount: 15000, currency: 'INR' }, available: true }]
  },
  {
    id: '9',
    title: 'Coffee Table Set',
    handle: 'coffee-table-set',
    price: 12000,
    originalPrice: 15000,
    image: '/api/placeholder/400/300',
    category: 'Living Room',
    badge: 'Set',
    description: 'Modern coffee table with matching side tables and storage compartments',
    variants: [{ id: 'default-9', title: 'Default', price: { amount: 12000, currency: 'INR' }, available: true }]
  },
  {
    id: '10',
    title: 'Bookshelf Cabinet',
    handle: 'bookshelf-cabinet',
    price: 8000,
    originalPrice: 10000,
    image: '/api/placeholder/400/300',
    category: 'Living Room',
    badge: 'Storage',
    description: '5-tier wooden bookshelf with cabinet doors and adjustable shelves',
    variants: [{ id: 'default-10', title: 'Default', price: { amount: 8000, currency: 'INR' }, available: true }]
  },
  {
    id: '11',
    title: 'Bar Cabinet',
    handle: 'bar-cabinet',
    price: 22000,
    originalPrice: 26000,
    image: '/api/placeholder/400/300',
    category: 'Dining Room',
    badge: 'Entertainment',
    description: 'Stylish bar cabinet with wine rack, glass holders, and storage shelves',
    variants: [{ id: 'default-11', title: 'Default', price: { amount: 22000, currency: 'INR' }, available: true }]
  },
  {
    id: '12',
    title: 'TV Stand Unit',
    handle: 'tv-stand-unit',
    price: 9000,
    originalPrice: 11000,
    image: '/api/placeholder/400/300',
    category: 'Living Room',
    badge: 'Media',
    description: 'Modern TV stand with cable management, glass shelves, and storage drawers',
    variants: [{ id: 'default-12', title: 'Default', price: { amount: 9000, currency: 'INR' }, available: true }]
  }
];

export default function FurniturePage() {
  const { addItem, removeItem, isInWishlist } = useWishlist();

  const handleWishlistToggle = (product: any) => {
    const variant = product.variants[0];
    if (isInWishlist(product.id, variant.id)) {
      removeItem(product.id, variant.id);
    } else {
      addItem(product, variant);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-orange-50 to-white">
      {/* Hero Section */}
      <div className="relative bg-gradient-to-r from-orange-100 via-amber-50 to-orange-100 py-16 px-4">
        <div className="max-w-7xl mx-auto text-center">
          <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
            Furniture <span className="text-orange-600">Collection</span>
          </h1>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Discover our complete furniture collection featuring premium pieces for every room. From living room sofas to bedroom sets, find everything you need to transform your space.
          </p>
        </div>
      </div>

      {/* Products Grid */}
      <div className="max-w-7xl mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {furnitureProducts.map((product) => {
            const variant = product.variants[0];
            const inWishlist = isInWishlist(product.id, variant.id);
            
            return (
              <div key={product.id} className="group relative bg-white rounded-lg shadow-md hover:shadow-xl transition-all duration-300 overflow-hidden">
                {/* Product Badge */}
                {product.badge && (
                  <div className="absolute top-4 left-4 z-10 bg-orange-500 text-white px-3 py-1 rounded-full text-sm font-semibold">
                    {product.badge}
                  </div>
                )}
                
                {/* Quick Actions */}
                <div className="absolute top-4 right-4 z-10 flex flex-col gap-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                  <button 
                    onClick={() => handleWishlistToggle(product)}
                    className="bg-white p-2 rounded-full shadow-md hover:bg-orange-50 transition-colors duration-200"
                    title={inWishlist ? 'Remove from wishlist' : 'Add to wishlist'}
                  >
                    <Heart 
                      className={`w-4 h-4 transition-colors duration-200 ${
                        inWishlist ? 'text-red-500 fill-current' : 'text-gray-600 hover:text-red-500'
                      }`} 
                    />
                  </button>
                  <button className="bg-white p-2 rounded-full shadow-md hover:bg-orange-50 transition-colors duration-200">
                    <Eye className="w-4 h-4 text-gray-600 hover:text-orange-500" />
                  </button>
                </div>

                {/* Product Image */}
                <div className="relative aspect-[4/3] overflow-hidden bg-gray-100">
                  <Image
                    src={product.image}
                    alt={product.title}
                    fill
                    className="object-cover group-hover:scale-105 transition-transform duration-300"
                    onError={(e) => {
                      const target = e.target as HTMLImageElement;
                      target.onerror = null;
                      target.src = `data:image/svg+xml,%3Csvg width='400' height='300' xmlns='http://www.w3.org/2000/svg'%3E%3Crect width='100%25' height='100%25' fill='%23f3f4f6'/%3E%3Ctext x='50%25' y='50%25' font-family='Arial' font-size='16' fill='%239ca3af' text-anchor='middle' dy='.3em'%3E${product.title}%3C/text%3E%3C/svg%3E`;
                    }}
                  />
                </div>

                {/* Product Info */}
                <div className="p-4">
                  <div className="mb-2">
                    <span className="text-xs text-orange-600 font-medium uppercase tracking-wide">
                      {product.category}
                    </span>
                  </div>
                  <h3 className="font-serif text-xl font-semibold text-gray-900 mb-2 group-hover:text-orange-600 transition-colors">
                    {product.title}
                  </h3>
                  <p className="text-gray-600 text-sm mb-3 line-clamp-2">
                    {product.description}
                  </p>
                  <div className="flex items-center justify-between mb-3">
                    <div>
                      <span className="text-xl font-bold text-gray-900">₹{product.price.toLocaleString()}</span>
                      {product.originalPrice && (
                        <span className="text-sm text-gray-500 line-through ml-2">
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
            );
          })}
        </div>
      </div>

      {/* Newsletter Section */}
      <div className="bg-gradient-to-r from-orange-100 to-amber-100 py-16 px-4 mt-16">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-3xl font-bold text-gray-900 mb-4">
            Complete Your Home with Our Furniture
          </h2>
          <p className="text-gray-600 mb-8">
            Subscribe to our newsletter and get exclusive offers on our complete furniture collection. Transform every room with style and comfort.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 max-w-md mx-auto">
            <input
              type="email"
              placeholder="Enter your email"
              className="flex-1 px-4 py-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent"
            />
            <button className="bg-orange-500 text-white px-6 py-3 rounded-lg hover:bg-orange-600 transition-colors duration-200 font-semibold">
              Subscribe
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
