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
const auth_service_1 = require("../service/auth.service");
const verifyToken_1 = __importDefault(require("../helper/verifyToken"));
const HttpErrorHandler_1 = __importDefault(require("../utils/handler/HttpErrorHandler"));
const isAuth = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
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
        // check the token in database is user logout or not
        yield (0, auth_service_1.logoutAuthVerifyTokenService)(bearer_token);
        // Verfity the Token
        const token_detail = (0, verifyToken_1.default)(bearer_token);
        //
        req.user = token_detail;
        return next();
    }
    catch (error) {
        next(error);
    }
});
exports.default = isAuth;
