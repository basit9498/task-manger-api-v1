"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.isTokenExpired = void 0;
const isTokenExpired = (token) => {
    const payloadBase64 = token.split(".")[1];
    const decodedJson = Buffer.from(payloadBase64, "base64").toString();
    const decoded = JSON.parse(decodedJson);
    const exp = decoded.exp;
    const expired = Date.now() >= exp * 1000;
    return expired;
};
exports.isTokenExpired = isTokenExpired;
exports.default = exports.isTokenExpired;
