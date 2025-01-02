import React from 'react';
import { subDays, format } from 'date-fns';
import type { BookingWithDetails } from '../../types';

interface RevenueProps {
  bookings: BookingWithDetails[];
}

export function Revenue({ bookings }: RevenueProps) {
  const revenueData = React.useMemo(() => {
    const last7Days = Array.from({ length: 7 }, (_, i) => {
      const date = subDays(new Date(), i);
      const dayBookings = bookings.filter(booking => 
        format(new Date(booking.created_at), 'yyyy-MM-dd') === format(date, 'yyyy-MM-dd')
      );
      const revenue = dayBookings.reduce((sum, booking) => 
        booking.status === 'confirmed' ? sum + booking.total_price : sum, 0
      );
      
      return {
        date: format(date, 'MMM d'),
        revenue
      };
    }).reverse();

    return last7Days;
  }, [bookings]);

  return (
    <div className="bg-white rounded-lg shadow-md p-6">
      <h2 className="text-lg font-semibold mb-4">Revenue (Last 7 Days)</h2>
      <div className="space-y-4">
        {revenueData.map((day) => (
          <div key={day.date} className="flex items-center justify-between">
            <span className="text-sm text-gray-600">{day.date}</span>
            <span className="font-medium">${day.revenue}</span>
          </div>
        ))}
      </div>
    </div>
  );
}