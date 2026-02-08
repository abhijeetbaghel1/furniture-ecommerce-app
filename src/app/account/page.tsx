'use client';

import { useState } from 'react';
import { User, ShoppingBag, Heart, Settings, LogOut, Package, CreditCard } from 'lucide-react';
import Link from 'next/link';

export default function AccountPage() {
  const [activeTab, setActiveTab] = useState('orders');

  const orders = [
    {
      id: 'ORD-001',
      date: '2024-01-15',
      status: 'Delivered',
      total: 45000,
      items: 2
    },
    {
      id: 'ORD-002', 
      date: '2024-01-10',
      status: 'Processing',
      total: 28000,
      items: 1
    }
  ];

  const renderContent = () => {
    switch (activeTab) {
      case 'orders':
        return (
          <div>
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Order History</h3>
            {orders.length === 0 ? (
              <p className="text-gray-600">You haven't placed any orders yet.</p>
            ) : (
              <div className="space-y-4">
                {orders.map((order) => (
                  <div key={order.id} className="bg-white border rounded-lg p-4">
                    <div className="flex justify-between items-start mb-2">
                      <div>
                        <p className="font-semibold text-gray-900">{order.id}</p>
                        <p className="text-sm text-gray-600">{order.date}</p>
                      </div>
                      <div className="text-right">
                        <span className={`inline-block px-2 py-1 text-xs rounded-full ${
                          order.status === 'Delivered' 
                            ? 'bg-green-100 text-green-800'
                            : 'bg-yellow-100 text-yellow-800'
                        }`}>
                          {order.status}
                        </span>
                        <p className="font-semibold text-gray-900 mt-1">₹{order.total.toLocaleString()}</p>
                      </div>
                    </div>
                    <p className="text-sm text-gray-600">{order.items} items</p>
                    <button className="mt-3 text-orange-600 hover:text-orange-700 text-sm font-medium">
                      View Order Details
                    </button>
                  </div>
                ))}
              </div>
            )}
          </div>
        );

      case 'wishlist':
        return (
          <div>
            <h3 className="text-lg font-semibold text-gray-900 mb-4">My Wishlist</h3>
            <p className="text-gray-600">Your wishlist is empty.</p>
            <Link 
              href="/collections"
              className="inline-flex items-center mt-4 text-orange-600 hover:text-orange-700 font-medium"
            >
              Browse Collections
            </Link>
          </div>
        );

      case 'profile':
        return (
          <div>
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Profile Information</h3>
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">First Name</label>
                <input 
                  type="text" 
                  defaultValue="John"
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Last Name</label>
                <input 
                  type="text" 
                  defaultValue="Doe"
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Email</label>
                <input 
                  type="email" 
                  defaultValue="john.doe@example.com"
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Phone</label>
                <input 
                  type="tel" 
                  defaultValue="+91 98765 43210"
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500"
                />
              </div>
              <button className="bg-orange-500 text-white px-6 py-2 rounded-lg hover:bg-orange-600 transition-colors">
                Save Changes
              </button>
            </div>
          </div>
        );

      case 'addresses':
        return (
          <div>
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Shipping Addresses</h3>
            <div className="space-y-4">
              <div className="bg-white border rounded-lg p-4">
                <div className="flex justify-between items-start">
                  <div>
                    <p className="font-medium text-gray-900">Home</p>
                    <p className="text-gray-600 mt-1">
                      John Doe<br />
                      123 Main Street, Apartment 4B<br />
                      Bangalore, Karnataka 560001<br />
                      India
                    </p>
                  </div>
                  <div className="flex gap-2">
                    <button className="text-orange-600 hover:text-orange-700 text-sm">Edit</button>
                    <button className="text-red-600 hover:text-red-700 text-sm">Delete</button>
                  </div>
                </div>
              </div>
              <button className="border-2 border-dashed border-gray-300 rounded-lg p-4 text-center hover:border-orange-500 transition-colors">
                <span className="text-orange-600 font-medium">+ Add New Address</span>
              </button>
            </div>
          </div>
        );

      default:
        return null;
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-6xl mx-auto px-4">
        <h1 className="text-3xl font-bold text-gray-900 mb-8">My Account</h1>
        
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          {/* Sidebar */}
          <div className="lg:col-span-1">
            <div className="bg-white rounded-lg shadow-md p-6">
              <div className="flex items-center gap-3 mb-6">
                <div className="w-12 h-12 bg-orange-100 rounded-full flex items-center justify-center">
                  <User className="w-6 h-6 text-orange-600" />
                </div>
                <div>
                  <p className="font-semibold text-gray-900">John Doe</p>
                  <p className="text-sm text-gray-600">john.doe@example.com</p>
                </div>
              </div>
              
              <nav className="space-y-2">
                <button
                  onClick={() => setActiveTab('orders')}
                  className={`w-full flex items-center gap-3 px-3 py-2 rounded-lg transition-colors ${
                    activeTab === 'orders' 
                      ? 'bg-orange-50 text-orange-600' 
                      : 'text-gray-600 hover:bg-gray-50'
                  }`}
                >
                  <Package className="w-5 h-5" />
                  Orders
                </button>
                <button
                  onClick={() => setActiveTab('wishlist')}
                  className={`w-full flex items-center gap-3 px-3 py-2 rounded-lg transition-colors ${
                    activeTab === 'wishlist' 
                      ? 'bg-orange-50 text-orange-600' 
                      : 'text-gray-600 hover:bg-gray-50'
                  }`}
                >
                  <Heart className="w-5 h-5" />
                  Wishlist
                </button>
                <button
                  onClick={() => setActiveTab('profile')}
                  className={`w-full flex items-center gap-3 px-3 py-2 rounded-lg transition-colors ${
                    activeTab === 'profile' 
                      ? 'bg-orange-50 text-orange-600' 
                      : 'text-gray-600 hover:bg-gray-50'
                  }`}
                >
                  <User className="w-5 h-5" />
                  Profile
                </button>
                <button
                  onClick={() => setActiveTab('addresses')}
                  className={`w-full flex items-center gap-3 px-3 py-2 rounded-lg transition-colors ${
                    activeTab === 'addresses' 
                      ? 'bg-orange-50 text-orange-600' 
                      : 'text-gray-600 hover:bg-gray-50'
                  }`}
                >
                  <CreditCard className="w-5 h-5" />
                  Addresses
                </button>
                <button className="w-full flex items-center gap-3 px-3 py-2 rounded-lg text-gray-600 hover:bg-gray-50 transition-colors">
                  <Settings className="w-5 h-5" />
                  Settings
                </button>
                <button className="w-full flex items-center gap-3 px-3 py-2 rounded-lg text-red-600 hover:bg-red-50 transition-colors">
                  <LogOut className="w-5 h-5" />
                  Logout
                </button>
              </nav>
            </div>
          </div>

          {/* Main Content */}
          <div className="lg:col-span-3">
            <div className="bg-white rounded-lg shadow-md p-6">
              {renderContent()}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
