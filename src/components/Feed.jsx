import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import axios from "axios";
import { BASE_URL } from "../utils/constants";
import { addFeed } from "../utils/feedSlice";
import UserCard from "./userCard";

const Feed = () => {
  const dispatch = useDispatch();

  const feed = useSelector((store) => store.feed);

  const getFeed = async () => {
    if (feed) return;
    try {
      const res = await axios.get(BASE_URL + "/feed", {
        withCredentials: true,
      });
      dispatch(addFeed(res.data));
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => {
    getFeed();
  }, []);

  return (
    <div className="flex justify-center p-3 my-6">
      <UserCard user={feed?.data[0]} />
    </div>
  );
};

export default Feed;
