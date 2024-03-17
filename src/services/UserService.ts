import { UserModel } from "../model/UserModel";
import { User } from "../types/User"; // Import the User type from the appropriate location

export class UserService {
  public async getUsers(): Promise<User[]> {
    return UserModel.find();
  }

  public async getUsersById(id: string): Promise<User> {
    return UserModel.findById(id);
  }

  public getUserByEmail(email: string) {
    return UserModel.findOne({ email });
  }

  public async updateUserById(
    id: string,
    payload: Record<string, any>
  ): Promise<User> {
    return UserModel.findByIdAndUpdate(id, payload, { new: true });
  }

  public async getUsersBySessionToken(sessionToken: string): Promise<User> {
    return UserModel.findOne({ "authentication.sessionToken": sessionToken });
  }

  public async deleteUserById(id: string): Promise<User> {
    return UserModel.findByIdAndDelete(id);
  }

  public async createUser(payload: Record<string, any>): Promise<User> {
    const user = await UserModel.create(payload);
    return user;
  }
}
