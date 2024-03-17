import express from "express";

import userController from "../controllers/UserController";

import  isAuthenticated  from "../middlewares/isAuthenticated";
import  isOwner from "../middlewares/isOwner";

export default (): express.Router => {
  const Router = express.Router();

  Router.get("/", isAuthenticated, userController.getUsers);
  Router.get("/:id", isAuthenticated, userController.getUsersById);
  Router.delete(
    "/:id",
    isAuthenticated,
    isOwner,
    userController.deleteUserById
  );
  Router.put("/:id", isAuthenticated, isOwner, userController.updateUserById);

  return Router;
};
