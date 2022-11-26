"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.authRegister = void 0;
const validation_error_handler_1 = __importDefault(require("../utils/handler/validation.error.handler"));
const express_validator_1 = require("express-validator");
const HttpErrorHandler_1 = __importDefault(require("../utils/handler/HttpErrorHandler"));
const auth_service_1 = require("../service/auth.service");
const authRegister = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const error_detail = (0, validation_error_handler_1.default)((0, express_validator_1.validationResult)(req).array());
        if ((error_detail === null || error_detail === void 0 ? void 0 : error_detail.length) > 0) {
            throw new HttpErrorHandler_1.default(400, "User Registeration Validation Error", error_detail);
        }
        // Req.body
        const { name, email, user_name, password, role } = req.body;
        const user = yield (0, auth_service_1.registerUserService)(name, email, user_name, password, role);
        res.json({
            message: "User has been successfully registered ",
            user,
        });
    }
    catch (error) {
        next(error);
    }
});
exports.authRegister = authRegister;
// login
const authLogin = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const error_detail = (0, validation_error_handler_1.default)((0, express_validator_1.validationResult)(req).array());
        if ((error_detail === null || error_detail === void 0 ? void 0 : error_detail.length) > 0) {
            throw new HttpErrorHandler_1.default(400, "User Login Validation Error", error_detail);
        }
        const { email, password } = req.body;
        const user_data = yield (0, auth_service_1.loginUserService)(email, password);
        const user_detail = user_data;
        const user_filter = {
            _id: user_detail.user._id,
            name: user_detail.user.name,
            role: user_detail.user.role,
            user_name: user_detail.user.user_name,
        };
        res.status(200).json({
            message: "Login Successfull",
            user: user_filter,
            tokon: user_detail.token,
            refresh_token: user_detail.refreshToken,
        });
    }
    catch (error) {
        next(error);
    }
});
// Logout
const authLogout = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        // Validation
        const error_detail = (0, validation_error_handler_1.default)((0, express_validator_1.validationResult)(req).array());
        if ((error_detail === null || error_detail === void 0 ? void 0 : error_detail.length) > 0) {
            throw new HttpErrorHandler_1.default(400, "User Logout Validation Error", error_detail);
        }
        // Remove the token form DataBase
        yield (0, auth_service_1.logoutAuthUpdateTokenService)(req.body.token);
        res.json({
            message: "User Logout Successfully",
        });
    }
    catch (error) {
        next(error);
    }
});
exports.default = {
    authRegister: exports.authRegister,
    authLogin,
    authLogout,
};
