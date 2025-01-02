import { Link } from 'react-router-dom';
import { Facebook, Instagram, Twitter, Mail, Phone, MapPin } from 'lucide-react';

export function Footer() {
  return (
    <footer className="bg-[#929098] text-black">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div>
            <h3 className="text-lg font-semibold mb-4">About Us</h3>
            <p className="text-white">
              East Delta Hotel offers world-class accommodation and exceptional service
              in the heart of the city.
            </p>
          </div>
          
          <div>
            <h3 className="text-lg font-semibold mb-4">Quick Links</h3>
            <ul className="space-y-2">
              <li><Link to="/rooms" className="text-white hover:text-white">Rooms</Link></li>
              <li><Link to="/about" className="text-white hover:text-white">About</Link></li>
              <li><Link to="/contact" className="text-white hover:text-white">Contact</Link></li>
            </ul>
          </div>
          
          <div>
            <h3 className="text-lg font-semibold mb-4">Contact</h3>
            <ul className="space-y-2">
              <li className="flex items-center gap-2 text-white">
                <Phone size={18} />
                <span>+88 018 3337 4506</span>
              </li>
              <li className="flex items-center gap-2 text-white">
                <Mail size={18} />
                <span>info@eduhotel.com</span>
              </li>
              <li className="flex items-center gap-2 text-white">
                <MapPin size={18} />
                <span>Mozaffor Nagar, 1250</span>
              </li>
            </ul>
          </div>
          
          <div>
            <h3 className="text-lg font-semibold mb-4">Follow Us</h3>
            <div className="flex gap-4">
              <a href="https://facebook.com/" className="text-white hover:text-white"><Facebook size={24} /></a>
              <a href="https://www.instagram.com/" className="text-white hover:text-white"><Instagram size={24} /></a>
              <a href="https://x.com/" className="text-white hover:text-white"><Twitter size={24} /></a>
            </div>
          </div>
        </div>
        
        <div className="border-t border-gray-800 mt-8 pt-8 text-center text-white">
          <p>&copy; {new Date().getFullYear()} East Delta Hotel. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
}