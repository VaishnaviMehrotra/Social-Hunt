import React, { useContext, useEffect, useState } from "react";
import AppBar from "../components/AppBar";
import "../style/SinglePost.css";
import Comments from "..//components/Comments";
import { Favorite } from "@material-ui/icons";
import { PostContext } from "../context/PostContext";
import { UserContext } from "../context/UserContext";
import { useParams } from "react-router";
import axios from "../utils/axios";
import { useSnackbar } from "notistack";
import LikesCard from "./LikesCard";
export default function SinglePost() {
  const params = useParams();
  const { userState, } = useContext(UserContext);
  const [post, setPost] = useState(null);
  const [comments, setComments] = useState([]);
  const { enqueueSnackbar } = useSnackbar();
  const { postDispatch } = useContext(PostContext);
  const [isLike, setIsLike] = useState(false);
  const [comment, setComment] = useState("");
  const [allLikes, setAllLikes] = useState([]);
  const [showLikes, setShowLikes] = useState(false);

    const getPost = async () => {
      try {
        const postId = params.postId;
        const data = await axios.get(`/api/post/${postId}`);
        setPost(data.data);
      } catch (err) {
        console.log(err);
      }
    };
    const getComments = async () => {
      try {
        const postId = params.postId;
        const data = await axios.get(`/api/comment/${postId}`);
        setComments([data.data]);
      } catch (err) {
        console.log(err);
      }
    };
    async function getAllLikes() {
      try {
        const { data } = await axios.get(`/api/post/getlikes/${params.postId}`);
        setAllLikes([data]);
      } catch (err) {
        console.log(err);
      }
    }
    const handleLike = async (ev) => {
      ev.preventDefault();
      try {
        const { data } = await axios.put(`/api/post/likes/${params.postId}`);
        postDispatch({ type: "POST_LOADED", payload: data });
        setIsLike(true);
        let result = post?.likes.filter((item) => item.user === userState.user?._id);
        if (result.length!==0) {
          setIsLike(false);
        }
        getPost();
        getAllLikes();
      } catch (err) {
        console.log(err);
      }
    };
    const handleComment = async (ev) => {
      ev.preventDefault();
      try {
        if (comment === "") {
          return enqueueSnackbar("Empty Comment", { variant: "error" });
        }
        const postId = params.postId;
        const { data } = await axios.post(`/api/comment/${postId}`, {
          comment: comment,
        });
        postDispatch({ type: "POST_COMMENTS", payload: data });
        getComments();
        enqueueSnackbar("Posted Successfully", { variant: "success" });
        setComment("")
      } catch (err) {
        console.log(err);
      }
    };
  useEffect(() => {
    getPost();
    getComments();
    getAllLikes();
    return () => {
      postDispatch({ type: "COMMENTS_UNLOADED" });
      postDispatch({ type: "POST_UNLOADED" });
    };
    // eslint-disable-next-line
  }, []);
  let month = new Date(post?.createdAt).toLocaleString("default", {
    month: "short",
  });
  let result = allLikes[0]?.filter((item) => item.user._id === userState.user?._id);
  let red =
    (result?.length !== 0) || isLike
      ? { htmlColor: "red" }
      : { htmlColor: "grey" };
  let day = new Date(post?.createdAt).getDate();
  return (
    <div>
    <AppBar />
      <div className="singlePost" style={{ background: "white" }}>
        <div className="postWrapperSingle">
          <div className="postTop">
            <div className="postTopLeft">
              <img className="postTopImg" src={post?.user.image} alt="" />
              <span className="postUser">{post?.user.name}</span>
              <span className="postDate">{`${month} ${day}`}</span>
            </div>
          </div>
          <div className="postCenter">
            <span className="text">{post?.content}</span>
            {post?.image && (
            <img src={post?.image} alt="" className="postImg" />
          )}
          </div>
          <div className="postBottom">
            <div className="postBottomLeft">
            <Favorite {...red} className="likeIcon" onClick={handleLike} />
              <span className="postLikeCounter" onClick={()=>{setShowLikes(true)}} style={{cursor:"pointer"}}>
                {post?.likes.length} Likes
              </span>
              {showLikes && <LikesCard allLikes={allLikes} setShowLikes={setShowLikes}/>}
            </div>
            <div className="postBottomRight">
              <span className="postCommentText">
                {comments[0]?.length} comments
              </span>
            </div>
          </div>
          <div className="comments">
            <input
              type="text"
              className="postComment"
              placeholder="Add a comment.."
              onChange={(ev) => setComment(ev.target.value)}
              value={comment}
            ></input>
            <button
              variant="contained"
              className="commentButton"
              onClick={handleComment}
            >
              Post
            </button>
          </div>
        </div>
      </div>
      <h4 style={{ marginLeft: "20%" }} className="postComments">
        Post Comments
      </h4>
      {comments[0]?.slice(0).map((comment) => {
        return <Comments comment={comment} key={comment._id} />;
      })}
    </div>
  );
}
