import { getAuth, signInWithPopup, GoogleAuthProvider } from "firebase/auth";
import { app } from "../firebase";
import React from "react";
import GoogleButton from "react-google-button";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { appGlobalContants } from "../globalContants/appGlobalContants";

const LogIn = () => {
  const firebaseAuth = getAuth(app);
  const provider = new GoogleAuthProvider();
  const dispatch = useDispatch();
  const navigate = useNavigate()

  const handleGoogleSignIn = async () => {
    const userData = await signInWithPopup(firebaseAuth, provider);

    console.log("userData", userData);
    localStorage.setItem("token", userData.user.accessToken);
    dispatch({
      type: "login",
      payload: userData.user.accessToken,
    });
    navigate('/')
  };

  return (
    <div className="w-screen h-screen flex flex-col items-center justify-center">
      <div className="w-full max-w-xs">
        <form className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4">
          <div className="mb-4">
            <label
              className="block text-gray-700 text-sm font-bold mb-2"
              for="username"
            >
              Username
            </label>
            <input
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              id="username"
              type="text"
              placeholder="Username"
            />
          </div>
          <div className="mb-6">
            <label
              className="block text-gray-700 text-sm font-bold mb-2"
              for="password"
            >
              Password
            </label>
            <input
              className="shadow appearance-none border  rounded w-full py-2 px-3 text-gray-700 mb-3 leading-tight focus:outline-none focus:shadow-outline"
              id="password"
              type="password"
              placeholder="******************"
            />
            {/* <p className="text-red-500 text-xs italic">Please choose a password.</p> */}
          </div>
          <div className="flex flex-col items-center justify-between">
            <div className="flex  items-center justify-between p-2 w-full ">
              <button
                className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
                type="button"
              >
                Sign In
              </button>
              <Link to="/forgetpassword">Forget Password</Link>
            </div>

            <div>
              <GoogleButton
                className="g-btn"
                type="dark"
                onClick={handleGoogleSignIn}
              />
            </div>
            <div className="pt-1">
              Don't have an account? <Link to="/signup">Sign up</Link>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
};

export default LogIn;
