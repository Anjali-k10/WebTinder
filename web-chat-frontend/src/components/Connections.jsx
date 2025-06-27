import axios from "axios";
import React, { use, useEffect } from "react";
import { Base_URL } from "../utils/constants";
import { useDispatch, useSelector } from "react-redux";
import { addConnections } from "../utils/connectionSlice";

const Connections = () => {
  const dispatch = useDispatch();
  const connections = useSelector((store) => store.connections);
  const fetchConnetction = async () => {
    try {
      const res = await axios.get(Base_URL + "/user/connection/review", {
        withCredentials: true,
      });
      console.log(res.data.data);
      dispatch(addConnections(res.data.data));
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    fetchConnetction();
  }, []);

  if (!connections) return <h1>No connections Found</h1>;

  //    if (connections.length==="null") return <h1>No connections Found</h1>

  return (
    <div className="text-center my-10">
      <h1 className="text-bold text-white text-3xl">Connections</h1>
      {connections.map((connection) => {
        const { _id, firstName, lastName, profilePhoto, age, gender, about } =
          connection;
          const photoURL = profilePhoto
            ? `${Base_URL}${profilePhoto}`  // Just prepend Base_URL without adding '/uploads/'
            : defaultPhoto;
        return (
          <div
            key={_id}
            className="flex m-4 p-4 rounded-lg bg-base-300 w-1/2 mx-auto"
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

            
          </div>
        );
      })}
      ;
    </div>
  );
};

export default Connections;
