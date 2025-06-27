import axios from "axios";
import React, { useEffect, useState } from "react";
import { Base_URL } from "../utils/constants";
import { useDispatch, useSelector } from "react-redux";
import { addRequest, removeRequest } from "../utils/requestSlice";
const Request = () => {
  const requests = useSelector((store) => store.requests);
  const dispatch = useDispatch();
  const [showButton,setShowButton] = useState(true);

  const reviewRequest=async(status,_id)=>{
    try{
      const res= await axios.post(Base_URL+ "/user/request/review/" + status + "/" + _id,
        {},{
        withCredentials:true,
      } );
      dispatch(removeRequest(_id));

    }
    catch(err){
      console.log(err);
    }
  }

  const fetchRequest = async () => {
    const res = await axios.get(Base_URL + "/user/request/review", {
      withCredentials: true,
    });
    console.log(res.data);
    dispatch(addRequest(res.data.data));
  };

  useEffect(() => {
    fetchRequest();
  }, []);

  if (!requests) return <h1 className="flex justify-center my-10">No requests Available!! </h1>;

  //    if (connections.length==="null") return <h1>No connections Found</h1>

  return (
    <div className="text-center my-10">
      <h1 className="text-bold text-white text-3xl">Requests</h1>
      {requests.map((request) => {
      const { _id, fromUserID } = request;
const { firstName, lastName, profilePhoto, age, gender,  about } = fromUserID || {};
    

const photoURL = profilePhoto
  ? `${Base_URL}${profilePhoto}`  
  : defaultPhoto;

        return (
          <div
            key={_id}
            className="flex justify-between items-center m-4 p-4 rounded-lg bg-base-300 w-2/3 mx-auto"
          >
            <div>
              {" "}
              <img
                className="rounded-full w-20 h-20"
                alt="photo"
                src={photoURL}
              />{" "}
            </div>
            <div className="text-left mx-4">
              <h2 className="font-bold text-xl">
                {firstName + " " + lastName}
              </h2>
              <p>{about}</p>
              {age && gender && <p>{age + "," + gender}</p>}
            </div>

            <div>
                <button className="btn btn-primary mx-2" onClick={()=>reviewRequest("reject",request._id)}>Reject</button>
                <button className="btn btn-secondary mx-2" onClick={()=>reviewRequest("accept",request._id)}>Accept</button>
            </div>
          </div>
        );
      })}
      ;
    </div>
  );
};

export default Request;
