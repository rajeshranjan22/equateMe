import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

const CommunityDropdown = () => {
  const [selectedCommunity, setSelectedCommunity] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();

  const communities = [
    { id: 1, name: "Community A" },
    { id: 2, name: "Community B" },
    { id: 3, name: "Community C" },
    { id: 4, name: "Community D" },
    { id: 5, name: "Community E" },
  ];

  const handleCommunitySelect = (e) => {
    const selectedId = e.target.value;
    const selectedName = communities.find((community) => community.id === parseInt(selectedId))?.name;
    setSelectedCommunity({ id: selectedId, name: selectedName });
  };

  const handleNextClick = () => {
    if (selectedCommunity.id) {
      setLoading(true);
      setErrorMessage("");
      navigate(`/register/${selectedCommunity.id}?communityName=${selectedCommunity.name}`);
      setLoading(false);
    } else {
      setErrorMessage("Please select a community");
    }
  };

  return (
    <div className="min-h-screen flex flex-col justify-center items-center bg-gradient-to-r from-blue-500 to-purple-600">
      <h1 className="text-3xl font-bold text-white mb-8">Select a Community!</h1>
      <div className="bg-teal-300 rounded-md shadow-md p-8 w-96">
        <select
          value={selectedCommunity.id}
          onChange={handleCommunitySelect}
          className="w-full border border-gray-300 p-3 rounded-md mb-4"
        >
          <option value="">Select a community</option>
          {communities.map((community) => (
            <option key={community.id} value={community.id}>
              {community.name}
            </option>
          ))}
        </select>
        {errorMessage && <p className="text-red-500 text-sm mb-4">{errorMessage}</p>}
        {selectedCommunity.id && (
          <button
            onClick={handleNextClick}
            className="w-full bg-blue-500 text-white p-3 rounded-md hover:bg-blue-600 transition-colors"
            disabled={loading}
          >
            {loading ? "Processing..." : "Next"}
          </button>
        )}
      </div>
    </div>
  );
};

export default CommunityDropdown;
