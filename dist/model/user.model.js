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
const mongoose_1 = require("mongoose");
const bcrypt_1 = __importDefault(require("bcrypt"));
const UserSchema = new mongoose_1.Schema({
    name: {
        type: String,
        required: [true, "FullName is Require !"],
    },
    user_name: {
        type: String,
        required: [true, "FullName is Required"],
    },
    password: {
        type: String,
        required: [true, "Password is Required"],
    },
    email: {
        type: String,
        required: [true, "Email is Required"],
    },
    role: {
        type: String,
        enum: ["ADMIN", "PROJECT_MANAGER", "DEVELOPER"],
        required: [true, "FullName is Required"],
    },
    status: {
        type: Boolean,
        default: true,
        required: true,
    },
    login_token: [
        {
            log_token: { token: { type: String }, expire_date: { type: String } },
            refresh_token: {
                token: { type: String },
                expire_date: { type: String },
            },
        },
    ],
}, {
    timestamps: true,
});
UserSchema.pre("save", function (next) {
    return __awaiter(this, void 0, void 0, function* () {
        if (!this.isModified("password")) {
            return next();
        }
        const hash_password = yield bcrypt_1.default.hash(this.password, 10);
        this.password = hash_password;
        next();
    });
});
UserSchema.methods.isValidPassword = function (password) {
    return __awaiter(this, void 0, void 0, function* () {
        return yield bcrypt_1.default.compare(password, this.password);
    });
};
exports.default = (0, mongoose_1.model)("User", UserSchema);
