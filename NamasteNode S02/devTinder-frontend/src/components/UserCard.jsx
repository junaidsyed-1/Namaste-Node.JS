import React from "react";

const UserCard = ({ user }) => {
  return (
    <div className="card bg-base-300 w-full max-w-xs sm:max-w-96 mx-auto mb-4 shadow-xl">
      <figure className="h-auto overflow-hidden">
        <img
          src={user?.photoUrl}
          alt="Profile"
          className="w-full h-full object-cover"
        />
      </figure>
      <div className="card-body p-4">
        <h2 className="card-title capitalize text-lg">
          {user.firstName} {user.lastName}
        </h2>
        <p className="text-sm line-clamp-3">{user.about}</p>
        <div className="card-actions justify-end mt-2">
          <button className="btn btn-secondary btn-sm">Interested</button>
          <button className="btn btn-primary btn-sm">Ignore</button>
        </div>
      </div>
    </div>
  );
};

export default UserCard;
