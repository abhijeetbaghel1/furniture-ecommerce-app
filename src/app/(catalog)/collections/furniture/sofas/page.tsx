'use client';

import { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { Heart, ShoppingBag, Eye } from 'lucide-react';
import { useWishlist } from '@/state/wishlist';
import { useCart } from '@/state/cart';
import QuickViewModal from '@/components/catalog/QuickViewModal';
import { formatPrice, calculateDiscount } from '@/lib/utils/price';

// Mock product data for sofas
const sofasProducts = [
  {
    id: '1',
    name: 'Luxury Velvet Sofa',
    slug: 'luxury-velvet-sofa',
    price: 45000,
    originalPrice: 55000,
    image: 'https://picsum.photos/seed/velvet-sofa/400/300.jpg',
    category: '3-Seater',
    badge: 'Premium',
    description: 'Handcrafted luxury velvet sofa with premium cushioning and elegant design',
    variants: [{ id: 'default-1', title: 'Default', price: { amount: 45000, currency: 'INR' }, available: true }]
  },
  {
    id: '2',
    name: 'Modern L-Shaped Sofa',
    slug: 'modern-l-shaped-sofa',
    price: 38000,
    originalPrice: 45000,
    image: 'https://picsum.photos/seed/l-shaped-sofa/400/300.jpg',
    category: 'L-Shaped',
    badge: 'Popular',
    description: 'Contemporary L-shaped sofa with chaise lounge and storage',
    variants: [{ id: 'default-2', title: 'Default', price: { amount: 38000, currency: 'INR' }, available: true }]
  },
  {
    id: '3',
    name: 'Classic Leather Sofa',
    slug: 'classic-leather-sofa',
    price: 52000,
    originalPrice: 65000,
    image: 'https://picsum.photos/seed/leather-sofa/400/300.jpg',
    category: '3-Seater',
    badge: 'Timeless',
    description: 'Genuine leather sofa with classic design and superior comfort',
    variants: [{ id: 'default-3', title: 'Default', price: { amount: 52000, currency: 'INR' }, available: true }]
  },
  {
    id: '4',
    name: 'Compact 2-Seater Sofa',
    slug: 'compact-2-seater-sofa',
    price: 22000,
    originalPrice: 28000,
    image: 'https://picsum.photos/seed/2-seater-sofa/400/300.jpg',
    category: '2-Seater',
    badge: 'Space-Saving',
    description: 'Perfect for small spaces with comfortable seating for two',
    variants: [{ id: 'default-4', title: 'Default', price: { amount: 22000, currency: 'INR' }, available: true }]
  },
  {
    id: '5',
    name: 'Recliner Sofa Set',
    slug: 'recliner-sofa-set',
    price: 65000,
    originalPrice: 75000,
    image: 'https://picsum.photos/seed/recliner-sofa/400/300.jpg',
    category: 'Recliner',
    badge: 'Luxury',
    description: '3-seater recliner sofa with powered reclining positions',
    variants: [{ id: 'default-5', title: 'Default', price: { amount: 65000, currency: 'INR' }, available: true }]
  },
  {
    id: '6',
    name: 'Scandinavian Sofa',
    slug: 'scandinavian-sofa',
    price: 32000,
    originalPrice: 40000,
    image: 'https://picsum.photos/seed/scandi-sofa/400/300.jpg',
    category: '3-Seater',
    badge: 'Nordic',
    description: 'Light wood legs and neutral fabric with cozy comfort',
    variants: [{ id: 'default-6', title: 'Default', price: { amount: 32000, currency: 'INR' }, available: true }]
  },
  {
    id: '7',
    name: 'Sectional Sofa',
    slug: 'sectional-sofa',
    price: 48000,
    originalPrice: 58000,
    image: 'https://picsum.photos/seed/sectional-sofa/400/300.jpg',
    category: 'Sectional',
    badge: 'Modular',
    description: 'Modular sectional sofa that can be configured in multiple ways',
    variants: [{ id: 'default-7', title: 'Default', price: { amount: 48000, currency: 'INR' }, available: true }]
  },
  {
    id: '8',
    name: 'Sofa Cum Bed',
    slug: 'sofa-cum-bed',
    price: 28000,
    originalPrice: 35000,
    image: 'https://picsum.photos/seed/sofa-bed/400/300.jpg',
    category: 'Convertible',
    badge: 'Multi-Functional',
    description: 'Converts from sofa to bed with easy mechanism',
    variants: [{ id: 'default-8', title: 'Default', price: { amount: 28000, currency: 'INR' }, available: true }]
  },
  {
    id: '9',
    name: 'Chesterfield Sofa',
    slug: 'chesterfield-sofa',
    price: 55000,
    originalPrice: 68000,
    image: 'https://picsum.photos/seed/chesterfield-sofa/400/300.jpg',
    category: '3-Seater',
    badge: 'Classic',
    description: 'Traditional Chesterfield with deep button tufting and rolled arms',
    variants: [{ id: 'default-9', title: 'Default', price: { amount: 55000, currency: 'INR' }, available: true }]
  },
  {
    id: '10',
    name: 'Fabric Sofa Set',
    slug: 'fabric-sofa-set',
    price: 35000,
    originalPrice: 42000,
    image: 'https://picsum.photos/seed/fabric-sofa/400/300.jpg',
    category: '3-Seater',
    badge: 'Comfortable',
    description: 'Soft fabric sofa with removable and washable cushions',
    variants: [{ id: 'default-10', title: 'Default', price: { amount: 35000, currency: 'INR' }, available: true }]
  },
  {
    id: '11',
    name: 'Corner Sofa',
    slug: 'corner-sofa',
    price: 42000,
    originalPrice: 52000,
    image: 'https://picsum.photos/seed/corner-sofa/400/300.jpg',
    category: 'L-Shaped',
    badge: 'Space-Efficient',
    description: 'Perfect corner solution with comfortable seating',
    variants: [{ id: 'default-11', title: 'Default', price: { amount: 42000, currency: 'INR' }, available: true }]
  },
  {
    id: '12',
    name: 'Minimalist Sofa',
    slug: 'minimalist-sofa',
    price: 28000,
    originalPrice: 35000,
    image: 'https://picsum.photos/seed/minimalist-sofa/400/300.jpg',
    category: '2-Seater',
    badge: 'Clean Design',
    description: 'Simple lines and modern aesthetic for contemporary spaces',
    variants: [{ id: 'default-12', title: 'Default', price: { amount: 28000, currency: 'INR' }, available: true }]
  }
];

export default function SofasPage() {
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
    <div className="min-h-screen bg-gradient-to-b from-amber-50 to-white">
      {/* Hero Section */}
      <div className="relative bg-gradient-to-r from-amber-100 via-orange-50 to-amber-100 py-16 px-4">
        <div className="max-w-7xl mx-auto text-center">
          <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
            Comfortable <span className="text-amber-600">Sofas</span>
          </h1>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Discover our extensive collection of sofas designed for comfort and style. From classic leather to modern fabric, find the perfect centerpiece for your living room.
          </p>
        </div>
      </div>

      {/* Products Grid */}
      <div className="max-w-7xl mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {sofasProducts.map((product) => (
            <div key={product.id} className="group relative bg-white rounded-lg shadow-md hover:shadow-xl transition-all duration-300 overflow-hidden">
              {/* Product Badge */}
              {product.badge && (
                <div className="absolute top-4 left-4 z-10 bg-amber-600 text-white px-3 py-1 rounded-full text-sm font-semibold">
                  {product.badge}
                </div>
              )}
              
              {/* Quick Actions */}
              <div className="absolute top-4 right-4 z-10 flex flex-col gap-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                <button 
                  onClick={() => handleWishlistToggle(product)}
                  className="bg-white p-2 rounded-full shadow-md hover:bg-amber-50 transition-colors duration-200"
                  title="Add to wishlist"
                >
                  <Heart className="w-4 h-4 text-gray-600 hover:text-red-500" />
                </button>
                <button 
                  onClick={() => handleQuickView(product)}
                  className="bg-white p-2 rounded-full shadow-md hover:bg-amber-50 transition-colors duration-200"
                  title="Quick View"
                >
                  <Eye className="w-4 h-4 text-gray-600 hover:text-amber-500" />
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
                {/* Category Badge */}
                <div className="absolute bottom-2 left-2 bg-white/90 backdrop-blur-sm px-2 py-1 rounded-full">
                  <span className="text-xs font-semibold text-amber-600">{product.category}</span>
                </div>
              </div>

              {/* Product Info */}
              <div className="p-4">
                <div className="mb-2">
                  <span className="text-xs text-amber-600 font-medium uppercase tracking-wide">
                    Sofas
                  </span>
                </div>
                
                <h3 className="text-lg font-semibold text-gray-900 mb-2 line-clamp-2 group-hover:text-amber-600 transition-colors duration-200">
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
                    <span className="text-xs bg-amber-100 text-amber-600 px-2 py-1 rounded-full font-semibold">
                      {calculateDiscount(product.originalPrice, product.price)}% OFF
                    </span>
                  )}
                </div>

                {/* Add to Cart Button */}
                <button 
                  onClick={() => handleAddToCart(product)}
                  className="w-full bg-amber-600 text-white py-2 px-4 rounded-lg hover:bg-amber-700 transition-colors duration-200 flex items-center justify-center gap-2 group-hover:bg-amber-700"
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
      <div className="bg-gradient-to-r from-amber-100 to-orange-100 py-16 px-4 mt-16">
        <div className="max-w-6xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="text-center">
              <div className="w-16 h-16 bg-amber-600 rounded-full flex items-center justify-center mx-auto mb-4">
                <Heart className="w-8 h-8 text-white" />
              </div>
              <h3 className="text-xl font-semibold mb-2">Premium Comfort</h3>
              <p className="text-gray-600">High-density foam and premium fabrics for ultimate comfort</p>
            </div>
            <div className="text-center">
              <div className="w-16 h-16 bg-amber-600 rounded-full flex items-center justify-center mx-auto mb-4">
                <ShoppingBag className="w-8 h-8 text-white" />
              </div>
              <h3 className="text-xl font-semibold mb-2">Durable Construction</h3>
              <p className="text-gray-600">Built with quality materials for long-lasting durability</p>
            </div>
            <div className="text-center">
              <div className="w-16 h-16 bg-amber-600 rounded-full flex items-center justify-center mx-auto mb-4">
                <Eye className="w-8 h-8 text-white" />
              </div>
              <h3 className="text-xl font-semibold mb-2">Style Variety</h3>
              <p className="text-gray-600">From classic to contemporary designs for every taste</p>
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
