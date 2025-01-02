
import { Hotel, Star, Utensils, Wifi } from 'lucide-react';
import { Link } from 'react-router-dom';

export function LandingPage() {
  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <div 
        className="h-[70vh] bg-cover bg-center relative"
        style={{ backgroundImage: 'url(https://upload.wikimedia.org/wikipedia/commons/5/54/Entrance_of_EDU.jpg)' }}
      >
        <div className="absolute inset-0 bg-black bg-opacity-50" />
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="text-center text-white px-4">
            <h1 className="text-5xl font-bold mb-6">Welcome to East Delta Hotel</h1>
            <p className="text-xl mb-8">Experience unparalleled comfort and elegance</p>
            <Link
              to="/rooms"
              className="bg-[maroon] text-white px-8 py-3 rounded-lg text-lg font-semibold hover:bg-[maroon] transition-colors"
            >
              Book Now
            </Link>
          </div>
        </div>
      </div>

      {/* Features Section */}
      <div className="max-w-7xl mx-auto px-4 py-16">
        <h2 className="text-3xl font-bold text-center mb-12">Our Amenities</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {[
            { icon: <Hotel size={32} />, title: 'Luxury Rooms', description: 'Spacious and elegant accommodations' },
            { icon: <Wifi size={32} />, title: 'Free Wi-Fi', description: 'High-speed internet throughout' },
            { icon: <Utensils size={32} />, title: 'Fine Dining', description: '24/7 room service available' },
            { icon: <Star size={32} />, title: '5-Star Service', description: 'Professional and attentive staff' },
          ].map((feature, index) => (
            <div key={index} className="text-center p-6 bg-white rounded-lg shadow-md">
              <div className="inline-block p-3 bg-gray-100 text-[maroon] rounded-full mb-4">
                {feature.icon}
              </div>
              <h3 className="text-xl font-semibold mb-2">{feature.title}</h3>
              <p className="text-gray-600">{feature.description}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}