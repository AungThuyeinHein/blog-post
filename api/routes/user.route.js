import express, { Router } from "express";
import { updateUser } from "../controller/user.controller.js";
import { verifyToken } from "../utlis/verifyUser.js";

const router = express.Router();

router.put("/:userId", verifyToken, updateUser);

export default router;
