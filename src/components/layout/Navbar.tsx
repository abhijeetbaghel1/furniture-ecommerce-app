'use client';

import Link from 'next/link';
import { useState, useEffect } from 'react';
import { usePathname } from 'next/navigation';
import { siteConfig } from '@/lib/config/site';
import { useCart } from '@/state/cart';
import { useWishlist } from '@/state/wishlist';
import { cn } from '@/lib/utils';
import { XMarkIcon } from '@heroicons/react/24/outline';
import {
  Search,
  ShoppingBag,
  Heart,
  Menu,
  ChevronDown,
  Phone,
  Mail,
  MapPin,
  User,
} from 'lucide-react';

// Aliases for consistency
const SearchIcon = Search;
const MenuIcon = Menu;
const Bars3Icon = Menu;
const ShoppingBagIcon = ShoppingBag;
const UserIcon = User;
const HeartIcon = Heart;

// Define types for navigation items
interface NavItem {
  label: string;
  href: string;
  subItems?: { label: string; href: string }[];
}

// Mock data for dropdown items - replace with your actual data
const NAV_ITEMS: NavItem[] = [
  {
    label: 'Featured',
    href: '/collections/featured',
    subItems: [
      { label: 'All Featured', href: '/collections/featured' },
      { label: 'Premium Selection', href: '/collections/featured/premium' },
      { label: 'Editor\'s Choice', href: '/collections/featured/editors-choice' },
      { label: 'Trending Now', href: '/collections/featured/trending' },
    ]
  },
  {
    label: 'Furniture',
    href: '/collections/furniture',
    subItems: [
      { label: 'All Furniture', href: '/collections/furniture' },
      { label: 'Sofas', href: '/collections/furniture/sofas' },
      { label: 'Chairs', href: '/collections/furniture/chairs' },
      { label: 'Tables', href: '/collections/furniture/tables' },
      { label: 'Beds', href: '/collections/furniture/beds' },
      { label: 'Storage', href: '/collections/furniture/storage' },
    ]
  },
  {
    label: 'Lighting',
    href: '/collections/lighting',
    subItems: [
      { label: 'All Lighting', href: '/collections/lighting' },
      { label: 'Ceiling Lights', href: '/collections/lighting/ceiling-lights' },
      { label: 'Table Lamps', href: '/collections/lighting/table-lamps' },
      { label: 'Floor Lamps', href: '/collections/lighting/floor-lamps' },
      { label: 'Wall Lights', href: '/collections/lighting/wall-lights' },
    ]
  },
  {
    label: 'Decor',
    href: '/collections/decor',
    subItems: [
      { label: 'All Decor', href: '/collections/decor' },
      { label: 'Wall Art', href: '/collections/decor/wall-art' },
      { label: 'Mirrors', href: '/collections/decor/mirrors' },
      { label: 'Cushions', href: '/collections/decor/cushions' },
      { label: 'Vases', href: '/collections/decor/vases' },
    ]
  },
  {
    label: 'Garden',
    href: '/collections/garden',
    subItems: [
      { label: 'All Garden', href: '/collections/garden' },
      { label: 'Outdoor Furniture', href: '/collections/garden/outdoor-furniture' },
      { label: 'Planters', href: '/collections/garden/planters' },
      { label: 'Garden Decor', href: '/collections/garden/garden-decor' },
    ]
  },
  {
    label: 'Shop By Style',
    href: '/collections/styles',
    subItems: [
      { label: 'All Styles', href: '/collections/styles' },
      { label: 'Modern', href: '/collections/styles/modern' },
      { label: 'Contemporary', href: '/collections/styles/contemporary' },
      { label: 'Minimalist', href: '/collections/styles/minimalist' },
      { label: 'Scandinavian', href: '/collections/styles/scandinavian' },
    ]
  },
  {
    label: 'Clearance Sale',
    href: '/collections/clearance-sale',
    subItems: [
      { label: 'All Deals', href: '/collections/clearance-sale' },
      { label: 'Furniture Deals', href: '/collections/clearance-sale/furniture-deals' },
      { label: 'Lighting Deals', href: '/collections/clearance-sale/lighting-deals' },
      { label: 'Decor Deals', href: '/collections/clearance-sale/decor-deals' },
    ]
  },
  {
    label: 'Collections',
    href: '/collections',
    subItems: [
      { label: 'New Arrivals', href: '/collections/new-arrivals' },
      { label: 'Best Sellers', href: '/collections/best-sellers' },
      { label: 'Living Room', href: '/collections/living-room' },
      { label: 'Bedroom', href: '/collections/bedroom' },
      { label: 'Dining Room', href: '/collections/dining-room' },
      { label: 'Office', href: '/collections/office' },
      { label: 'Outdoor', href: '/collections/outdoor' },
    ]
  },
  {
    label: 'Wishlist',
    href: '/wishlist',
  },
  {
    label: 'Cart',
    href: '/cart',
  },
];

