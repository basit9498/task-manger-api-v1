import dbConnection from "./config/dbConnection";
import express from "express";
import taskRouter from "./routes/task.route";
import bodyParser from "body-parser";
import errorMiddleware from "./middleware/error.middleware";

const app = express();

// middleware
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// routes
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
