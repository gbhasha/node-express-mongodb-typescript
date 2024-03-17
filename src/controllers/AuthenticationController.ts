import { Request, Response } from "express";
import { UserService } from "../services/UserService";
// import { AuthService } from "../services/AuthService";
import { random, authentication } from "../helpers/index";

const userService = new UserService();

const AuthController = {
  register: async (req: Request, res: Response): Promise<void> => {
    try {
      const { username, email, password } = req?.body;

      if (!username || !email || !password) {
        res
          .status(400)
          .send({ message: "Username, email and password are required" });
      }

      const existingUser = await userService.getUserByEmail(email);

      if (existingUser) {
        res
          .status(400)
          .send({ message: "User with this email already exists" });
      }
      const salt = random();

      const user = await userService.createUser({
        username,
        email,
        authentication: {
          salt,
          password: authentication(password, salt),
        },
      });
      res.status(200).send(user);
    } catch (err) {
      console.log("Error in getUsers controller", err.message);
      res.status(400).send({ message: err.message });
    }
  },
  login: async (req: Request, res: Response): Promise<void> => {
    try {
      const { email, password } = req?.body;

      if (!email || !password) {
        res.sendStatus(400);
      }

      let user = await userService
        .getUserByEmail(email)
        .select("+authentication.password +authentication.salt");

      if (!user) {
        console.log("User not found");
        res.sendStatus(400);
      }

      const expectedHash = authentication(password, user.authentication.salt);

      if (user.authentication.password !== expectedHash) {
        console.log("Password incorrect");
        res.sendStatus(403);
      }
      const salt = random();

      user.authentication.sessionToken = authentication(user.username, salt);

      await user.save();

      res.cookie(process.env.COOKIE_NAME, user.authentication.sessionToken, {
        domain: "localhost",
        path: "/",
        secure: true,
        httpOnly: true,
        sameSite: "none",
      });

      res.status(200).send(user);
    } catch (err) {
      console.log("Error in auth controller", err.message);
      res.status(400).send({ message: err.message });
    }
  },
};

export default AuthController;
