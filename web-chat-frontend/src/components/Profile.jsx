import React from 'react'
import EditProfile from './EditProfile'
import { useSelector } from 'react-redux'
import FlipCard from './FlipCard';
import ProfileCarousel from './ProfileCarousel';

const Profile = () => {
  const user = useSelector((store)=>store.user);
  // console.log(user);


  return (
 user &&  ( <div>
      <EditProfile user={user?.data} /> 
      {/* <ProfileCarousel user={user?.data} />  */}
      {/* <h1>hey</h1> */}
    </div>)
  );
};

export default Profile;
