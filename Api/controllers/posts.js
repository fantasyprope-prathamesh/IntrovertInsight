import { db } from "../connect.js";

export const getPosts = (req, res) => {
  const token = req.cookies.accessToken;
  if (!token) return res.status(401).json("Not Logged In!");

  jwt.verify(token, "secretKey", (err, userInfo) => {
    if (err) return res.status(401).json("Token is not valid!");

    const query =
    "SELECT p.*, u.id as userId, u.username as userName, u.profilePic as userProfilePic FROM posts as p JOIN users as u ON u.id = p.userId LEFT JOIN relationships as r ON (p.userId = r.followedUserId) WHWERE r.followerUserId = ? OR p.userId = ?";

  db.query(query, [userInfo.id,userInfo.id], (err, data) => {
    if (err) {
      console.error("Database Error:", err.message);
      return res.status(500).json({ error: "Internal Server Error" });
    }

    if (data.length === 0) {
      return res.status(404).json({ error: "No Records Found" });
    }

    console.log("Fetched Posts:", data);
    return res.status(200).json(data);
  });

  });

  c
};
