import bcrypt from "bcrypt";
import { User } from "../models/user.js";
import jwt from "jsonwebtoken";
import { sendCookie } from "../utils/features.js";
import mongoose from "mongoose";

export const logoutHandler = async (req, res) => {
  res
    .status(200)
    .cookie("token", "", {
      expires: new Date(Date.now()),
      sameSite: process.env.NODE_ENV === "Development" ? "lax" : "none",
      secure: process.env.NODE_ENV === "Development" ? false : true,
    })
    .json({ success: "true", message: "Logged out Successfully" });
};

export const loginHandler = async (req, res) => {
  try {
    const { email, password: enteredPassword } = req.body;

    const user = await User.findOne({ email });

    if (!user) {
      res.status(404).json({
        success: "false",
        message: "User Deos not exists",
      });
    }

    const isMatch = await bcrypt.compare(enteredPassword, user.password);

    if (!isMatch) {
      res.status(404).json({
        success: "false",
        message: "Invalid Password or email",
      });
    }

    sendCookie(user, res, `Logged In Successfully ,${user.username}`, 200);
  } catch (error) {
    return res
      .status(500)
      .json({ sucess: "false", message: "Server Error", error });
  }
};

export const signupHandler = async (req, res) => {
  try {
    const { username, email, password } = req.body;

    let user = await User.findOne({ email });

    if (user) {
      res.status(404).json({
        success: "false",
        message: "User Already exists",
      });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    user = await User.create({ username, email, password: hashedPassword });

    sendCookie(user, res, "Registered Succesfully", 201);
  } catch (error) {
    return res
      .status(500)
      .json({ sucess: "false", message: "Server Error", error });
  }
};

export const userHandler = (req, res) => {
  res.status(200).json({ success: "true", user: req.user });
};
