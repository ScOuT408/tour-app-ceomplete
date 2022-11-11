import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import User from "../models/User.js";

export const register = async (req, res) => {
  const { name, email, phone, password } = req.body;

  if (!name || !email || !phone || !password) {
    return res.status(400).send("All fields are required");
  }
  try {
    const oldUser = await User.findOne({ email: email });

    if (oldUser) {
      return res.status(400).send("Email already exists");
    }

    const hashPassword = await bcrypt.hash(password, 12);
    const result = await User.create({
      name,
      email,
      phone,
      password: hashPassword,
    });
    if (result) return res.status(200).json(result);
  } catch (err) {
    console.log(err.message);
  }
};

export const login = async (req, res) => {
  const { email, password } = req.body;

  try {
    const user = await User.findOne({ email: email });

    if (!user) return res.status(404).json("User Not Found");

    const isPassCorrect = await bcrypt.compare(password, user.password);

    if (!isPassCorrect) return res.status(404).json("Invalid Credentials");

    const token = jwt.sign({ id: user._id }, process.env.JWT_SEC, {
      expiresIn: "1d",
    });

    return res.status(200).json({
      _id: user.id,
      name: user.name,
      email: user.email,
      phone: user.phone,
      isAdmin: user.isAdmin,
      token: token,
    });
  } catch (err) {
    console.log(err.message);
  }
};
