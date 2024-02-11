import { db } from "../connect.js";
import jwt from "jsonwebtoken";

export const getPosts = (req, res) => {
  const token = req.cookies.accessToken;

  // console.log("heyyy",token)
  // console.log("heyyy token : ",token)

  if (!token) return res.status(401).json("Not Logged In!");

  jwt.verify(token, "secretKey", (err, userInfo) => {
    if (err) return res.status(401).json("Token is not valid!");

    // return res.json("sever sended response")
    // const que =
    // "SELECT p.*, u.id as userId, u.username as userName, u.profilePic as userProfilePic FROM posts as p JOIN users as u ON u.id = p.userId LEFT JOIN relationships as r ON (p.userId = r.followedUserId) WHERE r.followerUserId = ? OR p.userId = ?";

    const que = "select * from posts where id = 1";
    console.log("hey there");

    // , [userInfo.id,userInfo.id]
    db.query(que, (err, data) => {
      // console.log("i am in query")
      if (err) {
        console.error("Database Error:", err.message);
        return res.status(500).json({ error: "Internal Server Error yy" });
      }

      if (data.length === 0) {
        return res.status(404).json({ error: "No Records Found" });
      }

      console.log("Fetched Posts:", data);
      return res.status(200).json(data);
    });
  });
};
