"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const dbConnection_1 = __importDefault(require("./config/dbConnection"));
const express_1 = __importDefault(require("express"));
const task_route_1 = __importDefault(require("./routes/task.route"));
const body_parser_1 = __importDefault(require("body-parser"));
const error_middleware_1 = __importDefault(require("./middleware/error.middleware"));
const app = (0, express_1.default)();
// middleware
app.use(body_parser_1.default.json());
app.use(body_parser_1.default.urlencoded({ extended: true }));
// routes
app.use("/task", task_route_1.default);
// Error Handler Middleware
app.use(error_middleware_1.default);
function startServer() {
    (0, dbConnection_1.default)(process.env.MONGODB_URI, () => {
        app.listen(process.env.PORT, () => {
            console.log(`server running on ${process.env.PORT} port`);
        });
    });
}
exports.default = startServer;
