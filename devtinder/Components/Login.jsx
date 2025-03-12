import React, { useState } from "react";
import axios from "axios";
import { useDispatch } from "react-redux";
import { addUser } from "../utils/userSlice";
import { useNavigate } from "react-router-dom";
import { BASE_URL } from "../utils/Constants";

const Login = () => {
  const [emailId, setEmailId] = useState("");
  const [password, setPassword] = useState("");
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [loginForm, setLoginForm] = useState(true);
  const [error, setError] = useState("");

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleLogin = async () => {
    try {
      const requestData = { emailId, password };
      const res = await axios.post(BASE_URL + "/login", requestData, {
        withCredentials: true,
      });
      dispatch(addUser(res.data));
      navigate("/");
    } catch (err) {
      console.log(err);
      if (err?.response?.data) {
        setError(err?.response?.data);
      }
    }
  };

  const handleSignUp = async () => {
    try {
      const requestData = { firstName, lastName, emailId, password };
      const res = await axios.post(BASE_URL + "/signup", requestData, {
        withCredentials: true,
      });
      dispatch(addUser(res.data));
      navigate("/profile");
    } catch (err) {
      console.log(err);
      if (err?.response?.data) {
        setError(err?.response?.data);
      }
    }
  };

  const toggleForm = () => {
    setLoginForm((prev) => !prev);
    setError(""); 
    setFirstName("");
    setLastName("");
    setEmailId("");
    setPassword("");
  };

  return (
    <div className="flex justify-center my-10">
      <div className="card bg-base-300 w-96 shadow-sm">
        <div className="card-body">
          <h2 className="card-title justify-center text-2xl">
            {loginForm ? "Login" : "Sign Up"}
          </h2>
          <p className="text-gray-500 text-sm mt-1 text-center">
            {loginForm ? "Welcome back! Please login to your account." : "Create an account to get started."}
          </p>

          {!loginForm && (
            <div>
              <label className="form-control w-full max-w-xs">
                <div className="label my-2 text-lg">
                  <span className="label-text">First Name</span>
                </div>
                <input
                  type="text"
                  placeholder="Enter First Name"
                  className="input input-bordered w-full max-w-xs"
                  value={firstName}
                  onChange={(e) => setFirstName(e.target.value)}
                />
              </label>
              <label className="form-control w-full max-w-xs">
                <div className="label my-2 text-lg">
                  <span className="label-text">Last Name</span>
                </div>
                <input
                  type="text"
                  placeholder="Enter Last Name"
                  className="input input-bordered w-full max-w-xs"
                  value={lastName}
                  onChange={(e) => setLastName(e.target.value)}
                />
              </label>
            </div>
          )}

          <label className="form-control w-full max-w-xs">
            <div className="label my-2 text-lg">
              <span className="label-text">Email ID</span>
            </div>
            <input
              type="text"
              placeholder="Enter Email ID"
              className="input input-bordered w-full max-w-xs"
              value={emailId}
              onChange={(e) => setEmailId(e.target.value)}
            />
          </label>

          <label className="form-control w-full max-w-xs">
            <div className="label my-2 text-lg">
              <span className="label-text">Password</span>
            </div>
            <input
              type="password"
              placeholder="Enter Password"
              className="input input-bordered w-full max-w-xs"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </label>

          <p className="text-lg text-red-500">{error}</p>

          <div className="card-actions justify-center">
            <button
              className="btn btn-primary my-2"
              onClick={loginForm ? handleLogin : handleSignUp}
            >
              {loginForm ? "Login" : "Sign Up"}
            </button>
          </div>

          <p className="cursor-pointer text-indigo-500 hover:underline m-auto" onClick={toggleForm}>
            {loginForm ? "New user? Sign up here." : "Existing user? Log in now."}
          </p>
        </div>
      </div>
    </div>
  );
};

export default Login;