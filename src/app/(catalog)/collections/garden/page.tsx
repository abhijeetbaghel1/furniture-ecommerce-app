'use client';

import { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { Heart, ShoppingBag, Eye } from 'lucide-react';
import { useWishlist } from '@/state/wishlist';
import { useCart } from '@/state/cart';
import QuickViewModal from '@/components/catalog/QuickViewModal';
import { formatPrice, calculateDiscount } from '@/lib/utils/price';

// Mock product data for garden
const gardenProducts = [
  {
    id: '1',
    name: 'Outdoor Furniture Set',
    slug: 'outdoor-furniture-set',
    price: 18000,
    originalPrice: 22000,
    image: '/api/placeholder/400/300',
    category: 'Seating',
    badge: 'Premium',
    description: '4-piece outdoor dining set with weather-resistant cushions and aluminum frame',
    variants: [{ id: 'default-1', title: 'Default', price: { amount: 18000, currency: 'INR' }, available: true }]
  },
  {
    id: '2',
    name: 'Garden Benches',
    slug: 'garden-benches',
    price: 6500,
    originalPrice: 8000,
    image: '/api/placeholder/400/300',
    category: 'Seating',
    badge: 'Classic',
    description: 'Solid wood garden bench with ergonomic design and weather-resistant finish',
    variants: [{ id: 'default-2', title: 'Default', price: { amount: 6500, currency: 'INR' }, available: true }]
  },
  {
    id: '3',
    name: 'Planters Collection',
    slug: 'planters-collection',
    price: 2800,
    originalPrice: 3500,
    image: '/api/placeholder/400/300',
    category: 'Planters',
    badge: 'Decorative',
    description: 'Set of 3 ceramic planters with drainage holes and decorative patterns',
    variants: [{ id: 'default-3', title: 'Default', price: { amount: 2800, currency: 'INR' }, available: true }]
  },
  {
    id: '4',
    name: 'Garden Umbrella',
    slug: 'garden-umbrella',
    price: 4500,
    originalPrice: 5500,
    image: '/api/placeholder/400/300',
    category: 'Shade',
    badge: 'UV Protection',
    description: 'Large patio umbrella with tilt mechanism and fade-resistant canopy',
    variants: [{ id: 'default-4', title: 'Default', price: { amount: 4500, currency: 'INR' }, available: true }]
  },
  {
    id: '5',
    name: 'Outdoor Lights',
    slug: 'outdoor-lights',
    price: 3200,
    originalPrice: 4000,
    image: '/api/placeholder/400/300',
    category: 'Lighting',
    badge: 'Solar',
    description: 'Solar-powered garden lights with warm white LEDs and automatic dusk sensor',
    variants: [{ id: 'default-5', title: 'Default', price: { amount: 3200, currency: 'INR' }, available: true }]
  },
  {
    id: '6',
    name: 'Water Fountain',
    slug: 'water-fountain',
    price: 8500,
    originalPrice: 10000,
    image: '/api/placeholder/400/300',
    category: 'Water Features',
    badge: 'Relaxing',
    description: 'Tiered garden fountain with pump and natural stone finish',
    variants: [{ id: 'default-6', title: 'Default', price: { amount: 8500, currency: 'INR' }, available: true }]
  },
  {
    id: '7',
    name: 'Hanging Baskets',
    slug: 'hanging-baskets',
    price: 1200,
    originalPrice: 1500,
    image: '/api/placeholder/400/300',
    category: 'Planters',
    badge: 'Space-Saving',
    description: 'Set of 3 hanging baskets with chains and coco liners for cascading plants',
    variants: [{ id: 'default-7', title: 'Default', price: { amount: 1200, currency: 'INR' }, available: true }]
  },
  {
    id: '8',
    name: 'Garden Tools Set',
    slug: 'garden-tools-set',
    price: 2200,
    originalPrice: 2800,
    image: '/api/placeholder/400/300',
    category: 'Tools',
    badge: 'Essential',
    description: 'Complete garden tool set with ergonomic handles and storage case',
    variants: [{ id: 'default-8', title: 'Default', price: { amount: 2200, currency: 'INR' }, available: true }]
  },
  {
    id: '9',
    name: 'Outdoor Rugs',
    slug: 'outdoor-rugs',
    price: 3500,
    originalPrice: 4200,
    image: '/api/placeholder/400/300',
    category: 'Flooring',
    badge: 'Weatherproof',
    description: 'All-weather outdoor rug with UV-resistant patterns and easy cleaning',
    variants: [{ id: 'default-9', title: 'Default', price: { amount: 3500, currency: 'INR' }, available: true }]
  },
  {
    id: '10',
    name: 'Bird Feeders',
    slug: 'bird-feeders',
    price: 800,
    originalPrice: 1000,
    image: '/api/placeholder/400/300',
    category: 'Wildlife',
    badge: 'Nature',
    description: 'Decorative bird feeder with seed tray and squirrel-proof design',
    variants: [{ id: 'default-10', title: 'Default', price: { amount: 800, currency: 'INR' }, available: true }]
  },
  {
    id: '11',
    name: 'Garden Statues',
    slug: 'garden-statues',
    price: 5500,
    originalPrice: 6500,
    image: '/api/placeholder/400/300',
    category: 'Decor',
    badge: 'Artistic',
    description: 'Classical garden statue with weather-resistant stone finish',
    variants: [{ id: 'default-11', title: 'Default', price: { amount: 5500, currency: 'INR' }, available: true }]
  },
  {
    id: '12',
    name: 'Compost Bin',
    slug: 'compost-bin',
    price: 2800,
    originalPrice: 3500,
    image: '/api/placeholder/400/300',
    category: 'Eco',
    badge: 'Sustainable',
    description: 'Large capacity compost bin with ventilation and easy access door',
    variants: [{ id: 'default-12', title: 'Default', price: { amount: 2800, currency: 'INR' }, available: true }]
  }
];

export default function GardenPage() {
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
    <div className="min-h-screen bg-gradient-to-b from-green-50 to-white">
      {/* Hero Section */}
      <div className="relative bg-gradient-to-r from-green-100 via-emerald-50 to-green-100 py-16 px-4">
        <div className="max-w-7xl mx-auto text-center">
          <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
            Garden <span className="text-green-600">Collection</span>
          </h1>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Create your outdoor paradise with our premium garden collection. From comfortable seating to decorative accents, transform your garden into a beautiful retreat.
          </p>
        </div>
      </div>

      {/* Products Grid */}
      <div className="max-w-7xl mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {gardenProducts.map((product) => (
            <div key={product.id} className="group relative bg-white rounded-lg shadow-md hover:shadow-xl transition-all duration-300 overflow-hidden">
              {/* Product Badge */}
              {product.badge && (
                <div className="absolute top-4 left-4 z-10 bg-green-500 text-white px-3 py-1 rounded-full text-sm font-semibold">
                  {product.badge}
                </div>
              )}
              
              {/* Quick Actions */}
              <div className="absolute top-4 right-4 z-10 flex flex-col gap-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                <button 
                  onClick={() => handleWishlistToggle(product)}
                  className="bg-white p-2 rounded-full shadow-md hover:bg-green-50 transition-colors duration-200"
                  title="Add to wishlist"
                >
                  <Heart className="w-4 h-4 text-gray-600 hover:text-red-500" />
                </button>
                <button 
                  onClick={() => handleQuickView(product)}
                  className="bg-white p-2 rounded-full shadow-md hover:bg-green-50 transition-colors duration-200"
                  title="Quick View"
                >
                  <Eye className="w-4 h-4 text-gray-600 hover:text-green-500" />
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
                  <span className="text-xs text-green-600 font-medium uppercase tracking-wide">
                    {product.category}
                  </span>
                </div>
                
                <h3 className="text-lg font-semibold text-gray-900 mb-2 line-clamp-2 group-hover:text-green-600 transition-colors duration-200">
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
                  className="w-full bg-green-500 text-white py-2 px-4 rounded-lg hover:bg-green-600 transition-colors duration-200 flex items-center justify-center gap-2 group-hover:bg-green-600"
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
      <div className="bg-gradient-to-r from-green-100 to-emerald-100 py-16 px-4 mt-16">
        <div className="max-w-6xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="text-center">
              <div className="w-16 h-16 bg-green-500 rounded-full flex items-center justify-center mx-auto mb-4">
                <Heart className="w-8 h-8 text-white" />
              </div>
              <h3 className="text-xl font-semibold mb-2">Weather Resistant</h3>
              <p className="text-gray-600">Durable materials designed to withstand outdoor conditions</p>
            </div>
            <div className="text-center">
              <div className="w-16 h-16 bg-green-500 rounded-full flex items-center justify-center mx-auto mb-4">
                <ShoppingBag className="w-8 h-8 text-white" />
              </div>
              <h3 className="text-xl font-semibold mb-2">Eco-Friendly</h3>
              <p className="text-gray-600">Sustainable materials and environmentally conscious designs</p>
            </div>
            <div className="text-center">
              <div className="w-16 h-16 bg-green-500 rounded-full flex items-center justify-center mx-auto mb-4">
                <Eye className="w-8 h-8 text-white" />
              </div>
              <h3 className="text-xl font-semibold mb-2">Low Maintenance</h3>
              <p className="text-gray-600">Easy to clean and maintain for lasting beauty</p>
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
