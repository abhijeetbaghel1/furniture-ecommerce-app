'use client';

import { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { Heart, ShoppingBag, Eye, Star } from 'lucide-react';
import { useWishlist } from '@/state/wishlist';
import { useCart } from '@/state/cart';
import QuickViewModal from '@/components/catalog/QuickViewModal';
import { formatPrice, calculateDiscount } from '@/lib/utils/price';

// Mock product data for featured items
const featuredProducts = [
  {
    id: '1',
    name: 'Luxury Velvet Sofa',
    slug: 'luxury-velvet-sofa',
    price: 45000,
    originalPrice: 55000,
    image: 'https://picsum.photos/seed/luxury-sofa/400/300.jpg',
    category: 'Featured',
    badge: 'Premium',
    rating: 4.9,
    reviews: 156,
    description: 'Handcrafted luxury velvet sofa with premium cushioning and elegant design',
    variants: [{ id: 'default-1', title: 'Default', price: { amount: 45000, currency: 'INR' }, available: true }]
  },
  {
    id: '2',
    name: 'Designer Dining Table',
    slug: 'designer-dining-table',
    price: 28000,
    originalPrice: 35000,
    image: 'https://picsum.photos/seed/designer-table/400/300.jpg',
    category: 'Featured',
    badge: 'Editor\'s Choice',
    rating: 4.8,
    reviews: 89,
    description: 'Modern designer dining table with marble top and sculptural base',
    variants: [{ id: 'default-2', title: 'Default', price: { amount: 28000, currency: 'INR' }, available: true }]
  },
  {
    id: '3',
    name: 'Artisan Floor Lamp',
    slug: 'artisan-floor-lamp',
    price: 8500,
    originalPrice: 12000,
    image: 'https://picsum.photos/seed/artisan-lamp/400/300.jpg',
    category: 'Featured',
    badge: 'Trending',
    rating: 4.7,
    reviews: 234,
    description: 'Handcrafted artisan floor lamp with unique design and warm lighting',
    variants: [{ id: 'default-3', title: 'Default', price: { amount: 8500, currency: 'INR' }, available: true }]
  },
  {
    id: '4',
    name: 'Premium Wardrobe',
    slug: 'premium-wardrobe',
    price: 35000,
    originalPrice: 42000,
    image: 'https://picsum.photos/seed/premium-wardrobe/400/300.jpg',
    category: 'Featured',
    badge: 'Premium',
    rating: 4.9,
    reviews: 178,
    description: 'Spacious premium wardrobe with smart storage and elegant finish',
    variants: [{ id: 'default-4', title: 'Default', price: { amount: 35000, currency: 'INR' }, available: true }]
  },
  {
    id: '5',
    name: 'Modern Coffee Table',
    slug: 'modern-coffee-table',
    price: 12000,
    originalPrice: 15000,
    image: 'https://picsum.photos/seed/modern-coffee/400/300.jpg',
    category: 'Featured',
    badge: 'Trending',
    rating: 4.6,
    reviews: 145,
    description: 'Sleek modern coffee table with glass top and minimalist design',
    variants: [{ id: 'default-5', title: 'Default', price: { amount: 12000, currency: 'INR' }, available: true }]
  },
  {
    id: '6',
    name: 'Elegant Mirror',
    slug: 'elegant-mirror',
    price: 6500,
    originalPrice: 8000,
    image: 'https://picsum.photos/seed/elegant-mirror/400/300.jpg',
    category: 'Featured',
    badge: 'Editor\'s Choice',
    rating: 4.8,
    reviews: 92,
    description: 'Elegant ornate mirror with gold frame and beveled edges',
    variants: [{ id: 'default-6', title: 'Default', price: { amount: 6500, currency: 'INR' }, available: true }]
  },
  {
    id: '7',
    name: 'Luxury Bed Frame',
    slug: 'luxury-bed-frame',
    price: 38000,
    originalPrice: 45000,
    image: 'https://picsum.photos/seed/luxury-bed/400/300.jpg',
    category: 'Featured',
    badge: 'Premium',
    rating: 4.9,
    reviews: 201,
    description: 'Luxury upholstered bed frame with tufted headboard and premium fabric',
    variants: [{ id: 'default-7', title: 'Default', price: { amount: 38000, currency: 'INR' }, available: true }]
  },
  {
    id: '8',
    name: 'Designer Bookshelf',
    slug: 'designer-bookshelf',
    price: 15000,
    originalPrice: 18000,
    image: 'https://picsum.photos/seed/designer-bookshelf/400/300.jpg',
    category: 'Featured',
    badge: 'Trending',
    rating: 4.7,
    reviews: 167,
    description: 'Modern designer bookshelf with asymmetrical shelves and premium finish',
    variants: [{ id: 'default-8', title: 'Default', price: { amount: 15000, currency: 'INR' }, available: true }]
  }
];

export default function FeaturedPage() {
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
    <div className="min-h-screen bg-gradient-to-b from-purple-50 to-white">
      {/* Hero Section */}
      <div className="relative bg-gradient-to-r from-purple-100 via-pink-50 to-purple-100 py-16 px-4">
        <div className="max-w-7xl mx-auto text-center">
          <div className="mb-6">
            <span className="inline-block bg-purple-600 text-white px-4 py-2 rounded-full text-lg font-bold">
              HANDPICKED SELECTION
            </span>
          </div>
          <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
            Featured <span className="text-purple-600">Collection</span>
          </h1>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Discover our finest pieces carefully selected by our design experts. These premium items represent the best of contemporary furniture and decor.
          </p>
        </div>
      </div>

      {/* Products Grid */}
      <div className="max-w-7xl mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {featuredProducts.map((product) => (
            <div key={product.id} className="group relative bg-white rounded-lg shadow-md hover:shadow-xl transition-all duration-300 overflow-hidden border-2 border-purple-200">
              {/* Product Badge */}
              {product.badge && (
                <div className="absolute top-4 left-4 z-10 bg-purple-600 text-white px-3 py-1 rounded-full text-sm font-semibold">
                  {product.badge}
                </div>
              )}
              
              {/* Quick Actions */}
              <div className="absolute top-4 right-4 z-10 flex flex-col gap-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                <button 
                  onClick={() => handleWishlistToggle(product)}
                  className="bg-white p-2 rounded-full shadow-md hover:bg-purple-50 transition-colors duration-200"
                  title="Add to wishlist"
                >
                  <Heart className="w-4 h-4 text-gray-600 hover:text-red-500" />
                </button>
                <button 
                  onClick={() => handleQuickView(product)}
                  className="bg-white p-2 rounded-full shadow-md hover:bg-purple-50 transition-colors duration-200"
                  title="Quick View"
                >
                  <Eye className="w-4 h-4 text-gray-600 hover:text-purple-500" />
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
                {/* Rating Badge */}
                <div className="absolute bottom-2 left-2 bg-white/90 backdrop-blur-sm px-2 py-1 rounded-full flex items-center gap-1">
                  <Star className="w-3 h-3 text-yellow-500 fill-current" />
                  <span className="text-xs font-semibold">{product.rating}</span>
                  <span className="text-xs text-gray-600">({product.reviews})</span>
                </div>
              </div>

              {/* Product Info */}
              <div className="p-4">
                <div className="mb-2">
                  <span className="text-xs text-purple-600 font-medium uppercase tracking-wide">
                    {product.category}
                  </span>
                </div>
                
                <h3 className="text-lg font-semibold text-gray-900 mb-2 line-clamp-2 group-hover:text-purple-600 transition-colors duration-200">
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
                    <span className="text-xs bg-purple-100 text-purple-600 px-2 py-1 rounded-full font-semibold">
                      {calculateDiscount(product.originalPrice, product.price)}% OFF
                    </span>
                  )}
                </div>

                {/* Add to Cart Button */}
                <button 
                  onClick={() => handleAddToCart(product)}
                  className="w-full bg-purple-600 text-white py-2 px-4 rounded-lg hover:bg-purple-700 transition-colors duration-200 flex items-center justify-center gap-2 group-hover:bg-purple-700 font-semibold"
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
      <div className="bg-gradient-to-r from-purple-100 to-pink-100 py-16 px-4 mt-16">
        <div className="max-w-6xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="text-center">
              <div className="w-16 h-16 bg-purple-600 rounded-full flex items-center justify-center mx-auto mb-4">
                <Star className="w-8 h-8 text-white" />
              </div>
              <h3 className="text-xl font-semibold mb-2">Expert Curated</h3>
              <p className="text-gray-600">Handpicked by our design experts for exceptional quality</p>
            </div>
            <div className="text-center">
              <div className="w-16 h-16 bg-purple-600 rounded-full flex items-center justify-center mx-auto mb-4">
                <ShoppingBag className="w-8 h-8 text-white" />
              </div>
              <h3 className="text-xl font-semibold mb-2">Premium Quality</h3>
              <p className="text-gray-600">Only the finest materials and craftsmanship</p>
            </div>
            <div className="text-center">
              <div className="w-16 h-16 bg-purple-600 rounded-full flex items-center justify-center mx-auto mb-4">
                <Heart className="w-8 h-8 text-white" />
              </div>
              <h3 className="text-xl font-semibold mb-2">Limited Edition</h3>
              <p className="text-gray-600">Exclusive pieces you won't find elsewhere</p>
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
