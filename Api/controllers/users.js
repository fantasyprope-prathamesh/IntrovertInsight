import { db } from "../connect.js";
import jwt from "jsonwebtoken";

export const getUser = (req, res) => {
  const token = req.cookies.accessToken;

  console.log("heyyy its meee", req.params.userId);
  // console.log("heyyy token : ",token)

  if (!token) return res.status(401).json("Not Logged In!");

  jwt.verify(token, "secretKey", (err, userInfo) => {
    if (err) return res.status(401).json("Token is not valid!");

    const que =
      "SELECT id, username , coverPic, profilePic FROM users WHERE id = ?";

    db.query(que, [req.params.userId], (err, result) => {
      if (err) return res.status(400).json(err);

      console.log("guest user data : ", result);

      return res.status(200).json(result);
    });
  });
};

export const updateUser = (req, res) => {
  console.log(req.body);

  const token = req.cookies.accessToken;

  if (!token) return res.status(401).json("Not Logged In!");

  jwt.verify(token, "secretKey", (err, userInfo) => {
    if (err) return res.status(401).json("Token is not valid!");

    const que =
      "UPDATE users SET `username` = ?, `city` = ?, `website` = ?, `profilePic` = ?, `coverPic` = ? WHERE id = ?";
    db.query(
      que,
      [
        req.body.name[0],
        req.body.city[0],
        req.body.website[0],
        req.body.profilePic,
        req.body.coverPic,
        userInfo.id,
      ],
      (err, result) => {
        if (err) return res.status(400).json("internal db errro from updation");

        return res.status(200).json("User updated successfully");
      }
    );
  });
};

export const fetchUsers = (req, res) => {
  // return res.json("Ready to fetch users :)")

  const token = req.cookies.accessToken;

  console.log("value : ",req.params.value)

  if (!token) return res.status(401).json("Not Logged In!");

  jwt.verify(token, "secretKey", (err, userInfo) => {
    if (err) return res.status(401).json("Token is not valid!");

    // SELECT profilePic , username FROM users WHERE id IN 
    if(req.params.value !== null){
      let que = ""
      if(parseInt(req.params.value) === 0){
        console.log(typeof req.params.value )
        que = "SELECT profilePic , username FROM users WHERE id IN (SELECT followerUserId FROM relationships WHERE followedUserId = ?)"
      }else if(parseInt(req.params.value) === 1){
        que = "SELECT profilePic , username FROM users WHERE id IN (SELECT followedUserId FROM relationships WHERE followerUserId = ?)"
      }
    
    db.query(que, [userInfo.id], (err, result) => {
      if (err) return res.status(401).json("Internal db error from fetchUsers");

      console.log(result);
      return res.status(200).json(result);
    });
    }
  });
};
