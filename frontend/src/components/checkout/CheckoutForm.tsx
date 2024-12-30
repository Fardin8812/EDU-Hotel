import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuthStore } from '../../store/authStore';
import type { Room } from '../../types';

interface CheckoutFormProps {
  room: Room;
  checkIn: string;
  checkOut: string;
  totalPrice: number;
}

export function CheckoutForm({ room, checkIn, checkOut, totalPrice }: CheckoutFormProps) {
  const navigate = useNavigate();
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
      const response = await fetch('http://localhost:5000/api/bookings/create-booking', {
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

      navigate('/booking-confirmation', {
        state: { room, checkIn, checkOut, totalPrice },
      });
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
        className="w-full bg-blue-600 text-white px-6 py-3 rounded-lg font-semibold hover:bg-blue-700 transition-colors disabled:opacity-50"
      >
        {loading ? 'Processing...' : `Pay $${totalPrice}`}
      </button>
    </form>
  );
}
