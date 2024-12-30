export interface Room {
  id: string;
  number: string;
  type: string;
  price_per_night: number;
  capacity: number;
  description: string;
  image_url: string;
  created_at: string;
}

export interface Booking {
  id: string;
  room_id: string;
  user_id: string;
  check_in: string;
  check_out: string;
  total_price: number;
  status: 'pending' | 'confirmed' | 'cancelled';
  created_at: string;
  room?: Room;
}

export interface User {
  id: string;
  email: string;
}