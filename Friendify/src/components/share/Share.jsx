import React, { useContext, useRef, useState } from "react";
import "./share.scss";
import { AuthContext } from "../../context/authContext";
import AddPhotoAlternateIcon from "@mui/icons-material/AddPhotoAlternate";
import PlaceIcon from "@mui/icons-material/Place";
import LoyaltyIcon from "@mui/icons-material/Loyalty";
import axios from "axios";

const Share = ({ onChangeData }) => {
  const { currentUser, login } = useContext(AuthContext);

  //states..
  const [file, setFile] = useState();
  const [desc, setDesc] = useState();

  //upload function..
  const upload = async () => {
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

  // console.log("desc : ", desc);

  //handle click..
  const handleClick = async (e) => {
    e.preventDefault();

    let imgUrl = "";
    if (file) {
      imgUrl = await upload();
      // console.log("imgUrl : ",imgUrl);
    }

    const newPostData = {
      descr: desc,
      image: imgUrl,
    };

    console.log("newPostData : ", newPostData);

    axios
      .post("http://localhost:8005/api/addPost", newPostData, {
        withCredentials: true,
      })
      .then((res) => {
        console.log("new post res:", res.data);
        setFile("");
        setDesc("");
        onChangeData();
      })
      .catch((err) => {
        console.log("err: ", err);
      });
  };

  //=================================================================

  const fileInputRef = useRef(null);

  const handleAddImageClick = () => {
    fileInputRef.current.click();
  };

  return (
    <>
      <div className="share">
        <div className="container">
          <div className="content-section">
            <div className="left">
              <img src={"/public/upload/" + currentUser.profilePic} alt="" />
              <input
                type="text"
                placeholder={`Whats on your mind ${currentUser.name}`}
                onChange={(e) => {
                  setDesc(e.target.value);
                }}
                value={desc}
              />
            </div>
            <div className="right">
              {file && <img className="file" src={URL.createObjectURL(file)} />}
            </div>
          </div>
          <input
            type="file"
            id="file"
            style={{ display: "none" }}
            ref={fileInputRef}
            onChange={(e) => {
              setFile(e.target.files[0]);
            }}
          />
          <div className="upload-section">
            <div className="left">
              <div className="item">
                <div className="icon">
                  <AddPhotoAlternateIcon />
                </div>
                <p onClick={handleAddImageClick} style={{ cursor: "pointer" }}>
                  Add Image
                </p>
              </div>
              <div className="item">
                <div className="icon">
                  <PlaceIcon />
                </div>
                <p>Place Icon</p>
              </div>
              <div className="item">
                <div className="icon">
                  <LoyaltyIcon />
                </div>
                <p>Tag Friends</p>
              </div>
            </div>
            <div className="right">
              <button onClick={handleClick}>Share</button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Share;
