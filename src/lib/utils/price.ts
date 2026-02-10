/**
 * Format price consistently to avoid hydration errors
 * Uses locale 'en-IN' for consistent Indian Rupee formatting
 */
export function formatPrice(amount: number): string {
  return amount.toLocaleString('en-IN');
}

/**
 * Calculate discount percentage
 */
export function calculateDiscount(originalPrice: number, currentPrice: number): number {
  return Math.round(((originalPrice - currentPrice) / originalPrice) * 100);
}
