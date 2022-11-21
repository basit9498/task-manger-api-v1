"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
const dbConnection = (url, cb) => {
    mongoose_1.default
        .connect(url)
        .then((connection) => {
        cb();
    })
        .catch((error) => {
        console.log("Database connection error", error);
    });
};
exports.default = dbConnection;