// Navigation Item Component
const NavItem = ({ item }: { item: NavItem }) => {
  const [isHovered, setIsHovered] = useState(false);
  const hasSubItems = item.subItems && item.subItems.length > 0;

  return (
    <div 
      className="relative group h-full flex items-center"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <Link
        href={item.href}
        className={`flex items-center py-6 px-3 text-gray-800 hover:text-accent-walnut transition-all duration-300 font-medium text-sm uppercase tracking-wider relative group/nav-link ${
          isHovered ? 'text-accent-walnut' : ''
        }`}
      >
        <span className="relative">
          {item.label}
          <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-accent-walnut transition-all duration-300 group-hover/nav-link:w-full"></span>
        </span>
        {hasSubItems && (
          <ChevronDown 
            className={`ml-1 h-4 w-4 transition-all duration-300 transform ${
              isHovered ? 'rotate-180' : 'group-hover:translate-y-0.5'
            }`} 
          />
        )}
      </Link>

      {/* Dropdown Menu */}
      {hasSubItems && (
        <div 
          className={`absolute left-0 top-full w-56 bg-white shadow-lg z-50 border-t-2 border-accent-walnut transition-all duration-300 transform origin-top ${
            isHovered ? 'opacity-100 scale-y-100' : 'opacity-0 scale-y-95 pointer-events-none'
          }`}
          onMouseEnter={() => setIsHovered(true)}
          onMouseLeave={() => setIsHovered(false)}
          style={{
            transitionTimingFunction: 'cubic-bezier(0.4, 0, 0.2, 1)',
            transitionProperty: 'opacity, transform',
          }}
        >
          <div className="py-2">
            {item.subItems?.map((subItem, index) => (
              <Link
                key={subItem.href}
                href={subItem.href}
                className="block px-6 py-2.5 text-sm text-gray-700 hover:bg-gray-50 hover:text-accent-walnut transition-all duration-200 transform hover:translate-x-1"
                style={{
                  transitionDelay: isHovered ? `${index * 30}ms` : '0ms',
                  opacity: isHovered ? 1 : 0,
                  transform: isHovered ? 'translateX(0)' : 'translateX(-10px)',
                  transition: 'opacity 0.3s ease, transform 0.3s ease',
                }}
              >
                {subItem.label}
              </Link>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

// Mobile Menu Component
function MobileMenu({ 
  isOpen, 
  onClose, 
  items, 
  activeSubMenu, 
  setActiveSubMenu 
}: { 
  isOpen: boolean; 
  onClose: () => void; 
  items: NavItem[]; 
  activeSubMenu: string | null; 
  setActiveSubMenu: (label: string | null) => void 
}) {
  // Add animation classes based on isOpen state
  const [isVisible, setIsVisible] = useState(false);
  const [isAnimating, setIsAnimating] = useState(false);

  useEffect(() => {
    if (isOpen) {
      setIsVisible(true);
      setIsAnimating(true);
      document.body.style.overflow = 'hidden';
    } else {
      setIsAnimating(false);
      const timer = setTimeout(() => {
        setIsVisible(false);
        document.body.style.overflow = '';
      }, 300); // Match this with the transition duration
      return () => clearTimeout(timer);
    }
  }, [isOpen]);

  if (!isVisible) return null;

  return (
    <div 
      className={`fixed inset-0 z-50 overflow-y-auto bg-gradient-to-b from-orange-50 to-amber-50 transform transition-all duration-300 ease-in-out ${
        isAnimating ? 'opacity-100 translate-x-0' : 'opacity-0 -translate-x-full'
      }`}
    >
      <div className="flex items-center justify-between p-4 border-b border-orange-200 bg-white/80 backdrop-blur-sm sticky top-0 z-10 shadow-sm">
        <div className="flex items-center space-x-3 group">
          {/* Circular Logo with Your Image */}
          <div className="w-12 h-12 rounded-full bg-accent-walnut flex items-center justify-center overflow-hidden shadow-lg ring-2 ring-orange-300">
            <img 
              src="/das.png.png" 
              alt="Das Cane Art Logo" 
              className="w-full h-full object-cover"
            />
          </div>
          {/* Brand Text */}
          <Link 
            href="/" 
            className="text-xl font-serif font-bold text-gray-900 tracking-wider hover:text-accent-walnut transition-all duration-300 transform hover:scale-105"
            onClick={onClose}
          >
            <span className="relative">
              Das
              <span className="text-accent-walnut">Cane</span>
              Art
              <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-accent-walnut transition-all duration-300 group-hover:w-full"></span>
            </span>
          </Link>
        </div>
        <button 
          onClick={onClose}
          className="p-2 text-gray-500 hover:text-accent-walnut transition-colors duration-200 hover:bg-orange-100 rounded-full"
        >
          <XMarkIcon className="h-6 w-6" />
        </button>
      </div>

      <div className="divide-y divide-orange-200">
        {items.map((item) => (
          <div key={item.href} className="border-b border-orange-100">
            <div 
              className="flex items-center justify-between px-4 py-4 text-gray-900 font-medium transition-all duration-200 hover:bg-orange-100"
              onClick={() => {
                if (item.subItems && item.subItems.length > 0) {
                  setActiveSubMenu(activeSubMenu === item.label ? null : item.label);
                } else {
                  onClose();
                }
              }}
            >
              <Link 
                href={item.href}
                className="flex-1"
                onClick={(e) => {
                  if (item.subItems && item.subItems.length > 0) {
                    e.preventDefault();
                  }
                }}
              >
                {item.label === 'Clearance Sale' ? (
                  <span className="text-red-600 font-bold">{item.label}</span>
                ) : (
                  item.label
                )}
              </Link>
              {item.subItems && item.subItems.length > 0 && (
                <ChevronDown 
                  className={`h-5 w-5 transition-transform text-orange-500 ${
                    activeSubMenu === item.label ? 'transform rotate-180' : ''
                  }`}
                />
              )}
            </div>
            
            {item.subItems && item.subItems.length > 0 && activeSubMenu === item.label && (
              <div className="bg-orange-50 pl-6">
                {item.subItems.map((subItem) => (
                  <Link
                    key={subItem.href}
                    href={subItem.href}
                    className="block py-3 px-4 text-sm text-gray-700 hover:bg-orange-100 transition-all duration-200"
                    onClick={onClose}
                  >
                    {subItem.label}
                  </Link>
                ))}
              </div>
            )}
          </div>
        ))}
      </div>

      <div className="fixed bottom-0 left-0 right-0 bg-white/90 backdrop-blur-sm border-t border-orange-200 p-4">
        <div className="flex justify-between items-center">
          <Link 
            href="/account" 
            className="text-gray-700 hover:text-accent-walnut transition-colors duration-200"
            onClick={onClose}
          >
            My Account
          </Link>
          <Link 
            href="/contact" 
            className="text-gray-700 hover:text-accent-walnut transition-colors duration-200"
            onClick={onClose}
          >
            Contact Us
          </Link>
        </div>
      </div>
    </div>
  );
}

export default function Navbar() {
  const pathname = usePathname();
  const { items: cartItems, getTotalItems } = useCart();
  const totalItems = getTotalItems();
  const { items: wishlistItems, addItem, removeItem, isInWishlist } = useWishlist();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [mobileSubMenu, setMobileSubMenu] = useState<string | null>(null);
  const [searchResults, setSearchResults] = useState<any[]>([]);
  const [isSearchOpen, setIsSearchOpen] = useState(false);

  // Mock product data for search
  const allProducts = [
    { 
      id: '1', 
      name: 'Modern Sofa Set', 
      handle: 'modern-sofa-set', 
      price: 45000, 
      category: 'Living Room',
      variants: [{ id: 'default-1', title: 'Default', price: { amount: 45000, currency: 'INR' }, available: true }]
    },
    { 
      id: '2', 
      name: 'Luxury Dining Table', 
      handle: 'luxury-dining-table', 
      price: 35000, 
      category: 'Dining Room',
      variants: [{ id: 'default-2', title: 'Default', price: { amount: 35000, currency: 'INR' }, available: true }]
    },
    { 
      id: '3', 
      name: 'Designer Coffee Table', 
      handle: 'designer-coffee-table', 
      price: 12000, 
      category: 'Living Room',
      variants: [{ id: 'default-3', title: 'Default', price: { amount: 12000, currency: 'INR' }, available: true }]
    },
    { 
      id: '4', 
      name: 'Elegant Wardrobe', 
      handle: 'elegant-wardrobe', 
      price: 28000, 
      category: 'Bedroom',
      variants: [{ id: 'default-4', title: 'Default', price: { amount: 28000, currency: 'INR' }, available: true }]
    },
    { 
      id: '5', 
      name: 'Stylish Bookshelf', 
      handle: 'stylish-bookshelf', 
      price: 8000, 
      category: 'Living Room',
      variants: [{ id: 'default-5', title: 'Default', price: { amount: 8000, currency: 'INR' }, available: true }]
    },
    { 
      id: '6', 
      name: 'Premium Ottoman', 
      handle: 'premium-ottoman', 
      price: 6000, 
      category: 'Living Room',
      variants: [{ id: 'default-6', title: 'Default', price: { amount: 6000, currency: 'INR' }, available: true }]
    },
    { 
      id: '7', 
      name: 'Contemporary Mirror', 
      handle: 'contemporary-mirror', 
      price: 4000, 
      category: 'Decor',
      variants: [{ id: 'default-7', title: 'Default', price: { amount: 4000, currency: 'INR' }, available: true }]
    },
    { 
      id: '8', 
      name: 'Designer Console', 
      handle: 'designer-console', 
      price: 9000, 
      category: 'Living Room',
      variants: [{ id: 'default-8', title: 'Default', price: { amount: 9000, currency: 'INR' }, available: true }]
    },
    { 
      id: '9', 
      name: 'Classic Leather Sofa', 
      handle: 'classic-leather-sofa', 
      price: 65000, 
      category: 'Living Room',
      variants: [{ id: 'default-9', title: 'Default', price: { amount: 65000, currency: 'INR' }, available: true }]
    },
    { 
      id: '10', 
      name: 'Wooden Dining Set', 
      handle: 'wooden-dining-set', 
      price: 45000, 
      category: 'Dining Room',
      variants: [{ id: 'default-10', title: 'Default', price: { amount: 45000, currency: 'INR' }, available: true }]
    },
    { 
      id: '11', 
      name: 'Executive Office Chair', 
      handle: 'executive-office-chair', 
      price: 15000, 
      category: 'Office',
      variants: [{ id: 'default-11', title: 'Default', price: { amount: 15000, currency: 'INR' }, available: true }]
    },
    { 
      id: '12', 
      name: 'King Size Bed Frame', 
      handle: 'king-size-bed-frame', 
      price: 22000, 
      category: 'Bedroom',
      variants: [{ id: 'default-12', title: 'Default', price: { amount: 22000, currency: 'INR' }, available: true }]
    },
  ];

  // Handle search functionality
  const handleSearch = (query: string) => {
    setSearchQuery(query);
    if (query.trim() === '') {
      setSearchResults([]);
      setIsSearchOpen(false);
      return;
    }

    const filtered = allProducts.filter(product =>
      product.name.toLowerCase().includes(query.toLowerCase()) ||
      product.category.toLowerCase().includes(query.toLowerCase())
    );
    setSearchResults(filtered);
    setIsSearchOpen(true);
  };

  // Handle wishlist toggle
  const handleWishlistToggle = (product: any) => {
    const variant = product.variants[0];
    if (isInWishlist(product.id, variant.id)) {
      removeItem(product.id, variant.id);
    } else {
      addItem(product, variant);
    }
  };

  // Close mobile menu when route changes
  useEffect(() => {
    setMobileMenuOpen(false);
  }, [pathname]);

  // Close search when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      const target = event.target as HTMLElement;
      if (!target.closest('.search-container')) {
        setIsSearchOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  return (
    <header className="w-full bg-gradient-to-r from-amber-50 via-white to-orange-50 border-b border-orange-200 sticky top-0 z-40 shadow-lg">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Top Bar */}
        <div className="flex justify-between items-center h-16">
          {/* Mobile menu button */}
          <div className="flex items-center md:hidden">
            <button
              type="button"
              className="p-2 text-gray-700 hover:text-accent-walnut transition-all duration-300 hover:bg-orange-100 rounded-lg"
              onClick={() => setMobileMenuOpen(true)}
            >
              <Bars3Icon className="h-6 w-6" />
            </button>
          </div>

          {/* Logo with Circular Design and Das Cane Art Text */}
          <div className="flex items-center space-x-3 flex-shrink-0 group">
            {/* Circular Logo with Your Image */}
            <div className="w-14 h-14 rounded-full bg-accent-walnut flex items-center justify-center overflow-hidden shadow-lg ring-2 ring-orange-300">
              <img 
                src="/das.png.png" 
                alt="Das Cane Art Logo" 
                className="w-full h-full object-cover"
              />
            </div>
            {/* Brand Text */}
            <Link href="/" className="text-2xl font-serif font-bold text-gray-900 tracking-wider hover:text-accent-walnut transition-all duration-300 transform hover:scale-105">
              <span className="relative">
                Das
                <span className="text-accent-walnut">Cane</span>
                Art
                <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-accent-walnut transition-all duration-300 group-hover:w-full"></span>
              </span>
            </Link>
          </div>

          {/* Search Bar - Always Visible */}
          <div className="hidden md:flex flex-1 max-w-md mx-6">
            <div className="relative w-full search-container">
              <input
                type="text"
                placeholder="Search for premium furniture..."
                className="w-full pl-4 pr-10 py-3 border-2 border-orange-200 rounded-full focus:outline-none focus:ring-2 focus:ring-orange-300 focus:border-transparent bg-white/80 backdrop-blur-sm transition-all duration-300"
                value={searchQuery}
                onChange={(e) => handleSearch(e.target.value)}
                onFocus={() => searchQuery && setIsSearchOpen(true)}
              />
              <SearchIcon className="absolute right-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-orange-400 group-focus-within:text-orange-500 transition-colors duration-300" />
              
              {/* Search Results Dropdown */}
              {isSearchOpen && searchResults.length > 0 && (
                <div className="absolute top-full left-0 right-0 mt-2 bg-white shadow-xl rounded-lg border border-orange-200 max-h-96 overflow-y-auto z-50">
                  {searchResults.map((product) => {
                    const variant = product.variants[0];
                    const inWishlist = isInWishlist(product.id, variant.id);
                    
                    return (
                      <div key={product.id} className="flex items-center p-3 hover:bg-orange-50 transition-colors duration-200 border-b border-gray-100 last:border-b-0">
                        <Link 
                          href={`/products/${product.handle}`}
                          className="flex-1 flex items-center gap-3"
                          onClick={() => setIsSearchOpen(false)}
                        >
                          <div className="w-12 h-12 bg-gray-200 rounded flex-shrink-0"></div>
                          <div className="flex-1 min-w-0">
                            <h4 className="text-sm font-semibold text-gray-900 truncate">{product.name}</h4>
                            <p className="text-xs text-gray-500">{product.category}</p>
                            <p className="text-sm font-bold text-orange-600">₹{product.price.toLocaleString()}</p>
                          </div>
                        </Link>
                        <button
                          onClick={(e) => {
                            e.preventDefault();
                            handleWishlistToggle(product);
                          }}
                          className="ml-2 p-2 rounded-full hover:bg-orange-100 transition-colors duration-200"
                          title={inWishlist ? 'Remove from wishlist' : 'Add to wishlist'}
                        >
                          <Heart 
                            className={`w-4 h-4 transition-colors duration-200 ${
                              inWishlist ? 'text-red-500 fill-current' : 'text-gray-400 hover:text-red-500'
                            }`} 
                          />
                        </button>
                      </div>
                    );
                  })}
                  {searchResults.length === 0 && searchQuery && (
                    <div className="p-4 text-center text-gray-500">
                      No products found for "{searchQuery}"
                    </div>
                  )}
                </div>
              )}
            </div>
          </div>

          {/* Right side icons */}
          <div className="flex items-center space-x-4">
            <Link href="/account" className="p-2 text-gray-700 hover:text-accent-walnut hover:bg-orange-100 rounded-full transition-all duration-300 transform hover:scale-110">
              <User className="w-5 h-5" />
            </Link>

            <Link href="/wishlist" className="p-2 text-gray-700 hover:text-accent-walnut hover:bg-orange-100 rounded-full transition-all duration-300 transform hover:scale-110 relative">
              <HeartIcon className="w-5 h-5" />
              {wishlistItems.length > 0 && (
                <span className="absolute -top-1 -right-1 bg-gradient-to-r from-orange-500 to-orange-600 text-white text-xs rounded-full h-5 w-5 flex items-center justify-center shadow-lg animate-pulse">
                  {wishlistItems.length}
                </span>
              )}
            </Link>

            <Link href="/cart" className="p-2 text-gray-700 hover:text-accent-walnut hover:bg-orange-100 rounded-full transition-all duration-300 transform hover:scale-110 relative">
              <ShoppingBag className="w-5 h-5" />
              {totalItems > 0 && (
                <span className="absolute -top-1 -right-1 bg-gradient-to-r from-orange-500 to-orange-600 text-white text-xs rounded-full h-5 w-5 flex items-center justify-center shadow-lg animate-pulse">
                  {totalItems}
                </span>
              )}
            </Link>
          </div>
        </div>

        {/* Navigation Links Below */}
        <div className="border-t border-orange-200 bg-gradient-to-r from-orange-50 to-amber-50 relative overflow-hidden">
          {/* Animated Background Pattern */}
          <div className="absolute inset-0 opacity-5">
            <div className="absolute inset-0 bg-gradient-to-r from-orange-100/20 via-amber-100/10 to-orange-50/5"></div>
            <div className="absolute inset-0" style={{
              backgroundImage: `repeating-linear-gradient(45deg, transparent, transparent 10px, rgba(251, 146, 60, 0.03) 10px, transparent 20px)`,
              backgroundSize: '28px 28px'
            }}></div>
          </div>
          
          {/* Desktop Navigation */}
          <nav className="hidden xl:flex justify-center space-x-6 py-4 relative z-10">
            <div className="relative group h-full flex items-center">
              <Link
                href="/collections"
                className="flex items-center text-sm font-medium text-gray-700 hover:text-accent-walnut hover:bg-orange-100 px-3 py-2 rounded-full transition-all duration-300 transform hover:scale-105 hover:-translate-y-0.5 shadow-md hover:shadow-lg relative overflow-hidden group"
              >
                <span className="relative z-10">Our Collections</span>
                <span className="absolute inset-0 bg-gradient-to-r from-orange-200 to-orange-100 opacity-0 transition-all duration-300 group-hover:opacity-100"></span>
                <ChevronDown className="ml-1 h-4 w-4 transition-all duration-300 transform group-hover:rotate-180" />
              </Link>
              
              {/* Dropdown Menu */}
              <div className="absolute left-0 top-full w-96 bg-white shadow-xl z-50 border-t-2 border-orange-300 rounded-b-lg transition-all duration-300 transform origin-top opacity-0 scale-y-95 pointer-events-none group-hover:opacity-100 group-hover:scale-y-100 group-hover:pointer-events-auto max-h-96 overflow-y-auto"
                   style={{
                     transitionTimingFunction: 'cubic-bezier(0.4, 0, 0.2, 1)',
                     transitionProperty: 'opacity, transform',
                   }}>
                <div className="py-2">
                  {NAV_ITEMS.find(item => item.label === 'Our Collections')?.subItems?.map((subItem, index) => {
                    // Check if this is a category header (no specific subcategory path)
                    const isCategory = subItem.href.includes('/collections/') && !subItem.href.includes('/collections/') || 
                                     subItem.href === '/collections/new-arrivals' ||
                                     subItem.href === '/collections/best-sellers' ||
                                     subItem.href === '/collections/living-room' ||
                                     subItem.href === '/collections/bedroom' ||
                                     subItem.href === '/collections/dining-room' ||
                                     subItem.href === '/collections/office' ||
                                     subItem.href === '/collections/outdoor' ||
                                     subItem.href === '/collections/lighting';
                    
                    return (
                      <div key={subItem.href}>
                        {isCategory ? (
                          <div className="px-4 py-2 text-sm font-bold text-orange-600 bg-orange-50 border-b border-orange-100">
                            {subItem.label}
                          </div>
                        ) : (
                          <Link
                            href={subItem.href}
                            className="block px-6 py-2 text-xs text-gray-700 hover:bg-orange-50 hover:text-accent-walnut transition-all duration-200 transform hover:translate-x-1"
                            style={{
                              transitionDelay: `${index * 10}ms`,
                            }}
                          >
                            {subItem.label}
                          </Link>
                        )}
                      </div>
                    );
                  })}
                </div>
              </div>
            </div>
            
            <Link href="/collections/furniture" className="text-sm font-medium text-gray-700 hover:text-accent-walnut hover:bg-orange-100 px-3 py-2 rounded-full transition-all duration-300 transform hover:scale-105 hover:-translate-y-0.5 shadow-md hover:shadow-lg relative overflow-hidden group">
              <span className="relative z-10">Furniture</span>
              <span className="absolute inset-0 bg-gradient-to-r from-orange-200 to-orange-100 opacity-0 transition-all duration-300 group-hover:opacity-100"></span>
            </Link>
            <Link href="/collections/lighting" className="text-sm font-medium text-gray-700 hover:text-accent-walnut hover:bg-orange-100 px-3 py-2 rounded-full transition-all duration-300 transform hover:scale-105 hover:-translate-y-0.5 shadow-md hover:shadow-lg relative overflow-hidden group">
              <span className="relative z-10">Lighting</span>
              <span className="absolute inset-0 bg-gradient-to-r from-orange-200 to-orange-100 opacity-0 transition-all duration-300 group-hover:opacity-100"></span>
            </Link>
            <Link href="/collections/decor" className="text-sm font-medium text-gray-700 hover:text-accent-walnut hover:bg-orange-100 px-3 py-2 rounded-full transition-all duration-300 transform hover:scale-105 hover:-translate-y-0.5 shadow-md hover:shadow-lg relative overflow-hidden group">
              <span className="relative z-10">Decor</span>
              <span className="absolute inset-0 bg-gradient-to-r from-orange-200 to-orange-100 opacity-0 transition-all duration-300 group-hover:opacity-100"></span>
            </Link>
            <Link href="/collections/garden" className="text-sm font-medium text-gray-700 hover:text-accent-walnut hover:bg-orange-100 px-3 py-2 rounded-full transition-all duration-300 transform hover:scale-105 hover:-translate-y-0.5 shadow-md hover:shadow-lg relative overflow-hidden group">
              <span className="relative z-10">Garden</span>
              <span className="absolute inset-0 bg-gradient-to-r from-orange-200 to-orange-100 opacity-0 transition-all duration-300 group-hover:opacity-100"></span>
            </Link>
            <Link href="/collections/clearance-sale" className="text-sm font-bold text-red-600 hover:text-red-700 hover:bg-red-100 px-3 py-2 rounded-full transition-all duration-300 transform hover:scale-110 hover:-translate-y-0.5 shadow-md hover:shadow-lg relative overflow-hidden group animate-pulse">
              <span className="relative z-10">Clearance Sale</span>
              <span className="absolute inset-0 bg-gradient-to-r from-red-200 to-red-100 opacity-0 transition-all duration-300 group-hover:opacity-100"></span>
              <span className="absolute -top-1 -right-1 w-2 h-2 bg-red-500 rounded-full opacity-75 animate-ping"></span>
            </Link>
          </nav>
          
          {/* Large Tablet Navigation */}
          <nav className="hidden lg:flex xl:hidden justify-center space-x-4 py-3 px-2">
            <Link href="/collections" className="text-xs font-medium text-gray-700 hover:text-accent-walnut hover:bg-orange-100 px-2 py-1.5 rounded-full transition-all duration-300">
              Collections
            </Link>
            <Link href="/collections/furniture" className="text-xs font-medium text-gray-700 hover:text-accent-walnut hover:bg-orange-100 px-2 py-1.5 rounded-full transition-all duration-300">
              Furniture
            </Link>
            <Link href="/collections/lighting" className="text-xs font-medium text-gray-700 hover:text-accent-walnut hover:bg-orange-100 px-2 py-1.5 rounded-full transition-all duration-300">
              Lighting
            </Link>
            <Link href="/collections/decor" className="text-xs font-medium text-gray-700 hover:text-accent-walnut hover:bg-orange-100 px-2 py-1.5 rounded-full transition-all duration-300">
              Decor
            </Link>
            <Link href="/collections/garden" className="text-xs font-medium text-gray-700 hover:text-accent-walnut hover:bg-orange-100 px-2 py-1.5 rounded-full transition-all duration-300">
              Garden
            </Link>
            <Link href="/collections/clearance-sale" className="text-xs font-bold text-red-600 hover:text-red-700 hover:bg-red-100 px-2 py-1.5 rounded-full transition-all duration-300">
              Sale
            </Link>
          </nav>
          
          {/* Small Tablet Navigation */}
          <nav className="hidden md:flex lg:hidden justify-center space-x-2 py-3 px-2">
            <Link href="/collections" className="text-xs font-medium text-gray-700 hover:text-accent-walnut hover:bg-orange-100 px-1.5 py-1 rounded-full transition-all duration-300">
              Collections
            </Link>
            <Link href="/collections/furniture" className="text-xs font-medium text-gray-700 hover:text-accent-walnut hover:bg-orange-100 px-1.5 py-1 rounded-full transition-all duration-300">
              Furniture
            </Link>
            <Link href="/collections/lighting" className="text-xs font-medium text-gray-700 hover:text-accent-walnut hover:bg-orange-100 px-1.5 py-1 rounded-full transition-all duration-300">
              Lighting
            </Link>
            <Link href="/collections/decor" className="text-xs font-medium text-gray-700 hover:text-accent-walnut hover:bg-orange-100 px-1.5 py-1 rounded-full transition-all duration-300">
              Decor
            </Link>
            <Link href="/collections/garden" className="text-xs font-medium text-gray-700 hover:text-accent-walnut hover:bg-orange-100 px-1.5 py-1 rounded-full transition-all duration-300">
              Garden
            </Link>
            <Link href="/collections/clearance-sale" className="text-xs font-bold text-red-600 hover:text-red-700 hover:bg-red-100 px-1.5 py-1 rounded-full transition-all duration-300">
              Sale
            </Link>
          </nav>
          
          {/* Large Mobile Navigation */}
          <nav className="hidden sm:flex md:hidden justify-center space-x-1 py-2 px-1 overflow-x-auto relative z-10">
            <Link href="/collections" className="text-sm font-medium text-gray-700 hover:text-accent-walnut hover:bg-orange-100 px-1.5 py-1 rounded-full transition-all duration-300 whitespace-nowrap relative overflow-hidden group">
              <span className="relative z-10">Collections</span>
              <span className="absolute inset-0 bg-gradient-to-r from-orange-200 to-orange-100 opacity-0 transition-all duration-300 group-hover:opacity-100"></span>
            </Link>
            <Link href="/collections/furniture" className="text-sm font-medium text-gray-700 hover:text-accent-walnut hover:bg-orange-100 px-1.5 py-1 rounded-full transition-all duration-300 whitespace-nowrap relative overflow-hidden group">
              <span className="relative z-10">Furniture</span>
              <span className="absolute inset-0 bg-gradient-to-r from-orange-200 to-orange-100 opacity-0 transition-all duration-300 group-hover:opacity-100"></span>
            </Link>
            <Link href="/collections/lighting" className="text-sm font-medium text-gray-700 hover:text-accent-walnut hover:bg-orange-100 px-1.5 py-1 rounded-full transition-all duration-300 whitespace-nowrap relative overflow-hidden group">
              <span className="relative z-10">Lighting</span>
              <span className="absolute inset-0 bg-gradient-to-r from-orange-200 to-orange-100 opacity-0 transition-all duration-300 group-hover:opacity-100"></span>
            </Link>
            <Link href="/collections/decor" className="text-sm font-medium text-gray-700 hover:text-accent-walnut hover:bg-orange-100 px-1.5 py-1 rounded-full transition-all duration-300 whitespace-nowrap relative overflow-hidden group">
              <span className="relative z-10">Decor</span>
              <span className="absolute inset-0 bg-gradient-to-r from-orange-200 to-orange-100 opacity-0 transition-all duration-300 group-hover:opacity-100"></span>
            </Link>
            <Link href="/collections/garden" className="text-sm font-medium text-gray-700 hover:text-accent-walnut hover:bg-orange-100 px-1.5 py-1 rounded-full transition-all duration-300 whitespace-nowrap relative overflow-hidden group">
              <span className="relative z-10">Garden</span>
              <span className="absolute inset-0 bg-gradient-to-r from-orange-200 to-orange-100 opacity-0 transition-all duration-300 group-hover:opacity-100"></span>
            </Link>
            <Link href="/collections/clearance-sale" className="text-sm font-bold text-red-600 hover:text-red-700 hover:bg-red-100 px-1.5 py-1 rounded-full transition-all duration-300 whitespace-nowrap relative overflow-hidden group animate-pulse">
              <span className="relative z-10">Sale</span>
              <span className="absolute inset-0 bg-gradient-to-r from-red-200 to-red-100 opacity-0 transition-all duration-300 group-hover:opacity-100"></span>
              <span className="absolute -top-0.5 -right-0.5 w-1.5 h-1.5 bg-red-500 rounded-full opacity-75 animate-ping"></span>
            </Link>
          </nav>
          
          {/* Small Mobile Navigation */}
          <nav className="flex sm:hidden justify-center space-x-1 py-2 px-1 overflow-x-auto relative z-10">
            <Link href="/collections" className="text-sm font-medium text-gray-700 hover:text-accent-walnut hover:bg-orange-100 px-1 py-0.5 rounded-full transition-all duration-300 whitespace-nowrap relative overflow-hidden group">
              <span className="relative z-10">Collections</span>
              <span className="absolute inset-0 bg-gradient-to-r from-orange-200 to-orange-100 opacity-0 transition-all duration-300 group-hover:opacity-100"></span>
            </Link>
            <Link href="/collections/furniture" className="text-sm font-medium text-gray-700 hover:text-accent-walnut hover:bg-orange-100 px-1 py-0.5 rounded-full transition-all duration-300 whitespace-nowrap relative overflow-hidden group">
              <span className="relative z-10">Furniture</span>
              <span className="absolute inset-0 bg-gradient-to-r from-orange-200 to-orange-100 opacity-0 transition-all duration-300 group-hover:opacity-100"></span>
            </Link>
            <Link href="/collections/lighting" className="text-sm font-medium text-gray-700 hover:text-accent-walnut hover:bg-orange-100 px-1 py-0.5 rounded-full transition-all duration-300 whitespace-nowrap relative overflow-hidden group">
              <span className="relative z-10">Lighting</span>
              <span className="absolute inset-0 bg-gradient-to-r from-orange-200 to-orange-100 opacity-0 transition-all duration-300 group-hover:opacity-100"></span>
            </Link>
            <Link href="/collections/decor" className="text-sm font-medium text-gray-700 hover:text-accent-walnut hover:bg-orange-100 px-1 py-0.5 rounded-full transition-all duration-300 whitespace-nowrap relative overflow-hidden group">
              <span className="relative z-10">Decor</span>
              <span className="absolute inset-0 bg-gradient-to-r from-orange-200 to-orange-100 opacity-0 transition-all duration-300 group-hover:opacity-100"></span>
            </Link>
            <Link href="/collections/garden" className="text-sm font-medium text-gray-700 hover:text-accent-walnut hover:bg-orange-100 px-1 py-0.5 rounded-full transition-all duration-300 whitespace-nowrap relative overflow-hidden group">
              <span className="relative z-10">Garden</span>
              <span className="absolute inset-0 bg-gradient-to-r from-orange-200 to-orange-100 opacity-0 transition-all duration-300 group-hover:opacity-100"></span>
            </Link>
            <Link href="/collections/clearance-sale" className="text-sm font-bold text-red-600 hover:text-red-700 hover:bg-red-100 px-1 py-0.5 rounded-full transition-all duration-300 whitespace-nowrap relative overflow-hidden group animate-pulse">
              <span className="relative z-10">Sale</span>
              <span className="absolute inset-0 bg-gradient-to-r from-red-200 to-red-100 opacity-0 transition-all duration-300 group-hover:opacity-100"></span>
              <span className="absolute -top-0.5 -right-0.5 w-1.5 h-1.5 bg-red-500 rounded-full opacity-75 animate-ping"></span>
            </Link>
          </nav>
        </div>

        {/* Mobile Search */}
        <div className="md:hidden py-3 border-t border-orange-200 bg-gradient-to-r from-orange-50 to-amber-50">
          <div className="relative">
            <input
              type="text"
              placeholder="Search for premium furniture..."
              className="w-full pl-4 pr-10 py-3 border-2 border-orange-200 rounded-full focus:outline-none focus:ring-2 focus:ring-orange-300 focus:border-transparent bg-white/80 backdrop-blur-sm transition-all duration-300"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
            <SearchIcon className="absolute right-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-orange-400 transition-colors duration-300" />
          </div>
        </div>
      </div>
      
      {/* Mobile Menu */}
      <MobileMenu 
        isOpen={mobileMenuOpen}
        onClose={() => setMobileMenuOpen(false)}
        items={NAV_ITEMS}
        activeSubMenu={mobileSubMenu}
        setActiveSubMenu={setMobileSubMenu}
      />
    </header>
  );
}

export { Navbar };
