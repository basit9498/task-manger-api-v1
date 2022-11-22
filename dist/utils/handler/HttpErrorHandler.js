"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class HttpException extends Error {
    constructor(status, message, error_detail = []) {
        super(message);
        this.status = status || 500;
        this.message = message || "Something went wrong !";
        this.error_detail =
            error_detail && (error_detail === null || error_detail === void 0 ? void 0 : error_detail.length) > 0 ? error_detail : [];
    }
}
exports.default = HttpException;
