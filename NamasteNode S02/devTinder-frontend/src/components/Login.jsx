import axios from "axios";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { addUser } from "../utils/userSlice";
import { useNavigate } from "react-router-dom";
import { BASE_URL } from "../utils/constants";

const Login = () => {
  const [emailId, setEmail] = useState("salman@mail.com");
  const [password, setPassword] = useState("Salman@123");
  const [error, setError] = useState("");
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const isAuthenticated = useSelector((store) => store.user.isAuthenticated);

  async function handleLogin() {
    try {
      const res = await axios.post(
        BASE_URL + "/login",
        {
          emailId,
          password,
        },
        { withCredentials: true }
      );
      dispatch(addUser(res.data));
      navigate("/");
    } catch (error) {
      setError(error?.response?.data?.Error);
    }
  }
  useEffect(() => {
    if (isAuthenticated) {
      navigate("/");
    }
  }, [isAuthenticated, navigate]);

  return (
    <div className="flex justify-center items-center h-screen ">
      <div className="card bg-base-300 w-96 shadow-xl">
        <div className="card-body">
          <h2 className="card-title text-2xl">Login</h2>
          <div className="my-2">
            <label className="form-control w-full max-w-xs">
              <div className="label">
                <span className="label-text">Email</span>
              </div>
              <input
                value={emailId}
                onChange={(e) => setEmail(e.target.value)}
                type="email"
                name="emailId"
                className="input input-bordered w-full max-w-xs"
              />
            </label>
            <label className="form-control w-full max-w-xs">
              <div className="label">
                <span className="label-text">Password</span>
              </div>
              <input
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                type="password"
                name="password"
                className="input input-bordered w-full max-w-xs"
              />
            </label>
          </div>
          <div className="inline-block">
            <p className="text-red-500 ">{error}</p>
          </div>
          <div className="card-actions justify-between">
            <button onClick={handleLogin} className="btn btn-primary">
              Login
            </button>
            <button className="btn btn-neutral">Sign Up</button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
