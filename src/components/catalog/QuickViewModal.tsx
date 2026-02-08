'use client';

import { useState } from 'react';
import Image from 'next/image';
import { X, Heart, ShoppingBag, Eye } from 'lucide-react';
import { useWishlist } from '@/state/wishlist';
import { useCart } from '@/state/cart';
import { formatPrice } from '@/lib/utils/format';

interface QuickViewModalProps {
  product: any;
  isOpen: boolean;
  onClose: () => void;
}

export default function QuickViewModal({ product, isOpen, onClose }: QuickViewModalProps) {
  const { addItem, removeItem, isInWishlist } = useWishlist();
  const { addItem: addToCart } = useCart();
  const [selectedImageIndex, setSelectedImageIndex] = useState(0);
  const [quantity, setQuantity] = useState(1);
  const [addedToCart, setAddedToCart] = useState(false);

  if (!isOpen || !product) return null;

  const variant = product.variants[0];
  const inWishlist = isInWishlist(product.id, variant.id);

  const handleWishlistToggle = () => {
    if (inWishlist) {
      removeItem(product.id, variant.id);
    } else {
      addItem(product, variant);
    }
  };

  const handleAddToCart = () => {
    addToCart(product, variant, quantity);
    setAddedToCart(true);
    setTimeout(() => setAddedToCart(false), 2000);
  };

  const images = [product.image]; // TODO: Add support for multiple images

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto">
      {/* Backdrop */}
      <div 
        className="fixed inset-0 bg-black bg-opacity-50 transition-opacity"
        onClick={onClose}
      />

      {/* Modal */}
      <div className="relative min-h-screen flex items-center justify-center p-4">
        <div className="relative bg-white rounded-lg max-w-4xl w-full max-h-[90vh] overflow-hidden shadow-2xl">
          {/* Close Button */}
          <button
            onClick={onClose}
            className="absolute top-4 right-4 z-10 bg-white p-2 rounded-full shadow-md hover:bg-gray-100 transition-colors duration-200"
          >
            <X className="w-5 h-5 text-gray-600" />
          </button>

          <div className="flex flex-col lg:flex-row">
            {/* Image Section */}
            <div className="lg:w-1/2 bg-gray-50">
              <div className="relative aspect-square lg:aspect-auto lg:h-full">
                <Image
                  src={images[selectedImageIndex]}
                  alt={product.title}
                  fill
                  className="object-cover"
                  onError={(e) => {
                    const target = e.target as HTMLImageElement;
                    target.onerror = null;
                    target.src = `data:image/svg+xml,%3Csvg width='400' height='400' xmlns='http://www.w3.org/2000/svg'%3E%3Crect width='100%25' height='100%25' fill='%23f3f4f6'/%3E%3Ctext x='50%25' y='50%25' font-family='Arial' font-size='16' fill='%239ca3af' text-anchor='middle' dy='.3em'%3E${product.title}%3C/text%3E%3C/svg%3E`;
                  }}
                />
                
                {/* Image Navigation */}
                {images.length > 1 && (
                  <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 flex gap-2">
                    {images.map((_, index) => (
                      <button
                        key={index}
                        onClick={() => setSelectedImageIndex(index)}
                        className={`w-2 h-2 rounded-full transition-colors duration-200 ${
                          index === selectedImageIndex ? 'bg-orange-500' : 'bg-white bg-opacity-50'
                        }`}
                      />
                    ))}
                  </div>
                )}
              </div>
            </div>

            {/* Product Details Section */}
            <div className="lg:w-1/2 p-6 lg:p-8">
              {/* Product Badge */}
              {product.badge && (
                <div className="inline-block bg-orange-500 text-white px-3 py-1 rounded-full text-sm font-semibold mb-4">
                  {product.badge}
                </div>
              )}

              {/* Product Title */}
              <h2 className="text-2xl lg:text-3xl font-bold text-gray-900 mb-2">
                {product.title}
              </h2>

              {/* Category */}
              <p className="text-sm text-orange-600 font-medium uppercase tracking-wide mb-4">
                {product.category}
              </p>

              {/* Price */}
              <div className="flex items-center gap-3 mb-6">
                <span className="text-2xl lg:text-3xl font-bold text-gray-900">
                  {formatPrice(product.price, 'INR')}
                </span>
                {product.originalPrice && (
                  <>
                    <span className="text-lg text-gray-500 line-through">
                      {formatPrice(product.originalPrice, 'INR')}
                    </span>
                    <span className="text-sm bg-red-100 text-red-600 px-2 py-1 rounded-full font-semibold">
                      {Math.round(((product.originalPrice - product.price) / product.originalPrice) * 100)}% OFF
                    </span>
                  </>
                )}
              </div>

              {/* Description */}
              <div className="mb-6">
                <h3 className="font-semibold text-gray-900 mb-2">Description</h3>
                <p className="text-gray-600 leading-relaxed">
                  {product.description}
                </p>
              </div>

              {/* Quantity Selector */}
              <div className="mb-6">
                <h3 className="font-semibold text-gray-900 mb-2">Quantity</h3>
                <div className="flex items-center gap-3">
                  <button
                    onClick={() => setQuantity(Math.max(1, quantity - 1))}
                    className="w-10 h-10 rounded-lg border border-gray-300 flex items-center justify-center hover:bg-gray-100 transition-colors duration-200"
                  >
                    -
                  </button>
                  <span className="w-12 text-center font-semibold">{quantity}</span>
                  <button
                    onClick={() => setQuantity(quantity + 1)}
                    className="w-10 h-10 rounded-lg border border-gray-300 flex items-center justify-center hover:bg-gray-100 transition-colors duration-200"
                  >
                    +
                  </button>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="flex gap-3 mb-6">
                <button
                  onClick={handleAddToCart}
                  className="flex-1 bg-orange-500 text-white py-3 px-6 rounded-lg hover:bg-orange-600 transition-colors duration-200 flex items-center justify-center gap-2 font-semibold"
                >
                  <ShoppingBag className="w-5 h-5" />
                  {addedToCart ? 'Added to Cart!' : 'Add to Cart'}
                </button>
                <button
                  onClick={handleWishlistToggle}
                  className="w-12 h-12 rounded-lg border border-gray-300 flex items-center justify-center hover:bg-orange-50 transition-colors duration-200"
                  title={inWishlist ? 'Remove from wishlist' : 'Add to wishlist'}
                >
                  <Heart 
                    className={`w-5 h-5 transition-colors duration-200 ${
                      inWishlist ? 'text-red-500 fill-current' : 'text-gray-600 hover:text-red-500'
                    }`} 
                  />
                </button>
              </div>

              {/* Product Info */}
              <div className="border-t pt-6">
                <div className="grid grid-cols-2 gap-4 text-sm">
                  <div>
                    <span className="text-gray-500">Availability:</span>
                    <span className="ml-2 font-medium text-green-600">In Stock</span>
                  </div>
                  <div>
                    <span className="text-gray-500">SKU:</span>
                    <span className="ml-2 font-medium">{product.id}</span>
                  </div>
                </div>
              </div>

              {/* View Full Details Link */}
              <div className="mt-6 text-center">
                <button
                  onClick={onClose}
                  className="text-orange-600 hover:text-orange-700 font-medium text-sm"
                >
                  View full product details →
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
