import User from "../models/user.model.js";
import bcrypt from "bcrypt";
import { errorHandler } from "../utlis/error.js";
export const signUp = async (req, res, next) => {
  const { username, email, password } = req.body;

  if (
    !username ||
    !email ||
    !password ||
    username === "" ||
    email === "" ||
    password === ""
  ) {
    next(errorHandler(400, "All field required!!!"));
  }
  const hashedPassword = bcrypt.hashSync(password, 10);

  const newUser = new User({ username, email, password: hashedPassword });
  try {
    await newUser.save();
    res.status(201).json({ status: "success", messgae: "User Created" });
  } catch (error) {
    next(error);
  }
};
