import React, { useState } from "react";
import { addUser } from "../utils/userSlice";

import axios from "axios";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { BASE_URL } from "../utils/constants";

const Login = () => {
  const [emailId, setEmailId] = useState("virat@gmail.com");
  const [password, setPassword] = useState("Virat123");
  const [error, setError] = useState("");

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleLogin = async () => {
    try {
      const res = await axios.post(
        BASE_URL + "/login",
        {
          emailId,
          password,
        },
        { withCredentials: true }
      );
      dispatch(addUser(res.data.user));
      navigate("/");
    } catch (err) {
      setError(err?.response?.data || "Something went wrong");
    }
  };
  return (
    <div className="flex justify-center p-3 m-3">
      <div className="card bg-base-100 w-96 shadow-xl">
        <div className="card-body">
          <h2 className="card-title font-bold justify-center">Login</h2>
          <div>
            {<p className="text-red-600">{error} </p>}
            <label className="form-control w-full max-w-xs my-2">
              <span className="ml-2 p-2 font-bold">Email -{emailId}</span>
              <input
                type="text"
                value={emailId}
                placeholder="Enter your EmailId"
                className="input input-bordered w-full max-w-xs "
                onChange={(e) => setEmailId(e.target.value)}
              />
            </label>
            <label className="form-control w-full max-w-xs">
              <span className="ml-2 p-2 font-bold">Password: {password}</span>
              <input
                type="password"
                value={password}
                placeholder="Enter your Password"
                className="input input-bordered w-full max-w-xs"
                onChange={(e) => setPassword(e.target.value)}
              />
            </label>
          </div>

          <div className="card-actions justify-center mt-4">
            <button className="btn btn-primary" onClick={handleLogin}>
              Login
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
