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
exports.registerUserService = exports.checkExistEmailService = void 0;
const HttpErrorHandler_1 = __importDefault(require("../utils/handler/HttpErrorHandler"));
const user_model_1 = __importDefault(require("../model/user.model"));
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
exports.default = {
    checkExistEmailService: exports.checkExistEmailService,
    registerUserService: exports.registerUserService,
};
