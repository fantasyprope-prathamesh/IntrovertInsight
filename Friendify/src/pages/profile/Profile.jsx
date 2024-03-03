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
import Update from "../../components/update/Update";

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
  //----------------------------------------------------------------------------

  const [openUpdate,setOpenUpdate] = useState(false);

  //-------------------------------------------------------------------------
  const fetchUser = (userId) => {
    axios
      .get(`http://localhost:8005/api/getUser/${userId}`, {
        withCredentials: true,
      })
      .then((res) => {
        console.log("From Profile", res.data);
        setProfileUser(res.data[0]);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const fetchFollowDetail = () => {
    const dataObj = { followerId: currentUser.id, followedId: guestUser };
    console.log("i am in fetchfollowfDetails eww");
    axios
      .post("http://localhost:8005/api/relation/followDetails", dataObj, {
        withCredentials: true,
      })
      .then((res) => {
        console.log("follow response", res.data.length);
        if(res.data.length > 0){
          SetRelation("Unfollow");
        }
        // SetRelation("Unfollow");
      })
      .catch((err) => {
        console.log(err);
      });
  }

  useEffect(() => {
    fetchUser(guestUser);
    // fetchFollowDetail();
  }, [guestUser]);

  useEffect(() => {
    console.log("champppp");
    fetchFollowDetail();
  }, [guestUser]);

  //--------------------------------------------------------------------------------
  const [relation, SetRelation] = useState("Follow");
  const handleRelation = () => {
    console.log("i am in handlerelation");
    if (relation === "Follow") {
      axios
        .post(
          "http://localhost:8005/api/relation/follow",
          { followerId: currentUser.id, followedId: guestUser },
          { withCredentials: true }
        )
        .then((res) => {
          console.log("follow response", res);
          SetRelation("Unfollow");
        })
        .catch((err) => {
          console.log(err);
        });
    }else if(relation === "Unfollow"){
      axios
        .post(
          "http://localhost:8005/api/relation/unfollow",
          { followerId: currentUser.id, followedId: guestUser },
          { withCredentials: true }
        )
        .then((res) => {
          console.log("follow response", res);
          SetRelation("Follow");
        })
        .catch((err) => {
          console.log(err);
        });
    }
  };

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
            {currentUser.id == guestUser ? (
              <button onClick={()=>setOpenUpdate(true)}>Update</button>
            ) : (
              <button onClick={handleRelation}>{relation}</button>
            )}
          </div>
          <div className="right">
            <EmailIcon />
            <MoreVertIcon />
          </div>
        </div>

        {/* posts  */}
        <Posts guestUser={guestUser} />
      </div>
      {/* update section  */}
      {
        openUpdate &&  <Update setOpenUpdate={setOpenUpdate} profileUser={profileUser} /> 
      }
    </div>
  );
};

export default Profile;
