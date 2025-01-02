import React from 'react';
import { CreditCard, Users, Calendar } from 'lucide-react';
import type { BookingWithDetails } from '../../types';

interface StatsProps {
  bookings: BookingWithDetails[];
}

export function Stats({ bookings }: StatsProps) {
  const stats = React.useMemo(() => {
    const totalRevenue = bookings.reduce((sum, booking) => 
      booking.status === 'confirmed' ? sum + booking.total_price : sum, 0
    );

    const confirmedBookings = bookings.filter(
      booking => booking.status === 'confirmed'
    ).length;

    const uniqueGuests = new Set(
      bookings.map(booking => booking.user_id)
    ).size;

    return { totalRevenue, confirmedBookings, uniqueGuests };
  }, [bookings]);

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
      <StatCard
        icon={<CreditCard className="h-6 w-6 text-blue-600" />}
        label="Total Revenue"
        value={`$${stats.totalRevenue}`}
      />
      <StatCard
        icon={<Calendar className="h-6 w-6 text-green-600" />}
        label="Confirmed Bookings"
        value={stats.confirmedBookings.toString()}
      />
      <StatCard
        icon={<Users className="h-6 w-6 text-purple-600" />}
        label="Unique Guests"
        value={stats.uniqueGuests.toString()}
      />
    </div>
  );
}

interface StatCardProps {
  icon: React.ReactNode;
  label: string;
  value: string;
}

function StatCard({ icon, label, value }: StatCardProps) {
  return (
    <div className="bg-white rounded-lg shadow-md p-6">
      <div className="flex items-center">
        <div className="p-3 bg-gray-50 rounded-full">
          {icon}
        </div>
        <div className="ml-4">
          <p className="text-sm font-medium text-gray-500">{label}</p>
          <p className="text-2xl font-semibold text-gray-900">{value}</p>
        </div>
      </div>
    </div>
  );
}