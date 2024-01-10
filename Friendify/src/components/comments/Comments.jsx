import React, { useContext } from "react";
import "./comments.scss";
import {AuthContext} from '../../context/authContext'

const Comments = () => {

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

  return(
    <div className="comments">
    {/* input section */}
      <div className="write">
        <img src={currentUser.profilePicture} alt="user" />
        <input type="text" placeholder="Add comment..." />
        <button>Send</button>
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
