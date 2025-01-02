import React from 'react';
import { useLocation, Navigate } from 'react-router-dom';
import { CheckCircle, Calendar, Users } from 'lucide-react';
import { format } from 'date-fns';
import type { Room } from '../types';

interface LocationState {
  room: Room;
  checkIn: string;
  checkOut: string;
  totalPrice: number;
}

export function BookingConfirmationPage() {
  const location = useLocation();
  const state = location.state as LocationState;

  if (!state?.room) {
    return <Navigate to="/rooms" replace />;
  }

  const { room, checkIn, checkOut, totalPrice } = state;

  return (
    <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
      <div className="text-center mb-8">
        <div className="inline-flex items-center justify-center w-16 h-16 bg-green-100 rounded-full mb-4">
          <CheckCircle className="w-8 h-8 text-green-600" />
        </div>
        <h1 className="text-3xl font-bold text-gray-900 mb-2">Booking Confirmed!</h1>
        <p className="text-lg text-gray-600">
          Thank you for choosing our hotel. Your reservation has been confirmed.
        </p>
      </div>

      <div className="bg-white rounded-lg shadow-lg p-6 mb-8">
        <h2 className="text-xl font-semibold mb-4">Booking Details</h2>
        
        <div className="space-y-6">
          <div className="flex items-start gap-4">
            <img
              src={room.image_url}
              alt={`Room ${room.number}`}
              className="w-24 h-24 object-cover rounded-lg"
            />
            <div>
              <h3 className="font-semibold text-lg">{room.type} - Room {room.number}</h3>
              <div className="flex items-center gap-1 text-gray-600">
                <Users size={18} />
                <span>Up to {room.capacity} guests</span>
              </div>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="flex items-center gap-2">
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
            <div className="flex justify-between text-lg font-semibold">
              <span>Total Amount Paid</span>
              <span>${totalPrice}</span>
            </div>
          </div>
        </div>
      </div>

      <div className="bg-blue-100 rounded-lg p-6">
        <h3 className="font-semibold mb-2">What's Next?</h3>
        <ul className="space-y-2 text-gray-600">
          <li>• You'll receive a confirmation email with your booking details</li>
          <li>• Check-in time starts at 3:00 PM on your arrival date</li>
          <li>• Please bring a valid ID and the credit card used for booking</li>
          <li>• Our staff is available 24/7 if you need any assistance</li>
        </ul>
      </div>
    </div>
  );
}