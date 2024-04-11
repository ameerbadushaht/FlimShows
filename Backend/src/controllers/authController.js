import User from "../models/userModel.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { hash } from "bcrypt";

const signup = async (req, res) => {
  const { email, password } = req.body;
  const currentTime = new Date();
  try {
    // Check if user with the given email already exists
    const existingUser = await User.findOne({ email });

    if (existingUser) {
      return res.status(409).json({
        message: "User with this email already exists",
      });
    }

    const username = email.split('@')[0];
    const hashedPassword = await hash(password, 10);
    // If the user does not exist, create a new user
    const newUser = new User({
      email,
      username,
      password: hashedPassword,
      createdAt: currentTime,
    });

    await newUser.save();

    return res.json({ message: "User created successfully" });
  } catch (error) {
    console.error(error);
    res
      .status(500)
      .json({ message: "Error creating user", error: error.message });
  }
};

const login = async (req, res) => {
  const { email, password } = req.body;

  try {
    if (email == "admin@123") {
      const user = await User.findOne({ email });

      const isPasswordMatch = await bcrypt.compare(password, user.password);

      if (!isPasswordMatch) {
        return res.status(401).json({
          message: "Invalid email or password",
        });
      }
      const accessToken = generateAccessToken(user);
      const refreshToken = generateRefreshToken(user);
      res.json({
        message: "Admin logged in successfully",
        accessToken: accessToken,
        refreshToken: refreshToken,
        role:1
      });
    } else {
      const user = await User.findOne({ email });

      if (!user) {
        return res.status(401).json({
          message: "Invalid email or password",
        });
      }

      const isPasswordMatch = await bcrypt.compare(password, user.password);

      if (!isPasswordMatch) {
        return res.status(401).json({
          message: "Invalid email or password",
        });
      }
      const accessToken = generateAccessToken(user);
      const refreshToken = generateRefreshToken(user);
      res.json({
        message: "User logged in successfully",
        accessToken: accessToken,
        refreshToken: refreshToken,
        role:0
      });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Error during login" });
    // res.status(0).json({ message: "please Connect backend" });
  }
};



const getUsers = async (req, res) => {
  try {

    const users = await User.find();
    res.status(200).json(users);
    
  } catch (error) {
    
    res.status(404).json({ message: error.message });
  }
}

const generateAccessToken = (user) => {
  return jwt.sign({ userId: user._id, email: user.email }, "astatine", {
    expiresIn: "5m",
  });
};

const generateRefreshToken = (user) => {
  return jwt.sign(
    { userId: user._id, email: user.email },
    "refreshTokenSecret"
  );
};

export { signup, login , getUsers};
