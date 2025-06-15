import axios from "axios";
import profilePhoto from "../assets/profile.png";
import { Base_URL } from "../utils/constants";
import { useDispatch } from "react-redux";
import {removeUserFromFeed } from "../utils/feedSlice";
const Card = ({ user }) => {
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


  return (
    <div className="card bg-base-300 w-96 shadow-sm">
      <figure>
        <img
          className="w-56"
           src={
            user?.profilePhoto
              ? `${Base_URL}${user.profilePhoto}`
              : profilePhoto
          }
          alt="photo"
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
