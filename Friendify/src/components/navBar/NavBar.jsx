import React, { useContext } from "react";
import "./navBar.scss";
import HomeOutlinedIcon from "@mui/icons-material/HomeOutlined";
import DarkModeOutlinedIcon from "@mui/icons-material/DarkModeOutlined";
import GridViewOutlinedIcon from "@mui/icons-material/GridViewOutlined";
import WbSunnyOutlinedIcon from "@mui/icons-material/WbSunnyOutlined";
import NotificationsOutlinedIcon from "@mui/icons-material/NotificationsOutlined";
import EmailOutlinedIcon from "@mui/icons-material/EmailOutlined";
import PersonOutlineOutlinedIcon from "@mui/icons-material/PersonOutlineOutlined";
import SearchOutlinedIcon from "@mui/icons-material/SearchOutlined";
import { Link } from "react-router-dom";
import UserImg from '../../assets/im2.jpg'
import { DarkModeContext } from "../../context/DarkModeContext";
import { useEffect } from "react";
import { AuthContext } from "../../context/authContext";
import { useNavigate } from 'react-router-dom'
import Cookies from 'js-cookie';
import axios from "axios";

const NavBar = () => {
  const { darkMode, toggle } = useContext(DarkModeContext);
  const {currentUser,login} = useContext(AuthContext)
  const navigate = useNavigate();

  useEffect(() => {
    // localStorage.setItem("darkMode", darkMode);
    console.log('cur : ',currentUser);
  }, [currentUser]);

  //-----------------------------------------------------------------------------------

  const clearCookie = () => {
    // Cookies.remove('accessToken');
    // Replace "cookieName" with the name of the cookie you want to clear
    axios.post('http://localhost:8005/api/auth/logout')
    .then((res)=>{
      console.log(res);
      navigate('/login')
    })
    .catch((err)=>{
      console.log(err);
    })
  };

  //---------------------------------------------------------------------------------

  return (
    <div className="navbar">
      {/* left bar  */}
      <div className="left">
        <Link to={"/"} style={{ textDecoration: "none" }}>
          <span>Friendify</span>
        </Link>
        <HomeOutlinedIcon />
        {darkMode ? (
          <WbSunnyOutlinedIcon
            onClick={() => {
              toggle();
            }}
          />
        ) : (
          <DarkModeOutlinedIcon
            onClick={() => {
              toggle();
            }}
          />
        )}
        <GridViewOutlinedIcon />
        <div className="search">
          <SearchOutlinedIcon />
          <input type="text" placeholder="Search.." />
        </div>
      </div>

      {/* right bar  */}
      <div className="right">
        <PersonOutlineOutlinedIcon />
        <EmailOutlinedIcon />
        <NotificationsOutlinedIcon />
        <div className="user">
        <img
         src={currentUser ? "/public/upload/" + currentUser.profilePic : UserImg}
        //  src = "chrome-extension://fcejkolobdcfbhhakbhajcflakmnhaff/static/logo.png"
          alt="User Profile" onClick={()=>navigate('/profile/'+currentUser.id)} />
          <span onClick={()=>navigate('/')}>{currentUser.username}</span>
        </div>
        <div style={{padding:'5px 10px',backgroundColor:'blueviolet',borderRadius:'5px',cursor:"pointer"}}  onClick={clearCookie}>Logout</div>
      </div>
    </div>
  );
};

export default NavBar;
