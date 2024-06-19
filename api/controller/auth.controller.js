import User from "../models/user.model.js";
import bcrypt from "bcrypt";
export const signUp = async (req, res) => {
  const { username, email, password } = req.body;

  if (
    !username ||
    !email ||
    !password ||
    username === "" ||
    email === "" ||
    password === ""
  ) {
    res
      .status(400)
      .json({ status: "fail", messgae: "All field are required!!!" });
  }
  const hashedPassword = bcrypt.hashSync(password, 10);

  const newUser = new User({ username, email, password: hashedPassword });
  try {
    await newUser.save();
    res.status(201).json({ status: "success", messgae: "User Created" });
  } catch (error) {
    res.status(500).json({ status: "fail", messagee: error.message });
  }
};
