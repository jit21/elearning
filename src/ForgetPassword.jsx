import React, { useState } from 'react';
import axiosInstance from './Helper/axiosInstance';
import HomeLayout from './Layout/HomeLayout';
import toast from 'react-hot-toast';

const ForgotPassword = () => {
  const backendUrl="http://localhost:5000";
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    setMessage('');
    try {
      const response = await axiosInstance.post(
        `/user/reset`,
        { email }
      );
      setMessage(response.data.message);
      toast.success(response.data.message);
    } catch (error) {
      setMessage(error.response?.data?.message || 'Something went wrong.');
      toast.error(error.response?.data?.message || 'Something went wrong.');
    }
  };

  return (
    <HomeLayout>
      <div className="flex items-center justify-center min-h-screen bg-gray-900 pt-16">
        <form
          onSubmit={handleSubmit}
          className="flex flex-col items-center justify-center gap-3 rounded-lg p-4 text-white shadow-[0_0_10px_black] w-96"
        >
          <h2 className="text-2xl font-semibold mb-4 text-center">Forgot Password</h2>
          <input
            type="email"
            placeholder="Enter your email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            className="w-full p-2 mb-4 border border-gray-300 rounded text-black"
          />
          <button
            type="submit"
            className="w-full bg-yellow-500 hover:bg-yellow-600 text-white font-semibold py-2 rounded"
          >
            Send Reset Link
          </button>
          {message && (
            <p className="mt-4 text-sm text-center text-gray-700">{message}</p>
          )}
        </form>
      </div>
    </HomeLayout>
  );
};

export default ForgotPassword;
