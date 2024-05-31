import React, { useState } from "react";
import Link from "next/link";
import { Input, Button } from "react-daisyui";
import axios from 'axios';

export default function Register() {
  const [formData, setFormData] = useState({
    nickname: "",
    first_name: "",
    last_name: "",
    email: "",
    password: "",
    phone: "",
    otoritas: "",
    status: ""
  });

  const [registrationSuccess, setRegistrationSuccess] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value
    });
  };
  formData.otoritas = parseInt(formData.otoritas);
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post('http://localhost:5000/api/auth/register', formData);
      console.log("Registration successful:", response.data);
      setRegistrationSuccess(true);
      // Handle successful registration (e.g., redirect to login page or show a success message)
    } catch (error) {
      console.error("Error during registration:", error);
      // Handle registration error (e.g., show an error message)
    }
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gray-100">
      <main className="w-full max-w-2xl p-6 bg-white rounded-md shadow-md mt-4">
        <h1 className="text-2xl mb-4 text-center font-semibold">Register Page</h1>
        {!registrationSuccess ? (
          <form onSubmit={handleSubmit} className="grid grid-cols-2 gap-4">
            <div className="flex flex-col">
              <label htmlFor="nickname" className="block mb-2 text-gray-700">
                Nickname:
              </label>
              <Input
                type="text"
                id="nickname"
                name="nickname"
                value={formData.nickname}
                onChange={handleChange}
                className="input input-bordered"
              />
            </div>
            <div className="flex flex-col">
              <label htmlFor="first_name" className="block mb-2 text-gray-700">
                First Name:
              </label>
              <Input
                type="text"
                id="first_name"
                name="first_name"
                value={formData.first_name}
                onChange={handleChange}
                className="input input-bordered"
              />
            </div>
            <div className="flex flex-col">
              <label htmlFor="last_name" className="block mb-2 text-gray-700">
                Last Name:
              </label>
              <Input
                type="text"
                id="last_name"
                name="last_name"
                value={formData.last_name}
                onChange={handleChange}
                className="input input-bordered"
              />
            </div>
            <div className="flex flex-col">
              <label htmlFor="email" className="block mb-2 text-gray-700">
                Email:
              </label>
              <Input
                type="email"
                id="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                className="input input-bordered"
              />
            </div>
            <div className="flex flex-col">
              <label htmlFor="password" className="block mb-2 text-gray-700">
                Password:
              </label>
              <Input
                type="password"
                id="password"
                name="password"
                value={formData.password}
                onChange={handleChange}
                className="input input-bordered"
              />
            </div>
            <div className="flex flex-col">
              <label htmlFor="phone" className="block mb-2 text-gray-700">
                Phone:
              </label>
              <Input
                type="text"
                id="phone"
                name="phone"
                value={formData.phone}
                onChange={handleChange}
                className="input input-bordered"
              />
            </div>
            <div className="flex flex-col">
              <label htmlFor="otoritas" className="block mb-2 text-gray-700">
                Otoritas:
              </label>
              <Input
                type="text"
                id="otoritas"
                name="otoritas"
                value={formData.otoritas}
                onChange={handleChange}
                className="input input-bordered"
              />
            </div>
            <div className="flex flex-col">
              <label htmlFor="status" className="block mb-2 text-gray-700">
                Status:
              </label>
              <Input
                type="text"
                id="status"
                name="status"
                value={formData.status}
                onChange={handleChange}
                className="input input-bordered"
              />
            </div>
            <Button type="submit" className="btn btn-primary col-span-2">
              Register
            </Button>
          </form>
        ) : (
          <div className="text-center">
            <p className="text-green-600">Registration successful!</p>
            <p>Please proceed to <Link href="/auth/login" className="text-blue-500 hover:underline">Login</Link>.</p>
          </div>
        )}
      </main>
      <p className="mt-4 text-center">
        Already have an account?{" "}
        <Link href="/auth/login" className="text-blue-500 hover:underline">Login</Link>
      </p>
    
    </div>
  );
}
