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
type NavItem = {
  label: string;
  href: string;
  subItems?: Array<{
    label: string;
    href: string;
  }>;
};

// Mock data for dropdown items - replace with your actual data
const NAV_ITEMS: NavItem[] = [
  {
    label: 'Our Collections',
    href: '/collections',
    subItems: [
      { label: 'New Arrivals', href: '/collections/new-arrivals' },
      { label: 'Best Sellers', href: '/collections/best-sellers' },
      { label: 'Featured', href: '/collections/featured' },
    ],
  },
  {
    label: 'Furniture',
    href: '/collections/furniture',
    subItems: [
      { label: 'Sofas', href: '/collections/sofas' },
      { label: 'Chairs', href: '/collections/chairs' },
      { label: 'Tables', href: '/collections/tables' },
      { label: 'Beds', href: '/collections/beds' },
      { label: 'Storage', href: '/collections/storage' },
    ],
  },
  {
    label: 'Lighting',
    href: '/collections/lighting',
    subItems: [
      { label: 'Ceiling Lights', href: '/collections/ceiling-lights' },
      { label: 'Table Lamps', href: '/collections/table-lamps' },
      { label: 'Floor Lamps', href: '/collections/floor-lamps' },
      { label: 'Wall Lights', href: '/collections/wall-lights' },
    ],
  },
  {
    label: 'Decor',
    href: '/collections/decor',
    subItems: [
      { label: 'Wall Art', href: '/collections/wall-art' },
      { label: 'Mirrors', href: '/collections/mirrors' },
      { label: 'Cushions', href: '/collections/cushions' },
      { label: 'Vases', href: '/collections/vases' },
    ],
  },
  {
    label: 'Garden',
    href: '/collections/garden',
    
    subItems: [
      { label: 'Outdoor Furniture', href: '/collections/outdoor-furniture' },
      { label: 'Planters', href: '/collections/planters' },
      { label: 'Garden Decor', href: '/collections/garden-decor' },
    ],
  },
  {
    label: 'Shop By Style',
    href: '/collections/shop-by-style',
    subItems: [
      { label: 'Modern', href: '/collections/modern' },
      { label: 'Contemporary', href: '/collections/contemporary' },
      { label: 'Minimalist', href: '/collections/minimalist' },
      { label: 'Scandinavian', href: '/collections/scandinavian' },
    ],
  },
  {
    label: 'Clearance Sale',
    href: '/collections/clearance-sale',
    subItems: [
      { label: 'Furniture Deals', href: '/collections/furniture-deals' },
      { label: 'Lighting Deals', href: '/collections/lighting-deals' },
      { label: 'Decor Deals', href: '/collections/decor-deals' },
    ],
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
      className={`fixed inset-0 z-50 overflow-y-auto bg-white transform transition-all duration-300 ease-in-out ${
        isAnimating ? 'opacity-100 translate-x-0' : 'opacity-0 -translate-x-full'
      }`}
    >
      <div className="flex items-center justify-between p-4 border-b border-gray-200 bg-white sticky top-0 z-10 shadow-sm">
        <div className="flex items-center space-x-3 group">
          {/* Circular Logo with Your Image */}
          <div className="w-12 h-12 rounded-full bg-accent-walnut flex items-center justify-center overflow-hidden">
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
          className="p-2 text-gray-500 hover:text-accent-walnut transition-colors duration-200 hover:bg-gray-100 rounded-full"
        >
          <XMarkIcon className="h-6 w-6" />
        </button>
      </div>

      <div className="divide-y divide-gray-200">
        {items.map((item) => (
          <div key={item.href} className="border-b border-gray-100">
            <div 
              className="flex items-center justify-between px-4 py-4 text-gray-900 font-medium transition-colors duration-200 hover:bg-gray-50"
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
                {item.label}
              </Link>
              {item.subItems && item.subItems.length > 0 && (
                <ChevronDown 
                  className={`h-5 w-5 transition-transform ${
                    activeSubMenu === item.label ? 'transform rotate-180' : ''
                  }`}
                />
              )}
            </div>
            
            {item.subItems && item.subItems.length > 0 && activeSubMenu === item.label && (
              <div className="bg-gray-50 pl-6">
                {item.subItems.map((subItem) => (
                  <Link
                    key={subItem.href}
                    href={subItem.href}
                    className="block py-3 px-4 text-sm text-gray-700 hover:bg-gray-100"
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

      <div className="fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200 p-4">
        <div className="flex justify-between items-center">
          <Link 
            href="/account" 
            className="text-gray-700 hover:text-accent-walnut"
            onClick={onClose}
          >
            My Account
          </Link>
          <Link 
            href="/contact" 
            className="text-gray-700 hover:text-accent-walnut"
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
  const { items: wishlistItems } = useWishlist();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [mobileSubMenu, setMobileSubMenu] = useState<string | null>(null);
  // Close mobile menu when route changes
  useEffect(() => {
    setMobileMenuOpen(false);
  }, [pathname]);

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
            <div className="relative w-full group">
              <input
                type="text"
                placeholder="Search for premium furniture..."
                className="w-full pl-4 pr-10 py-3 border-2 border-orange-200 rounded-full focus:outline-none focus:ring-2 focus:ring-orange-300 focus:border-transparent bg-white/80 backdrop-blur-sm transition-all duration-300"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
              <SearchIcon className="absolute right-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-orange-400 group-focus-within:text-orange-500 transition-colors duration-300" />
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
        <div className="border-t border-orange-200 bg-gradient-to-r from-orange-50 to-amber-50">
          <nav className="hidden md:flex justify-center space-x-8 py-4">
            <Link href="/collections" className="text-sm font-medium text-gray-700 hover:text-accent-walnut hover:bg-orange-100 px-4 py-2 rounded-full transition-all duration-300 transform hover:scale-105 hover:-translate-y-0.5 shadow-md hover:shadow-lg">
              Our Collections
            </Link>
            <Link href="/collections/furniture" className="text-sm font-medium text-gray-700 hover:text-accent-walnut hover:bg-orange-100 px-4 py-2 rounded-full transition-all duration-300 transform hover:scale-105 hover:-translate-y-0.5 shadow-md hover:shadow-lg">
              Furniture
            </Link>
            <Link href="/collections/lighting" className="text-sm font-medium text-gray-700 hover:text-accent-walnut hover:bg-orange-100 px-4 py-2 rounded-full transition-all duration-300 transform hover:scale-105 hover:-translate-y-0.5 shadow-md hover:shadow-lg">
              Lighting
            </Link>
            <Link href="/collections/decor" className="text-sm font-medium text-gray-700 hover:text-accent-walnut hover:bg-orange-100 px-4 py-2 rounded-full transition-all duration-300 transform hover:scale-105 hover:-translate-y-0.5 shadow-md hover:shadow-lg">
              Decor
            </Link>
            <Link href="/collections/garden" className="text-sm font-medium text-gray-700 hover:text-accent-walnut hover:bg-orange-100 px-4 py-2 rounded-full transition-all duration-300 transform hover:scale-105 hover:-translate-y-0.5 shadow-md hover:shadow-lg">
              Garden
            </Link>
            <Link href="/collections/shop-by-style" className="text-sm font-medium text-gray-700 hover:text-accent-walnut hover:bg-orange-100 px-4 py-2 rounded-full transition-all duration-300 transform hover:scale-105 hover:-translate-y-0.5 shadow-md hover:shadow-lg">
              Shop By Style
            </Link>
            <Link href="/collections/clearance-sale" className="text-sm font-bold text-red-600 hover:text-red-700 hover:bg-red-100 px-4 py-2 rounded-full transition-all duration-300 transform hover:scale-110 hover:-translate-y-0.5 shadow-md hover:shadow-lg animate-pulse">
              Clearance Sale
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
