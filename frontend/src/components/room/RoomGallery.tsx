import React from 'react';

interface RoomGalleryProps {
  mainImage: string;
  type: string;
}

const additionalImages = [
  'https://images.unsplash.com/photo-1582719478250-c89cae4dc85b',
  'https://images.unsplash.com/photo-1590490360182-c33d57733427',
  'https://images.unsplash.com/photo-1566665797739-1674de7a421a'
];

export function RoomGallery({ mainImage, type }: RoomGalleryProps) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
      <div className="md:col-span-2">
        <img
          src={mainImage}
          alt={`${type} - Main View`}
          className="w-full h-[400px] object-cover rounded-lg"
        />
      </div>
      {additionalImages.map((image, index) => (
        <img
          key={index}
          src={image}
          alt={`${type} - View ${index + 2}`}
          className="w-full h-48 object-cover rounded-lg"
        />
      ))}
    </div>
  );
}