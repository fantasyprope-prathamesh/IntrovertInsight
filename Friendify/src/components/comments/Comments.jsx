import React, { useContext, useEffect, useState } from "react";
import "./comments.scss";
import {AuthContext} from '../../context/authContext'
import axios from "axios";

const Comments = ({postId}) => {

  const {currentUser} = useContext(AuthContext);

  const comments = [
    {
      id: 1,
      name: "John Doe",
      userId: 1,
      profilePic:
        "https://images.pexels.com/photos/1036623/pexels-photo-1036623.jpeg?auto=compress&cs=tinysrgb&w=1600",
      desc: "Lorem ipsum dolor sit amet consectetur adipisicing elit",
      img: "https://images.pexels.com/photos/4881619/pexels-photo-4881619.jpeg?auto=compress&cs=tinysrgb&w=1600",
    },
    {
      id: 2,
      name: "Jane Doe",
      userId: 2,
      profilePic:
        "https://images.pexels.com/photos/1036623/pexels-photo-1036623.jpeg?auto=compress&cs=tinysrgb&w=1600",
      desc: "Tenetur iste voluptates dolorem rem commodi voluptate pariatur, voluptatum, laboriosam consequatur enim nostrum cumque! Maiores a nam non adipisci minima modi tempore.",
    },
  ];

  //handle send commennt function..
  const [commentData ,setCommentData] = useState({
    descr : "",
    commentUserId : currentUser.id,
    postId : postId
  }) 

  useEffect(()=>{
    console.log("comment data : ",commentData);
  },[commentData])

  const handleSendComment = ()=>{
    
    axios.post("http://localhost:8005/api/addComment",commentData,{withCredentials:true})
    .then((res)=>{
      if(res){
        console.log(res.data);
      }
    })
    .catch((err)=>{
      console.log("comment err:",err);
    })
  }

  return(
    <div className="comments">
    {/* input section */}
      <div className="write">
        <img src={currentUser.profilePicture} alt="user" />
        <input type="text" placeholder="Add comment..." onChange={(e)=>{
          setCommentData((pre)=>{
            return {
              ...pre,
              descr : e.target.value
            }
          })
        }} />
        <button onClick={handleSendComment}>Send</button>
      </div>

    {/* comment section  */}
      {
        comments.map((item,indx)=>(
          <div className="comment">
            <img src={item.profilePic} alt="Message"/>
            <div className="info">
              <span>{item.name}</span>
              <p>{item.desc}</p>
            </div>
            <span className="date">1 min ago</span>
          </div>
        ))
      }
    </div>
  )
};

export default Comments;
