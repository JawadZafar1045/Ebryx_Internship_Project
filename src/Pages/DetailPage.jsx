import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import Navbar from '@/components/ui/navbar';

export default function DetailPage() {
  const { id } = useParams(); // Get the hostel ID from the route parameters
  const [hostel, setHostel] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchHostelDetails = async () => {
      try {
        const token = localStorage.getItem('jwt');
        const result = await axios.get(`http://localhost:9000/api/hostelads/detailpage/${id}`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        setHostel(result.data);
      } catch (error) {
        console.error('Error fetching hostel details:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchHostelDetails();
  }, [id]);

  if (loading) {
    return <div>Loading...</div>;
  }

  if (!hostel) {
    return <div>Hostel not found</div>;
  }

  return (
<>
      <Navbar />
      <div className="container mx-auto p-8">
        <h1 className="text-4xl font-extrabold mb-6 text-center text-gray-800">{hostel.name}</h1>
        <div className="flex flex-col md:flex-row md:space-x-12">
          {/* Image Section */}
          <div className="md:w-1/2">
            <img
              src={hostel.imageUrl}
              alt={hostel.name}
              className="rounded-lg shadow-lg w-full object-cover"
            />
          </div>

          {/* Details Section */}
          <div className="md:w-1/2 mt-6 md:mt-0">
            <p className="text-gray-800 text-lg mb-6">
              <span className="font-semibold text-xl">Location:</span> {hostel.location}
            </p>
            <p className="text-gray-800 text-lg mb-6">
              <span className="font-semibold text-xl">Description:</span> {hostel.description}
            </p>
            <p className="text-gray-800 text-lg">
              <span className="font-semibold text-xl">Contact Number:</span> {hostel.contactNumber}
            </p>
          </div>
        </div>
      </div>
    </>

  );
}
