'use client';

import { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { Heart, ShoppingBag, Eye } from 'lucide-react';
import { useWishlist } from '@/state/wishlist';
import { useCart } from '@/state/cart';
import QuickViewModal from '@/components/catalog/QuickViewModal';
import { formatPrice, calculateDiscount } from '@/lib/utils/price';

// Mock product data for styles collection
const stylesProducts = [
  // Modern Style
  {
    id: '1',
    name: 'Minimalist Sectional Sofa',
    slug: 'minimalist-sectional-sofa',
    price: 35000,
    originalPrice: 42000,
    image: 'https://picsum.photos/seed/modern-sofa/400/300.jpg',
    category: 'Modern',
    badge: 'Sleek',
    description: 'Clean lines and minimalist design with premium fabric',
    variants: [{ id: 'default-1', title: 'Default', price: { amount: 35000, currency: 'INR' }, available: true }]
  },
  {
    id: '2',
    name: 'Geometric Coffee Table',
    slug: 'geometric-coffee-table',
    price: 8000,
    originalPrice: 10000,
    image: 'https://picsum.photos/seed/geometric-table/400/300.jpg',
    category: 'Modern',
    badge: 'Contemporary',
    description: 'Bold geometric shapes with glass top and metal base',
    variants: [{ id: 'default-2', title: 'Default', price: { amount: 8000, currency: 'INR' }, available: true }]
  },
  
  // Contemporary Style
  {
    id: '3',
    name: 'Contemporary Dining Set',
    slug: 'contemporary-dining-set',
    price: 28000,
    originalPrice: 35000,
    image: 'https://picsum.photos/seed/contemporary-dining/400/300.jpg',
    category: 'Contemporary',
    badge: 'Trending',
    description: 'Current design trends with comfortable seating',
    variants: [{ id: 'default-3', title: 'Default', price: { amount: 28000, currency: 'INR' }, available: true }]
  },
  {
    id: '4',
    name: 'Statement Floor Lamp',
    slug: 'statement-floor-lamp',
    price: 5500,
    originalPrice: 7000,
    image: 'https://picsum.photos/seed/statement-lamp/400/300.jpg',
    category: 'Contemporary',
    badge: 'Bold',
    description: 'Eye-catching design with modern LED technology',
    variants: [{ id: 'default-4', title: 'Default', price: { amount: 5500, currency: 'INR' }, available: true }]
  },
  
  // Minimalist Style
  {
    id: '5',
    name: 'Minimalist Platform Bed',
    slug: 'minimalist-platform-bed',
    price: 22000,
    originalPrice: 28000,
    image: 'https://picsum.photos/seed/minimalist-bed/400/300.jpg',
    category: 'Minimalist',
    badge: 'Simple',
    description: 'Clean platform design with built-in storage',
    variants: [{ id: 'default-5', title: 'Default', price: { amount: 22000, currency: 'INR' }, available: true }]
  },
  {
    id: '6',
    name: 'Floating Wall Shelves',
    slug: 'floating-wall-shelves',
    price: 4500,
    originalPrice: 6000,
    image: 'https://picsum.photos/seed/floating-shelves/400/300.jpg',
    category: 'Minimalist',
    badge: 'Functional',
    description: 'Hidden bracket design for clean, minimalist look',
    variants: [{ id: 'default-6', title: 'Default', price: { amount: 4500, currency: 'INR' }, available: true }]
  },
  
  // Scandinavian Style
  {
    id: '7',
    name: 'Scandinavian Sofa',
    slug: 'scandinavian-sofa',
    price: 32000,
    originalPrice: 40000,
    image: 'https://picsum.photos/seed/scandi-sofa/400/300.jpg',
    category: 'Scandinavian',
    badge: 'Nordic',
    description: 'Light wood legs and neutral fabric with cozy comfort',
    variants: [{ id: 'default-7', title: 'Default', price: { amount: 32000, currency: 'INR' }, available: true }]
  },
  {
    id: '8',
    name: 'Hygge Armchair',
    slug: 'hygge-armchair',
    price: 12000,
    originalPrice: 15000,
    image: 'https://picsum.photos/seed/hygge-chair/400/300.jpg',
    category: 'Scandinavian',
    badge: 'Cozy',
    description: 'Comfortable armchair with wool upholstery and wooden frame',
    variants: [{ id: 'default-8', title: 'Default', price: { amount: 12000, currency: 'INR' }, available: true }]
  },
  {
    id: '9',
    name: 'Modern Bookshelf',
    slug: 'modern-bookshelf',
    price: 9000,
    originalPrice: 12000,
    image: 'https://picsum.photos/seed/modern-bookshelf/400/300.jpg',
    category: 'Modern',
    badge: 'Organized',
    description: 'Sleek design with adjustable shelves and clean finish',
    variants: [{ id: 'default-9', title: 'Default', price: { amount: 9000, currency: 'INR' }, available: true }]
  },
  {
    id: '10',
    name: 'Contemporary Wardrobe',
    slug: 'contemporary-wardrobe',
    price: 25000,
    originalPrice: 32000,
    image: 'https://picsum.photos/seed/contemporary-wardrobe/400/300.jpg',
    category: 'Contemporary',
    badge: 'Smart',
    description: 'Modern wardrobe with smart storage solutions',
    variants: [{ id: 'default-10', title: 'Default', price: { amount: 25000, currency: 'INR' }, available: true }]
  },
  {
    id: '11',
    name: 'Minimalist Desk',
    slug: 'minimalist-desk',
    price: 15000,
    originalPrice: 18000,
    image: 'https://picsum.photos/seed/minimalist-desk/400/300.jpg',
    category: 'Minimalist',
    badge: 'Clean',
    description: 'Simple workspace with cable management and storage',
    variants: [{ id: 'default-11', title: 'Default', price: { amount: 15000, currency: 'INR' }, available: true }]
  },
  {
    id: '12',
    name: 'Scandinavian Dining Table',
    slug: 'scandinavian-dining-table',
    price: 28000,
    originalPrice: 35000,
    image: 'https://picsum.photos/seed/scandi-table/400/300.jpg',
    category: 'Scandinavian',
    badge: 'Natural',
    description: 'Light oak finish with simple, elegant design',
    variants: [{ id: 'default-12', title: 'Default', price: { amount: 28000, currency: 'INR' }, available: true }]
  }
];

export default function StylesPage() {
  const { addItem, removeItem, isInWishlist } = useWishlist();
  const { addItem: addToCart } = useCart();
  const [selectedProduct, setSelectedProduct] = useState<any>(null);
  const [isQuickViewOpen, setIsQuickViewOpen] = useState(false);
  const [addedProducts, setAddedProducts] = useState<Set<string>>(new Set());
  const [selectedStyle, setSelectedStyle] = useState<string>('All');

  const styles = ['All', 'Modern', 'Contemporary', 'Minimalist', 'Scandinavian'];
  
  const filteredProducts = selectedStyle === 'All' 
    ? stylesProducts 
    : stylesProducts.filter(product => product.category === selectedStyle);

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
    <div className="min-h-screen bg-gradient-to-b from-indigo-50 to-white">
      {/* Hero Section */}
      <div className="relative bg-gradient-to-r from-indigo-100 via-blue-50 to-indigo-100 py-16 px-4">
        <div className="max-w-7xl mx-auto text-center">
          <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
            Shop By <span className="text-indigo-600">Style</span>
          </h1>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Find your perfect style with our curated collections. From modern minimalism to Scandinavian comfort, discover pieces that match your aesthetic.
          </p>
        </div>
      </div>

      {/* Style Filter */}
      <div className="max-w-7xl mx-auto px-4 py-8">
        <div className="flex flex-wrap justify-center gap-4">
          {styles.map((style) => (
            <button
              key={style}
              onClick={() => setSelectedStyle(style)}
              className={`px-6 py-3 rounded-full font-semibold transition-all duration-200 ${
                selectedStyle === style
                  ? 'bg-indigo-600 text-white shadow-lg'
                  : 'bg-white text-gray-700 hover:bg-indigo-50 border border-gray-300'
              }`}
            >
              {style}
            </button>
          ))}
        </div>
      </div>

      {/* Products Grid */}
      <div className="max-w-7xl mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {filteredProducts.map((product) => (
            <div key={product.id} className="group relative bg-white rounded-lg shadow-md hover:shadow-xl transition-all duration-300 overflow-hidden">
              {/* Product Badge */}
              {product.badge && (
                <div className="absolute top-4 left-4 z-10 bg-indigo-600 text-white px-3 py-1 rounded-full text-sm font-semibold">
                  {product.badge}
                </div>
              )}
              
              {/* Quick Actions */}
              <div className="absolute top-4 right-4 z-10 flex flex-col gap-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                <button 
                  onClick={() => handleWishlistToggle(product)}
                  className="bg-white p-2 rounded-full shadow-md hover:bg-indigo-50 transition-colors duration-200"
                  title="Add to wishlist"
                >
                  <Heart className="w-4 h-4 text-gray-600 hover:text-red-500" />
                </button>
                <button 
                  onClick={() => handleQuickView(product)}
                  className="bg-white p-2 rounded-full shadow-md hover:bg-indigo-50 transition-colors duration-200"
                  title="Quick View"
                >
                  <Eye className="w-4 h-4 text-gray-600 hover:text-indigo-500" />
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
                  <span className="text-xs text-indigo-600 font-medium uppercase tracking-wide">
                    {product.category}
                  </span>
                </div>
                
                <h3 className="text-lg font-semibold text-gray-900 mb-2 line-clamp-2 group-hover:text-indigo-600 transition-colors duration-200">
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
                    <span className="text-xs bg-indigo-100 text-indigo-600 px-2 py-1 rounded-full font-semibold">
                      {calculateDiscount(product.originalPrice, product.price)}% OFF
                    </span>
                  )}
                </div>

                {/* Add to Cart Button */}
                <button 
                  onClick={() => handleAddToCart(product)}
                  className="w-full bg-indigo-600 text-white py-2 px-4 rounded-lg hover:bg-indigo-700 transition-colors duration-200 flex items-center justify-center gap-2 group-hover:bg-indigo-700"
                >
                  <ShoppingBag className="w-4 h-4" />
                  {addedProducts.has(product.id) ? 'Added to Cart!' : 'Add to Cart'}
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Style Descriptions */}
      <div className="bg-gradient-to-r from-indigo-100 to-blue-100 py-16 px-4 mt-16">
        <div className="max-w-6xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            <div className="text-center">
              <h3 className="text-xl font-semibold mb-2 text-indigo-600">Modern</h3>
              <p className="text-gray-600 text-sm">Clean lines, minimal ornamentation, and contemporary materials</p>
            </div>
            <div className="text-center">
              <h3 className="text-xl font-semibold mb-2 text-indigo-600">Contemporary</h3>
              <p className="text-gray-600 text-sm">Current trends with comfortable, livable designs</p>
            </div>
            <div className="text-center">
              <h3 className="text-xl font-semibold mb-2 text-indigo-600">Minimalist</h3>
              <p className="text-gray-600 text-sm">Simple forms, functional design, and clutter-free spaces</p>
            </div>
            <div className="text-center">
              <h3 className="text-xl font-semibold mb-2 text-indigo-600">Scandinavian</h3>
              <p className="text-gray-600 text-sm">Nordic simplicity, natural materials, and cozy comfort</p>
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
