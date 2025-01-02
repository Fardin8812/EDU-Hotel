import React from 'react';
import { format } from 'date-fns';
import type { BookingWithDetails } from '../../types';

interface RecentBookingsProps {
  bookings: BookingWithDetails[];
}

export function RecentBookings({ bookings }: RecentBookingsProps) {
  const recentBookings = bookings.slice(0, 5);

  return (
    <div className="bg-white rounded-lg shadow-md p-6">
      <h2 className="text-lg font-semibold mb-4">Recent Bookings</h2>
      <div className="space-y-4">
        {recentBookings.map((booking) => (
          <div key={booking.id} className="flex items-center justify-between">
            <div>
              <p className="font-medium">{booking.user.email}</p>
              <p className="text-sm text-gray-500">
                Room {booking.room.number} • {format(new Date(booking.check_in), 'MMM d')}
              </p>
            </div>
            <span className={`px-2 py-1 text-xs font-semibold rounded-full
              ${booking.status === 'confirmed' ? 'bg-green-100 text-green-800' : 
                booking.status === 'cancelled' ? 'bg-red-100 text-red-800' : 
                'bg-yellow-100 text-yellow-800'}`}
            >
              {booking.status}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
}