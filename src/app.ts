import dbConnection from "./config/dbConnection";
import express from "express";

const app = express();

app.use((req, res, next) => {
  res.json({
    messaage: "api working",
  });
});

function startServer() {
  dbConnection(process.env.MONGODB_URI as string, () => {
    app.listen(process.env.PORT, () => {
      console.log(`server running on ${process.env.PORT} port`);
    });
  });
}

export default startServer;
