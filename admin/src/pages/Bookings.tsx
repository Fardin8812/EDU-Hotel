import React from 'react';

export function Bookings() {
  const [loading, setLoading] = React.useState(true);
  const [bookings, setBookings] = React.useState<
    { _id: string; userId: number; roomId: number; checkInDate: string; checkOutDate: string; totalAmount: number }[]
  >([]);

  React.useEffect(() => {
    setLoading(true);

    fetch('https://edu-hotel.onrender.com/api/bookings/bookings')
      .then((response) => {
        if (!response.ok) {
          throw new Error('Failed to fetch bookings');
        }
        return response.json();
      })
      .then((data) => {
        // Safeguard against unexpected API response structure
        setBookings(Array.isArray(data.bookings) ? data.bookings : []);
        setLoading(false);
      })
      .catch((error) => {
        console.error('Error fetching bookings:', error);
        setBookings([]); // Ensure bookings is always an array
        setLoading(false);
      });
  }, []);

  const completeBooking = (id: string) => {
    fetch('https://edu-hotel.onrender.com/api/bookings/delete-booking', {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ id }),
    })
      .then((response) => response.json())
      .then((data) => {
        console.log(data);
        setBookings(Array.isArray(data.bookings) ? data.bookings : []);
        location.reload();
      })
      .catch((error) => {
        console.error('Error completing booking:', error);
      });
  };

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold">Bookings</h1>
      </div>
      <table className="min-w-full divide-y divide-gray-200">
        <thead className="bg-gray-50">
          <tr>
            <th
              scope="col"
              className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
            >
              User ID
            </th>
            <th
              scope="col"
              className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
            >
              Room ID
            </th>
            <th
              scope="col"
              className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
            >
              Check-In Date
            </th>
            <th
              scope="col"
              className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
            >
              Check-Out Date
            </th>
            <th
              scope="col"
              className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
            >
              Total Amount
            </th>
            <th
              scope="col"
              className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
            >
              Complete Booking
            </th>
          </tr>
        </thead>
        <tbody className="bg-white divide-y divide-gray-200">
          {bookings.map((booking) => (
            <tr key={booking._id} className="hover:bg-gray-100">
              <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{booking.userId}</td>
              <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{booking.roomId}</td>
              <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                {new Date(booking.checkInDate).toLocaleDateString('en-GB')}
              </td>
              <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                {new Date(booking.checkOutDate).toLocaleDateString('en-GB')}
              </td>
              <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                ${booking.totalAmount.toFixed(2)}
              </td>
              <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                <button
                  className="text-blue-500 hover:text-blue-800"
                  onClick={() => completeBooking(booking._id)}
                >
                  Complete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
