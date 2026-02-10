'use client';

import { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { Heart, ShoppingBag, Eye } from 'lucide-react';
import { useWishlist } from '@/state/wishlist';
import { useCart } from '@/state/cart';
import QuickViewModal from '@/components/catalog/QuickViewModal';

// Mock product data for clearance sale
const clearanceProducts = [
  {
    id: '1',
    name: 'Clearance Sofa Set',
    slug: 'clearance-sofa-set',
    price: 25000,
    originalPrice: 45000,
    image: '/api/placeholder/400/300',
    category: 'Living Room',
    badge: 'Limited Stock',
    description: 'Modern 3-seater sofa with premium fabric at clearance price - limited quantities available',
    variants: [{ id: 'default-1', title: 'Default', price: { amount: 25000, currency: 'INR' }, available: true }]
  },
  {
    id: '2',
    name: 'Dining Table Deal',
    slug: 'dining-table-deal',
    price: 18000,
    originalPrice: 35000,
    image: '/api/placeholder/400/300',
    category: 'Dining Room',
    badge: 'Final Sale',
    description: 'Solid wood dining table for 6 people - end of season clearance special',
    variants: [{ id: 'default-2', title: 'Default', price: { amount: 18000, currency: 'INR' }, available: true }]
  },
  {
    id: '3',
    name: 'Bedroom Wardrobe',
    slug: 'bedroom-wardrobe',
    price: 12000,
    originalPrice: 28000,
    image: '/api/placeholder/400/300',
    category: 'Bedroom',
    badge: '50% OFF',
    description: '3-door wardrobe with mirror - discontinued model clearance',
    variants: [{ id: 'default-3', title: 'Default', price: { amount: 12000, currency: 'INR' }, available: true }]
  },
  {
    id: '4',
    name: 'Office Chair Special',
    slug: 'office-chair-special',
    price: 4500,
    originalPrice: 15000,
    image: '/api/placeholder/400/300',
    category: 'Office',
    badge: 'Hot Deal',
    description: 'Ergonomic office chair with lumbar support - overstock clearance',
    variants: [{ id: 'default-4', title: 'Default', price: { amount: 4500, currency: 'INR' }, available: true }]
  },
  {
    id: '5',
    name: 'Coffee Table Discount',
    slug: 'coffee-table-discount',
    price: 6000,
    originalPrice: 12000,
    image: '/api/placeholder/400/300',
    category: 'Living Room',
    badge: 'Clearance',
    description: 'Glass top coffee table with wooden base - floor model clearance',
    variants: [{ id: 'default-5', title: 'Default', price: { amount: 6000, currency: 'INR' }, available: true }]
  },
  {
    id: '6',
    name: 'Bookshelf Sale',
    slug: 'bookshelf-sale',
    price: 4000,
    originalPrice: 8000,
    image: '/api/placeholder/400/300',
    category: 'Living Room',
    badge: '50% OFF',
    description: '5-tier wooden bookshelf - minor cosmetic imperfections',
    variants: [{ id: 'default-6', title: 'Default', price: { amount: 4000, currency: 'INR' }, available: true }]
  },
  {
    id: '7',
    name: 'TV Stand Clearance',
    slug: 'tv-stand-clearance',
    price: 8000,
    originalPrice: 18000,
    image: '/api/placeholder/400/300',
    category: 'Living Room',
    badge: 'Final Stock',
    description: 'Modern TV stand with storage - discontinued model',
    variants: [{ id: 'default-7', title: 'Default', price: { amount: 8000, currency: 'INR' }, available: true }]
  },
  {
    id: '8',
    name: 'Side Table Deal',
    slug: 'side-table-deal',
    price: 2000,
    originalPrice: 6000,
    image: '/api/placeholder/400/300',
    category: 'Living Room',
    badge: '66% OFF',
    description: 'Set of 2 nesting side tables - display model clearance',
    variants: [{ id: 'default-8', title: 'Default', price: { amount: 2000, currency: 'INR' }, available: true }]
  },
  {
    id: '9',
    name: 'Bar Cabinet Special',
    slug: 'bar-cabinet-special',
    price: 10000,
    originalPrice: 22000,
    image: '/api/placeholder/400/300',
    category: 'Dining Room',
    badge: 'Limited',
    description: 'Elegant bar cabinet with glass doors - showroom sample',
    variants: [{ id: 'default-9', title: 'Default', price: { amount: 10000, currency: 'INR' }, available: true }]
  },
  {
    id: '10',
    name: 'Ottoman Clearance',
    slug: 'ottoman-clearance',
    price: 2500,
    originalPrice: 7500,
    image: '/api/placeholder/400/300',
    category: 'Living Room',
    badge: 'Hot Deal',
    description: 'Storage ottoman with cushion top - overstock item',
    variants: [{ id: 'default-10', title: 'Default', price: { amount: 2500, currency: 'INR' }, available: true }]
  },
  {
    id: '11',
    name: 'Mirror Discount',
    slug: 'mirror-discount',
    price: 1500,
    originalPrice: 5000,
    image: '/api/placeholder/400/300',
    category: 'Decor',
    badge: '70% OFF',
    description: 'Decorative wall mirror with ornate frame - minor scratches',
    variants: [{ id: 'default-11', title: 'Default', price: { amount: 1500, currency: 'INR' }, available: true }]
  },
  {
    id: '12',
    name: 'Console Table Sale',
    slug: 'console-table-sale',
    price: 5500,
    originalPrice: 11000,
    image: '/api/placeholder/400/300',
    category: 'Living Room',
    badge: 'Final Sale',
    description: 'Entryway console table with drawers - discontinued color',
    variants: [{ id: 'default-12', title: 'Default', price: { amount: 5500, currency: 'INR' }, available: true }]
  }
];

export default function ClearanceSalePage() {
  const { addItem, removeItem, isInWishlist } = useWishlist();
  const { addItem: addToCart } = useCart();
  const [selectedProduct, setSelectedProduct] = useState<any>(null);
  const [isQuickViewOpen, setIsQuickViewOpen] = useState(false);
  const [addedProducts, setAddedProducts] = useState<Set<string>>(new Set());

  const handleWishlistToggle = (product: any) => {
    const variant = product.variants[0];
    if (isInWishlist(product.id, variant.id)) {
      removeItem(product.id, variant.id);
    } else {
      addItem(product, variant);
    }
  };

  const handleAddToCart = (product: any) => {
    const variant = product.variants[0];
    addToCart(product, variant, 1);
    
    // Show added feedback
    setAddedProducts(prev => new Set(prev).add(product.id));
    setTimeout(() => {
      setAddedProducts(prev => {
        const newSet = new Set(prev);
        newSet.delete(product.id);
        return newSet;
      });
    }, 2000);
  };

  const handleQuickView = (product: any) => {
    setSelectedProduct(product);
    setIsQuickViewOpen(true);
  };

  const handleCloseQuickView = () => {
    setIsQuickViewOpen(false);
    setSelectedProduct(null);
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-red-50 to-white">
      {/* Hero Section */}
      <div className="relative bg-gradient-to-r from-red-100 via-pink-50 to-red-100 py-16 px-4">
        <div className="max-w-7xl mx-auto text-center">
          <div className="mb-6">
            <span className="inline-block bg-red-600 text-white px-4 py-2 rounded-full text-lg font-bold animate-pulse">
              LIMITED TIME OFFER
            </span>
          </div>
          <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
            Clearance <span className="text-red-600">Sale</span>
          </h1>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Massive discounts on premium furniture! Final clearance on selected items - up to 70% off. Limited stock available, grab these deals before they're gone forever!
          </p>
          <div className="mt-6 flex justify-center gap-4">
            <div className="text-center">
              <div className="text-3xl font-bold text-red-600">70%</div>
              <div className="text-sm text-gray-600">MAX DISCOUNT</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-red-600">12</div>
              <div className="text-sm text-gray-600">ITEMS LEFT</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-red-600">48H</div>
              <div className="text-sm text-gray-600">TIME LEFT</div>
            </div>
          </div>
        </div>
      </div>

      {/* Urgency Banner */}
      <div className="bg-red-600 text-white py-3 px-4">
        <div className="max-w-7xl mx-auto text-center">
          <p className="font-semibold">
            ⚡ FLASH SALE: Additional 10% OFF on all clearance items! Use code: CLEARANCE10 ⚡
          </p>
        </div>
      </div>

      {/* Products Grid */}
      <div className="max-w-7xl mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {clearanceProducts.map((product) => (
            <div key={product.id} className="group relative bg-white rounded-lg shadow-md hover:shadow-xl transition-all duration-300 overflow-hidden border-2 border-red-200">
              {/* Clearance Badge */}
              <div className="absolute top-4 left-4 z-10 bg-red-600 text-white px-3 py-1 rounded-full text-sm font-bold animate-pulse">
                {product.badge}
              </div>
              
              {/* Discount Percentage */}
              <div className="absolute top-4 right-4 z-10 bg-yellow-400 text-gray-900 px-2 py-1 rounded text-xs font-bold">
                {Math.round(((product.originalPrice - product.price) / product.originalPrice) * 100)}% OFF
              </div>
              
              {/* Quick Actions */}
              <div className="absolute top-16 right-4 z-10 flex flex-col gap-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                <button 
                  onClick={() => handleWishlistToggle(product)}
                  className="bg-white p-2 rounded-full shadow-md hover:bg-red-50 transition-colors duration-200"
                  title="Add to wishlist"
                >
                  <Heart className="w-4 h-4 text-gray-600 hover:text-red-500" />
                </button>
                <button 
                  onClick={() => handleQuickView(product)}
                  className="bg-white p-2 rounded-full shadow-md hover:bg-red-50 transition-colors duration-200"
                  title="Quick View"
                >
                  <Eye className="w-4 h-4 text-gray-600 hover:text-red-500" />
                </button>
              </div>

              {/* Product Image */}
              <div className="relative aspect-[4/3] overflow-hidden bg-gray-100">
                <Image
                  src={product.image}
                  alt={product.name}
                  fill
                  className="object-cover group-hover:scale-105 transition-transform duration-300"
                  onError={(e) => {
                    const target = e.target as HTMLImageElement;
                    target.onerror = null;
                    target.src = `data:image/svg+xml,%3Csvg width='400' height='300' xmlns='http://www.w3.org/2000/svg'%3E%3Crect width='100%25' height='100%25' fill='%23f3f4f6'/%3E%3Ctext x='50%25' y='50%25' font-family='Arial' font-size='16' fill='%239ca3af' text-anchor='middle' dy='.3em'%3E${product.name}%3C/text%3E%3C/svg%3E`;
                  }}
                />
                {/* Stock Warning */}
                <div className="absolute bottom-2 left-2 bg-orange-500 text-white px-2 py-1 rounded text-xs font-semibold">
                  Only 2 left!
                </div>
              </div>

              {/* Product Info */}
              <div className="p-4">
                <div className="mb-2">
                  <span className="text-xs text-red-600 font-medium uppercase tracking-wide">
                    {product.category}
                  </span>
                </div>
                
                <h3 className="text-lg font-semibold text-gray-900 mb-2 line-clamp-2 group-hover:text-red-600 transition-colors duration-200">
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
                    <span className="text-xl font-bold text-red-600">
                      ₹{product.price.toLocaleString()}
                    </span>
                    <span className="text-sm text-gray-500 line-through">
                      ₹{product.originalPrice.toLocaleString()}
                    </span>
                  </div>
                  <span className="text-xs bg-red-100 text-red-600 px-2 py-1 rounded-full font-semibold">
                    Save ₹{(product.originalPrice - product.price).toLocaleString()}
                  </span>
                </div>

                {/* Add to Cart Button */}
                <button 
                  onClick={() => handleAddToCart(product)}
                  className="w-full bg-red-600 text-white py-2 px-4 rounded-lg hover:bg-red-700 transition-colors duration-200 flex items-center justify-center gap-2 group-hover:bg-red-700 font-semibold"
                >
                  <ShoppingBag className="w-4 h-4" />
                  {addedProducts.has(product.id) ? 'Added to Cart!' : 'Grab This Deal'}
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Sale Terms */}
      <div className="bg-gray-100 py-8 px-4 mt-8">
        <div className="max-w-4xl mx-auto">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Clearance Sale Terms:</h3>
          <ul className="text-sm text-gray-600 space-y-2">
            <li>• All clearance items are final sale - no returns or exchanges</li>
            <li>• Limited stock available - first come, first served</li>
            <li>• Additional 10% off with code: CLEARANCE10 (valid for 48 hours only)</li>
            <li>• Delivery charges apply as per standard rates</li>
            <li>• Items may have minor cosmetic imperfections</li>
          </ul>
        </div>
      </div>

      {/* Quick View Modal */}
      <QuickViewModal
        product={selectedProduct}
        isOpen={isQuickViewOpen}
        onClose={handleCloseQuickView}
      />
    </div>
  );
}
