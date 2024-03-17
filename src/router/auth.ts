import express from "express";

import authController from "../controllers/AuthenticationController";

export default (): express.Router => {
  const Router = express.Router();

  Router.post("/register", authController.register);
  Router.post("/login", authController.login);
  return Router;
};
