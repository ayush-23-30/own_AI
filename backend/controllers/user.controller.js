import User from "../modals/user.modal.js";
// import * as userService from '../services/user.services.js'
import createUser from "../services/user.services.js";

import { validationResult } from "express-validator";

import redisClient from "../services/redis.services.js";

export const createUserController = async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({
      errors: errors.array(),
    });
  }

  try {
    const user = await createUser(req.body);
    res.status(201).send(user);

    const token = await user.generateJWT();

    console.log("user Created");
    return res.status(201).json({ user, token });
  } catch (err) {
    console.log("error in creating user ", err);

    res.status(400).send(err.message);
  }
};

export const loginController = async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({
      errors: errors.array(),
    });
  }
  try {
    const { email, password } = req.body;
    if (!email || !password) {
      console.log("Email and password not provided");
      return res.status(400).send("Email and password are required");
    }

    // because in the modal we do select - false that's why we need to do .select ("+password");

    const user = await User.findOne({ email }).select("+password"); // Include password field explicitly
    if (!user) {
      console.log("Email not found");
      return res.status(401).json({
        errors: "Invalid credentials",
      });
    }

    const isMatch = await user.isValidPassword(password); // Call the instance method

    if (!isMatch) {
      console.log("Password does not match");
      return res.status(401).json({
        errors: "Invalid password",
      });
    }

    const token = user.generateJWT(); // Call the instance method to generate a JWT
    console.log("User login successful");
    res.status(200).json({
      user,
      token,
    });
  } catch (error) {
    console.log("Failed to login", error.message);
    res.status(400).send(error.message);
  }
};

export const profileController = async (req, res) => {
  console.log(req.user); 
  res.status(200).json({
    message: "User is logged in to access profile.",
    user: req.user,
  });
};

