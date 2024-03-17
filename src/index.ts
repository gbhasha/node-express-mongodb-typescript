import express from "express";
import cors from "cors";
import compression from "compression";
import cookieParser from "cookie-parser";
import mongoose from "mongoose";
import usersRouter from "./router/users";
import authRouter from "./router/auth";
import logger from "./middlewares/logger";

const dotenv = require("dotenv");
dotenv.config();

const app = express();

app.use(logger);
app.use(
  cors({
    credentials: true,
  })
);
app.use(compression());
app.use(cookieParser());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.get("/", (req, res) => {
  res.send("ok");
});

app.use("/auth", authRouter());
app.use("/users", usersRouter());

mongoose
  .connect(process.env.DB_URI)
  .then(() => {
    console.log("connected to DB");
    app.listen(process.env.PORT, () =>
      console.log(`App listening at port ${process.env.PORT}`)
    );
  })
  .catch((e) => console.log("Error connecting to DB", e));
