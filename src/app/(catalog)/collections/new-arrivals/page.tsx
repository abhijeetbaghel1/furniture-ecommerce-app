'use client';

import Image from 'next/image';
import Link from 'next/link';
import { Heart, ShoppingBag, Eye } from 'lucide-react';
import { useWishlist } from '@/state/wishlist';

// Mock product data for new arrivals
const newArrivalsProducts = [
  {
    id: '1',
    title: 'Modern Sofa Set',
    handle: 'modern-sofa-set',
    price: 45000,
    originalPrice: 55000,
    image: '/api/placeholder/400/300',
    category: 'Living Room',
    badge: 'New',
    description: 'Contemporary 3-seater sofa with premium fabric upholstery and wooden legs',
    variants: [{ id: 'default-1', title: 'Default', price: { amount: 45000, currency: 'INR' }, available: true }]
  },
  {
    id: '2',
    title: 'Luxury Dining Table',
    handle: 'luxury-dining-table',
    price: 35000,
    originalPrice: 42000,
    image: '/api/placeholder/400/300',
    category: 'Dining Room',
    badge: 'New',
    description: 'Solid wood dining table for 6 people with elegant finish',
    variants: [{ id: 'default-2', title: 'Default', price: { amount: 35000, currency: 'INR' }, available: true }]
  },
  {
    id: '3',
    title: 'Designer Coffee Table',
    handle: 'designer-coffee-table',
    price: 12000,
    originalPrice: 15000,
    image: '/api/placeholder/400/300',
    category: 'Living Room',
    badge: 'New',
    description: 'Modern coffee table with glass top and metal frame',
    variants: [{ id: 'default-3', title: 'Default', price: { amount: 12000, currency: 'INR' }, available: true }]
  },
  {
    id: '4',
    title: 'Elegant Wardrobe',
    handle: 'elegant-wardrobe',
    price: 28000,
    originalPrice: 32000,
    image: '/api/placeholder/400/300',
    category: 'Bedroom',
    badge: 'New',
    description: 'Spacious 3-door wardrobe with mirror and internal organizers',
    variants: [{ id: 'default-4', title: 'Default', price: { amount: 28000, currency: 'INR' }, available: true }]
  },
  {
    id: '5',
    title: 'Stylish Bookshelf',
    handle: 'stylish-bookshelf',
    price: 8000,
    originalPrice: 10000,
    image: '/api/placeholder/400/300',
    category: 'Living Room',
    badge: 'New',
    description: '5-tier wooden bookshelf with modern design',
    variants: [{ id: 'default-5', title: 'Default', price: { amount: 8000, currency: 'INR' }, available: true }]
  },
  {
    id: '6',
    title: 'Premium Ottoman',
    handle: 'premium-ottoman',
    price: 6000,
    originalPrice: 7500,
    image: '/api/placeholder/400/300',
    category: 'Living Room',
    badge: 'New',
    description: 'Comfortable ottoman with storage compartment',
    variants: [{ id: 'default-6', title: 'Default', price: { amount: 6000, currency: 'INR' }, available: true }]
  },
  {
    id: '7',
    title: 'Contemporary Mirror',
    handle: 'contemporary-mirror',
    price: 4000,
    originalPrice: 5000,
    image: '/api/placeholder/400/300',
    category: 'Decor',
    badge: 'New',
    description: 'Modern wall mirror with decorative frame',
    variants: [{ id: 'default-7', title: 'Default', price: { amount: 4000, currency: 'INR' }, available: true }]
  },
  {
    id: '8',
    title: 'Designer Console',
    handle: 'designer-console',
    price: 9000,
    originalPrice: 11000,
    image: '/api/placeholder/400/300',
    category: 'Living Room',
    badge: 'New',
    description: 'Elegant console table for entryway or living room',
    variants: [{ id: 'default-8', title: 'Default', price: { amount: 9000, currency: 'INR' }, available: true }]
  },
  {
    id: '9',
    title: 'Executive Office Chair',
    handle: 'executive-office-chair',
    price: 15000,
    originalPrice: 18000,
    image: '/api/placeholder/400/300',
    category: 'Office',
    badge: 'New',
    description: 'High-back executive chair with lumbar support',
    variants: [{ id: 'default-9', title: 'Default', price: { amount: 15000, currency: 'INR' }, available: true }]
  },
  {
    id: '10',
    title: 'King Size Bed Frame',
    handle: 'king-size-bed-frame',
    price: 22000,
    originalPrice: 26000,
    image: '/api/placeholder/400/300',
    category: 'Bedroom',
    badge: 'New',
    description: 'Luxurious king size bed with upholstered headboard',
    variants: [{ id: 'default-10', title: 'Default', price: { amount: 22000, currency: 'INR' }, available: true }]
  },
  {
    id: '11',
    title: 'Outdoor Patio Set',
    handle: 'outdoor-patio-set',
    price: 18000,
    originalPrice: 22000,
    image: '/api/placeholder/400/300',
    category: 'Outdoor',
    badge: 'New',
    description: '4-piece outdoor patio set with weather-resistant materials',
    variants: [{ id: 'default-11', title: 'Default', price: { amount: 18000, currency: 'INR' }, available: true }]
  },
  {
    id: '12',
    title: 'Crystal Chandelier',
    handle: 'crystal-chandelier',
    price: 12000,
    originalPrice: 15000,
    image: '/api/placeholder/400/300',
    category: 'Lighting',
    badge: 'New',
    description: 'Elegant crystal chandelier with LED lighting',
    variants: [{ id: 'default-12', title: 'Default', price: { amount: 12000, currency: 'INR' }, available: true }]
  }
];

