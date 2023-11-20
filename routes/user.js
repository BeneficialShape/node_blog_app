import express, { Router } from "express";

import {
  signupHandler,
  loginHandler,
  logoutHandler,
  userHandler,
} from "../controllers/user.js";
import { isAuth } from "../customMiddlewares/isAuth.js";

const router = express.Router();

router.post("/signup", signupHandler);
router.post("/login", loginHandler);
router.get("/logout", logoutHandler);
router.get("/me", isAuth, userHandler);

export default router;
