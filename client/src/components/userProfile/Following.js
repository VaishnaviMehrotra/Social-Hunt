import React, {useEffect, useState} from "react";
import UserCard from "./UserCard";
import axios from "../../utils/axios"
import { useParams } from "react-router";
const Following = ({ setShowFollowing }) => {
  const [allFollowing, setAllFollowing] = useState(null);
  const params = useParams();
  async function getFollowing() {
    try {
      const userId = params.userId;
      const { data } = await axios.get(`/api/user/following/${userId}`);
      setAllFollowing(data);
    } catch (err) {
      console.log(err);
    }
  }
  useEffect(() => {
    getFollowing();
    // eslint-disable-next-line
  }, [params.userId]);
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
