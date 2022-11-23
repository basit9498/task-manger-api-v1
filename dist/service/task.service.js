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
exports.createPostService = void 0;
const HttpErrorHandler_1 = __importDefault(require("../utils/handler/HttpErrorHandler"));
const task_model_1 = __importDefault(require("../model/task.model"));
const createPostService = (task_name, task_description, task_priority, task_dealine) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const task = yield task_model_1.default.create({
            task_name,
            task_description,
            task_priority,
            task_dealine,
        });
        return task;
    }
    catch (error) {
        throw new HttpErrorHandler_1.default(400, "Unable to create the Task", [error.message]);
    }
});
exports.createPostService = createPostService;
exports.default = {
    createPostService: exports.createPostService,
};
