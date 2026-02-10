'use client';

import { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { Heart, ShoppingBag, Eye } from 'lucide-react';
import { useWishlist } from '@/state/wishlist';
import { useCart } from '@/state/cart';
import QuickViewModal from '@/components/catalog/QuickViewModal';
import { formatPrice, calculateDiscount } from '@/lib/utils/price';

// Mock product data for decor
const decorProducts = [
  {
    id: '1',
    name: 'Wall Art Canvas',
    slug: 'wall-art-canvas',
    price: 3500,
    originalPrice: 4500,
    image: 'https://picsum.photos/seed/wall-art/400/300.jpg',
    category: 'Wall Decor',
    badge: 'Artistic',
    description: 'Modern abstract canvas art with vibrant colors and gallery-quality framing',
    variants: [{ id: 'default-1', title: 'Default', price: { amount: 3500, currency: 'INR' }, available: true }]
  },
  {
    id: '2',
    name: 'Decorative Mirrors',
    slug: 'decorative-mirrors',
    price: 2800,
    originalPrice: 3500,
    image: 'https://picsum.photos/seed/wall-art/400/300.jpg',
    category: 'Wall Decor',
    badge: 'Elegant',
    description: 'Ornate gold-frame mirror with intricate detailing and beveled edges',
    variants: [{ id: 'default-2', title: 'Default', price: { amount: 2800, currency: 'INR' }, available: true }]
  },
  {
    id: '3',
    name: 'Vase Set',
    slug: 'vase-set',
    price: 1800,
    originalPrice: 2200,
    image: 'https://picsum.photos/seed/wall-art/400/300.jpg',
    category: 'Table Decor',
    badge: 'Ceramic',
    description: 'Set of 3 ceramic vases in different sizes with glossy finish',
    variants: [{ id: 'default-3', title: 'Default', price: { amount: 1800, currency: 'INR' }, available: true }]
  },
  {
    id: '4',
    name: 'Throw Pillows',
    slug: 'throw-pillows',
    price: 800,
    originalPrice: 1200,
    image: 'https://picsum.photos/seed/wall-art/400/300.jpg',
    category: 'Textiles',
    badge: 'Comfort',
    description: 'Premium velvet throw pillows with removable covers and decorative tassels',
    variants: [{ id: 'default-4', title: 'Default', price: { amount: 800, currency: 'INR' }, available: true }]
  },
  {
    id: '5',
    name: 'Clock Collection',
    slug: 'clock-collection',
    price: 2200,
    originalPrice: 2800,
    image: 'https://picsum.photos/seed/wall-art/400/300.jpg',
    category: 'Wall Decor',
    badge: 'Timeless',
    description: 'Vintage-inspired wall clock with Roman numerals and brass finish',
    variants: [{ id: 'default-5', title: 'Default', price: { amount: 2200, currency: 'INR' }, available: true }]
  },
  {
    id: '6',
    name: 'Photo Frames',
    slug: 'photo-frames',
    price: 600,
    originalPrice: 800,
    image: 'https://picsum.photos/seed/wall-art/400/300.jpg',
    category: 'Wall Decor',
    badge: 'Memories',
    description: 'Set of 4 wooden photo frames with glass protection and easel backs',
    variants: [{ id: 'default-6', title: 'Default', price: { amount: 600, currency: 'INR' }, available: true }]
  },
  {
    id: '7',
    name: 'Candle Holders',
    slug: 'candle-holders',
    price: 1200,
    originalPrice: 1500,
    image: 'https://picsum.photos/seed/wall-art/400/300.jpg',
    category: 'Table Decor',
    badge: 'Ambient',
    description: 'Brass candle holders set with intricate patterns and drip trays',
    variants: [{ id: 'default-7', title: 'Default', price: { amount: 1200, currency: 'INR' }, available: true }]
  },
  {
    id: '8',
    name: 'Decorative Bowls',
    slug: 'decorative-bowls',
    price: 1500,
    originalPrice: 1800,
    image: 'https://picsum.photos/seed/wall-art/400/300.jpg',
    category: 'Table Decor',
    badge: 'Centerpiece',
    description: 'Handcrafted ceramic bowl with unique glaze patterns and artistic design',
    variants: [{ id: 'default-8', title: 'Default', price: { amount: 1500, currency: 'INR' }, available: true }]
  },
  {
    id: '9',
    name: 'Plant Stands',
    slug: 'plant-stands',
    price: 1800,
    originalPrice: 2200,
    image: 'https://picsum.photos/seed/wall-art/400/300.jpg',
    category: 'Floor Decor',
    badge: 'Natural',
    description: 'Multi-tier plant stand with wrought iron construction and decorative scrollwork',
    variants: [{ id: 'default-9', title: 'Default', price: { amount: 1800, currency: 'INR' }, available: true }]
  },
  {
    id: '10',
    name: 'Wall Shelves',
    slug: 'wall-shelves',
    price: 2500,
    originalPrice: 3000,
    image: 'https://picsum.photos/seed/wall-art/400/300.jpg',
    category: 'Wall Decor',
    badge: 'Storage',
    description: 'Floating wall shelves set with hidden brackets and modern minimalist design',
    variants: [{ id: 'default-10', title: 'Default', price: { amount: 2500, currency: 'INR' }, available: true }]
  },
  {
    id: '11',
    name: 'Decorative Trays',
    slug: 'decorative-trays',
    price: 900,
    originalPrice: 1200,
    image: 'https://picsum.photos/seed/wall-art/400/300.jpg',
    category: 'Table Decor',
    badge: 'Serving',
    description: 'Marble serving tray with gold handles and elegant edge detailing',
    variants: [{ id: 'default-11', title: 'Default', price: { amount: 900, currency: 'INR' }, available: true }]
  },
  {
    id: '12',
    name: 'Artificial Plants',
    slug: 'artificial-plants',
    price: 1200,
    originalPrice: 1500,
    image: 'https://picsum.photos/seed/wall-art/400/300.jpg',
    category: 'Green Decor',
    badge: 'Maintenance-Free',
    description: 'Lifelike artificial fiddle leaf fig plant in ceramic pot with realistic texture',
    variants: [{ id: 'default-12', title: 'Default', price: { amount: 1200, currency: 'INR' }, available: true }]
  }
];

export default function DecorPage() {
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
            Home <span className="text-orange-600">Decor</span>
          </h1>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Transform your living spaces with our curated collection of decorative pieces. From wall art to elegant accents, find the perfect items to express your style.
          </p>
        </div>
      </div>

      {/* Products Grid */}
      <div className="max-w-7xl mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {decorProducts.map((product) => (
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
                  onError={(e) => {
                    const target = e.target as HTMLImageElement;
                    target.onerror = null;
                    target.src = `data:image/svg+xml,%3Csvg width='400' height='300' xmlns='http://www.w3.org/2000/svg'%3E%3Crect width='100%25' height='100%25' fill='%23f3f4f6'/%3E%3Ctext x='50%25' y='50%25' font-family='Arial' font-size='16' fill='%239ca3af' text-anchor='middle' dy='.3em'%3E${product.name}%3C/text%3E%3C/svg%3E`;
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
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="text-center">
              <div className="w-16 h-16 bg-orange-500 rounded-full flex items-center justify-center mx-auto mb-4">
                <Heart className="w-8 h-8 text-white" />
              </div>
              <h3 className="text-xl font-semibold mb-2">Curated Selection</h3>
              <p className="text-gray-600">Handpicked decorative pieces from artisans worldwide</p>
            </div>
            <div className="text-center">
              <div className="w-16 h-16 bg-orange-500 rounded-full flex items-center justify-center mx-auto mb-4">
                <ShoppingBag className="w-8 h-8 text-white" />
              </div>
              <h3 className="text-xl font-semibold mb-2">Quality Materials</h3>
              <p className="text-gray-600">Premium materials and craftsmanship in every piece</p>
            </div>
            <div className="text-center">
              <div className="w-16 h-16 bg-orange-500 rounded-full flex items-center justify-center mx-auto mb-4">
                <Eye className="w-8 h-8 text-white" />
              </div>
              <h3 className="text-xl font-semibold mb-2">Style Variety</h3>
              <p className="text-gray-600">From modern minimal to classic traditional designs</p>
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
