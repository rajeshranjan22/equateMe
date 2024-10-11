import React, { useState, useCallback } from "react";
import { useParams, useLocation } from "react-router-dom";
import Cropper from "react-easy-crop";
import imageCompression from "browser-image-compression";
import getCroppedImg from "../Components/getCroppedImg";
import axios from "axios";

const RegistrationForm = () => {
  const { communityId } = useParams();
  const location = useLocation();

  const queryParams = new URLSearchParams(location.search);
  const communityName = queryParams.get("communityName") || `Community ${communityId}`;

  const [formData, setFormData] = useState({
    name: "",
    phone: "",
    membershipNumber: "",
    image: null,
    croppedImage: null,
  });
  const [crop, setCrop] = useState({ x: 0, y: 0 });
  const [zoom, setZoom] = useState(1);
  const [croppedArea, setCroppedArea] = useState(null);
  const [showCropper, setShowCropper] = useState(false);
  const [isImageSelected, setIsImageSelected] = useState(false);

  // Function to handle input changes
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handlePhoneValidation = (phone) => {
    const phoneRegex = /^[0-9]{10}$/;
    return phoneRegex.test(phone);
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setFormData({ ...formData, image: file });
      setIsImageSelected(true);
      setShowCropper(true);
    }
  };

  const onCropComplete = useCallback((croppedAreaPixels) => {
    setCroppedArea(croppedAreaPixels);
  }, []);

  const handleCropImage = async () => {
    try {
      const croppedImage = await getCroppedImg(
        URL.createObjectURL(formData.image),
        croppedArea
      );
      setFormData({ ...formData, croppedImage });
      setIsImageSelected(false);
      setShowCropper(false);
    } catch (error) {
      console.error("Error cropping image:", error);
    }
  };

  // Submit function using axios
  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!handlePhoneValidation(formData.phone)) {
      alert("Please enter a valid 10-digit phone number.");
      return;
    }
  
    try {
      const croppedFile = new File([formData.croppedImage], "croppedImage.jpg", {
        type: "image/jpeg",
      });
  
      const options = {
        maxSizeMB: 1,
        maxWidthOrHeight: 1024,
        useWebWorker: true,
      };
  
      const compressedImage = await imageCompression(croppedFile, options);
      
      const submissionData = new FormData();
      submissionData.append("name", formData.name);
      submissionData.append("phone", formData.phone);
      submissionData.append("membershipNumber", formData.membershipNumber);
      submissionData.append("image", compressedImage);

      // POST request to the API using axios
      const response = await axios.post(
        "https://57bd-103-170-182-112.ngrok-free.app/register-admin-user/",
        submissionData
      );

      console.log("Response from API:", response.data);
      alert("Registration successful!");

      // Reset form state after successful submission
      setFormData({
        name: "",
        phone: "",
        membershipNumber: "",
        image: null,
        croppedImage: null,
      });
      setIsImageSelected(false);
      setShowCropper(false);
  
    } catch (error) {
      console.error("Error during image compression or API submission:", error);
      alert("An error occurred. Please try again.");
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-r from-blue-500 to-purple-600 flex flex-col justify-center items-center p-6">
      <h1 className="text-3xl font-bold text-white mb-6">Register for {communityName}</h1>
      <form onSubmit={handleSubmit} className="bg-teal-300 shadow-lg rounded-lg p-8 max-w-md w-full">
        <div className="mb-4">
          <input
            type="text"
            name="name"
            placeholder="Name"
            value={formData.name}
            onChange={handleInputChange}
            required
            className="w-full p-3 border border-gray-300 rounded-md"
          />
        </div>
        <div className="mb-4">
          <input
            type="text"
            name="phone"
            placeholder="Phone"
            value={formData.phone}
            onChange={handleInputChange}
            required
            className="w-full p-3 border border-gray-300 rounded-md"
          />
        </div>
        <div className="mb-4">
          <input
            type="text"
            name="membershipNumber"
            placeholder="Membership Number"
            value={formData.membershipNumber}
            onChange={handleInputChange}
            required
            className="w-full p-3 border border-gray-300 rounded-md"
          />
        </div>
        <div className="mb-4">
          <input
            type="file"
            name="image"
            accept="image/*"
            onChange={handleImageChange}
            required
            className="w-full"
          />
        </div>

        {showCropper && (
          <div className="crop-container relative w-full max-w-xs h-64 bg-gray-500 mb-4">
            <Cropper
              image={URL.createObjectURL(formData.image)}
              crop={crop}
              zoom={zoom}
              aspect={4 / 6}
              onCropChange={setCrop}
              onZoomChange={setZoom}
              onCropComplete={onCropComplete}
            />
          </div>
        )}

        {isImageSelected && (
          <button
            type="button"
            onClick={handleCropImage}
            className="w-full bg-green-500 text-white p-3 rounded-md mb-4 hover:bg-green-600"
          >
            Crop Image
          </button>
        )}

        <button
          type="submit"
          className="w-full bg-blue-500 text-white p-3 rounded-md hover:bg-blue-600"
        >
          Submit
        </button>
      </form>
    </div>
  );
};

export default RegistrationForm;
