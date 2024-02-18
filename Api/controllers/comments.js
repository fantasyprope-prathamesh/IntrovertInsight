import { db } from "../connect.js";
import Jwt from "jsonwebtoken";
import moment from "moment";

export const addComment = (req, res) => {
    const token = req.cookies.accessToken;

    if (!token) return res.status(401).json("Not Logged In!");

    Jwt.verify(token, 'secretKey', (err, userInfo) => {
        if (err) return res.status(401).json("Token is not valid!");

        console.log("You are the right user to comment", userInfo, req.body);

        const que = "INSERT INTO comments (`descr`, `createdAt`, `commentUserId`, `postId`) VALUES (?, ?, ?, ?)";

        const commentData = {
            descr: req.body.descr,
            createdAt: moment(Date.now()).format("YYYY-MM-DD HH:mm:ss"),
            commentUserId: req.body.commentUserId,
            postId: req.body.postId
        };

        db.query(que, [commentData.descr, commentData.createdAt, commentData.commentUserId, commentData.postId], (err, result) => {
            if (err) {
                console.error("Database error", err.message);
                return res.status(500).json("Internal server error");
            }
            return res.status(200).json({ response: result });
        });
    });
};


///get comments..

export const getComments = (req,res)=>{

    console.log("ewwww")

    // return res.json("sever sended response")
    const que =
      "SELECT c.id as id, c.descr as descr , c.createdAt as createdAt , u.username as username , u.profilePic as profilePic FROM comments as c JOIN users as u  ON (c.commentUserId = u.id) WHERE c.postId = ? ORDER BY c.createdAt DESC ";

    console.log("hey there id me: ", req.params.postId);

    db.query(que, [req.params.postId], (err, data) => {
      if (err) {
        console.error("Database Error:", err.message);
        return res.status(500).json({ error: "Internal Server Error yy" });
      }
      console.log("Fetched Comments:", data);
      return res.status(200).json(data);
    }); 
}