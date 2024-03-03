import React, { useState } from "react";
import "./update.scss";
import axios from "axios";

const Update = ({ setOpenUpdate, profileUser, fetchUser }) => {
  const [texts, setTexts] = useState({
    name: "",
    city: "",
    website: "",
  });

  const [cover, setCover] = useState(null);
  const [profile, setProfile] = useState(null);

  //------------------------------------------------------------------------------------------

  //upload function..
  const upload = async (file) => {
    try {
      const formData = new FormData();
      formData.append("file", file);
      const res = await axios.post(
        "http://localhost:8005/api/upload",
        formData
      );
      // console.log("new url : ", res)
      return res.data;
    } catch (err) {
      console.log(err);
    }
  };
  //------------------------------------------------------------------------------------
  const handleSubmit = async (e) => {
    e.preventDefault();

    let coverPic = profileUser.coverPic;
    let profilePic = profileUser.profilePic;

    coverPic = cover && (await upload(cover));
    profilePic = profile && (await upload(profile));

    axios
      .put(
        "http://localhost:8005/api/user/updateUser",
        {
          ...texts,
          coverPic: coverPic,
          profilePic: profilePic,
        },
        { withCredentials: true }
      )
      .then((res) => {
        console.log("User updated ", res.data);
        setOpenUpdate(false);
        fetchUser();
      })
      .catch((err) => {
        console.log("Erro from user updation : ", err);
      });
  };
  //-----------------------------------------------------------------------------------

  const handleChange = (e) => {
    setTexts((prev) => {
      return {
        ...prev,
        [e.target.name]: [e.target.value],
      };
    });
  };
  return (
    <div className="update">
      Update
      <form>
        <input
          type="file"
          onChange={(e) => {
            setCover(e.target.files[0]);
          }}
        />
        <input
          type="file"
          onChange={(e) => {
            setProfile(e.target.files[0]);
          }}
        />
        <input type="text" name="name" onChange={handleChange} />
        <input type="text" name="city" onChange={handleChange} />
        <input type="text" name="website" onChange={handleChange} />
        <button type="submit" onClick={handleSubmit}>
          Update
        </button>
      </form>
      <button onClick={() => setOpenUpdate(false)}>X</button>
    </div>
  );
};

export default Update;
