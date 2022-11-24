import authController from "../controller/auth.controller";
import { Router } from "express";
import userValidation from "../validation/user.validation";

const router = Router();

router.post("/register", userValidation, authController.authRegister);

export default router;
