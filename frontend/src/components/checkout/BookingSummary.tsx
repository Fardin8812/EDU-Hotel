import React from 'react';
import { Calendar, Users } from 'lucide-react';
import { format } from 'date-fns';
import type { Room } from '../../types';

interface BookingSummaryProps {
  room: Room;
  checkIn: string;
  checkOut: string;
  totalPrice: number;
}

export function BookingSummary({ room, checkIn, checkOut, totalPrice }: BookingSummaryProps) {
  return (
    <div className="bg-white rounded-lg shadow-lg p-6">
      <h2 className="text-xl font-semibold mb-4">Booking Summary</h2>
      
      <div className="space-y-4">
        <div className="flex items-start gap-4">
          <img
            src={room.image_url}
            alt={`Room ${room.number}`}
            className="w-20 h-20 object-cover rounded-lg"
          />
          <div>
            <h3 className="font-semibold">{room.type} - Room {room.number}</h3>
            <div className="flex items-center gap-1 text-sm text-gray-600">
              <Users size={16} />
              <span>Up to {room.capacity} guests</span>
            </div>
          </div>
        </div>

        <div className="border-t pt-4">
          <div className="flex items-center gap-2 mb-2">
            <Calendar size={18} className="text-gray-400" />
            <div>
              <div className="text-sm text-gray-600">Check-in</div>
              <div className="font-medium">{format(new Date(checkIn), 'MMM d, yyyy')}</div>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <Calendar size={18} className="text-gray-400" />
            <div>
              <div className="text-sm text-gray-600">Check-out</div>
              <div className="font-medium">{format(new Date(checkOut), 'MMM d, yyyy')}</div>
            </div>
          </div>
        </div>

        <div className="border-t pt-4">
          <div className="flex justify-between mb-2">
            <span className="text-gray-600">Room rate</span>
            <span>${room.price_per_night} / night</span>
          </div>
          <div className="flex justify-between font-semibold text-lg">
            <span>Total</span>
            <span>${totalPrice}</span>
          </div>
        </div>

        <div className="border-t pt-4 text-sm text-gray-600">
          <p>• Free cancellation up to 24 hours before check-in</p>
          <p>• Best price guarantee</p>
          <p>• No hidden fees</p>
        </div>
      </div>
    </div>
  );
}