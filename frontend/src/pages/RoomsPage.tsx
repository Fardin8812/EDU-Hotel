import React, { useEffect, useState } from 'react';
import { supabase } from '../lib/supabase';
import { RoomCard } from '../components/RoomCard';
import { BookingModal } from '../components/BookingModal';
import { useAuthStore } from '../store/authStore';
import type { Room } from '../types';

export function RoomsPage() {
  const [rooms, setRooms] = useState<Room[]>([]);
  const [selectedRoom, setSelectedRoom] = useState<Room | null>(null);
  const { user } = useAuthStore();

  useEffect(() => {
    fetchRooms();
  }, []);

  const fetchRooms = async () => {
    const { data, error } = await supabase
      .from('rooms')
      .select('*')
      .order('price_per_night');
    
    if (error) {
      console.error('Error fetching rooms:', error);
      return;
    }
    
    setRooms(data);
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <h1 className="text-3xl font-bold mb-8">Our Rooms</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {rooms.map((room) => (
          <RoomCard
            key={room.id}
            room={room}
            onBook={setSelectedRoom}
          />
        ))}
      </div>

      {selectedRoom && (
        <BookingModal
          room={selectedRoom}
          onClose={() => setSelectedRoom(null)}
        />
      )}
    </div>
  );
}