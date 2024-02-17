import React, { useState } from "react";
import "./post.scss";
import FavoriteBorderOutlinedIcon from '@mui/icons-material/FavoriteBorderOutlined';
import FavoriteOutlinedIcon from '@mui/icons-material/FavoriteOutlined';
import TextsmsOutlinedIcon from '@mui/icons-material/TextsmsOutlined';
import ShareOutlinedIcon from '@mui/icons-material/ShareOutlined';
import MoreHorizOutlinedIcon from '@mui/icons-material/MoreHorizOutlined';
import { Link } from "@mui/material";
import Comments from "../comments/Comments";
import moment from 'moment'

const Post = ({post}) => {

  const [commentOpen,setCommentOpen] = useState(false);

  //TEMPORARY..
  const liked = true;

  return (
    <div className="post">
      <div className="user">
        <div className="userinfo">
            <img src={post.userProfilePic} alt="User" />
            <div className="details">
                <Link className="name" to={`/profile/${post.id}`} style={{textDecoration:"none",color:"inherit"}}>
                    <span>{post.userName}</span>  
                </Link>
                <span className="date">{moment(post.createdAt).fromNow()}</span>
            </div>
        </div>
        <MoreHorizOutlinedIcon/>

      </div>

      <div className="content">
        <p>{post.descr}</p>
        <img src={"./upload/"+post.image} alt="User"/>
      </div>

      <div className="info">
      <div className="item">
      {liked?<FavoriteOutlinedIcon/> :<FavoriteBorderOutlinedIcon/>}
      12 Likes
      </div>
      <div className="item">
      <TextsmsOutlinedIcon onClick={()=>{setCommentOpen(!commentOpen)}}/>
      12 Messages
      </div>
      <div className="item">
      <ShareOutlinedIcon/>
      12 Likes
      </div>
      </div>

      {
        commentOpen && <Comments postId={post.id}/>
      }
    </div>
  );
};

export default Post;
