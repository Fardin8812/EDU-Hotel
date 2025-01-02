import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { X } from 'lucide-react';
import { differenceInDays, parseISO } from 'date-fns';
import type { Room } from '../types';
import { useAuthStore } from '../store/authStore';

interface BookingModalProps {
  room: Room;
  onClose: () => void;
}

export function BookingModal({ room, onClose }: BookingModalProps) {
  const navigate = useNavigate();
  const [checkIn, setCheckIn] = useState('');
  const [checkOut, setCheckOut] = useState('');
  const user = useAuthStore((state) => state.user);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!user) {
      alert('Please sign in to book a room');
      return;
    }

    const days = differenceInDays(parseISO(checkOut), parseISO(checkIn));
    const totalPrice = days * room.price_per_night;

    navigate('/checkout', {
      state: {
        room,
        checkIn,
        checkOut,
        totalPrice
      }
    });
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4">
      <div className="bg-white rounded-lg p-6 max-w-md w-full">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-xl font-semibold">Book Room {room.number}</h2>
          <button onClick={onClose} className="text-gray-500 hover:text-gray-700">
            <X size={24} />
          </button>
        </div>
        <form onSubmit={handleSubmit}>
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700">Check-in Date</label>
              <input
                type="date"
                value={checkIn}
                onChange={(e) => setCheckIn(e.target.value)}
                min={new Date().toISOString().split('T')[0]}
                required
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-[maroon] focus:ring-[maroon]"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700">Check-out Date</label>
              <input
                type="date"
                value={checkOut}
                onChange={(e) => setCheckOut(e.target.value)}
                min={checkIn || new Date().toISOString().split('T')[0]}
                required
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-[maroon] focus:ring-[maroon]"
              />
            </div>
            <div className="pt-4">
              <button
                type="submit"
                className="w-full bg-[maroon] text-white px-4 py-2 rounded-lg hover:bg-[maroon] transition-colors disabled:opacity-50"
              >
                Continue to Checkout
              </button>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
}