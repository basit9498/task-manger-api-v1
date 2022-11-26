import authController from "../controller/auth.controller";
import { Router } from "express";
import {
  userValidation,
  userValidationLogin,
  userValidationLogout,
} from "../validation/user.validation";

const router = Router();

router.post("/register", userValidation, authController.authRegister);
router.post("/login", userValidationLogin, authController.authLogin);
router.post("/logout", userValidationLogout, authController.authLogout);
// router.post("/refresh-token")

export default router;
