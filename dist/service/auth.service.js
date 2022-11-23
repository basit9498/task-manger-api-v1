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
exports.checkExistEmail = void 0;
const HttpErrorHandler_1 = __importDefault(require("../utils/handler/HttpErrorHandler"));
const user_model_1 = __importDefault(require("../model/user.model"));
const checkExistEmail = (email) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const user = yield user_model_1.default.findOne({ email: email });
        if (user) {
            return Promise.reject("Email is already exist");
        }
        return Promise.resolve();
    }
    catch (error) {
        throw new HttpErrorHandler_1.default(404, "Email Checking", error.message);
    }
});
exports.checkExistEmail = checkExistEmail;
exports.default = {
    checkExistEmail: exports.checkExistEmail,
};
