"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const dbConnection_1 = __importDefault(require("./config/dbConnection"));
const express_1 = __importDefault(require("express"));
const app = (0, express_1.default)();
app.use((req, res, next) => {
    res.json({
        messaage: "api working",
    });
});
function startServer() {
    (0, dbConnection_1.default)(process.env.MONGODB_URI, () => {
        app.listen(process.env.PORT, () => {
            console.log(`server running on ${process.env.PORT} port`);
        });
    });
}
exports.default = startServer;
