import React, { useContext, useEffect, useState } from "react";
import "./leftBar.scss";
import axios from "axios";
// import UserImg from '../../assets/logo2.png'
import UserImg from "../../assets/logo2.png";
import Friends from "../../assets/C++.png";
import { AuthContext } from "../../context/authContext";
import { useNavigate } from "react-router-dom";

const LeftBar = () => {
  const { currentUser, login } = useContext(AuthContext);

  const navigate = useNavigate();

  //-------------------------------------------------------------------------
  const [userType, setUserType] = useState("follower");
  const [users, setUsers] = useState([]);
  const [followerBgColor, setFollowerBgColor] = useState("");
  const [followedBgColor, setFollowedBgColor] = useState("");

  //-------------------------------------------------------------------------

  const fetchUsers = (value) => {
    axios
      .get("http://localhost:8005/api/fetchUsers/" + value, {
        withCredentials: true,
      })
      .then((res) => {
        console.log("Fetched users : ", res.data);
        setUsers(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  useEffect(() => {
    if (userType == "follower") {
      fetchUsers(0);
    } else if (userType == "followed") {
      fetchUsers(1);
    }
  }, []);

  // useEffect(()=>{
  //   console.log(users);
  // },[users])

  //---------------------------------------------------------------------------

  return (
    <div className="leftbar">
      <div className="container">
        <div className="menu">
          <div className="user">
            <img
              src={"/public/upload/" + currentUser.profilePic}
              alt="user"
              onClick={() => navigate("/profile/" + currentUser.id)}
            />
            <span onClick={() => navigate("/")}>{currentUser.username}</span>
          </div>

          <div className="followers-followed-section">
            <div
              className="btn follower"
              onClick={() => {
                fetchUsers(0);
                followerBgColor("#9BA4B5");
                followedBgColor("");
              }}
              style={{ backgroundColor:  followerBgColor && followerBgColor  }}
            >
              Followers
            </div>
            <div
              className="btn followed"
              onClick={() => {
                fetchUsers(1);
                followedBgColor("#9BA4B5");
                followerBgColor("");
              }}
              style={{ backgroundColor: followedBgColor  }}
            >
              Followed
            </div>
          </div>

          <div className="items">
            {
              users?.map((item, index) => {
                return (
                  <div className="item">
                    <img src={"/public/upload/" + item.profilePic} alt="" />
                    <span>{item.username}</span>
                  </div>
                );
              })
              // <div className="item">
              //   <img src={Friends} alt="" />
              //   <span>Friends</span>
              // </div>
            }
          </div>
        </div>

        <hr />

        {/* Your shortcuts */}
        {/* <div className='menu'>
          
          <span>Your shortcuts</span>

          <div className='item'>
            <img src={Friends} alt='' />
            <span>Friends</span>
          </div>
          <div className='item'>
            <img src={Friends} alt='' />
            <span>Friends</span>
          </div>
          <div className='item'>
            <img src={Friends} alt='' />
            <span>Friends</span>
          </div>
          <div className='item'>
            <img src={Friends} alt='' />
            <span>Friends</span>
          </div>
          <div className='item'>
            <img src={Friends} alt='' />
            <span>Friends</span>
          </div>
        </div> */}

        {/* <hr/> */}

        {/* Others */}
        {/* <div className='menu'>
          
          <span>Others</span>

          <div className='item'>
            <img src={Friends} alt='' />
            <span>Friends</span>
          </div>
          <div className='item'>
            <img src={Friends} alt='' />
            <span>Friends</span>
          </div>
          <div className='item'>
            <img src={Friends} alt='' />
            <span>Friends</span>
          </div>
          <div className='item'>
            <img src={Friends} alt='' />
            <span>Friends</span>
          </div>
          <div className='item'>
            <img src={Friends} alt='' />
            <span>Friends</span>
          </div>
          <div className='item'>
            <img src={Friends} alt='' />
            <span>Friends</span>
          </div>
          <div className='item'>
            <img src={Friends} alt='' />
            <span>Friends</span>
          </div>
          <div className='item'>
            <img src={Friends} alt='' />
            <span>Friends</span>
          </div>
          <div className='item'>
            <img src={Friends} alt='' />
            <span>Friends</span>
          </div>
        </div> */}
      </div>
    </div>
  );
};

export default LeftBar;
