import express from "express";
import userRouter from "./routes/users.js";
import postRouter from "./routes/posts.js";
import likeRouter from "./routes/likes.js";
import commentRouter from "./routes/comments.js";
import authRouter from "./routes/auth.js";
import cors from 'cors'
import cookieParser from 'cookie-parser'

const app = express();
const PORT = 8005;

//middleware for handling JSON data..
app.use(express.json());
app.use(cors());
app.use(cookieParser());

//using routers..
app.use(userRouter);
app.use(postRouter);
app.use(commentRouter);
app.use(likeRouter);
app.use(authRouter);




app.listen(PORT, () => {
  console.log(`API is running on ${PORT}`);
});
