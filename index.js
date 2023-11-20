import express from "express";

import BlogRouter from "./routes/blog.js";
import UserRouter from "./routes/user.js";
import connectMongoDB from "./connections/connection.js";
import cookieParser from "cookie-parser";
import { isAuth } from "./customMiddlewares/isAuth.js";
import { config } from "dotenv";
import cors from "cors";

const app = express();

config({
  path: "./connections/config.env",
});

// middleware
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(cookieParser());
app.use(
  cors({
    origin: [process.env.FRONTEND_URL],
    methods: ["GET", "POST", "PUT", "DELETE"],
    credentials: true,
  })
);

// database connection
connectMongoDB(process.env.MONGO_URL)
  .then((c) => console.log(`Database Connected to ${c.connection.host}`))
  .catch((e) => console.log("MONGODB CONNECTION ERROR", e));

// blogRouter
app.use("/blogs", isAuth, BlogRouter);
// userRouter
app.use("/user", UserRouter);

app.listen(process.env.PORT, () => {
  console.log(
    `Server is running on port ${process.env.PORT} in ${process.env.NODE_ENV} mode`
  );
});
