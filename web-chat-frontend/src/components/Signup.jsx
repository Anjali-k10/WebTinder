import axios from 'axios';
import  { useState } from 'react'
import { Base_URL } from "../utils/constants";
import { useDispatch } from 'react-redux';
import { addUser } from '../utils/userSlice';
import { useNavigate, Link } from 'react-router-dom';
import { defaultPhoto } from '../utils/constants';


const Signup = () => {
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [email, setEmail] = useState('');
  const [phNumber, setPhNumber] = useState('');
  const [password, setPassword] = useState('');
  const [age, setAge] = useState('');
  const [gender, setGender] = useState('');
  const [bio, setBio] = useState('');
  const [profilePhoto, setProfilePhoto] = useState(null);
const [photoPreview, setPhotoPreview] = useState(defaultPhoto);

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    setProfilePhoto(file);
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setPhotoPreview(reader.result);
      };
      reader.readAsDataURL(file);
    } else {
      setPhotoPreview(defaultPhoto);
    }
  };

  const fetchData = async () => {
    try {
      const formData = new FormData();
      formData.append('firstName', firstName);
      formData.append('lastName', lastName);
      formData.append('email', email);
      formData.append('phNumber', phNumber);
      formData.append('password', password);
      formData.append('age', age);
      formData.append('gender', gender);
      formData.append('bio', bio);
      if (profilePhoto) {
        formData.append('profilePhoto', profilePhoto);
      }

      const res = await axios.post(
        Base_URL + "/signup",
        formData,
        {
          withCredentials: true,
          headers: {
            'Content-Type': 'multipart/form-data',
          },
        }
      );

      dispatch(addUser(res.data));
      // alert('Signup successful!');
      navigate("/feed");
    } catch (err) {
      console.log(err);
      alert('Signup failed: ' + (err.response?.data || err.message));
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    fetchData();
  };

  return (
    <div className="max-w-md mx-auto p-6 bg-base-300 shadow-lg rounded-lg mt-5">
      <h2 className="text-2xl font-bold mb-6 text-center text-blue-600">Sign Up</h2>

      {/* Profile Preview */}
      <div className="flex justify-center mb-4">
        <div className="w-24 h-24 rounded-full overflow-hidden border-2 border-blue-500">
          <img
            src={photoPreview}
            alt="Profile Preview"
            className="object-cover w-full h-full"
          />
        </div>
      </div>

      <form onSubmit={handleSubmit} className="space-y-4">
        {/* First + Last Name */}
        <div className="flex gap-4">
          <input
            type="text"
            placeholder="First Name"
            autoComplete="given-name"
            value={firstName}
            onChange={(e) => setFirstName(e.target.value)}
            className="w-1/2 px-4 py-2 border rounded-md"
            required
          />
          <input
            type="text"
            placeholder="Last Name"
            autoComplete="family-name"
            value={lastName}
            onChange={(e) => setLastName(e.target.value)}
            className="w-1/2 px-4 py-2 border rounded-md"
            required
          />
        </div>

        <input
          type="email"
          placeholder="Email"
          autoComplete="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="w-full px-4 py-2 border rounded-md"
          required
        />
        <input
          type="tel"
          placeholder="Phone Number"
          autoComplete="tel"
          value={phNumber}
          onChange={(e) => setPhNumber(e.target.value)}
          className="w-full px-4 py-2 border rounded-md"
          required
        />

        {/* Age + Gender */}
        <div className="flex gap-4">
          <input
            type="number"
            placeholder="Age"
            value={age}
            onChange={(e) => setAge(e.target.value)}
            className="w-1/2 px-4 py-2 border rounded-md"
            required
          />
          <select
            value={gender}
            onChange={(e) => setGender(e.target.value)}
            className="w-1/2 px-4 py-2 border bg-base-300 rounded-md"
            required
          >
            <option value="">Gender</option>
            <option value="Female">Female</option>
            <option value="Male">Male</option>
            <option value="Other">Other</option>
          </select>
        </div>

        <textarea
          placeholder="Short Bio"
          value={bio}
          onChange={(e) => setBio(e.target.value)}
          className="w-full px-4 py-2 border rounded-md"
          rows="3"
          required
        />

        {/* File input for Profile */}
        <input
          type="file"
          accept="image/*"
          onChange={handleImageChange}
          className="file-input file-input-bordered w-full"
        />

        <input
          type="password"
          autoComplete='current-password'
          placeholder="Create Password"
          minLength="6"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="w-full px-4 py-2 border rounded-md"
          required
        />

        <button
          type="submit"
          className="w-full bg-blue-600 text-white py-2 rounded-md hover:bg-blue-700 transition"
        >
          Sign Up
        </button>
      </form>

      <div className="text-center mt-4">
        <p className="text-sm">
          Already have an account?{" "}
          <Link to="/login" className="text-blue-600 hover:underline font-medium">
            Login now
          </Link>
        </p>
      </div>
    </div>
  );
};

export default Signup;

