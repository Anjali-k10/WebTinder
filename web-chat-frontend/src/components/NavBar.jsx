import React from "react";
import { useDispatch, useSelector } from "react-redux";
import profilePhoto from "../assets/profile.png";
import { Link, useNavigate } from 'react-router-dom';
import axios from "axios";
import { Base_URL } from "../utils/constants";
import { removeUser } from "../utils/userSlice";


const NavBar = () => {
  const navigate=useNavigate();
  const user = useSelector((store) => store.user);
  const dispatch = useDispatch();
  // console.log("user1 :" , user);
 const handleLogout=async()=>{
  try{
   await axios.post(Base_URL+ "/logout",{},
    { withCredentials:true });  
      dispatch(removeUser()) ;
       return  navigate("/login"); 
    
  }catch(err){
 console.error("Error during logout:", err);
  }
 }
  
  return (
    <div className="navbar bg-base-300 shadow-sm">
      <div className="flex-1">
        <Link to="/" className="btn btn-ghost text-xl">WebChat</Link>
      </div>
      <div className="flex gap-2">
        {/* <input type="text" placeholder="Search" className="input input-bordered w-24 md:w-auto" /> */}
      <div className="dropdown dropdown-end mx-5">
  <div tabIndex={0} role="button" className="btn btn-ghost btn-circle avatar">
    <div className="w-10 rounded-full">
     {/* <img alt="user photo" src={user.photoUrl} /> */}
      <img
        alt="User profile"
        src={
          user
            ? "https://img.daisyui.com/images/stock/photo-1534528741775-53994a69daeb.webp"
            : profilePhoto
        }
      />
    </div>
  </div>

  {user && (
    <ul
      tabIndex={0}
      className="menu menu-sm dropdown-content bg-base-100 rounded-box z-1 mt-3 w-52 p-2 shadow"
    >
      <li>
        <Link to="/profile" className="justify-between">
          Profile
          <span className="badge">New</span>
        </Link>
      </li>
      <li>
        <Link to="/connections"> Connections </Link>
      </li>
      <li>
        <a onClick={handleLogout}>Logout</a>
      </li>
    </ul>
  )}
</div>

      </div>
    </div>
  );
};

export default NavBar;
