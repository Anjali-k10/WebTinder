import axios from "axios";
import profilePhoto from "../assets/profile.png";
import { Base_URL } from "../utils/constants";
import { useDispatch } from "react-redux";
import {removeUserFromFeed } from "../utils/feedSlice";
const Card = ({ user }) => {
  // console.log("Card user:", user.profilePhoto);
 if (!user) return null; 
  const dispatch = useDispatch();
  const { firstName, lastName, age, gender, about, email, phNumber, skills,_id } = user;

 const handleSendRequest=async(status,_id)=>{
  // console.log("Sending request:", status, _id); 
  try{
    const res= await axios.post(Base_URL + "/user/request/send/" +  status + "/" + _id,
      {},{
      withCredentials:true
    })
    dispatch(removeUserFromFeed(_id));
  }
  catch(err){
     console.log(err);
  }
 }

 const rawProfilePhoto = user?.profilePhoto || "";

// Decide what type:
let finalPhotoSrc;

if (rawProfilePhoto.startsWith("http://") || rawProfilePhoto.startsWith("https://")) {
  // Case 1: absolute URL → keep as is
  finalPhotoSrc = rawProfilePhoto;
} else if (rawProfilePhoto.startsWith("/")) {
  // Case 2: relative path → add Base_URL
  finalPhotoSrc = `${Base_URL}${rawProfilePhoto}`;
} else {
  // Case 3: empty or unexpected → fallback
  finalPhotoSrc = profilePhoto;
}

  return (
    <div className="card bg-base-300 w-96 shadow-sm">
      <figure>
      
<img
  alt="User profile"
  src={finalPhotoSrc}

            

             />
      </figure>
      <div className="card-body">
        <h2 className="card-title">{firstName + " " + lastName} </h2>
        {age && gender && <p> {age + "," + gender}</p>}
        <p> {phNumber}</p>
        <div className="card-actions justify-between">
          <button className="btn  btn-warning w-24 " onClick={()=>handleSendRequest("ignored",_id)} >Ignore</button>
          <button className="btn  btn-secondary " onClick={()=>handleSendRequest("interested",_id)} >Interested</button>
        </div>
      </div>
    </div>
  );
};

export default Card;
