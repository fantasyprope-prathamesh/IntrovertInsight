import { db } from "../connect.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken"

export const register = (req, res) => {
  //CHECK USER IF EXISTS
  console.log('register details ',req.body);
  const que1 = "SELECT * FROM users WHERE username = ?";

  db.query(que1, [req.body.username], (err, data) => {
    if (err) return res.status(500).json(err);
    if (data.length) {
      return res.status(409).json("User already exists :)");
    } else {
      //CREATE A NEW USER
      //HASH THE PASSWORD..
      const salt = bcrypt.genSaltSync(10);
      const hashedPassword = bcrypt.hashSync(req.body.password, salt);
      //   ,`coverPic`,`profilePic`,`city`,`website`
      const que2 =
        "INSERT INTO users (`username`,`email`,`password`,`name`) VALUE (?)";

      const values = [
        req.body.username,
        req.body.email,
        hashedPassword,
        req.body.name,
      ];

      db.query(que2, [values], (err, result) => {
        if (err) return res.status(500).json(err);
        return res.status(200).json({ message: "Registration completed" });
      });
    }
  });
};

export const login = (req, res) => {
  // Implement the login logic here

  const que1 = "SELECT * FROM users WHERE username = ?";
  db.query(que1,[req.body.username],(err,result)=>{
    if (err) return res.status(500).json({err:err}); // this will send error whenever server is not able to connect database or connection
    if (result.length == 0) return res.status(404).json("User not found!")

    const checkPassword = bcrypt.compareSync(req.body.password,result[0].password);

    if(!checkPassword) {
        return res.status(400).json("Wrong password and User name")
    }
    // else{
    //     return res.json("Right user")
    // }

    //creating jwt token..

    const {password,...others} = result[0];

    const token = jwt.sign({id:result[0].id}, 'secretKey');

    return res.cookie('accessToken', token , {
      httpOnly : true
    }).status(200).json(others);

  })
};

export const logout = (req, res) => {
  // Implement the logout logic here
  console.log("logout...")
  res.clearCookie("accessToken",{
    secure : true,
    sameSite : 'none'
  }).status(200).json("User has been loged out");

};
