import React, { useState } from "react";

const Login = () => {
  const [emial, setEmail] = useState("junaid@gmail.com");
  const [password, setPassword] = useState("Junaid123@");

  function handleLogin() {}

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
                value={emial}
                onChange={(e) => setEmail(e.target.value)}
                type="text"
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
