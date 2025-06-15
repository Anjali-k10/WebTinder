import React, { useEffect} from 'react'
import NavBar from './NavBar'
import { Outlet, useLocation, useNavigate } from 'react-router-dom'
import Footer from './Footer'
import axios from 'axios'
import { Base_URL } from '../utils/constants'
import { useDispatch, useSelector } from 'react-redux'
import { addUser } from '../utils/userSlice'

const Body = () => {
  const dispatch= useDispatch();
  const navigate = useNavigate();
  const location = useLocation();
  const userData = useSelector((store)=>store.user)
  const fetchUser = async ()=>{
    
  try {
     const res = await axios.get(Base_URL + "/user/view",{
      withCredentials:true,
    });
    // console.log("Response data:", res.data);
    dispatch(addUser(res.data));
    }
    catch(err){
   console.log("Error fetching user:", err);
   if(err.response?.status===401){
     navigate("/login");
   }
    }

  };

  useEffect(()=>{
    if(!userData || !userData._id ){
      fetchUser();
    }
  }, []);
   const hideFooterRoutes = ['/signup'];
  const shouldHideFooter = hideFooterRoutes.includes(location.pathname);

  return (
    <div>
     <NavBar/> 
     <Outlet/>
     {!shouldHideFooter && <Footer />}
    </div>
  )
}

export default Body;
