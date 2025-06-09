import React from "react";
import { useSelector } from "react-redux";
import profilePhoto from "../assets/profile.png";


const NavBar = () => {
  const user = useSelector((store) => store.user);
  console.log("user1 :" + user);
  return (
    <div className="navbar bg-base-300 shadow-sm">
      <div className="flex-1">
        <a className="btn btn-ghost text-xl">DevTinder</a>
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
        <a className="justify-between">
          Profile
          <span className="badge">New</span>
        </a>
      </li>
      <li>
        <a>Settings</a>
      </li>
      <li>
        <a>Logout</a>
      </li>
    </ul>
  )}
</div>

      </div>
    </div>
  );
};

export default NavBar;
