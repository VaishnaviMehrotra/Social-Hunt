import React from "react";
import "../style/Profile.css";
const LikesCard = ({ setShowLikes, allLikes }) => {
  const handleCloseAll = () => {
    if (setShowLikes) setShowLikes(false);
  };
  return (
    <div className="follow">
      <div className="follow_box">
        <h5 className="text-center">Likes</h5>
        <hr />
        <div className="follow_content">
          <div className="d-flex p-2  w-100 card">
            <div>
              <div onClick={handleCloseAll}>
                {allLikes[0]?.slice(0).map((likes) => {
                  // return <UserPosts post={post} key={post._id} />;
                  return (
                    <div className="d-flex align-items-center mt-3 ">
                      <img src={likes.user.image} alt="" className="big-avatar" />
                      <div
                        className="ml-1"
                        style={{ transform: "translateY(-2px)" }}
                      >
                        <span className="d-block">{likes.user.name}</span>
                        <small style={{ opacity: 0.7 }}></small>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
        </div>
        <div className="close" onClick={() => setShowLikes(false)}>
          &times;
        </div>
      </div>
    </div>
  );
};
export default LikesCard;
