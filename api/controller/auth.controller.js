import User from "../models/user.model.js";
import bcrypt from "bcrypt";
import { errorHandler } from "../utlis/error.js";
import jwt from "jsonwebtoken";

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

export const signIn = async (req, res, next) => {
  const { email, password } = req.body;
  if (!email || !password || email === "" || password === "") {
    next(errorHandler(400, "All fields are required!!!"));
  }
  try {
    const validUser = await User.findOne({ email }).select("+password");
    if (!validUser) {
      return next(
        errorHandler(400, "Invalid User Credentials. Please Check again...")
      );
    }
    const validPassword = bcrypt.compareSync(password, validUser.password);
    if (!validPassword) {
      return next(
        errorHandler(400, "Invalid User Credentials. Please Check again...")
      );
    }
    const token = jwt.sign({ id: validUser._id }, process.env.JWT_SECRECT);
    const { password: pass, ...rest } = validUser._doc;
    res
      .status(200)
      .cookie("access_token", token, {
        httpOnly: true,
      })
      .json(rest);
  } catch (error) {}
};

export const googleAuth = async (req, res, next) => {
  const { email, name, googlePhotoUrl } = req.body;

  try {
    const user = await User.findOne({ email });
    if (user) {
      const token = jwt.sign({ id: user._id }, process.env.JWT_SECRECT);
      const { password: pass, __v, updatedAt, createdAt, ...rest } = user._doc;
      res
        .status(200)
        .cookie("access_token", token, {
          httpOnly: true,
        })
        .json(rest);
    } else {
      const generatedPassword =
        Math.random().toString(36).slice(-8) +
        Math.random().toString(36).slice(-8);
      const hashedPassword = bcrypt.hashSync(generatedPassword, 10);
      const newUser = new User({
        username: name,
        email,
        password: hashedPassword,
        profilePicture: googlePhotoUrl,
      });
      await newUser.save();
      const token = jwt.sign({ id: newUser._id }, process.env.JWT_SECRECT);
      const { password, __v, updatedAt, createdAt, ...rest } = newUser._doc;
      res
        .status(200)
        .cookie("access_token", token, {
          httpOnly: true,
        })
        .json(rest);
    }
  } catch (error) {
    next(error);
  }
};