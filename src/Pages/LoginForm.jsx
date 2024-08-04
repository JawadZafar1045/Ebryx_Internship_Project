import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
  CardFooter,
} from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

export default function LoginForm() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleform = async () => {
    try {
      const User = await axios.post('http://localhost:9000/api/user/login', {
        email: email,
        password: password
      });
      if (User) {
        const token = User.data;
        localStorage.setItem('jwt', token);
        console.log(token);
        navigate('/');
      } else {
        console.log('no user logged in');
      }
    } catch (error) {
      console.log(error);
    }
  };

  const handleRegister = () => {
    navigate('/signup');
  };

  return (
    <div className="flex items-center justify-center h-screen bg-gray-100">
      <Card className="w-full max-w-md rounded-lg shadow-lg bg-white">
        <CardHeader>
          <CardTitle className="text-3xl font-bold text-gray-800">Login</CardTitle>
          <CardDescription className="text-gray-600">
            Enter your email and password to access your account
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-6 p-6">
          <div className="space-y-4">
            <div>
              <Label htmlFor="email" className="block text-gray-700">Email</Label>
              <Input
                id="email"
                type="email"
                placeholder="mahad@example.com"
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
        </CardContent>
        <CardFooter className="p-6 flex flex-col space-y-4">
          <Button
            type="button"
            onClick={handleform}
            className="w-full bg-blue-600 text-white py-3 rounded-md hover:bg-blue-700 transition duration-300"
          >
            Sign in
          </Button>
          <Button
            type="button"
            onClick={handleRegister}
            className="w-full bg-gray-600 text-white py-3 rounded-md hover:bg-gray-700 transition duration-300"
          >
            Create an Account
          </Button>
        </CardFooter>
      </Card>
    </div>
  );
}
