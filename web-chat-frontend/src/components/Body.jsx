import React, { useEffect } from 'react'
import NavBar from './NavBar'
import { Outlet, useNavigate } from 'react-router-dom'
import Footer from './Footer'
import axios from 'axios'
import { Base_URL } from '../utils/constants'
import { useDispatch, useSelector } from 'react-redux'
import { addUser } from '../utils/userSlice'

const Body = () => {
  const dispatch= useDispatch();
  const navigate = useNavigate();
  const userData = useSelector((store)=>store.user)
  const fetchUser = async ()=>{
    // if(!userData) return;
  try {
     const res = await axios.get(Base_URL + "/user/view",{
      withCredentials:true,
    });
    // console.log("Response data:", res.data);
    dispatch(addUser(res.data));
    }
    catch(err){
   console.log(err);
   if(err.status===401){
     navigate("/login");
   }
    }

  };

  useEffect(()=>{
    if(!userData || !userData._id ){
      fetchUser();
    }
  }, []);

  return (
    <div>
     <NavBar/> 
     <Outlet/>
     <Footer/>
    </div>
  )
}

export default Body;
