import axios from 'axios'
import React, { useEffect } from 'react'
import { Base_URL } from '../utils/constants'
import { addFeed } from '../utils/feedSlice'
import { useDispatch, useSelector } from 'react-redux'
import Card from './Card'

const Feed = () => {
  const feed = useSelector((store)=>store.feed);
  const dispatch = useDispatch();
    const getFeed= async ()=>{
     if (feed) return;
     try {
      const res=await axios.get(Base_URL + "/user/feed" ,
         {withCredentials:true}
        );
      dispatch(addFeed(res.data));}
      catch(err){
      console.log(err);
      }
    };

    useEffect(()=>{
      getFeed();
    },[]);
  return feed && (
    <div className='flex justify-center my-10'>
     <Card user={feed[0] }  />
    </div>
  )
}

export default Feed;
