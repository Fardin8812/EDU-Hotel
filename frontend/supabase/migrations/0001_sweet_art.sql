/*
  # Initial Hotel Management Schema

  1. New Tables
    - `rooms`
      - `id` (uuid, primary key)
      - `number` (text, unique)
      - `type` (text)
      - `price_per_night` (numeric)
      - `capacity` (integer)
      - `description` (text)
      - `image_url` (text)
      - `created_at` (timestamp)
    
    - `bookings`
      - `id` (uuid, primary key)
      - `room_id` (uuid, foreign key)
      - `user_id` (uuid, foreign key)
      - `check_in` (date)
      - `check_out` (date)
      - `total_price` (numeric)
      - `status` (text)
      - `created_at` (timestamp)

  2. Security
    - Enable RLS on all tables
    - Add policies for authenticated users
*/

-- Create rooms table
CREATE TABLE rooms (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  number text UNIQUE NOT NULL,
  type text NOT NULL,
  price_per_night numeric NOT NULL,
  capacity integer NOT NULL,
  description text NOT NULL,
  image_url text NOT NULL,
  created_at timestamptz DEFAULT now()
);

-- Create bookings table
CREATE TABLE bookings (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  room_id uuid REFERENCES rooms(id) NOT NULL,
  user_id uuid REFERENCES auth.users(id) NOT NULL,
  check_in date NOT NULL,
  check_out date NOT NULL,
  total_price numeric NOT NULL,
  status text NOT NULL DEFAULT 'pending',
  created_at timestamptz DEFAULT now(),
  CONSTRAINT valid_dates CHECK (check_out > check_in)
);

-- Enable RLS
ALTER TABLE rooms ENABLE ROW LEVEL SECURITY;
ALTER TABLE bookings ENABLE ROW LEVEL SECURITY;

-- Rooms policies
CREATE POLICY "Anyone can view rooms"
  ON rooms
  FOR SELECT
  TO public
  USING (true);

-- Bookings policies
CREATE POLICY "Users can view their own bookings"
  ON bookings
  FOR SELECT
  TO authenticated
  USING (auth.uid() = user_id);

CREATE POLICY "Users can create bookings"
  ON bookings
  FOR INSERT
  TO authenticated
  WITH CHECK (auth.uid() = user_id);

-- Insert sample rooms
INSERT INTO rooms (number, type, price_per_night, capacity, description, image_url) VALUES
('101', 'Standard', 100, 2, 'Cozy standard room with city view', 'https://images.unsplash.com/photo-1566665797739-1674de7a421a'),
('102', 'Deluxe', 150, 2, 'Spacious deluxe room with garden view', 'https://images.unsplash.com/photo-1590490360182-c33d57733427'),
('201', 'Suite', 250, 4, 'Luxury suite with separate living area', 'https://images.unsplash.com/photo-1582719478250-c89cae4dc85b'),
('202', 'Family', 200, 4, 'Perfect for families with children', 'https://images.unsplash.com/photo-1566665797739-1674de7a421a');