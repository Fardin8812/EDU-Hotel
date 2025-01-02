import React, { useState } from 'react';
import { useAuthStore } from '../../store/authStore';
import type { Room } from '../../types';

interface CheckoutFormProps {
  room: Room;
  checkIn: string;
  checkOut: string;
  totalPrice: number;
}

export function CheckoutForm({ room, checkIn, checkOut, totalPrice }: CheckoutFormProps) {
  const { user } = useAuthStore();
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!user) return;
    console.log("room.id: ", room.id);
    console.log("user.id: ", user.id);
    console.log("checkIn: ", checkIn);
    console.log("checkOut: ", checkOut);
    console.log("totalPrice: ", totalPrice);

    setLoading(true);
    try {
      const response = await fetch('https://edu-hotel.onrender.com/api/bookings/create-booking', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          roomId: room.id,
          userId: user.id,
          checkIn,
          checkOut,
          totalAmount: totalPrice,
        }),
      });

      if (!response.ok) {
        throw new Error('Failed to create booking');
      }

      
    } catch (error) {
      console.error('Error creating booking:', error);
      alert('Failed to complete booking. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <button
        type="submit"
        disabled={loading}
        className="w-full bg-[maroon] text-white px-6 py-3 rounded-lg font-semibold hover:bg-[maroon] transition-colors disabled:opacity-50"
      >
        {loading ? 'Processing...' : `Pay $${totalPrice}`}
      </button>
    </form>
  );
}
