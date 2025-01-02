import React from 'react';
import { Link } from 'react-router-dom';
import { LogOut } from 'lucide-react';
import { useAuthStore } from '../store/authStore';
import { AuthModal } from './AuthModal';

export function Navbar() {
  const { user, signOut } = useAuthStore();
  const [showAuthModal, setShowAuthModal] = React.useState(false);

  return (
    <header className="bg-[#929098] shadow-sm text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
        <div className="flex justify-between items-center">
          <Link to="/" className="flex items-center gap-2">
            <img src="/public/EDU.png" alt="" className='w-7'/>
            <span className="text-xl font-bold text-gray-900">East Delta Hotel</span>
          </Link>

          <nav className="hidden md:flex items-center gap-6">
            <Link to="/" className=" hover:text-gray-900">Home</Link>
            <Link to="/rooms" className=" hover:text-gray-900">Rooms</Link>
            <Link to="/about" className=" hover:text-gray-900">About</Link>
            <Link to="/contact" className=" hover:text-gray-900">Contact</Link>
          </nav>

          {user ? (
            <div className="flex items-center gap-4">
              <span className="text-gray-600">{user.email}</span>
              <button
                onClick={() => signOut()}
                className="flex items-center gap-2 text-gray-600 hover:text-gray-900"
              >
                <LogOut size={18} />
                Sign Out
              </button>
            </div>
          ) : (
            <button
              onClick={() => setShowAuthModal(true)}
              className="bg-[maroon] text-white px-4 py-2 rounded-lg hover:bg-[maroon] transition-colors"
            >
              Sign In
            </button>
          )}
        </div>
      </div>

      {showAuthModal && (
        <AuthModal onClose={() => setShowAuthModal(false)} />
      )}
    </header>
  );
}