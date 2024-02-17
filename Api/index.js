// import express from "express";
// import userRouter from "./routes/users.js";
// import postRouter from "./routes/posts.js";
// import likeRouter from "./routes/likes.js";
// import commentRouter from "./routes/comments.js";
// import authRouter from "./routes/auth.js";
// import cors from 'cors'
// import cookieParser from 'cookie-parser'

// const app = express();
// const PORT = 8005;

// //middleware for handling JSON data..
// app.use(express.json());
// app.use(cors({
//   origin : 'http://localhost:8005'
// }));
// app.use(cookieParser());
// app.use((req,res,next)=>{
//   res.header('Access-Control-Allow-Origin',true)
//   next();
// })

// //using routers..
// app.use(userRouter);
// app.use(postRouter);
// app.use(commentRouter);
// app.use(likeRouter);
// app.use(authRouter);




// app.listen(PORT, () => {
//   console.log(`API is running on ${PORT}`);
// });


import express from "express";
import userRouter from "./routes/users.js";
import postRouter from "./routes/posts.js";
import likeRouter from "./routes/likes.js";
import commentRouter from "./routes/comments.js";
import authRouter from "./routes/auth.js";
import cors from 'cors'
import cookieParser from 'cookie-parser'
import multer from "multer";

const app = express();
const PORT = 8005;

// Middleware for handling JSON data.
app.use(express.json());

// Use CORS middleware to allow requests from the specified origin.
app.use(cors({
  origin: 'http://localhost:5173', // Adjust this to match your frontend URL.
  credentials: true // Allow sending cookies with the request.
}));

app.use(cookieParser());


//multer..\-------------------------------------------------------------------------

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, '../Friendify/public/upload')
  },
  filename: function (req, file, cb) {
    cb(null, Date.now() + file.originalname);
  }
})

const upload = multer({ storage: storage })

app.post("/api/upload",upload.single("file"),(req,res)=>{
  const file = req.file;
  res.status(200).json(file.filename);
})

//====================================================================================

// No need to manually set the Access-Control-Allow-Origin header, as the cors middleware handles it.

// Using routers.
app.use(userRouter);
app.use(postRouter);
app.use(commentRouter);
app.use(likeRouter);
app.use(authRouter);

app.listen(PORT, () => {
  console.log(`API is running on ${PORT}`);
});
