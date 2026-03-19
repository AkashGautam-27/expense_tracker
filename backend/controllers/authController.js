import User from "../models/User.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

// Register
export const registerUser = async (req, res) => {
  try {
    const { username, email, password } = req.body;

    // Email check
    const exist = await User.findOne({ email });
    if (exist) return res.json({ success: false, message: "Email already exists" });

    // Hash password
    const hashedPass = await bcrypt.hash(password, 10);

    await User.create({ username, email, password: hashedPass });

    res.json({ success: true, message: "User registered successfully" });

  } catch (err) {
    res.json({ success: false, message: "Server Error" });
  }
};

// Login
export const loginUser = async (req, res) => {
  try {
    const { email, password } = req.body;

    const user = await User.findOne({ email });
    if (!user) return res.json({ success: false, message: "Invalid email" });

    const match = await bcrypt.compare(password, user.password);
    if (!match) return res.json({ success: false, message: "Wrong password" });

    const token = jwt.sign(
      { id: user._id },
      process.env.JWT_SECRET,
      { expiresIn: "7d" }
    );

  return  res.json({
      success: true,
      message: "Login success",
      token,
      user: {
        id: user._id,
        username: user.username,
        email: user.email
      }
    });

  } catch (err) {
    res.json({ success: false, message: "Server Error" });
  }
};
