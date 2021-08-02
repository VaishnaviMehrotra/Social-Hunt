import React from "react";
import '../style/Comments.css'
export default function Comments(props) {
  let month = new Date(props.comment.createdAt).toLocaleString("default", {
    month: "short",
  });
  let day = new Date(props.comment.createdAt).getDate();
  return (
    <div className="reviewCard" >
      <h5>{props.comment.user.name}</h5>
      <p style={{marginTop:"0", marginBottom:"0" }} className="comment">Comment: {props.comment.comment}</p>
      <p style={{ marginBottom:"0"}}>{`${month} ${day}`}</p>
    </div>
  );
}