"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const auth_controller_1 = __importDefault(require("../controller/auth.controller"));
const express_1 = require("express");
const user_validation_1 = require("../validation/user.validation");
const router = (0, express_1.Router)();
router.post("/register", user_validation_1.userValidation, auth_controller_1.default.authRegister);
router.post("/login", user_validation_1.userValidationLogin, auth_controller_1.default.authLogin);
router.post("/logout", user_validation_1.userValidationLogout, auth_controller_1.default.authLogout);
// router.post("/refresh-token")
exports.default = router;
