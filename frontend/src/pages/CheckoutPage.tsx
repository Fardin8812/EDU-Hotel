import { useLocation, useNavigate } from 'react-router-dom';
import { BookingSummary } from '../components/checkout/BookingSummary';
import { useAuthStore } from '../store/authStore';
import type { Room } from '../types';

interface LocationState {
  room: Room;
  checkIn: string;
  checkOut: string;
  totalPrice: number;
}

export function CheckoutPage() {
  const location = useLocation();
  const navigate = useNavigate();
  const { user } = useAuthStore();
  const { room, checkIn, checkOut, totalPrice } = location.state as LocationState;

  if (!user) {
    navigate('/rooms');
    return null;
  }

  if (!room || !checkIn || !checkOut) {
    navigate('/rooms');
    return null;
  }

  const handleCheckout = async () => {
    console.log('Checkout');
    console.log(user);
    console.log(new Date(checkIn));
    console.log(new Date(checkOut));

    const response = await fetch('https://edu-hotel.onrender.com/api/bookings/create-booking', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        roomId: room.id,
        userId: user.id,
        checkInDate: new Date(checkIn),
        checkOutDate: new Date(checkOut),
        totalAmount : totalPrice, // Changed from totalPrice to totalAmount
      }),
    });

    if (response.ok) {
      alert('Booking created successfully');
      navigate('/booking-confirmation', {
        state: { room, checkIn, checkOut, totalPrice },
      });
    }
    else {
      console.error('Failed to create booking');
    }
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <h1 className="text-3xl font-bold mb-8">Complete Your Booking</h1>
      
      <div className="grid grid-cols-1 gap-8">
        <div className="lg:col-span-1">
          <BookingSummary
            room={room}
            checkIn={checkIn}
            checkOut={checkOut}
            totalPrice={totalPrice}
          />
        </div>
        <button
          className="lg:col-span-2 bg-[maroon] hover:bg-[maroon] text-white font-bold py-2 px-4 rounded"
          onClick={handleCheckout}
          >
          Confirm Booking
        </button>
      </div>
    </div>
  );
}