export default function NewArrivalsPage() {
  const { addItem, removeItem, isInWishlist } = useWishlist();

  const handleWishlistToggle = (product: any) => {
    const variant = product.variants[0];
    if (isInWishlist(product.id, variant.id)) {
      removeItem(product.id, variant.id);
    } else {
      addItem(product, variant);
    }
  };

  // Debug: Log products to verify they exist
  console.log('New Arrivals Products:', newArrivalsProducts.length);

  return (
    <div className="min-h-screen bg-gradient-to-b from-orange-50 to-white">
      {/* Hero Section */}
      <div className="relative bg-gradient-to-r from-orange-100 via-amber-50 to-orange-100 py-16 px-4">
        <div className="max-w-7xl mx-auto text-center">
          <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
            New <span className="text-orange-600">Arrivals</span>
          </h1>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Discover our latest collection of premium furniture pieces. Each item is carefully selected to bring style, comfort, and elegance to your home.
          </p>
        </div>
      </div>

      {/* Products Grid */}
      <div className="max-w-7xl mx-auto px-4 py-12">
        <div className="mb-4 text-center">
          <p className="text-lg text-gray-600">Showing {newArrivalsProducts.length} products</p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {newArrivalsProducts.map((product) => {
            const variant = product.variants[0];
            const inWishlist = isInWishlist(product.id, variant.id);
            
            return (
              <div key={product.id} className="group relative bg-white rounded-lg shadow-md hover:shadow-xl transition-all duration-300 overflow-hidden border border-gray-200">
                {/* Debug Info */}
                <div className="absolute top-0 left-0 bg-red-500 text-white text-xs px-1 z-20">
                  {product.id}
                </div>
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
                  
                  <h3 className="text-lg font-semibold text-gray-900 mb-2 line-clamp-2 group-hover:text-orange-600 transition-colors duration-200">
                    <Link href={`/products/${product.handle}`}>
                      {product.title}
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
            );
          })}
        </div>
      </div>

      {/* Newsletter Section */}
      <div className="bg-gradient-to-r from-orange-100 to-amber-100 py-16 px-4 mt-16">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-3xl font-bold text-gray-900 mb-4">
            Stay Updated with New Arrivals
          </h2>
          <p className="text-gray-600 mb-8">
            Subscribe to our newsletter and be first to know about new products, exclusive offers, and design tips.
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
