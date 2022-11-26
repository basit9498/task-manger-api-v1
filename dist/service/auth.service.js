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
exports.logoutAuthUpdateTokenService = exports.logoutAuthVerifyTokenService = exports.loginUserService = exports.registerUserService = exports.checkExistEmailService = void 0;
const HttpErrorHandler_1 = __importDefault(require("../utils/handler/HttpErrorHandler"));
const user_model_1 = __importDefault(require("../model/user.model"));
const createToken_1 = require("../helper/createToken");
// Checking Existing Email
const checkExistEmailService = (email) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const user = yield user_model_1.default.findOne({ email: email });
        if (user) {
            throw new Error("Email is already exist");
        }
        return true;
    }
    catch (error) {
        throw new HttpErrorHandler_1.default(404, error.message, []);
    }
});
exports.checkExistEmailService = checkExistEmailService;
// Add New User
const registerUserService = (name, email, user_name, password, role) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const user = yield user_model_1.default.create({
            name,
            email,
            user_name,
            password,
            role,
        });
        return user;
    }
    catch (error) {
        throw new HttpErrorHandler_1.default(400, "Unable to create new User !", [
            error === null || error === void 0 ? void 0 : error.message,
        ]);
    }
});
exports.registerUserService = registerUserService;
// Login User
const loginUserService = (email, password) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const user = yield user_model_1.default.findOne({ email: email });
        if (!user) {
            throw new Error("Invalid User Email");
        }
        const auth_user = yield user.isValidPassword(password);
        if (!auth_user) {
            throw new Error("Invalid User Password");
        }
        if (!user.status) {
            throw new Error("Please Verify Your Account");
        }
        // get Token
        const token = (0, createToken_1.createToken)({
            _id: user._id,
            name: user.name,
            user_name: user.user_name,
            email: user.email,
            role: user.role,
        });
        // get Refresh Token
        const refreshToken = (0, createToken_1.createRefreshToken)({ _id: user._id });
        user.login_token.push({
            log_token: { token: token, expire_date: new Date().toDateString() },
            refresh_token: {
                token: refreshToken,
                expire_date: new Date().toDateString(),
            },
        });
        yield user.save();
        return { user: user, token: token, refreshToken: refreshToken };
    }
    catch (error) {
        throw new HttpErrorHandler_1.default(404, "Login Not Successfull", [error.message]);
    }
});
exports.loginUserService = loginUserService;
// Logout Verify Token Valaidation
const logoutAuthVerifyTokenService = (token) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const user_verify_token = yield user_model_1.default.findOne({
            login_token: { $elemMatch: { "log_token.token": token } },
        });
        if (user_verify_token) {
            return true;
        }
        throw new Error("Invalid User Token !");
    }
    catch (error) {
        throw new Error(error.message);
    }
});
exports.logoutAuthVerifyTokenService = logoutAuthVerifyTokenService;
// Update Token
const logoutAuthUpdateTokenService = (token) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        yield user_model_1.default.updateOne({ "login_token.log_token.token": token }, {
            $pull: { login_token: { "log_token.token": token } },
        });
    }
    catch (error) {
        throw new Error(error.message);
    }
});
exports.logoutAuthUpdateTokenService = logoutAuthUpdateTokenService;
exports.default = {
    checkExistEmailService: exports.checkExistEmailService,
    registerUserService: exports.registerUserService,
    loginUserService: exports.loginUserService,
    logoutAuthVerifyTokenService: exports.logoutAuthVerifyTokenService,
    logoutAuthUpdateTokenService: exports.logoutAuthUpdateTokenService,
};
