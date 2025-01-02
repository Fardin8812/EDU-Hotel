import React from 'react';
import { Users, Wifi, Coffee, Tv, Wind, Sparkles } from 'lucide-react';

interface RoomAmenity {
  icon: React.ReactNode;
  name: string;
  description: string;
}

const amenities: RoomAmenity[] = [
  {
    icon: <Wifi size={24}  />,
    name: 'High-Speed WiFi',
    description: 'Complimentary high-speed wireless internet'
  },
  {
    icon: <Coffee size={24} />,
    name: 'Mini Bar',
    description: 'Fully stocked minibar with premium selections'
  },
  {
    icon: <Tv size={24} />,
    name: 'Smart TV',
    description: '55-inch 4K smart TV with streaming services'
  },
  {
    icon: <Wind size={24} />,
    name: 'Climate Control',
    description: 'Individual climate control system'
  },
  {
    icon: <Sparkles size={24} />,
    name: 'Daily Housekeeping',
    description: 'Complimentary daily housekeeping service'
  },
  {
    icon: <Users size={24} />,
    name: '24/7 Room Service',
    description: 'Round-the-clock in-room dining service'
  }
];

export function RoomAmenities() {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {amenities.map((amenity, index) => (
        <div key={index} className="flex items-start gap-4 p-4 bg-white rounded-lg shadow-sm">
          <div className="text-[maroon]">{amenity.icon}</div>
          <div>
            <h3 className="font-semibold text-gray-900">{amenity.name}</h3>
            <p className="text-sm text-gray-600">{amenity.description}</p>
          </div>
        </div>
      ))}
    </div>
  );
}