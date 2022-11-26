"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const verifyToken_1 = __importDefault(require("../helper/verifyToken"));
const HttpErrorHandler_1 = __importDefault(require("../utils/handler/HttpErrorHandler"));
const isAuth = (req, res, next) => {
    try {
        const getAuthHeader = req.get("Authorization");
        if (!getAuthHeader) {
            throw new HttpErrorHandler_1.default(404, "Authorization Error", [
                "Auth header is not found !",
            ]);
        }
        if (getAuthHeader.split(" ")[0] !== "Bearer") {
            throw new HttpErrorHandler_1.default(404, "Authorization Error", [
                "Bearer Token is not found !",
            ]);
        }
        const bearer_token = getAuthHeader.split(" ")[1];
        // Verfity the Token
        const token_detail = (0, verifyToken_1.default)(bearer_token);
        //
        req.user = token_detail;
        return next();
    }
    catch (error) {
        next(error);
    }
};
exports.default = isAuth;
