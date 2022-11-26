"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.createRefreshToken = exports.createToken = void 0;
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const createToken = (data) => {
    const getToken = jsonwebtoken_1.default.sign(data, process.env.JWT_TOKEN_SECRET_KEY, {
        expiresIn: process.env.JWT_TOKEN_EXPIRE,
    });
    return getToken;
};
exports.createToken = createToken;
const createRefreshToken = (data) => {
    const getToken = jsonwebtoken_1.default.sign(data, process.env.JWT_REFRESH_TOKEN_SECRET_KEY, {
        expiresIn: process.env.JWT_REFRESH_TOKEN_EXPIRE,
    });
    return getToken;
};
exports.createRefreshToken = createRefreshToken;
exports.default = { createToken: exports.createToken, createRefreshToken: exports.createRefreshToken };
