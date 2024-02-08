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

const NavBar = () => {
  const { darkMode, toggle } = useContext(DarkModeContext);
  const {currentUser,login} = useContext(AuthContext)

  useEffect(() => {
    // localStorage.setItem("darkMode", darkMode);
    console.log('cur : ',currentUser);
  }, [currentUser]);

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
         src={currentUser ? currentUser.profilePic : UserImg}
        //  src = "chrome-extension://fcejkolobdcfbhhakbhajcflakmnhaff/static/logo.png"
          alt="User Profile" />
          <span>{currentUser.username}</span>
        </div>
      </div>
    </div>
  );
};

export default NavBar;
