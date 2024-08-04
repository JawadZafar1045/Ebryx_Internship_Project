import React, { useState } from 'react';
import axios from 'axios';
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Textarea } from '@/components/ui/textarea';
import { Button } from "@/components/ui/button";
import { useNavigate } from 'react-router-dom';

export default function AddHostel() {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    name: '',
    location: '',
    description: '',
    image: null,
  });

  const handleChange = (e) => {
    const { name, value, files } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: files ? files[0] : value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const token = localStorage.getItem('jwt');
    
    // Create a FormData object
    const data = new FormData();
    data.append('name', formData.name);
    data.append('location', formData.location);
    data.append('description', formData.description);
    data.append('image', formData.image);
  
    try {
      const result = await axios.post('http://localhost:9000/api/hostelads/posthostel', data, {
        headers: {
          'Content-Type': 'multipart/form-data',
          'Authorization': `Bearer ${token}`
        },
      });
      console.log(result);
      if (result) {
        navigate('/my-hostels')
      }
    } catch (error) {
      console.log(error);
    }
  };
  

  return (
    <div className="container mx-auto p-8">
      <h1 className="text-3xl font-bold mb-6 text-center">Add a New Hostel</h1>
      <form onSubmit={handleSubmit} className="max-w-lg mx-auto bg-white p-6 rounded-lg shadow-lg">
        {/* Name */}
        <div className="mb-4">
          <Label htmlFor="name" className="block text-sm font-medium text-gray-700">
            Hostel Name
          </Label>
          <Input
            type="text"
            id="name"
            name="name"
            value={formData.name}
            onChange={handleChange}
            className="mt-1 block w-full"
            placeholder="Enter hostel name"
            required
          />
        </div>

        {/* Location */}
        <div className="mb-4">
          <Label htmlFor="location" className="block text-sm font-medium text-gray-700">
            Location
          </Label>
          <Input
            type="text"
            id="location"
            name="location"
            value={formData.location}
            onChange={handleChange}
            className="mt-1 block w-full"
            placeholder="Enter location"
            required
          />
        </div>

        {/* Description */}
        <div className="mb-4">
          <Label htmlFor="description" className="block text-sm font-medium text-gray-700">
            Description
          </Label>
          <Textarea
            id="description"
            name="description"
            value={formData.description}
            onChange={handleChange}
            className="mt-1 block w-full"
            placeholder="Enter a brief description"
            required
          />
        </div>

        {/* Image */}
        <div className="mb-6">
          <Label htmlFor="image" className="block text-sm font-medium text-gray-700">
            Hostel Image
          </Label>
          <Input
            type="file"
            id="image"
            name="image"
            onChange={handleChange}
            className="mt-1 block w-full"
            required
          />
        </div>

        {/* Submit Button */}
        <Button type="submit" className="w-full bg-blue-600 text-white hover:bg-blue-700">
          Add Hostel
        </Button>
      </form>
    </div>
  );
}
