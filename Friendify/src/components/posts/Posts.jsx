import React, { useEffect, useState } from "react";
import axios from "axios";
import "./posts.scss";
import Post from "../post/Post";
import { useQuery } from "@tanstack/react-query";
import { makeRequestt } from "../../axios";

const Posts = () => {
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
  


  const [data,setData] = useState([])
  useEffect(() => {
    // console.log("heyyy")
    axios.get('http://localhost:8005/api/posts',{withCredentials:true})
      .then((res) => {
        console.log("finally : ", res.data);
        setData(res.data); // Update state with received data
      }).catch((err) => {
        // console.error("Error:", err);
      });
  }, []); // Dependency array should be passed here

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

  return (
    <div className="posts">
      {/* error ? "Something Went Wrong" : isPending ? "Loading.."  : */}
      {data?.map((post, indx) => {
        return <Post post={post} key={post.id} />;
      })}
    </div>
  );
};

export default Posts;
