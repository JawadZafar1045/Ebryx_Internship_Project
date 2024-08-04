import React from 'react';
import { Button } from '@/components/ui/button';
import { Link } from 'react-router-dom';


export default function FeatureCard({ image, title, location, description ,onDelete}) {
  return (
 
    <div className="bg-white shadow-lg rounded-lg overflow-hidden">
      
        <img className="w-full h-48 object-cover" src={image} alt={title} />
        <div className="p-4">
          <h3 className="text-xl font-bold text-gray-800">{title}</h3>
          <p className="mt-2 text-gray-600">{location}</p>
          <p className="mt-2 text-gray-700 text-base">{description}</p>
        </div>
      <div className="p-4">
      <Button
          onClick={onDelete}
          className="mt-4 bg-red-600 text-white py-2 px-4 rounded-md hover:bg-red-700 transition duration-300"
        >
          Delete
        </Button>
      </div>
    </div>
  );
}