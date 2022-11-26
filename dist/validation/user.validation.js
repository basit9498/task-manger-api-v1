"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.userValidationLogout = exports.userValidationLogin = exports.userValidation = void 0;
const express_validator_1 = require("express-validator");
const auth_service_1 = require("../service/auth.service");
const role_value = ["ADMIN", "PROJECT_MANAGER", "DEVELOPER"];
exports.userValidation = (0, express_validator_1.checkSchema)({
    name: {
        notEmpty: {
            bail: true,
            errorMessage: "Full Name Required !",
        },
        trim: true,
    },
    user_name: {
        notEmpty: {
            bail: true,
            errorMessage: "User_Name Required !",
        },
        trim: true,
    },
    password: {
        notEmpty: {
            bail: true,
            errorMessage: "Password Required !",
        },
        trim: true,
    },
    conform_password: {
        notEmpty: {
            bail: true,
            errorMessage: "Conform Password Required !",
        },
        trim: true,
        custom: {
            options: (value, { req }) => {
                if (value !== req.body.password) {
                    return Promise.reject();
                }
                return Promise.resolve();
            },
            errorMessage: "Password & Conform Password not matched !",
        },
    },
    email: {
        notEmpty: {
            bail: true,
            errorMessage: "Email Required !",
        },
        isEmail: {
            bail: true,
            errorMessage: "Invalid Email !",
        },
        trim: true,
        custom: {
            options: (value) => {
                return (0, auth_service_1.checkExistEmailService)(value)
                    .then((data) => {
                    if (data) {
                        return Promise.resolve();
                    }
                    else {
                        return Promise.reject();
                    }
                })
                    .catch((error) => {
                    return Promise.reject(error.message);
                });
            },
        },
    },
    role: {
        notEmpty: {
            bail: true,
            errorMessage: "Role Required !",
        },
        trim: true,
        custom: {
            options: (value) => {
                if (role_value.includes(value)) {
                    return Promise.resolve();
                }
                return Promise.reject();
            },
            errorMessage: `role value should be ["ADMIN", "PROJECT_MANAGER", "DEVELOPER"]`,
        },
    },
});
exports.userValidationLogin = (0, express_validator_1.checkSchema)({
    email: {
        notEmpty: {
            bail: true,
            errorMessage: "Email Required !",
        },
        isEmail: {
            bail: true,
            errorMessage: "Invalid Email !",
        },
        trim: true,
    },
    password: {
        notEmpty: {
            bail: true,
            errorMessage: "Password Required !",
        },
        trim: true,
    },
});
exports.userValidationLogout = (0, express_validator_1.checkSchema)({
    token: {
        notEmpty: {
            errorMessage: "Please provide login token !",
            bail: true,
        },
        custom: {
            options: (value) => {
                return (0, auth_service_1.logoutAuthVerifyTokenService)(value)
                    .then((verify) => {
                    console.log("verify", verify);
                    if (verify) {
                        return Promise.resolve();
                    }
                    return Promise.reject();
                })
                    .catch((error) => {
                    return Promise.reject(error.message);
                });
            },
        },
    },
});
exports.default = { userValidation: exports.userValidation, userValidationLogin: exports.userValidationLogin, userValidationLogout: exports.userValidationLogout };
