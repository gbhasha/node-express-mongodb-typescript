import { Request, Response } from "express";
import { UserService } from "../services/UserService";

const userService = new UserService();

const UserController = {
  getUsers: async (req: Request, res: Response): Promise<void> => {
    try {
      const users = await userService.getUsers();
      res.status(200).send(users);
    } catch (err) {
      console.log("Error in getUsers controller", err.message);
      res.status(500).send({ message: err.message });
    }
  },

  getUsersById: async (req: Request, res: Response): Promise<void> => {
    try {
      const user = await userService.getUsersById(req?.params?.id);
      res.status(200).send(user);
    } catch (err) {
      console.log("Error in getUsersById controller", err.message);
      res.status(500).send({ message: err.message });
    }
  },

  getUserByEmail: async (req: Request, res: Response): Promise<void> => {
    try {
      const user = await userService.getUserByEmail(req?.params?.email);
      res.status(200).send(user);
    } catch (err) {
      console.log("Error in getUserByEmail controller", err.message);
      res.status(500).send({ message: err.message });
    }
  },

  getUsersBySessionToken: async (
    req: Request,
    res: Response
  ): Promise<void> => {
    try {
      const user = await userService.getUsersBySessionToken(
        req?.params?.sessionToken
      );
      res.status(200).send(user);
    } catch (err) {
      console.log("Error in getUsersBySessionToken controller", err.message);
      res.status(500).send({ message: err.message });
    }
  },

  updateUserById: async (req: Request, res: Response): Promise<void> => {
    try {
      const user = await userService.updateUserById(req?.params?.id, req?.body);
      res.status(200).send(user);
    } catch (err) {
      console.log("Error in updateUserById controller", err.message);
      res.status(500).send({ message: err.message });
    }
  },

  deleteUserById: async (req: Request, res: Response): Promise<void> => {
    try {
      const user = await userService.deleteUserById(req?.params?.id);
      res.status(200).send(user);
    } catch (err) {
      console.log("Error in deleteUserById controller", err.message);
      res.status(500).send({ message: err.message });
    }
  },

  createUser: async (req: Request, res: Response): Promise<void> => {
    try {
      const user = await userService.createUser(req?.body);
      res.status(200).send(user);
    } catch (err) {
      console.log("Error in createUser controller", err.message);
      res.status(500).send({ message: err.message });
    }
  },
};

export default UserController;
