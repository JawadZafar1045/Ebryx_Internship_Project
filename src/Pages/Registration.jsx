import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";

export default function Registration() {
  const [UserName, setUserName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async () => {
    try {
      const User = await axios.post('http://localhost:9000/api/user/register', {
        username: UserName,
        email: email,
        password: password
      });
      console.log(User);
      if (User) {
     navigate('/login')   
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="flex items-center justify-center h-screen bg-gray-100">
      <Card className="w-full max-w-md rounded-lg shadow-lg bg-white">
        <CardHeader className="text-center">
          <CardTitle className="text-3xl font-bold text-gray-800">Register</CardTitle>
          <CardDescription className="text-gray-600">
            Enter your information to create an account
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-6 p-6">
          <div className="space-y-4">
            <div>
              <Label htmlFor="full-name" className="block text-gray-700">Full Name</Label>
              <Input
                id="full-name"
                placeholder="Arham"
                required
                value={UserName}
                onChange={(e) => setUserName(e.target.value)}
                className="mt-1 p-3 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
            <div>
              <Label htmlFor="email" className="block text-gray-700">Email</Label>
              <Input
                id="email"
                type="email"
                placeholder="arham.@example.com"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="mt-1 p-3 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
            <div>
              <Label htmlFor="password" className="block text-gray-700">Password</Label>
              <Input
                id="password"
                type="password"
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="mt-1 p-3 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
          </div>
          <Button
            onClick={handleSubmit}
            className="w-full bg-blue-600 text-white py-3 rounded-md hover:bg-blue-700 transition duration-300"
          >
            Register
          </Button>
          <div className="mt-4 text-center">
            <p className="text-gray-600">
              Already have an account?{" "}
              <Link to="/login" className="text-blue-600 hover:underline">
                Login
              </Link>
            </p>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
