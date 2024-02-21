import { db } from "../connect.js";
import jwt from "jsonwebtoken";

export const addLike = (req, res) => {
  console.log(req.body);
  if (req.body) {
    const que = "INSERT INTO likes(`userId`,`postId`) VALUES (?,?)";

    db.query(que, [req.body.userId, req.body.postId], (err, result) => {
        if (err) {
          console.error("Database error:", err);
          return res.status(400).json("Database error: " + err.message); // Include specific error message in response
        }
        return res.status(200).json("Like record inserted successfully");
      });
      
  }
};

export const getLikes = (req, res) => {};
