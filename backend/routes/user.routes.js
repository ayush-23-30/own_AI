import { Router } from "express";

import * as userController from "../controllers/user.controller.js";
import { body } from "express-validator";

const router = Router();
router.post(
  "/register",
  body("email").isEmail().withMessage("email must be a vaild account"),
  body("password")
    .isLength({ min: 6 })
    .withMessage("Password must be at a strong password"), 
    userController.createUserController
);


export default router; 