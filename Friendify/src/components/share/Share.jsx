import React, { useContext, useState } from "react";
import "./share.scss";
import { AuthContext } from "../../context/authContext";
import AddPhotoAlternateIcon from "@mui/icons-material/AddPhotoAlternate";
import PlaceIcon from "@mui/icons-material/Place";
import LoyaltyIcon from "@mui/icons-material/Loyalty";
import axios from "axios";

const Share = ({onChangeData}) => {
  const { currentUser, login } = useContext(AuthContext);

  //states..
  const [file, setFile] = useState();
  const [desc, setDesc] = useState();

  console.log("desc : ", desc);

  const newPostData = {
    descr : desc,
    image : "https://images.pexels.com/photos/1036623/pexels-photo-1036623.jpeg?auto=compress&cs=tinysrgb&w=1600"
  }

  //handle click..
  const handleClick = (e)=>{
    e.preventDefault();

    axios.post("http://localhost:8005/api/addPost",newPostData,{withCredentials:true})
    .then((res)=>{
      console.log("new post res:",res.data);
    }).catch((err)=>{
      console.log('err: ',err);
    })

    onChangeData();
  }

  return (
    <>
      <div className="share">
        <div className="container">
          <div className="content-section">
            <img src={currentUser.profilePic} alt="" />
            <input
              type="text"
              placeholder={`Whats on your mind ${currentUser.name}`}
              onChange={(e) => {
                setDesc(e.target.value);
              }}
            />
          </div>
          <input
                type="file"
                id="file"
                style={{ display: "none" }}
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
                <p>Add Image</p>
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
