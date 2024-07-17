import express, { Router } from "express";
import {
  updateUser,
  deleteUser,
  signOut,
} from "../controller/user.controller.js";
import { verifyToken } from "../utlis/verifyUser.js";

const router = express.Router();

router.put("/:userId", verifyToken, updateUser);
router.delete("/:userId", verifyToken, deleteUser);
router.post("/", signOut);

export default router;
