import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Navbar from './components/ui/navbar';
import { Button } from "@/components/ui/button";
import { useNavigate } from 'react-router-dom';
import { Link } from 'react-router-dom';
// Adjust the path as necessary

export default function Home() {
  const [hostelData, setHostelData] = useState([]);
  const navigate = useNavigate();
  const token = localStorage.getItem('jwt');
  useEffect(() => {
    const fetchHostelData = async () => {
      const token = localStorage.getItem('jwt');
      try {
        const result = await axios.get('http://localhost:9000/api/hostelads/allhostel', {
          headers: {
            'Authorization': `Bearer ${token}`
          }
        });
        if (result) {
          console.log(result.data);
          setHostelData(result.data);
        }
      } catch (error) {
        console.log(error);
      }
    };

    fetchHostelData();
  }, []); // Added empty dependency array to run useEffect once on component mount

  const handleGetStarted = ()=> {
    navigate('/login')
  }

  return (
    <div>
      <Navbar />

      {/* Hero Section */}
      <section
        className="relative bg-cover bg-center bg-gray-800 py-20"
        style={{ backgroundImage: "url('https://www.kayak.com/news/wp-content/uploads/sites/19/2023/08/THEME_HOTEL_HOSTEL_BEDROOM-shutterstock-portfolio_1708374559.jpg')" }}
      >
        <div className="absolute inset-0 bg-black opacity-40"></div>
        <div className="relative container mx-auto text-center z-10 text-white">
          <h1 className="text-5xl font-extrabold leading-tight">
            Welcome to Hostel-Vaniya
          </h1>
          <p className="mt-4 text-xl">
            Discover the best hostels in your city.
          </p>
       {!token && (<Button 
          onClick={handleGetStarted} className="mt-6 bg-blue-600 hover:bg-blue-700 text-white">
            Register your Hostel
          </Button>)}
         
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 bg-gray-50">
        <div className="container mx-auto grid grid-cols-1 md:grid-cols-3 gap-8">
          {hostelData.map((hostel, index) => (
            <FeatureCard 
              key={index}
              id={hostel._id}
              image={hostel.imageUrl} 
              title={hostel.name} 
              location={hostel.location}
              description={hostel.description} 
            />
          ))}
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-800 text-white py-6">
        <div className="container mx-auto text-center">
          <p>&copy; 2024 MyWebsite. All rights reserved.</p>
          <div className="mt-4">
            <a href="#privacy" className="text-gray-400 hover:text-gray-300 mx-2">Privacy Policy</a>
            <a href="#terms" className="text-gray-400 hover:text-gray-300 mx-2">Terms of Service</a>
            <a href="#contact" className="text-gray-400 hover:text-gray-300 mx-2">Contact Us</a>
          </div>
        </div>
      </footer>
    </div>
  );
}

function FeatureCard({ id, image, title, location, description }) {
  return (
    <Link to={`/hostel/${id}`}>
      <div className="bg-white shadow-lg rounded-lg overflow-hidden hover:shadow-2xl transition-shadow duration-300">
        <img className="w-full h-48 object-cover" src={image} alt={title} />
        <div className="p-6">
          <h3 className="text-2xl font-bold text-gray-800">{title}</h3>
          <p className="mt-2 text-gray-600">{location}</p>
          <p className="mt-2 text-gray-700 text-base">{description}</p>
        </div>
      </div>
    </Link>
  );
}
