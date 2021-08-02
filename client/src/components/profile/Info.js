import React, { useState, useContext, useEffect } from "react";
import EditProfile from "./EditProfile";
import { UserContext } from "../../context/UserContext";
import "../../style/Profile.css";
import Followers from "./Followers";
import Following from "./Following";
import axios from "../../utils/axios";
const Info = () => {
  const { userState } = useContext(UserContext);
  const [open, setOpen] = useState(false);
  const [showFollowers, setShowFollowers] = useState(false);
  const [showFollowing, setShowFollowing] = useState(false);
  const [user, setUser] = useState(null);
  const handleClickOpen = () => {
    setOpen(true);
  };
  async function getParticularUser() {
    try {
      const { data } = await axios.get(
        `/api/user/particularUser/${userState.user?._id}`
      );
      setUser(data);
    } catch (err) {
      console.log(err);
    }
  }
  useEffect(() => {
    getParticularUser();
    return () => {
      setUser(null);
    };
    // eslint-disable-next-line
  }, [userState.user]);
  return (
    <div className="info">
      <div className="info_container">
        <img
          src={userState.user?.image}
          alt="hello"
          className="supper-avatar"
        />
        <div className="info_content">
          <div className="info_content_title">
            <h2>{userState.user?.name}</h2>
            <button className="btn btn-outline-info" onClick={handleClickOpen}>
              Edit Profile
            </button>
          </div>
          <div className="follow_btn">
            <span className="mr-4" onClick={() => setShowFollowers(true)}>
              {user?.followers.length} Followers
            </span>
            <span className="ml-4" onClick={() => setShowFollowing(true)}>
              {user?.following.length} Following
            </span>
          </div>
          <h6>
            {userState.user?.city}
            <span className="text-danger"></span>
          </h6>
          <p className="m-0">{userState.user?.bio}</p>
        </div>
        {open && <EditProfile setOpen={setOpen} />}
      </div>
      {showFollowers && <Followers setShowFollowers={setShowFollowers} />}
      {showFollowing && <Following setShowFollowing={setShowFollowing} />}
    </div>
  );
};
export default Info;
