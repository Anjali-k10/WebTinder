import axios from 'axios';
import React, { useState } from 'react'
import { useDispatch } from 'react-redux';
import { addUser } from '../utils/userSlice';
import { useNavigate } from 'react-router-dom';
import { Base_URL } from '../utils/constants';
import { Link } from 'react-router-dom';


const SignIn = () => {
  const [emailId, setEmailId] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();
  const dispatch =useDispatch();
  const [error,setError] = useState("");
  const handleLogin = async () => {
    try {
      const result = await axios.post( Base_URL + '/login', {
       email: emailId,
        password,
      },{withCredentials:true});

        dispatch(addUser(result.data));
       return  navigate("/feed");
  } catch (err) {
    setError(err.response?.data || "something went wrong" )
  }
};

  return (
    <div className="flex justify-center my-24">
      <div className="card bg-base-300 w-96 shadow-sm">
        <div className="card-body">
          <h2 className="card-title mx-auto">Log In</h2>
          <form
            onSubmit={(e) => {
              e.preventDefault();
              handleLogin();
            }}
          >
            <div className="my-4">
              <label className="input validator">
                <svg
                  className="h-[1em] opacity-50"
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 24 24"
                >
                  <g
                    strokeLinejoin="round"
                    strokeLinecap="round"
                    strokeWidth="2.5"
                    fill="none"
                    stroke="currentColor"
                  >
                    <rect width="20" height="16" x="2" y="4" rx="2"></rect>
                    <path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7"></path>
                  </g>
                </svg>
                <input
                  type="email"
                  value={emailId}
                   autoComplete="email"
                  placeholder="mail@site.com"
                  onChange={(e) => setEmailId(e.target.value)}
                  required
                />
              </label>
              <div className="validator-hint hidden">
                Enter valid email address
              </div>
            </div>

            <div className="my-4">
              <label className="input validator">
                <svg
                  className="h-[1em] opacity-50"
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 24 24"
                >
                  <g
                    strokeLinejoin="round"
                    strokeLinecap="round"
                    strokeWidth="2.5"
                    fill="none"
                    stroke="currentColor"
                  >
                    <path d="M2.586 17.414A2 2 0 0 0 2 18.828V21a1 1 0 0 0 1 1h3a1 1 0 0 0 1-1v-1a1 1 0 0 1 1-1h1a1 1 0 0 0 1-1v-1a1 1 0 0 1 1-1h.172a2 2 0 0 0 1.414-.586l.814-.814a6.5 6.5 0 1 0-4-4z" />
                    <circle cx="16.5" cy="7.5" r=".5" fill="currentColor"></circle>
                  </g>
                </svg>
                <input
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="Password"
                  minLength="8"
                  autoComplete="current-password"
                  // pattern="(?=.*\\d)(?=.*[a-z])(?=.*[A-Z]).{8,}"
                  title="Must be more than 8 characters, including number, lowercase letter, uppercase letter"
                  required
                />
              </label>
            </div>
            <p className="validator-hint hidden">
              Must be more than 8 characters, including
              <br />At least one number <br />At least one lowercase letter{' '}
              <br />At least one uppercase letter
            </p>
          <p className='text-red-500' > {error}</p>
            <div className="card-actions justify-center mt-4">
              <button type="submit" className="btn btn-primary">
                Login
              </button>
            </div>
          </form>
          <div className="text-center mt-4">
  <p className="text-sm">
    Don't have an account?{" "}
    <Link to="/signup" className="text-blue-600 hover:underline font-medium">
      Create one now
    </Link>
  </p>
</div>

        </div>
      </div>
    </div>
  );
};

export default SignIn;
