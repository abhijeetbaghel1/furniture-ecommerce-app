'use client';

import Link from 'next/link';
import Image from 'next/image';
import type { Product } from '@/lib/types';
import { formatPrice } from '@/lib/utils/format';
import PriceBadge from './PriceBadge';
import ReadyToShipTag from './ReadyToShipTag';

interface ProductCardProps {
  product: Product;
}

export default function ProductCard({ product }: ProductCardProps) {
  const variant = product.variants[0];
  const price = variant.price;
  const image = product.images[0] || 'https://via.placeholder.com/400x400?text=Product';

  return (
    <Link
      href={`/products/${product.handle}`}
      className="group block bg-white rounded-lg overflow-hidden shadow-card hover:shadow-card-hover transition-shadow"
    >
      <div className="relative aspect-square overflow-hidden bg-neutral-100">
        <Image
          src={image}
          alt={product.title}
          fill
          className="object-cover group-hover:scale-105 transition-transform duration-300"
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
        />
        {product.availability === 'READY_TO_SHIP' && (
          <div className="absolute top-2 right-2">
            <ReadyToShipTag />
          </div>
        )}
        {price.compareAtAmount && (
          <div className="absolute top-2 left-2">
            <PriceBadge
              price={price.amount}
              compareAtPrice={price.compareAtAmount}
            />
          </div>
        )}
      </div>
      <div className="p-4">
        <h3 className="font-semibold text-lg mb-1 group-hover:text-accent-walnut transition-colors">
          {product.title}
        </h3>
        <p className="text-accent-walnut font-medium">
          {formatPrice(price.amount, price.currency)}
          {price.compareAtAmount && (
            <span className="ml-2 text-neutral-500 line-through text-sm">
              {formatPrice(price.compareAtAmount, price.currency)}
            </span>
          )}
        </p>
      </div>
    </Link>
  );
}

