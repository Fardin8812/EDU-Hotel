import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { Users } from 'lucide-react';
import { supabase } from '../lib/supabase';
import { BookingModal } from '../components/BookingModal';
import { RoomAmenities } from '../components/room/RoomAmenities';
import { RoomGallery } from '../components/room/RoomGallery';
import type { Room } from '../types';

export function RoomDetailPage() {
  const { id } = useParams();
  const [room, setRoom] = useState<Room | null>(null);
  const [showBookingModal, setShowBookingModal] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchRoom();
  }, [id]);

  const fetchRoom = async () => {
    if (!id) return;

    try {
      const { data, error } = await supabase
        .from('rooms')
        .select('*')
        .eq('id', id)
        .single();

      if (error) throw error;
      setRoom(data);
    } catch (error) {
      console.error('Error fetching room:', error);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="animate-pulse">
          <div className="h-[400px] bg-gray-200 rounded-lg mb-8" />
          <div className="h-8 bg-gray-200 rounded w-1/4 mb-4" />
          <div className="h-4 bg-gray-200 rounded w-3/4 mb-8" />
        </div>
      </div>
    );
  }

  if (!room) {
    return (
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <h1 className="text-2xl font-bold text-gray-900">Room not found</h1>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="mb-8">
        <RoomGallery mainImage={room.image_url} type={room.type} />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2">
          <h1 className="text-3xl font-bold text-gray-900 mb-4">
            {room.type} - Room {room.number}
          </h1>
          
          <div className="flex items-center gap-4 mb-6">
            <div className="flex items-center gap-2">
              <Users size={20} />
              <span>Up to {room.capacity} guests</span>
            </div>
          </div>

          <div className="prose max-w-none mb-8">
            <p className="text-gray-600">{room.description}</p>
          </div>

          <div className="mb-8">
            <h2 className="text-2xl font-bold text-gray-900 mb-6">Room Amenities</h2>
            <RoomAmenities />
          </div>
        </div>

        <div className="lg:col-span-1">
          <div className="bg-white rounded-lg shadow-lg p-6 sticky top-8">
            <div className="mb-4">
              <span className="text-3xl font-bold text-gray-900">${room.price_per_night}</span>
              <span className="text-gray-600"> / night</span>
            </div>

            <button
              onClick={() => setShowBookingModal(true)}
              className="w-full bg-[maroon] text-white px-6 py-3 rounded-lg font-semibold hover:bg-[maroon] transition-colors"
            >
              Book Now
            </button>

            <div className="mt-4 text-sm text-gray-600">
              <p>• Free cancellation up to 24 hours before check-in</p>
              <p>• Best price guarantee</p>
              <p>• No hidden fees</p>
            </div>
          </div>
        </div>
      </div>

      {showBookingModal && room && (
        <BookingModal
          room={room}
          onClose={() => setShowBookingModal(false)}
        />
      )}
    </div>
  );
}