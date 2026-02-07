'use client';

import Image from 'next/image';
import Link from 'next/link';
import { Heart, ShoppingBag, Trash2, Eye } from 'lucide-react';
import { useWishlist } from '@/state/wishlist';

export default function WishlistPage() {
  const { items, removeItem, clear, isInWishlist } = useWishlist();

  const handleRemoveItem = (productId: string, variantId: string) => {
    removeItem(productId, variantId);
  };

  const handleClearWishlist = () => {
    if (window.confirm('Are you sure you want to clear your entire wishlist?')) {
      clear();
    }
  };

  if (items.length === 0) {
    return (
      <div className="min-h-screen bg-gradient-to-b from-orange-50 to-white">
        <div className="max-w-4xl mx-auto px-4 py-16">
          <div className="text-center">
            <div className="w-24 h-24 bg-orange-100 rounded-full flex items-center justify-center mx-auto mb-6">
              <Heart className="w-12 h-12 text-orange-400" />
            </div>
            <h1 className="text-3xl font-bold text-gray-900 mb-4">
              Your Wishlist is Empty
            </h1>
            <p className="text-lg text-gray-600 mb-8 max-w-2xl mx-auto">
              Start adding your favorite furniture pieces to your wishlist. Save items for later and never lose track of what you love.
            </p>
            <Link
              href="/collections"
              className="inline-flex items-center bg-orange-500 text-white px-6 py-3 rounded-lg hover:bg-orange-600 transition-colors duration-200 font-semibold"
            >
              <ShoppingBag className="w-5 h-5 mr-2" />
              Start Shopping
            </Link>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-orange-50 to-white">
      {/* Header */}
      <div className="bg-gradient-to-r from-orange-100 via-amber-50 to-orange-100 py-12 px-4">
        <div className="max-w-6xl mx-auto">
          <div className="flex justify-between items-center">
            <div>
              <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-2">
                My <span className="text-orange-600">Wishlist</span>
              </h1>
              <p className="text-gray-600">
                You have {items.length} {items.length === 1 ? 'item' : 'items'} in your wishlist
              </p>
            </div>
            {items.length > 0 && (
              <button
                onClick={handleClearWishlist}
                className="bg-red-500 text-white px-4 py-2 rounded-lg hover:bg-red-600 transition-colors duration-200 flex items-center gap-2"
              >
                <Trash2 className="w-4 h-4" />
                Clear All
              </button>
            )}
          </div>
        </div>
      </div>

      {/* Wishlist Items */}
      <div className="max-w-6xl mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {items.map((item) => (
            <div key={`${item.productId}-${item.variantId}`} className="group relative bg-white rounded-lg shadow-md hover:shadow-xl transition-all duration-300 overflow-hidden">
              {/* Quick Actions */}
              <div className="absolute top-4 right-4 z-10 flex gap-2">
                <button className="bg-white p-2 rounded-full shadow-md hover:bg-orange-50 transition-colors duration-200">
                  <Eye className="w-4 h-4 text-gray-600 hover:text-orange-500" />
                </button>
                <button
                  onClick={() => handleRemoveItem(item.productId, item.variantId)}
                  className="bg-white p-2 rounded-full shadow-md hover:bg-red-50 transition-colors duration-200"
                  title="Remove from wishlist"
                >
                  <Trash2 className="w-4 h-4 text-gray-600 hover:text-red-500" />
                </button>
              </div>

              {/* Product Image */}
              <div className="relative aspect-[4/3] overflow-hidden bg-gray-100">
                <Image
                  src="/api/placeholder/400/300"
                  alt={item.product.title}
                  fill
                  className="object-cover group-hover:scale-105 transition-transform duration-300"
                />
              </div>

              {/* Product Info */}
              <div className="p-4">
                <div className="mb-2">
                  <span className="text-xs text-orange-600 font-medium uppercase tracking-wide">
                    {item.product.collection || 'Furniture'}
                  </span>
                </div>
                
                <h3 className="text-lg font-semibold text-gray-900 mb-2 line-clamp-2 group-hover:text-orange-600 transition-colors duration-200">
                  <Link href={`/products/${item.product.handle}`}>
                    {item.product.title}
                  </Link>
                </h3>
                
                <p className="text-sm text-gray-600 mb-3 line-clamp-2">
                  {item.product.description}
                </p>
                
                {/* Variant Info */}
                <div className="mb-3">
                  <p className="text-xs text-gray-500">Variant: {item.variant.title}</p>
                  <p className="text-xs text-gray-500">
                    {item.variant.available ? 'In Stock' : 'Out of Stock'}
                  </p>
                </div>
                
                {/* Price */}
                <div className="flex items-center justify-between mb-3">
                  <span className="text-xl font-bold text-gray-900">
                    ₹{item.variant.price.amount.toLocaleString()}
                  </span>
                  {item.variant.price.compareAtAmount && (
                    <span className="text-sm text-gray-500 line-through">
                      ₹{item.variant.price.compareAtAmount.toLocaleString()}
                    </span>
                  )}
                </div>

                {/* Action Buttons */}
                <div className="flex gap-2">
                  <Link
                    href={`/products/${item.product.handle}`}
                    className="flex-1 bg-orange-500 text-white py-2 px-4 rounded-lg hover:bg-orange-600 transition-colors duration-200 text-center font-medium"
                  >
                    View Details
                  </Link>
                  <button className="flex-1 bg-gray-900 text-white py-2 px-4 rounded-lg hover:bg-gray-800 transition-colors duration-200 font-medium flex items-center justify-center gap-2">
                    <ShoppingBag className="w-4 h-4" />
                    Add to Cart
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Continue Shopping Section */}
      <div className="bg-gradient-to-r from-orange-100 to-amber-100 py-16 px-4 mt-16">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-2xl font-bold text-gray-900 mb-4">
            Ready to Add More to Your Wishlist?
          </h2>
          <p className="text-gray-600 mb-8 max-w-2xl mx-auto">
            Explore our complete collection and find more furniture pieces you'll love.
          </p>
          <Link
            href="/collections"
            className="inline-flex items-center bg-orange-500 text-white px-6 py-3 rounded-lg hover:bg-orange-600 transition-colors duration-200 font-semibold"
          >
            <ShoppingBag className="w-5 h-5 mr-2" />
            Continue Shopping
          </Link>
        </div>
      </div>
    </div>
  );
}
