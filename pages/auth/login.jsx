import React, { useState, useEffect } from "react";
import { useRouter } from "next/router";
import axios from "axios";
import Link from "next/link";
import Cookies from "js-cookie";

const apiEndPoint = 'http://localhost:5000/api';

const Login = () => {
  const router = useRouter();
  const [loginData, setLoginData] = useState({
    email: "",
    password: ""
  });
  const [error, setError] = useState(null);

  useEffect(() => {
    // Check if token exists in cookie
    const token = Cookies.get("token");
    if (token) {
      // If token exists, redirect to CRUD page
      router.push("/crud");
    }
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setLoginData({
      ...loginData,
      [name]: value
    });
  };

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(`${apiEndPoint}/auth/login`, loginData);
      console.log("Login successful:", response.data);
      
      // Save token to cookie
      Cookies.set("token", response.data.token, { expires: 1 }); // expires in 1 day
      
      // Redirect to CRUD page upon successful login
      router.push("/crud");
    } catch (error) {
      console.error("Error during login:", error.response.data);
      setError("Invalid email or password. Please try again.");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-900">
      <div className="w-full max-w-md bg-gray-800 rounded-lg p-6">
        <h2 className="text-2xl font-semibold text-white text-center">Login</h2>
        <form className="mt-4" onSubmit={handleLogin}>
          <div className="mb-4">
            <label className="block text-gray-300 mb-1" htmlFor="email">Email</label>
            <input
              className="input input-bordered w-full bg-gray-700 text-white"
              id="email"
              name="email"
              placeholder="Enter your email"
              required
              type="email"
              value={loginData.email}
              onChange={handleChange}
            />
          </div>
          <div className="mb-6">
            <label className="block text-gray-300 mb-1" htmlFor="password">Password</label>
            <input
              className="input input-bordered w-full bg-gray-700 text-white"
              id="password"
              name="password"
              placeholder="Enter your password"
              required
              type="password"
              value={loginData.password}
              onChange={handleChange}
            />
          </div>
          <button className="btn btn-primary mb-1 w-full" type="submit">
            Sign in
          </button>
          <p className="mt-4 text-center">
        Do have an account?{" "}
        <Link href="/auth/register" className="text-blue-500 hover:underline">Register</Link>
      </p>
          {error && <p className="text-red-500 text-sm">{error}</p>}
        </form>
      </div>
    </div>
  );
}

export default Login;
