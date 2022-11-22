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
exports.createPost = void 0;
const task_model_1 = __importDefault(require("../model/task.model"));
const express_validator_1 = require("express-validator");
const validation_error_handler_1 = __importDefault(require("../utils/handler/validation.error.handler"));
const HttpErrorHandler_1 = __importDefault(require("../utils/handler/HttpErrorHandler"));
const createPost = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const validationError = (0, validation_error_handler_1.default)((0, express_validator_1.validationResult)(req).array());
        if (validationError.length > 0) {
            throw new HttpErrorHandler_1.default(400, "Validation Error", validationError);
        }
        const { task_name, task_description, task_priority, task_dealine } = req.body;
        const task = yield task_model_1.default.create({
            task_name,
            task_description,
            task_priority,
            task_dealine,
        });
        res.status(201).json({
            message: "add new task successfully ",
            task,
        });
    }
    catch (error) {
        next(error);
    }
});
exports.createPost = createPost;
exports.default = {
    createPost: exports.createPost,
};
