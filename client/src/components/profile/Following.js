import React, {useEffect, useState, useContext} from "react";
import UserCard from "./UserCard";
import axios from "../../utils/axios"
import { UserContext } from "../../context/UserContext"
const Following = ({ setShowFollowing }) => {
  const [allFollowing, setAllFollowing] = useState(null);
  const { userState } = useContext(UserContext);
  async function getFollowing() {
    try {
      const { data } = await axios.get(`/api/user/following/${userState.user._id}`);
      setAllFollowing(data);
    } catch (err) {
      console.log(err);
    }
  }
  useEffect(() => {
    getFollowing();
    // eslint-disable-next-line
  },[]);
  return (
    <div className="follow">
      <div className="follow_box">
        <h5 className="text-center">Following</h5>
        <hr />
        <div className="follow_content">
          <UserCard setShowFollowing={setShowFollowing} allFollowing={allFollowing}></UserCard>
        </div>
        <div className="close" onClick={() => setShowFollowing(false)}>
          &times;
        </div>
      </div>
    </div>
  );
};
export default Following;
