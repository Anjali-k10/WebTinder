import axios from "axios";
import { Base_URL } from "../utils/constants";
import { useDispatch } from "react-redux";
import { useState } from "react";
import Card from "./Card";
import { addUser } from "../utils/userSlice";

const EditProfile = ({ user }) => {
  const [firstName, setFirstName] = useState(user?.firstName);
  const [lastName, setLastName] = useState(user?.lastName);
  const [email, setEmail] = useState(user?.email);
  const [password, setPassword] = useState("");
  const [about, setAbout] = useState("");
  const [profilePhoto, setProfilePhoto] = useState("");
  const [age, setAge] = useState("");
  const [gender, setGender] = useState("");
  const [error, setError] = useState("");
  const [showToast, setShowToast] = useState(false);

  const dispatch = useDispatch();

  const saveProfile = async () => {
    setError("");
    try {
      const res = await axios.patch(
        Base_URL + "/user/profile/edit",
        { firstName, lastName, profilePhoto, age, gender, about, email },
        {
          withCredentials: true,
        }
      );
  
      dispatch(addUser(res?.data?.updatedProfile));
       setShowToast(true);
      
        setTimeout(() => {
      setShowToast(false);
    }, 3000);

    } catch (err) {
      setError(err.response.data);
    }
  };

  return (
    <>
      <div className="flex ">
        <div className="max-w-xl mx-auto mt-10 p-6 bg-base-300 shadow-md rounded-xl">
          <h2 className="text-xl font-semibold text-center text-white mb-6">
            Edit Profile
          </h2>

          <form className="space-y-5">
            {/* First Name & Last Name */}
            <div className="flex flex-col md:flex-row gap-4">
              <div className="flex-1">
                <label className="block text-sm text-gray-600 mb-1">
                  First Name
                </label>
                <input
                  type="text"
                  value={firstName}
                  onChange={(e) => setFirstName(e.target.value)}
                  placeholder="FirstName"
                  autoComplete="given-name"
                  className="w-full px-3 py-1.5 border text-sm rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
                />
              </div>
              <div className="flex-1">
                <label className="block text-sm text-gray-600 mb-1">
                  Last Name
                </label>
                <input
                  type="text"
                  value={lastName}
                  onChange={(e) => setLastName(e.target.value)}
                  placeholder="LastName"
                  autoComplete="family-name"
                  className="w-full px-3 py-1.5 border text-sm rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
                />
              </div>
            </div>
            <div className="flex flex-col md:flex-row gap-4">
              <div className="flex-1">
                <label className="block text-sm text-gray-600 mb-1">Age</label>
                <input
                  type="number"
                  value={age}
                  onChange={(e) => setAge(e.target.value)}
                  min={18}
                  max={100}
                  placeholder="Enter your age"
                  autoComplete=""
                  className="w-full px-3 py-1.5 border text-sm rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
                />
              </div>
              <div className="flex-1">
                <label className="block text-sm text-gray-600 mb-1">
                  Gender
                </label>
                <select
                  value={gender}
                  onChange={(e) => setGender(e.target.value)}
                  autoComplete="sex"
                  className="w-full px-3 py-1.5 border text-gray-300 bg-base-300 text-sm rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
                >
                  <option value="" disabled>
                    Select gender
                  </option>
                  <option value="female">Female</option>
                  <option value="male">Male</option>
                  <option value="prefer-not-to-say">Prefer not to say</option>
                </select>
              </div>
            </div>

            {/* Email & Location */}
            <div className="flex flex-col md:flex-row gap-4">
              <div className="flex-1">
                <label className="block text-sm text-gray-600 mb-1">
                  Email
                </label>
                <input
                  type="email"
                  value={email}
                  readOnly
                  placeholder="anjali@example.com"
                  autoComplete="email"
                  className="w-full px-3 py-1.5 border text-sm rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
                />
              </div>
              <div className="flex-1">
                <label className="block text-sm text-gray-600 mb-1">
                  New Password
                </label>
                <input
                  type="password"
                  value={password}
                  readOnly
                  placeholder="Password"
                  minLength="8"
                  autoComplete="current-password"
                  // pattern="(?=.*\\d)(?=.*[a-z])(?=.*[A-Z]).{8,}"
                  title="Must be more than 8 characters, including number, lowercase letter, uppercase letter"
                  required
                  className="w-full px-3 py-1.5 border text-sm rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
                />
              </div>
            </div>

            {/* Bio */}
            <div>
              <label className="block text-sm text-gray-600 mb-1">Bio</label>
              <textarea
                value={about}
                onChange={(e) => setAbout(e.target.value)}
                rows="3"
                placeholder="Tell something about yourself..."
                className="w-full px-3 py-1.5 border text-sm rounded-lg resize-none focus:outline-none focus:ring-2 focus:ring-blue-400"
              ></textarea>
            </div>

            {/* Profile Picture */}
            <div>
              <label className="block text-sm text-gray-600 mb-1">
                Profile Picture
              </label>
              <input
                value={profilePhoto}
                onChange={(e) => setProfilePhoto(e.target.value)}
                type="file"
                accept="image/*"
                className="block w-full text-sm text-gray-600 file:py-1 file:px-3 file:rounded-lg file:border-0 file:bg-blue-200 file:text-blue-700 hover:file:bg-blue-100"
              />
            </div>

            <p className="text-red-500">{error}</p>
            {/* Save Button */}
            <div className="text-center">
              <button
                type="button"
                onClick={saveProfile}
                className="bg-blue-600 text-white text-sm px-6 py-1.5 rounded-lg 
               hover:bg-blue-700 hover:shadow-lg transform hover:scale-105 
               transition-all duration-200 ease-in-out"
              >
                Save Changes
              </button>
            </div>
          </form>
        </div>
        <Card
          user={{
            firstName,
            lastName,
            profilePhoto,
            age,
            gender,
            about,
            email,
          }}
        />
      </div>
    { showToast &&( <div className="toast toast-top toast-center">
        <div className="alert alert-success">
          <span>Profile updated successfully.</span>
        </div>
      </div>)}
    </>
  );
};
export default EditProfile;
