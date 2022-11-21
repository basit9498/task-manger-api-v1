import mongoose from "mongoose";

const dbConnection = (url: string, cb: Function): void => {
  mongoose
    .connect(url)
    .then((connection) => {
      cb();
    })
    .catch((error: any) => {
      console.log("Database connection error", error);
    });
};

export default dbConnection;
