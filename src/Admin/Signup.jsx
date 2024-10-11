import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

const Signup = () => {
  const [phone, setPhone] = useState("");
  const [otp, setOtp] = useState("");
  const [otpSent, setOtpSent] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  const navigate = useNavigate();

  const handlePhoneChange = (e) => {
    setPhone(e.target.value);
  };

  const handleOtpChange = (e) => {
    setOtp(e.target.value);
  };

  // Function to handle OTP sending 
  const handleSendOtp = () => {
    if (phone.length !== 10) {
      setErrorMessage("Please enter a valid 10-digit mobile number");
      return;
    }
    setOtpSent(true);
    setErrorMessage("");
  };

  // Function to handle OTP verification 
  const handleVerifyOtp = () => {
    if (otp === "1234") {
      navigate("/community");
    } else {
      setErrorMessage("Invalid OTP. Please try again.");
    }
  };

  return (
    <div className="min-h-screen flex flex-col justify-center items-center bg-gradient-to-r from-blue-500 to-purple-600">
      <h1 className="text-3xl font-bold text-white mb-8">Login with Mobile</h1>
      <div className="bg-teal-300 rounded-md shadow-md p-8 w-96">
        <div className="mb-4">
          <label
            htmlFor="phone"
            className="block text-sm font-medium text-gray-700 mb-2"
          >
            Mobile Number
          </label>
          <input
            type="text"
            id="phone"
            value={phone}
            onChange={handlePhoneChange}
            className="w-full border border-gray-300 p-3 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            placeholder="Enter your mobile number"
            disabled={otpSent}
          />
        </div>
        {otpSent && (
          <div className="mb-4">
            <label
              htmlFor="otp"
              className="block text-sm font-medium text-gray-700 mb-2"
            >
              Enter OTP
            </label>
            <input
              type="text"
              id="otp"
              value={otp}
              onChange={handleOtpChange}
              className="w-full border border-gray-300 p-3 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="Enter OTP"
            />
          </div>
        )}
        {errorMessage && (
          <p className="text-red-500 text-sm mb-4">{errorMessage}</p>
        )}
        {!otpSent ? (
          <button
            onClick={handleSendOtp}
            className="w-full bg-blue-500 text-white p-3 rounded-md hover:bg-blue-600 transition-colors"
          >
            Send OTP
          </button>
        ) : (
          <button
            onClick={handleVerifyOtp}
            className="w-full bg-green-500 text-white p-3 rounded-md hover:bg-green-600 transition-colors"
          >
            Verify OTP
          </button>
        )}
      </div>
    </div>
  );
};

export default Signup;
