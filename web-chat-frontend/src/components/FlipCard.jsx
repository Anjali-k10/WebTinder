import React, { useState } from 'react';
import Card from './Card'; // Your display card
import EditProfile from './EditProfile'; // Your existing form

const FlipCard = ({ user }) => {
  const [isFlipped, setIsFlipped] = useState(false);

  const handleFlip = () => {
    setIsFlipped((prev) => !prev);
  };

  return (
    <div className="flex justify-center mt-10">
      <div className="relative w-full max-w-2xl h-[600px] perspective">
        <div
          className={`absolute w-full h-full transition-transform duration-700 ease-in-out transform ${
            isFlipped ? 'rotate-y-180' : ''
          }`}
        >
          {/* Front Side (Profile Card) */}
          <div className="absolute w-full h-full backface-hidden">
            <Card user={user} />
            <div className="text-center mt-4">
              <button
                onClick={handleFlip}
                className="bg-blue-600 text-white text-sm px-4 py-1.5 rounded-lg hover:bg-blue-700"
              >
                Edit Profile
              </button>
            </div>
          </div>

          {/* Back Side (Edit Form) */}
          <div className="absolute w-full h-full rotate-y-180 backface-hidden">
            <EditProfile user={user?.data} />
            <div className="text-center mt-4">
              <button
                onClick={handleFlip}
                className="bg-gray-600 text-white text-sm px-4 py-1.5 rounded-lg hover:bg-gray-700"
              >
                Back to Profile
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default FlipCard;
