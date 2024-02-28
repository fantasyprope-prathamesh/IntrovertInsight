import React, { useEffect, useState, useContext } from "react";
import "./post.scss";
import FavoriteBorderOutlinedIcon from "@mui/icons-material/FavoriteBorderOutlined";
import FavoriteOutlinedIcon from "@mui/icons-material/FavoriteOutlined";
import TextsmsOutlinedIcon from "@mui/icons-material/TextsmsOutlined";
import ShareOutlinedIcon from "@mui/icons-material/ShareOutlined";
import MoreHorizOutlinedIcon from "@mui/icons-material/MoreHorizOutlined";
import { Link } from "@mui/material";
import Comments from "../comments/Comments";
import moment from "moment";
import { red } from "@mui/material/colors";
import axios from "axios";
import { AuthContext } from "../../context/authContext";
import { Navigate, useNavigate, useLocation } from "react-router-dom";

const Post = ({ post }) => {
  const [commentOpen, setCommentOpen] = useState(false);
  const { currentUser, login } = useContext(AuthContext);

  //TEMPORARY..
  const liked = false;
  const navigate = useNavigate();

  //---------------------------------------------------------------------------------------------------

  const [eachPostData, setEachPostData] = useState([]);

  //----------------------------------------------------------------------------------------------------

  const guestUserFromPost = useLocation().pathname.split("/")[2];
  console.log("guestUser from Post: " + guestUserFromPost);

  //------------------------------------------------------------------------

  const fetchLike = ()=>{
    axios
      .get(`http://localhost:8005/api/getLikes/${post.id}`, {
        withCredentials: true,
      })
      .then((res) => {
        console.log("All users who liked the post : ", res.data);
        setEachPostData(res.data);
      })
      .catch((err) => {
        console.log("erros : ", err);
      });
  }
  useEffect(() => {
    console.log("current user : ", currentUser);
    fetchLike()
  }, []);

  //------------------------------------------------------------------------------------------------
  //check liked or not functionality..
  const checkLikedOrNot = (pid) => {
    // console.log("yeapp")
    if (eachPostData.includes(currentUser.id)) {
      const removeData = {
        userId: currentUser.id,
        postId: pid,
      };
      // console.log("yoo ; ",removeData)
      axios
        .delete("http://localhost:8005/api/removeLike", {
          data: removeData,
          withCredentials: true,
        })
        .then((req) => {
          console.log(req.data);
          setEachPostData((eachPostData) =>
            eachPostData.filter((item) => item !== currentUser.id)
          );
        })
        .catch((err) => {
          console.log(err);
        });
    } else {
      const removeData = {
        userId: currentUser.id,
        postId: pid,
      };
      axios
        .post("http://localhost:8005/api/addLike", removeData, {
          withCredentials: true,
        })
        .then((req) => {
          console.log(req.data);
          fetchLike()
        })
        .catch((err) => {
          console.log(err);
        });
    }
  };
  //----------------------------------------------------------------------------------------------------
  return (
    <div className="post">
      <div className="user">
        <div className="userinfo">
          <img src={post.userProfilePic} alt="User" onClick={()=>navigate('/profile/'+post.userId)} />
          <div className="details">
            <Link
              className="name"
              to={`/profile/${post.id}`}
              style={{ textDecoration: "none", color: "inherit" }}
            >
              <span>{post.userName}</span>
            </Link>
            <span className="date">{moment(post.createdAt).fromNow()}</span>
          </div>
        </div>
        <MoreHorizOutlinedIcon />
      </div>
      <div className="content">
        <p>{post.descr}</p>
        <img src={"./public/upload/" + post.image} alt="User" />
      </div>
      <div className="info">
        <div className="item">
          {eachPostData.includes(currentUser.id) ? (
            <FavoriteOutlinedIcon
              style={{ color: "red" }}
              onClick={() => checkLikedOrNot(post.id)}
            />
          ) : (
            <FavoriteBorderOutlinedIcon
              style={{ color: "red" }}
              onClick={() => checkLikedOrNot(post.id)}
            />
          )}
          {eachPostData.length}
          <span>Likes</span>
        </div>
        <div className="item">
          <TextsmsOutlinedIcon
            onClick={() => {
              setCommentOpen(!commentOpen);
            }}
          />
          12 Messages
        </div>
        <div className="item">
          <ShareOutlinedIcon />
          12 Likes
        </div>
      </div>

      {commentOpen && <Comments postId={post.id} />}
    </div>
  );
};

export default Post;
