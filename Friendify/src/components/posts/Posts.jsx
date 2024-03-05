import React, { useEffect, useState, useContext } from "react";
import axios from "axios";
import "./posts.scss";
import Post from "../post/Post";
import { useQuery } from "@tanstack/react-query";
import { makeRequestt } from "../../axios";
import Share from "../share/Share";
import { AuthContext } from "../../context/authContext";

const Posts = ({ guestUser }) => {
  // const posts = [
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

  // const { isPending, error, data } = useQuery(
  //   ["posts"],
  //   // () => makeRequestt.get("/posts").then((res) => res.data)
  //   ()=>{
  //     axios.get('http://localhost:8005/api/posts',{withCredentials:true})
  //     .then((res) => {
  //       console.log("finally : ", res.data);
  //       setData(res.data); // Update state with received data
  //     }).catch((err) => {
  //       // console.error("Error:", err);
  //     });
  //   }
  // );

  const [data, setData] = useState([]);
  const { currentUser, login } = useContext(AuthContext);

  const fetchData = () => {
    axios
      .get("http://localhost:8005/api/posts?guestUserId="+guestUser, { withCredentials: true })
      .then((res) => {
        console.log("finally : ", res.data);
        const sortedDataDescending = res.data.sort((a, b) => b.id - a.id);

        setData(sortedDataDescending); // Update state with received data
      })
      .catch((err) => {
        console.error("Error:", err);
      });
  };
  useEffect(() => {
    fetchData();
  }, [guestUser]);

  // const { isPending, error, data } = useQuery({
  //   queryKey: ['posts'],
  //   queryFn: () =>{
  //     makeRequestt.get('/posts').then((res)=>{
  //       // res.json();
  //       console.log('got it',res.json());
  //       return res.data;
  //     })
  //   }
  // fetch('https://api.github.com/repos/TanStack/query').then((res) =>
  //   res.json(),
  // ),
  // makeRequestt.get('/posts').then((res)=>{
  //   // res.json();
  //   console.log('got it',res.json());
  //   return res.data;
  // })

  //brute force
  // axios.get('http://localhost:8005/api/posts')
  // .then((res)=>{
  //   return res.data;
  // }).catch((err)=>{
  //   return res.json({err:err})
  // })
  // })

  console.log("query data new : ", data);

  const changeData = () => {
    fetchData();
  };

  //---------------------------------------------------------------------------------
  console.log("guestUserFromPosts : " + guestUser);
  //--------------------------------------------------------------------------------

  return (
    <>
      {/* share */}

      {guestUser && guestUser == currentUser.id && (
        <Share onChangeData={changeData} />
      )}
      {guestUser && guestUser != currentUser.id && null}
      {guestUser == null && <Share onChangeData={changeData} />}

      {/* posts */}
      <div className="posts">
        {/* error ? "Something Went Wrong" : isPending ? "Loading.."  : */}
        {data?.map((post, indx) => {
          return <Post post={post} key={post.id} fetchData={fetchData} />;
        })}
      </div>
    </>
  );
};

export default Posts;
