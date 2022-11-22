"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const getValidationReport = (errorObject) => {
    const errorMessage = errorObject === null || errorObject === void 0 ? void 0 : errorObject.map((_err) => {
        return _err.msg;
    });
    return errorMessage;
};
exports.default = getValidationReport;
