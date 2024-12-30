import React from 'react';
import { Link } from 'react-router-dom';
import { Calendar, Users } from 'lucide-react';
import type { Room } from '../types';

interface RoomCardProps {
  room: Room;
  onBook: (room: Room) => void;
}

export function RoomCard({ room, onBook }: RoomCardProps) {
  return (
    <div className="bg-white rounded-lg shadow-md overflow-hidden">
      <img 
        src={room.image_url} 
        alt={`Room ${room.number}`}
        className="w-full h-48 object-cover"
      />
      <div className="p-4">
        <h3 className="text-xl font-semibold mb-2">Room {room.number} - {room.type}</h3>
        <p className="text-gray-600 mb-4">{room.description}</p>
        <div className="flex items-center gap-4 mb-4">
          <div className="flex items-center gap-1">
            <Users size={18} />
            <span>Up to {room.capacity} guests</span>
          </div>
          <div className="flex items-center gap-1">
            <Calendar size={18} />
            <span>Available now</span>
          </div>
        </div>
        <div className="flex items-center justify-between">
          <span className="text-2xl font-bold">${room.price_per_night}</span>
          <div className="space-x-2">
            <Link
              to={`/rooms/${room.id}`}
              className="inline-block px-4 py-2 text-blue-600 border border-blue-600 rounded-lg hover:bg-blue-50 transition-colors"
            >
              View Details
            </Link>
            <button
              onClick={() => onBook(room)}
              className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors"
            >
              Book Now
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}