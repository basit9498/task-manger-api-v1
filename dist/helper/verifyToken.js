"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.jwtVerifyToken = void 0;
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const HttpErrorHandler_1 = __importDefault(require("../utils/handler/HttpErrorHandler"));
const jwtVerifyToken = (token) => {
    try {
        const decode = jsonwebtoken_1.default.verify(token, process.env.JWT_TOKEN_SECRET_KEY);
        return decode;
    }
    catch (error) {
        throw new HttpErrorHandler_1.default(404, "Authorization Error", [error.message]);
    }
};
exports.jwtVerifyToken = jwtVerifyToken;
exports.default = exports.jwtVerifyToken;
