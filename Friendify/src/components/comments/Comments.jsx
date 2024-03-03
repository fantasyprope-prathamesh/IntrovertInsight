import React, { useContext, useEffect, useState } from "react";
import "./comments.scss";
import { AuthContext } from "../../context/authContext";
import axios from "axios";
import moment from 'moment'

const Comments = ({ postId }) => {
  const { currentUser } = useContext(AuthContext);

  // const comments = [
  //   {
  //     id: 1,
  //     name: "John Doe",
  //     userId: 1,
  //     profilePic:
  //       "https://images.pexels.com/photos/1036623/pexels-photo-1036623.jpeg?auto=compress&cs=tinysrgb&w=1600",
  //     desc: "Lorem ipsum dolor sit amet consectetur adipisicing elit",
  //     img: "https://images.pexels.com/photos/4881619/pexels-photo-4881619.jpeg?auto=compress&cs=tinysrgb&w=1600",
  //   },
  //   {
  //     id: 2,
  //     name: "Jane Doe",
  //     userId: 2,
  //     profilePic:
  //       "https://images.pexels.com/photos/1036623/pexels-photo-1036623.jpeg?auto=compress&cs=tinysrgb&w=1600",
  //     desc: "Tenetur iste voluptates dolorem rem commodi voluptate pariatur, voluptatum, laboriosam consequatur enim nostrum cumque! Maiores a nam non adipisci minima modi tempore.",
  //   },
  // ];
  //--------------------------------------------------------------------------------------------

  const [comments, setComments] = useState([]);

  const [pid,setPid] = useState({
    "postId" : postId
  })

  const  fetchComments = ()=>{
    axios
      .get(`http://localhost:8005/api/getComments/${postId}`, {
        withCredentials: true,
      })
      .then((res) => {
        console.log("all post comments", res.data);
        setComments(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
  }

  //request for fetching comments..
  useEffect(() => {
    fetchComments();
  }, []);

  //handle send commennt function..----------------------------------------------------------------
  const [commentData, setCommentData] = useState({
    descr: "",
    commentUserId: currentUser.id,
    postId: postId,
  });

  // useEffect(() => {
  //   console.log("comment data : ", commentData);
  // }, [commentData]);

  const handleSendComment = () => {
    axios
      .post("http://localhost:8005/api/addComment", commentData, {
        withCredentials: true,
      })
      .then((res) => {
        if (res) {
          console.log(res.data);
          fetchComments();
        }
      })
      .catch((err) => {
        console.log("comment err:", err);
      });
  };

  return (
    <div className="comments">
      {/* input section */}
      <div className="write">
        <img src={"/public/upload/" + currentUser.profilePic} alt="user" />
        <input
          type="text"
          placeholder="Add comment..."
          onChange={(e) => {
            setCommentData((pre) => {
              return {
                ...pre,
                descr: e.target.value,
              };
            });
          }}
        />
        <button onClick={handleSendComment}>Send</button>
      </div>

      {/* comment section  */}
      {comments.map((item, indx) => (
        <div className="comment" key={item.id}>
          <img src={"/public/upload/" + item.profilePic} alt="Message" />
          <div className="info">
            <span>{item.username}</span>
            <p>{item.descr}</p>
          </div>
          <span className="date">{moment(item.createdAt).fromNow()}</span>
        </div>
      ))}
    </div>
  );
};

export default Comments;
