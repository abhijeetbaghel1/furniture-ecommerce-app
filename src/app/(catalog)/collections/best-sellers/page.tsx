'use client';

import { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { Heart, ShoppingBag, Eye, Star } from 'lucide-react';
import { useWishlist } from '@/state/wishlist';
import { useCart } from '@/state/cart';
import QuickViewModal from '@/components/catalog/QuickViewModal';
import { formatPrice, calculateDiscount } from '@/lib/utils/price';

// Mock product data for best sellers
const bestSellersProducts = [
  {
    id: '1',
    name: 'Classic Leather Sofa',
    slug: 'classic-leather-sofa',
    price: 65000,
    originalPrice: 75000,
    image: '/api/placeholder/400/300',
    category: 'Living Room',
    badge: 'Best Seller',
    rating: 4.8,
    reviews: 234,
    description: 'Premium leather 3-seater sofa with classic design and superior comfort',
    variants: [{ id: 'default-1', title: 'Default', price: { amount: 65000, currency: 'INR' }, available: true }]
  },
  {
    id: '2',
    name: 'Wooden Dining Set',
    slug: 'wooden-dining-set',
    price: 45000,
    originalPrice: 52000,
    image: '/api/placeholder/400/300',
    category: 'Dining Room',
    badge: 'Best Seller',
    rating: 4.7,
    reviews: 189,
    description: 'Solid wood dining set for 6 people with comfortable chairs',
    variants: [{ id: 'default-2', title: 'Default', price: { amount: 45000, currency: 'INR' }, available: true }]
  },
  {
    id: '3',
    name: 'Coffee Table Set',
    slug: 'coffee-table-set',
    price: 15000,
    originalPrice: 18000,
    image: '/api/placeholder/400/300',
    category: 'Living Room',
    badge: 'Best Seller',
    rating: 4.6,
    reviews: 156,
    description: 'Modern coffee table set with nested tables and glass tops',
    variants: [{ id: 'default-3', title: 'Default', price: { amount: 15000, currency: 'INR' }, available: true }]
  },
  {
    id: '4',
    name: 'Bedroom Furniture Set',
    slug: 'bedroom-furniture-set',
    price: 35000,
    originalPrice: 42000,
    image: '/api/placeholder/400/300',
    category: 'Bedroom',
    badge: 'Best Seller',
    rating: 4.8,
    reviews: 203,
    description: 'Complete bedroom set with bed, wardrobe, and nightstands',
    variants: [{ id: 'default-4', title: 'Default', price: { amount: 35000, currency: 'INR' }, available: true }]
  },
  {
    id: '5',
    name: 'Office Desk Chair',
    slug: 'office-desk-chair',
    price: 12000,
    originalPrice: 15000,
    image: '/api/placeholder/400/300',
    category: 'Office',
    badge: 'Best Seller',
    rating: 4.5,
    reviews: 145,
    description: 'Ergonomic office chair with lumbar support and adjustable height',
    variants: [{ id: 'default-5', title: 'Default', price: { amount: 12000, currency: 'INR' }, available: true }]
  },
  {
    id: '6',
    name: 'TV Stand Unit',
    slug: 'tv-stand-unit',
    price: 18000,
    originalPrice: 22000,
    image: '/api/placeholder/400/300',
    category: 'Living Room',
    badge: 'Best Seller',
    rating: 4.7,
    reviews: 178,
    description: 'Modern TV stand with storage compartments and cable management',
    variants: [{ id: 'default-6', title: 'Default', price: { amount: 18000, currency: 'INR' }, available: true }]
  },
  {
    id: '7',
    name: 'Side Table Set',
    slug: 'side-table-set',
    price: 8000,
    originalPrice: 10000,
    image: '/api/placeholder/400/300',
    category: 'Living Room',
    badge: 'Best Seller',
    rating: 4.6,
    reviews: 134,
    description: 'Set of 2 nested side tables with modern design',
    variants: [{ id: 'default-7', title: 'Default', price: { amount: 8000, currency: 'INR' }, available: true }]
  },
  {
    id: '8',
    name: 'Bar Cabinet',
    slug: 'bar-cabinet',
    price: 22000,
    originalPrice: 28000,
    image: '/api/placeholder/400/300',
    category: 'Dining Room',
    badge: 'Best Seller',
    rating: 4.8,
    reviews: 167,
    description: 'Elegant bar cabinet with glass doors and internal shelving',
    variants: [{ id: 'default-8', title: 'Default', price: { amount: 22000, currency: 'INR' }, available: true }]
  }
];

export default function BestSellersPage() {
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
    <div className="min-h-screen bg-gradient-to-b from-orange-50 to-white">
      {/* Hero Section */}
      <div className="relative bg-gradient-to-r from-orange-100 via-amber-50 to-orange-100 py-16 px-4">
        <div className="max-w-7xl mx-auto text-center">
          <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
            Best <span className="text-orange-600">Sellers</span>
          </h1>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Discover our most popular furniture pieces loved by customers. These top-rated items combine style, comfort, and exceptional quality.
          </p>
        </div>
      </div>

      {/* Products Grid */}
      <div className="max-w-7xl mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {bestSellersProducts.map((product) => (
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
                  title="Add to wishlist"
                >
                  <Heart className="w-4 h-4 text-gray-600 hover:text-red-500" />
                </button>
                <button 
                  onClick={() => handleQuickView(product)}
                  className="bg-white p-2 rounded-full shadow-md hover:bg-orange-50 transition-colors duration-200"
                  title="Quick View"
                >
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
                
                {/* Rating */}
                <div className="flex items-center gap-1 mb-2">
                  <div className="flex items-center">
                    {[...Array(5)].map((_, i) => (
                      <Star
                        key={i}
                        className={`w-3 h-3 ${
                          i < Math.floor(product.rating)
                            ? 'text-yellow-400 fill-current'
                            : 'text-gray-300'
                        }`}
                      />
                    ))}
                  </div>
                  <span className="text-xs text-gray-600">
                    ({product.reviews})
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
                      ₹{formatPrice(product.price)}
                    </span>
                    {product.originalPrice && (
                      <span className="text-sm text-gray-500 line-through">
                        ₹{formatPrice(product.originalPrice)}
                      </span>
                    )}
                  </div>
                  {product.originalPrice && (
                    <span className="text-xs bg-red-100 text-red-600 px-2 py-1 rounded-full font-semibold">
                      {calculateDiscount(product.originalPrice, product.price)}% OFF
                    </span>
                  )}
                </div>

                {/* Add to Cart Button */}
                <button 
                  onClick={() => handleAddToCart(product)}
                  className="w-full bg-orange-500 text-white py-2 px-4 rounded-lg hover:bg-orange-600 transition-colors duration-200 flex items-center justify-center gap-2 group-hover:bg-orange-600"
                >
                  <ShoppingBag className="w-4 h-4" />
                  {addedProducts.has(product.id) ? 'Added to Cart!' : 'Add to Cart'}
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Features Section */}
      <div className="bg-gradient-to-r from-orange-100 to-amber-100 py-16 px-4 mt-16">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-3xl font-bold text-center text-gray-900 mb-12">
            Why Our Best Sellers?
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="text-center">
              <div className="w-16 h-16 bg-orange-500 rounded-full flex items-center justify-center mx-auto mb-4">
                <Star className="w-8 h-8 text-white" />
              </div>
              <h3 className="text-xl font-semibold mb-2">Top Rated</h3>
              <p className="text-gray-600">4.5+ star ratings from hundreds of satisfied customers</p>
            </div>
            <div className="text-center">
              <div className="w-16 h-16 bg-orange-500 rounded-full flex items-center justify-center mx-auto mb-4">
                <Heart className="w-8 h-8 text-white" />
              </div>
              <h3 className="text-xl font-semibold mb-2">Customer Favorites</h3>
              <p className="text-gray-600">Most loved and frequently purchased furniture pieces</p>
            </div>
            <div className="text-center">
              <div className="w-16 h-16 bg-orange-500 rounded-full flex items-center justify-center mx-auto mb-4">
                <ShoppingBag className="w-8 h-8 text-white" />
              </div>
              <h3 className="text-xl font-semibold mb-2">Quality Assured</h3>
              <p className="text-gray-600">Premium materials and craftsmanship guaranteed</p>
            </div>
          </div>
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
