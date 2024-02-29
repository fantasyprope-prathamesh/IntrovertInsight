// import moment from "moment/moment.js";
import { db } from "../connect.js";
import jwt from "jsonwebtoken";
import moment from "moment";


export const getPosts = (req, res) => {
  let guestUserId = req.query.guestUserId;
  if (!isNaN(guestUserId)) {
    console.log("GuestUserId from backend : " + guestUserId);
  }
  const token = req.cookies.accessToken;

  if (!token) return res.status(401).json("Not Logged In!");

  jwt.verify(token, "secretKey", (err, userInfo) => {
    if (err) return res.status(401).json("Token is not valid!");

    let que;
    let values;
    if (!isNaN(guestUserId)) {
      console.log("heyy boyss");
      que =
        "SELECT p.*, u.id as userId, u.username as userName, u.profilePic as userProfilePic FROM posts as p JOIN users as u ON (u.id = p.userId) WHERE p.userId = ?";
      values = [guestUserId];
    } else {
      que =
        "SELECT p.*, u.id as userId, u.username as userName, u.profilePic as userProfilePic FROM posts as p JOIN users as u ON (u.id = p.userId) LEFT JOIN relationships as r ON (p.userId = r.followedUserId) WHERE r.followerUserId = ? OR p.userId = ?";
      values = [userInfo.id, userInfo.id];
    }

    db.query(que, values, (err, data) => {
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



// export const getPosts = (req, res) => {

//   const guestUserId = req.query.guestUserId;
//   if(guestUserId){
//     console.log("GuestUserId from backend : " + guestUserId);
//   }else{
//     guestUserId = null
//   }
//   const token = req.cookies.accessToken;

//   // console.log("heyyy",token)
//   // console.log("heyyy token : ",token)

//   if (!token) return res.status(401).json("Not Logged In!");

//   jwt.verify(token, "secretKey", (err, userInfo) => {
//     if (err) return res.status(401).json("Token is not valid!");

//     // return res.json("sever sended response")
//     const que =
//     guestUserId ? "SELECT p.*, u.id as userId, u.username as userName, u.profilePic as userProfilePic FROM posts as p JOIN users as u ON (u.id = p.userId) WHERE p.userId = ?" :
//       "SELECT p.*, u.id as userId, u.username as userName, u.profilePic as userProfilePic FROM posts as p JOIN users as u ON (u.id = p.userId) LEFT JOIN relationships as r ON (p.userId = r.followedUserId) WHERE r.followerUserId = ? OR p.userId = ? ";
//     // LEFT JOIN relationships as r ON (p.userId = r.followedUserId) WHERE r.followerUserId = ? OR p.userId = ?

//     // const que = "select * from posts where id = 1";
//     console.log("hey there id : ", userInfo.id);

//     const values = guestUserId ? [guestUserId] : [userInfo.id, userInfo.id];

//     // , [userInfo.id,userInfo.id]
//     db.query(que, values, (err, data) => {
//       // console.log("i am in query")
//       if (err) {
//         console.error("Database Error:", err.message);
//         return res.status(500).json({ error: "Internal Server Error yy" });
//       }

//       if (data.length === 0) {
//         return res.status(404).json({ error: "No Records Founded" });
//       }

//       console.log("Fetched Posts:", data);
//       return res.status(200).json(data);
//     });
//   });
// };

export const addPost = (req, res) => {
  console.log("new post descr : ", req.body);

  const token = req.cookies.accessToken;

  // console.log("heyyy",token)
  console.log("heyyy token : ", token);
  console.log("req body : ", req.body);

  // return res.json({data:"hey patu i am here"})

  if (!token) return res.status(401).json("Not Logged In!");

  jwt.verify(token, "secretKey", (err, userInfo) => {
    if (err) return res.status(401).json("Token is not valid!");

    const que =
      "INSERT INTO posts (`descr`,`image`,`createdAt`,`userId`) values (?,?,?,?)";

    // const descr = req.body.descr;

    const values = [
      req.body.descr,
      req.body.image,
      moment(Date.now()).format("YYYY-MM-DD HH:MM:SS"),
      userInfo.id,
    ];

    db.query(que, values, (err, data) => {
      console.log("i am in query");
      if (err) {
        console.error("Database Error:", err.message);
        return res.status(500).json({ error: "Internal Server Error yy" });
      }

      if (data.length === 0) {
        return res.status(404).json({ error: "No Records Founded" });
      }

      console.log("Fetched Posts:", data);
      return res.status(200).json(data);
    });
  });
};
