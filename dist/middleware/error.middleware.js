"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const errorMiddleware = (err, req, res, next) => {
    console.log("error middleware calling");
    res.status(err.status | 404).json({
        error: err.message,
        detail: err.error_detail,
    });
};
exports.default = errorMiddleware;
