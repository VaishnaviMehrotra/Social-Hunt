import React, { useState, useContext, useEffect } from "react";
import { UserContext } from "../../context/UserContext";
import Followers from "./Followers";
import Following from "./Following";
import { useParams } from "react-router";
import axios from "../../utils/axios";
import "../../style/Profile.css";
const Info = () => {
  const params = useParams();
  const { userState } = useContext(UserContext);
  const [user, setUser] = useState(null);
  const [showFollowers, setShowFollowers] = useState(false);
  const [showFollowing, setShowFollowing] = useState(false);
  async function getParticularUser() {
    try {
      const userId = params.userId;
      const { data } = await axios.get(`/api/user/particularUser/${userId}`);
      setUser(data);
    } catch (err) {
      console.log(err);
    }
  }
  const handleFollow = async () => {
    try {
      const userId = params.userId;
      await axios.put(`/api/user/follow`, { _id: userId });
      getParticularUser();
    } catch (err) {
      console.log(err);
    }
  };
  const handleUnFollow = async () => {
    try {
      const userId = params.userId;
      await axios.put(`/api/user/unfollow`, { _id: userId });
      getParticularUser();
    } catch (err) {
      console.log(err);
    }
  };
  useEffect(() => {
    getParticularUser();
    return () => {
      setUser(null);
    };
    // eslint-disable-next-line
  }, [params.userId]);
  var follow = user?.followers?.filter(
    (val) => val.user === userState?.user?._id
  );
  return (
    <div className="info">
      <div className="info_container">
        <img src={user?.image} className="supper-avatar" alt="" />
        <div className="info_content">
          <div className="info_content_title">
            <h2>{user?.name}</h2>
            <div>
              {follow?.length ? (
                <button
                  className="btn btn-outline-danger"
                  onClick={handleUnFollow}
                >
                  UnFollow
                </button>
              ) : (
                <button className="btn btn-outline-info" onClick={handleFollow}>
                  Follow
                </button>
              )}
            </div>
          </div>

          <div className="follow_btn">
            <span className="mr-4" onClick={() => setShowFollowers(true)}>
              {user?.followers.length} Followers
            </span>
            <span className="ml-4" onClick={() => setShowFollowing(true)}>
              {user?.following.length} Following
            </span>
          </div>
          {user?.city && (
            <h6>
              {user?.city}
              <span className="text-danger"></span>
            </h6>
          )}
          {user?.bio && <p className="m-0">{user?.bio}</p>}
        </div>
        {showFollowers && <Followers setShowFollowers={setShowFollowers} />}
        {showFollowing && <Following setShowFollowing={setShowFollowing} />}
      </div>
    </div>
  );
};
export default Info;
