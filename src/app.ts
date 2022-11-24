import dbConnection from "./config/dbConnection";
import express from "express";
import bodyParser from "body-parser";
import errorMiddleware from "./middleware/error.middleware";

import taskRouter from "./routes/task.route";
import userRouter from "./routes/user.route";
import authRoute from "./routes/auth.route";

const app = express();

// middleware
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// routes
app.use("/auth", authRoute);
app.use("/user", userRouter);
app.use("/task", taskRouter);

// Error Handler Middleware
app.use(errorMiddleware);

function startServer() {
  dbConnection(process.env.MONGODB_URI as string, () => {
    app.listen(process.env.PORT, () => {
      console.log(`server running on ${process.env.PORT} port`);
    });
  });
}

export default startServer;
