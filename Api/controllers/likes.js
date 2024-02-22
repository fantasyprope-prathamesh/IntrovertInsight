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

export const getLikes = (req, res) => {
  console.log("psot ids ", req.params.postId);

  if (req.params.postId) {
    const que = "SELECT userId FROM likes WHERE postId = ? ";
    db.query(que, [req.params.postId], (err, result) => {
      if (err) return res.status(400).json("Internal db error");

      console.log(
        "each post users : ",
        result.map((id) => id.userId)
      );
      return res.status(200).json(result.map((id) => id.userId));
    });
  }
};

export const removeLike = (req, res) => {
  console.log(req.body);
  if(req.body){
    const que = "DELETE FROM likes WHERE userId = ? AND postId = ?"

    db.query(que,[req.body.userId,req.body.postId],(err,result)=>{
      if (err) return res.status(400).json("Internal db err!")

      return res.status(200).json("Like removed successfully")
    })
  }
};
