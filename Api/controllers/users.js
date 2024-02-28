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
