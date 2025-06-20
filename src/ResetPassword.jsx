import React, { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';
import HomeLayout from './Layout/HomeLayout';
import toast from 'react-hot-toast';
import { Eye, EyeOff } from 'lucide-react'; // Eye icons for show/hide

const ResetPassword = () => {
  const backendUrl = "https://lms1-backend.onrender.com";
  const { token } = useParams();
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [message, setMessage] = useState('');
  const navigate = useNavigate();

  const handleReset = async (e) => {
    e.preventDefault();
    setMessage('');
    try {
      const response = await axios.post(
        `${backendUrl}/api/v1/user/reset-password/${token}`,
        { password }
      );

      if (response.status === 200 || response.status === 201) {
        const msg = response.data.message || "Password updated successfully!";
        setMessage(msg);
        toast.success(msg);

        setTimeout(() => {
          navigate('/login');
        }, 1500);
      } else {
        toast.error("Unexpected response. Please try again.");
      }
    } catch (error) {
      const errMsg = error.response?.data?.message || 'Something went wrong.';
      setMessage(errMsg);
      toast.error(errMsg);
    }
  };

  return (
    <HomeLayout>
      <div className="flex items-center justify-center min-h-screen bg-gray-900 pt-16">
        <form
          onSubmit={handleReset}
          className="flex flex-col items-center justify-center gap-3 rounded-lg p-4 text-white shadow-[0_0_10px_black] w-96"
        >
          <h2 className="text-2xl font-semibold mb-4 text-center">Reset Password</h2>

          {/* Password input with eye icon */}
          <div className="w-full relative">
            <input
              type={showPassword ? 'text' : 'password'}
              placeholder="Enter new password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              className="w-full p-2 pr-10 border border-gray-300 rounded text-black"
            />
            <button
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              className="absolute top-1/2 right-2 transform -translate-y-1/2 text-gray-600 hover:text-gray-800"
            >
              {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
            </button>
          </div>

          {/* Submit button */}
          <button
            type="submit"
            className="w-full bg-green-600 hover:bg-green-700 text-white font-semibold py-2 rounded"
          >
            Update Password
          </button>

          {/* Optional message */}
          {message && (
            <p className="mt-2 text-sm text-center text-gray-300">{message}</p>
          )}
        </form>
      </div>
    </HomeLayout>
  );
};

export default ResetPassword;
