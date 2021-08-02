import React, { useState, useContext } from "react";
import axios from "../../utils/axios";
import { UserContext } from "../../context/UserContext";
import { useSnackbar } from "notistack";

const EditProfile = ({ setOpen }) => {
  const { userState, userDispatch } = useContext(UserContext);
  const { enqueueSnackbar } = useSnackbar();
  const [file, setFile] = useState(null);
  const [updatedValues, setUpdatedValues] = useState({
    name: userState.user?.name,
    city: userState.user?.city || "",
    bio: userState.user?.bio || "",
    gender: userState.user?.gender || "",
  });
  const handleSubmit = async (ev) => {
    ev.preventDefault();
    if (file) {
      const fileData = new FormData();
      var fileName = file.name;
      fileData.append("profile", file);
      fileData.append("name", fileName);
      try {
        await axios.post("/api/user/upload", fileData);
      } catch (err) {
        console.log(err);
      }
    }
    var profileImage;
    if (fileName === undefined) {
      profileImage = userState.user.image;
    } else {
      profileImage = `http://localhost:5000/images/${fileName}`;
    }
    try {
      const { data } = await axios.put("/api/user/update", {
        ...updatedValues,
        image: profileImage,
      });
      localStorage.removeItem("auth-token");
      let accessToken = data.accessToken;
      localStorage.setItem("auth-token", accessToken);
      userDispatch({ type: "UPDATE_USER", payload: data });
      enqueueSnackbar("Profile Updated Successfully", { variant: "success" });
      setOpen(false);
    } catch (err) {
      console.log(err);
      enqueueSnackbar("Invalid credentials", { variant: "error" });
    }
  };
  const handleChangeInput = (ev) => {
    setUpdatedValues((prev) => ({
      ...prev,
      [ev.target.name]: ev.target.value,
    }));
  };
  return (
    <>
      <div className="edit_profile">
        <button
          className="btn btn-danger btn_close"
          style={{ marginTop: "10%" }}
          onClick={() => setOpen(false)}
        >
          Close
        </button>

        <form onSubmit={handleSubmit} style={{ marginTop: "5%" }}>
          <div className="info_avatar">
            <img src={userState.user?.image} alt="" />
            <span>
              <i className="fas fa-camera" />
              <p>Change</p>
              <input
                type="file"
                name="image"
                id="file_up"
                accept="image/*"
                onChange={(e) => setFile(e.target.files[0])}
              />
            </span>
          </div>
          <span className="badge badge-pill badge-secondary">{file?.name}</span>
          <div className="form-group">
            <label htmlFor="name">Name</label>
            <div className="position-relative">
              <input
                type="text"
                className="form-control"
                id="name"
                name="name"
                onChange={handleChangeInput}
                value={updatedValues.name}
              />
              <small
                className="text-danger position-absolute"
                style={{
                  top: "50%",
                  right: "5px",
                  transform: "translateY(-50%)",
                }}
              ></small>
            </div>
          </div>
          <div className="form-group">
            <label htmlFor="City">City</label>
            <input
              type="text"
              name="city"
              className="form-control"
              onChange={handleChangeInput}
              value={updatedValues.city}
            />
          </div>
          <div className="form-group">
            <label htmlFor="Bio">Bio</label>
            <textarea
              name="bio"
              cols="30"
              rows="4"
              className="form-control"
              onChange={handleChangeInput}
              value={updatedValues.bio}
            />
          </div>
          <label htmlFor="gender">Gender</label>
          <div className="input-group-prepend px-0 mb-4">
            <select
              name="gender"
              id="gender"
              className="custom-select text-capitalize"
              value={updatedValues.gender}
              onChange={handleChangeInput}
            >
              <option value="male">Male</option>
              <option value="female">Female</option>
              <option value="other">Other</option>
            </select>
          </div>
          <button className="btn btn-info w-100" type="submit">
            Save
          </button>
        </form>
      </div>
    </>
  );
};
export default EditProfile;
