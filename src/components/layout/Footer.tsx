'use client';

import { useState } from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { siteConfig } from '@/lib/config/site';
import { Facebook, Instagram, Twitter, Mail, MapPin, Phone, Clock } from 'lucide-react';

const socialLinks = [
  { name: 'Facebook', icon: Facebook, href: '#' },
  { name: 'Instagram', icon: Instagram, href: '#' },
  { name: 'Twitter', icon: Twitter, href: '#' }
];

const footerLinks = [
  {
    title: 'Shop',
    links: [
      { name: 'New Arrivals', href: '/collections/new-arrivals' },
      { name: 'Best Sellers', href: '/collections/best-sellers' },
      { name: 'Furniture', href: '/collections/furniture' },
      { name: 'Lighting', href: '/collections/lighting' },
      { name: 'Decor', href: '/collections/decor' },
    ],
  },
  {
    title: 'Company',
    links: [
      { name: 'About Us', href: '/about' },
      { name: 'Our Story', href: '/our-story' },
      { name: 'Careers', href: '/careers' },
      { name: 'Blog', href: '/blog' },
      { name: 'Press', href: '/press' },
    ],
  },
  {
    title: 'Support',
    links: [
      { name: 'Contact Us', href: '/contact' },
      { name: 'FAQs', href: '/faqs' },
      { name: 'Shipping & Returns', href: '/shipping-returns' },
      { name: 'Warranty', href: '/warranty' },
      { name: 'Size Guide', href: '/size-guide' },
    ],
  },
];

