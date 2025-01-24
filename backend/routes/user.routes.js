import { Router } from "express";

import * as userController from "../controllers/user.controller.js";
import { body } from "express-validator";
import { authUser } from "../middleware/auth.middleware.js";

const router = Router();
router.post(
  "/register",
  body("email").isEmail().withMessage("email must be a vaild account"),
  body("password")
    .isLength({ min: 6 })
    .withMessage("Password must be at a strong password"), 
    userController.createUserController
);

router.post('/login',
  body("email").isEmail().withMessage("email must be a vaild account"),
  body("password")
    .isLength({ min: 6 })
    .withMessage("Password must be at a strong password"), 
    userController.loginController
)

router.get('/profile', authUser ,userController.profileController);

router.get('/logout',authUser , userController.logoutController);


export default router; 