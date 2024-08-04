import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import FeatureCard from '@/components/ui/FeatureCard'; // Assuming this is your reusable card component
import { Button } from '@/components/ui/button';
import Navbar from '@/components/ui/navbar';

export default function MyHostels() {
  const [myHostels, setMyHostels] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchMyHostels = async () => {
      const token = localStorage.getItem('jwt');
      try {
        const result = await axios.get('http://localhost:9000/api/hostelads//allRecordbyid', {
          headers: {
            'Authorization': `Bearer ${token}`
          }
        });
        setMyHostels(result.data);
        
      } catch (error) {
        console.error('Error fetching hostels:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchMyHostels();
  }, []);

  const handleAddHostel = () => {
    navigate('/add-hostel');
  };

  const handleDelete = async (hostelId) => {
    try {
      const token = localStorage.getItem('jwt');
      await axios.delete(`http://localhost:9000/api/hostelads/Record-delete/${hostelId}`, {
        headers: {
          'Authorization': `Bearer ${token}`
        }
      });
  
      // Update state after deletion
      setMyHostels(myHostels.filter(hostel => hostel._id !== hostelId));
    } catch (error) {
      console.error('Error deleting hostel:', error);
    }
  };
  

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
   <>
    <Navbar />
    <div className="container mx-auto p-8">
      <h1 className="text-3xl font-bold mb-6 text-center">My Hostels</h1>
      {myHostels.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {myHostels.map((hostel) => (
            <FeatureCard
              key={hostel._id}
              image={hostel.imageUrl}
              title={hostel.name}
              location={hostel.location}
              description={hostel.description}
              onDelete={() => handleDelete(hostel._id)}
            />
          ))}
        </div>
      ) : (
        <div className="text-center">
          <p className="text-gray-600">You haven't created any hostels yet.</p>
          <Button onClick={handleAddHostel} className="mt-4 bg-green-500 text-white">
            Add Your First Hostel
          </Button>
        </div>
      )}
    </div>
   
    </>
  );
}
