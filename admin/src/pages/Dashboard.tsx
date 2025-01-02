import React from 'react';
import { useBookings } from '../hooks/useBookings';
import { Stats } from '../components/dashboard/Stats';
import { RecentBookings } from '../components/dashboard/RecentBookings';
import { Revenue } from '../components/dashboard/Revenue';

export function Dashboard() {
  const { bookings, loading } = useBookings();

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-bold">Dashboard</h1>
      <Stats bookings={bookings} />
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <RecentBookings bookings={bookings} />
        <Revenue bookings={bookings} />
      </div>
    </div>
  );
}