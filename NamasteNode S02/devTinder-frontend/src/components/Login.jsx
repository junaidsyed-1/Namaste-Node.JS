import axios from "axios";
import React, { useState } from "react";

const Login = () => {
  const [emailId, setEmail] = useState("salman@mail.com");
  const [password, setPassword] = useState("Salman@123");

  async function handleLogin() {
    try {
      const res = await axios.post("http://localhost:7777/login", {
        emailId,
        password,
      });
      console.log(res);
    } catch (error) {
      console.log(error);
    }
  }

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
