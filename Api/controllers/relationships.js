import { db } from "../connect.js";
import jwt from "jsonwebtoken";

export const follow = (req, res) => {
  console.log(
    "heyyy you want to follow",
    req.body.followerId,
    req.body.followedId
  );

  const que =
    "INSERT INTO relationships(`followerUserId`,`followedUserId`) VALUES (?,?)";

  db.query(que, [req.body.followerId, req.body.followedId], (err, result) => {
    if (err) res.status(400).json("internal db err during follow");

    res.status(200).json(result);
  });
};

export const details = (req, res) => {
    console.log(req.body.followerId + " " + req.body.followedI)
  const que = "SELECT * FROM relationships WHERE followerUserId = ? AND followedUserId = ?";

  db.query(que, [req.body.followerId, req.body.followedId], (err, result) => {
    if (err) res.status(400).json("internal db err during follow");

    res.status(200).json(result);
  });
};

export const unfollow = (req, res) => {
  console.log(
    "heyyy you want to Unfollow",
    req.body.followerId,
    req.body.followedId
  );

  const que =
    "DELETE FROM relationships WHERE followerUserId = ? AND followedUserId = ?";

  db.query(que, [req.body.followerId, req.body.followedId], (err, result) => {
    if (err) res.status(400).json("internal db err during follow");

    res.status(200).json(result);
  });
};
