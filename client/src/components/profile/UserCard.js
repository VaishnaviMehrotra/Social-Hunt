import React from "react";
import "../../style/Profile.css";
const UserCard = ({
  setShowFollowers,
  setShowFollowing,
  allFollowers,
  allFollowing,
}) => {
  const handleCloseAll = () => {
    if (setShowFollowers) setShowFollowers(false);
    if (setShowFollowing) setShowFollowing(false);
  };
  return (
    <div className="d-flex p-2  w-100 card">
      <div>
        <div onClick={handleCloseAll}>
          {allFollowers?.slice(0).map((followers) => {
            return (
              <div className="d-flex align-items-center mt-3 ">
                <img src={followers.user.image} alt="" className="big-avatar" />
                <div className="ml-1" style={{ transform: "translateY(-2px)" }}>
                  <span className="d-block">{followers.user.name}</span>
                  <small style={{ opacity: 0.7 }}></small>
                </div>
              </div>
            );
          })}
          {allFollowing?.slice(0).map((following) => {
            return (
              <div className="d-flex align-items-center mt-3 ">
                <img src={following.user.image} alt="" className="big-avatar" />
                <div className="ml-1" style={{ transform: "translateY(-2px)" }}>
                  <span className="d-block">{following.user.name}</span>
                  <small style={{ opacity: 0.7 }}></small>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};
export default UserCard;
