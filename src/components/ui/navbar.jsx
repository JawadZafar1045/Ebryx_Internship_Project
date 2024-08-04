import { Button } from "@/components/ui/button";
import React from "react";
import { useNavigate, Link } from "react-router-dom";

export default function Navbar() {
  const token = localStorage.getItem('jwt');
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem('jwt');
    navigate("/login");
  };
  const handlehomeicon =()=>{
  navigate('/')
  };

  return (
    <nav className="bg-white shadow-md">
      <div className="container mx-auto flex items-center justify-between p-4">
       
        <div className="text-2xl font-bold text-gray-800" onClick={handlehomeicon}>
          HostelVaniya
        </div>
        
    
   
        <div className="flex items-center space-x-4">
          {token && (
            <>
              <Link 
                to="/add-hostel" 
                className="text-white bg-green-500 hover:bg-green-700 focus:ring-4 focus:ring-green-300 font-medium rounded-lg text-sm px-4 py-2 mr-2 focus:outline-none"
              >
                Add Hostel
              </Link>
              <Link 
                to="/my-hostels" 
                className="text-white bg-blue-500 hover:bg-blue-700 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-4 py-2 mr-2 focus:outline-none"
              >
                Show My Hostels
              </Link>
            </>
          )}
          {token ? (
            <Button 
              onClick={handleLogout} 
              className="text-white bg-red-500 hover:bg-red-700 focus:ring-4 focus:ring-red-300 font-medium rounded-lg text-sm px-4 py-2 focus:outline-none"
            >
              Logout
            </Button>
          ) : (
            <Link 
              to="/login" 
              className="text-gray-800 hover:bg-gray-50 focus:ring-4 focus:ring-gray-300 font-medium rounded-lg text-sm px-4 py-2 focus:outline-none"
            >
              Log in
            </Link>
          )}
        </div>
        
      </div>
    </nav>
  );
}
