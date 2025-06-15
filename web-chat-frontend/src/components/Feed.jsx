import axios from 'axios'
import React, { useEffect,useState } from 'react'
import { Base_URL } from '../utils/constants'
import { addFeed } from '../utils/feedSlice'
import { useDispatch, useSelector } from 'react-redux'
import Card from './Card'
import { ChevronLeft, ChevronRight } from 'lucide-react'
const Feed = () => {
  const feed = useSelector((store)=>store.feed);
  const dispatch = useDispatch();
  const [currentIndex, setCurrentIndex] = useState(0);
    const getFeed= async ()=>{
     if (feed && feed.length > 0) return;
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
   
    const handleNext = () => {
    setCurrentIndex((prevIndex) => (prevIndex + 1) % feed.length);
  };

  
  const handlePrev = () => {
    setCurrentIndex((prevIndex) => (prevIndex - 1 + feed.length) % feed.length);
  };

  if (!feed || feed.length === 0) return <h1 className='flex justify-center mt-10'>No more user available!!</h1>;

  return feed && (
    <div className='flex flex-col items-center my-10 gap-4'>
      <div className='w-full max-w-md'>
        <Card user={feed[currentIndex]} />
      </div>
      <div className='flex gap-4'>
        <button onClick={handlePrev} className='btn btn-outline btn-sm'>
          <ChevronLeft size={18} /> Prev
        </button>
        <button onClick={handleNext} className='btn btn-outline btn-sm'>
          Next <ChevronRight size={18} />
        </button>
      </div>
    </div>
  );
}

export default Feed;
