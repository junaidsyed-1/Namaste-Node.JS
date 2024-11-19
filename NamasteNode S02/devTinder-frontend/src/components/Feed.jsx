import axios from "axios";
import React, { useEffect } from "react";
import { BASE_URL } from "../utils/constants";
import { useDispatch, useSelector } from "react-redux";
import { addFeed } from "../utils/feedSlice";
import UserCard from "./UserCard";

const Feed = () => {
  const dispatch = useDispatch();
  const feed = useSelector((store) => store.feed);

  const getFeed = async () => {
    if (feed) return;
    try {
      const res = await axios.get(BASE_URL + "/feed", {
        withCredentials: true,
      });
      dispatch(addFeed(res?.data));
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getFeed();
  }, []);

  return (
    feed && (
      <div className="grid grid-cols-1 sm:grid-cols-6 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6  gap-2 md:gap-4 p-4">
        {feed?.data.map((card) => (
          <UserCard key={card._id} user={card} />
        ))}
      </div>
    )
  );
};

export default Feed;
