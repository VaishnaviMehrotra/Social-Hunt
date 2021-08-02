import React, { useContext, useEffect } from "react";
import "../../style/CenterBar.css";
import UserPosts from "./Post";
import { PostContext } from "../../context/PostContext";
import axios from "../../utils/axios";
import { useParams } from "react-router";
export default function CenterBar() {
  const params = useParams();
  const { postState, postDispatch } = useContext(PostContext);
  async function getUserPost() {
    try {
      const userId = params.userId;
      const { data } = await axios.get(`/api/post/user/${userId}`);
      postDispatch({ type: "POSTS_LOADED", payload: data });
    } catch (err) {
      console.log(err);
    }
  }
  useEffect(() => {
    getUserPost();
    return () => {
      postDispatch({ type: "POSTS_UNLOADED" });
    };
    // eslint-disable-next-line
  }, [params.userId]);
  return (
    <div className="CenterBar">
      {postState.posts?.length > 0 ? (
        <div className="centerWrapper">
          {postState.posts?.slice(0).map((post) => {
            return <UserPosts post={post} key={post?._id} />;
          })}
        </div>
      ) : (
        <div className="noPost">No Post Uploaded</div>
      )}
    </div>
  );
}
