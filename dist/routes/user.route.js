"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const auth_middleware_1 = __importDefault(require("../middleware/auth.middleware"));
const router = (0, express_1.Router)();
router.get("/me", auth_middleware_1.default, (req, res, next) => {
    res.json({
        messsage: "User Router",
        user: req.user,
    });
});
exports.default = router;
