import profilePhoto from "../assets/profile.png";
const Card = ({user}) => {
    const {firstName,lastName,age,gender,about,email,phNumber,skills} = user;
  return (
   <div className="card bg-base-300 w-96 shadow-sm">
  <figure>
    <img className="w-56"
    //   src={user.photoUrl}
      src={profilePhoto}
      alt="photo" />
  </figure>
  <div className="card-body">
    <h2 className="card-title">{firstName + " " + lastName} </h2>
    {/*{age && gender && <p> {age + "," + gender}</p> }*/}
    <p> {phNumber}</p>
    <div className="card-actions justify-between">
      <button className="btn  btn-warning w-24 ">Ignore</button>
      <button className="btn  btn-secondary ">Interested</button>
    </div>
  </div>
</div>
  )
}

export default Card;