export default function Footer() {
  const [email, setEmail] = useState('');
  const [isSubscribed, setIsSubscribed] = useState(false);
  const [isHovered, setIsHovered] = useState<number | null>(null);
  const currentYear = new Date().getFullYear();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log('Subscribed with:', email);
    setIsSubscribed(true);
    setEmail('');
    
    setTimeout(() => {
      setIsSubscribed(false);
    }, 5000);
  };

  return (
    <footer className="bg-neutral-900 text-white border-t border-neutral-800">
      <div className="container mx-auto px-4 py-16">
        {/* Main Footer Content */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-12 mb-16">
          {/* About Section */}
          <div className="lg:col-span-4">
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
              className="space-y-6"
            >
              <div>
                <Link href="/" className="block">
                  <span className="text-2xl font-serif font-bold tracking-tight">
                    {siteConfig.brand}
                  </span>
                </Link>
                <p className="text-neutral-400 mt-2">Elevating your space with timeless design and exceptional quality.</p>
                <p className="text-neutral-400 mt-1">
                  {siteConfig.tagline}
                </p>
              </div>
              
              {/* Contact Info */}
              <div className="space-y-3 pt-4">
                <div className="flex items-center space-x-3">
                  <MapPin className="h-5 w-5 text-neutral-400" />
                  <span className="text-neutral-300">123 Design Street, City, Country</span>
                </div>
                <div className="flex items-center space-x-3">
                  <Phone className="h-5 w-5 text-neutral-400" />
                  <a href="tel:+1234567890" className="text-neutral-300 hover:text-white transition-colors">
                    +1 (234) 567-890
                  </a>
                </div>
                <div className="flex items-center space-x-3">
                  <Mail className="h-5 w-5 text-neutral-400" />
                  <a href="mailto:info@example.com" className="text-neutral-300 hover:text-white transition-colors">
                    info@example.com
                  </a>
                </div>
                <div className="flex items-center space-x-3">
                  <Clock className="h-5 w-5 text-neutral-400" />
                  <span className="text-neutral-300">Mon - Fri: 9AM - 6PM</span>
                </div>
              </div>
              
              {/* Social Icons */}
              <div className="flex space-x-4 pt-2">
                {socialLinks.map((social, index) => {
                  const Icon = social.icon;
                  return (
                    <motion.a
                      key={social.name}
                      href={social.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-neutral-400 hover:text-white transition-colors"
                      whileHover={{ y: -3, scale: 1.1 }}
                      whileTap={{ scale: 0.95 }}
                      onHoverStart={() => setIsHovered(index)}
                      onHoverEnd={() => setIsHovered(null)}
                      aria-label={social.name}
                    >
                      <Icon 
                        className={`h-5 w-5 transition-colors ${
                          isHovered === index ? 'text-white' : 'text-neutral-400'
                        }`}
                        aria-hidden="true"
                      />
                    </motion.a>
                  );
                })}
              </div>
            </motion.div>
          </div>

          {/* Footer Links */}
          {footerLinks.map((section, index) => (
            <motion.div 
              key={section.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="lg:col-span-2"
            >
              <h3 className="text-lg font-semibold mb-4 text-white">{section.title}</h3>
              <ul className="space-y-3">
                {section.links.map((link) => (
                  <motion.li 
                    key={link.name}
                    whileHover={{ x: 5 }}
                    transition={{ type: 'spring', stiffness: 300 }}
                  >
                    <Link 
                      href={link.href}
                      className="text-neutral-400 hover:text-white transition-colors text-sm"
                    >
                      {link.name}
                    </Link>
                  </motion.li>
                ))}
              </ul>
            </motion.div>
          ))}

          {/* Newsletter Section */}
          <motion.div 
            className="lg:col-span-4"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.3 }}
          >
            <h3 className="text-lg font-semibold mb-4 text-white">Newsletter</h3>
            <p className="text-neutral-400 mb-6 text-sm">
              Subscribe to our newsletter for the latest updates and exclusive offers.
            </p>
            
            {isSubscribed ? (
              <motion.div 
                className="bg-green-900/30 border border-green-800 text-green-400 p-4 rounded-lg"
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.9 }}
              >
                Thank you for subscribing! 🎉
              </motion.div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-4">
                <div className="relative">
                  <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-neutral-500" />
                  <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="Your email address"
                    className="w-full pl-10 pr-4 py-3 bg-neutral-800 border border-neutral-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-accent-walnut/50 focus:border-transparent text-white placeholder-neutral-500 text-sm"
                    required
                    aria-label="Email address for newsletter subscription"
                  />
                </div>
                <motion.button
                  type="submit"
                  className="w-full bg-accent-walnut text-white py-3 px-6 rounded-lg font-medium hover:bg-accent-walnut/90 transition-colors text-sm"
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                >
                  Subscribe
                </motion.button>
              </form>
            )}
            
            <div className="mt-6 pt-6 border-t border-neutral-800">
              <h4 className="text-sm font-medium text-white mb-3">We Accept</h4>
              <div className="flex flex-wrap gap-2">
                {['Visa', 'Mastercard', 'Amex', 'PayPal', 'UPI'].map((method) => (
                  <div 
                    key={method}
                    className="bg-neutral-800/50 rounded-md px-3 py-1.5 text-xs text-neutral-400"
                  >
                    {method}
                  </div>
                ))}
              </div>
            </div>
          </motion.div>
        </div>
        
        {/* Bottom Bar */}
        <motion.div 
          className="border-t border-neutral-800 pt-8 flex flex-col md:flex-row justify-between items-center"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.4 }}
        >
          <p className="text-sm text-neutral-500">
            © {currentYear} {siteConfig.brand}. All rights reserved.
          </p>
          <div className="flex flex-wrap gap-4 mt-4 md:mt-0">
            <Link 
              href="/privacy-policy" 
              className="text-sm text-neutral-400 hover:text-white transition-colors"
            >
              Privacy Policy
            </Link>
            <Link 
              href="/terms-of-service" 
              className="text-sm text-neutral-400 hover:text-white transition-colors"
            >
              Terms of Service
            </Link>
            <Link 
              href="/shipping-policy" 
              className="text-sm text-neutral-400 hover:text-white transition-colors"
            >
              Shipping Policy
            </Link>
            <Link 
              href="/refund-policy" 
              className="text-sm text-neutral-400 hover:text-white transition-colors"
            >
              Refund Policy
            </Link>
            <Link 
              href="/sitemap" 
              className="text-sm text-neutral-400 hover:text-white transition-colors"
            >
              Sitemap
            </Link>
          </div>
        </motion.div>
      </div>
    </footer>
  );
}
