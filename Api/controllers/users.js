import { db } from "../connect.js";
import jwt from "jsonwebtoken";

export const getUser = (req, res) => {
  const token = req.cookies.accessToken;

  console.log("heyyy its meee",req.params.userId)
  // console.log("heyyy token : ",token)

  if (!token) return res.status(401).json("Not Logged In!");

  jwt.verify(token, "secretKey", (err, userInfo) => {
    if (err) return res.status(401).json("Token is not valid!");

    const que = "SELECT id, username , coverPic, profilePic FROM users WHERE id = ?"

    db.query(que,[req.params.userId],(err,result)=>{
        if(err) return res.status(400).json(err)

        console.log("guest user data : ",result)

        return res.status(200).json(result)
    })
  });
};


export const updateUser = (req,res)=>{
  console.log(req.body.name);

  const token = req.cookies.accessToken;

  if (!token) return res.status(401).json("Not Logged In!");

  jwt.verify(token, "secretKey", (err, userInfo) => {
    if (err) return res.status(401).json("Token is not valid!");

    const que = "UPDATE users SET = `username = ?`.`city =?`,`website = ?`,`profilePic = ?`,`coverPic = ?` WHERE id = ?"
    db.query(que,[
      req.body.name[0],
      req.body.city[0],
      req.body.website[0],
      req.body.profilePic,
      req.body.coverPic
    ],(err,result)=>{
      if(err) res.status(400).json("internal db errro from updation")

      res.status(200).json("User updated successfully")
    })

  });
}