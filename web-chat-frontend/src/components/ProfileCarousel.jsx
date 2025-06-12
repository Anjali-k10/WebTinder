import React from 'react';
import Card from './Card';
import EditProfile from './EditProfile';

const ProfileCarousel = ({ user }) => {
  return (
    <div className="flex justify-center bg-base-100 mt-8">
      <div className="carousel w-full max-w-md mx-auto">
        {/* Slide 1: Profile Card */}
        <div id="slide1" className="carousel-item relative w-full justify-center">
          <div className="w-full bg-base-300 pt-2 px-4 pb-4 rounded-xl shadow-md">
            <Card user={user} />
          </div>
          <div className="absolute left-5 right-5 top-1/2 flex justify-between -translate-y-1/2 transform">
            <a href="#slide2" className="btn btn-circle">❯</a>
          </div>
        </div>

        {/* Slide 2: Edit Profile Form */}
        <div id="slide2" className="carousel-item relative w-full justify-center">
          <div >
            <EditProfile user={user} />
          </div>
          <div className="absolute left-5 right-5 top-1/2 flex justify-between -translate-y-1/2 transform">
            <a href="#slide1" className="btn btn-circle">❮</a>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProfileCarousel;



