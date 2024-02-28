import React, { useContext, useEffect, useState } from "react";
import "./profile.scss";
import coverImg from "./cover.jpg";
import profilePic from "./profile.jpg";
import FacebookTwoToneIcon from "@mui/icons-material/FacebookTwoTone";
import InstagramIcon from "@mui/icons-material/Instagram";
import LinkedInIcon from "@mui/icons-material/LinkedIn";
import PinterestIcon from "@mui/icons-material/Pinterest";
import PlaceIcon from "@mui/icons-material/Place";
import LanguageIcon from "@mui/icons-material/Language";
import EmailIcon from "@mui/icons-material/Email";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import Posts from "../../components/posts/Posts";
import { useLocation } from "react-router-dom";
import { AuthContext } from "../../context/authContext";
import axios from "axios";

const Profile = () => {
  const { currentUser, login } = useContext(AuthContext);

  //guest user..------------------------------------------------------------------
  const guestUser = useLocation().pathname.split("/")[2];
  console.log("guestUser : " + guestUser);
  //------------------------------------------------------------------------------

  // Ensure profileUser has initial state and coverPic property
  const [profileUser, setProfileUser] = useState({
    coverPic: "", // Set an initial value for coverPic
  });

  const fetchUser = (userId)=>{

    axios.get(`http://localhost:8005/api/getUser/${userId}`,{withCredentials:true})
    .then((res)=>{
      console.log('From Profile',res.data);
      setProfileUser(res.data[0]);
    })
    .catch((err)=>{
      console.log(err);
    })
  }

  useEffect(() => {
    console.log("newwwww");

    // axios
    //   .get(`http://localhost:8005/api/getUser/${guestUser}`, {
    //     withCredentials: true,
    //   })
    //   .then((res) => {
    //     console.log("From Profile", res.data[0].coverPic);
    //     setProfileUser(res.data[0]);
    //   })
    //   .catch((err) => {
    //     console.log(err);
    //   });

    fetchUser(guestUser);
  }, [guestUser]);

  //--------------------------------------------------------------------------------
  return (
    <div className="profile">
      <div className="images">
        {profileUser && (
          <img src={profileUser.coverPic} alt="cover" className="cover" />
        )}
        {profileUser && (
          <img
            src={profileUser.profilePic}
            alt="profilePic"
            className="profilePic"
          />
        )}

        {/* {profileUser&& <img src={ profileUser.coverPic} alt="cover" className="cover" />} */}
      </div>

      <div className="profileContainer">
        <div className="uInfo">
          <div className="left">
            <a href="https://facebook.com">
              <FacebookTwoToneIcon fontSize="large" />
            </a>
            <a href="https://facebook.com">
              <InstagramIcon fontSize="large" />
            </a>
            <a href="https://facebook.com">
              <LinkedInIcon fontSize="large" />
            </a>
            <a href="https://facebook.com">
              <PinterestIcon fontSize="large" />
            </a>
          </div>
          <div className="center">
            <span>{profileUser.username}</span>
            <div className="info">
              <div className="item">
                <PlaceIcon />
                <span>India</span>
              </div>
              <div className="item">
                <LanguageIcon />
                <span>Marathi</span>
              </div>
            </div>
            {
              currentUser.id == guestUser ? (<button>Update</button>) : <button>Follow</button>
            }
          </div>
          <div className="right">
            <EmailIcon />
            <MoreVertIcon />
          </div>
        </div>

        {/* posts  */}
        <Posts guestUser={guestUser} />
      </div>
    </div>
  );
};

export default Profile;
