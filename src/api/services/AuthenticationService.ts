import { AuthenticationService } from "../../generated-api";
import type { UserDto } from "../dtos/UserDto";
import { throwAsServiceError } from "./throwAsServiceError";

export class AuthenticationServices {
  public static async login(
    email: string,
    password: string
  ): Promise<UserDto | undefined> {
    try {
      const user = await AuthenticationService.loginUser({ email, password });
      return user as UserDto;
    } catch (err) {
      throwAsServiceError(err);
    }
  }

  public static async register(
    email: string,
    password: string,
    name: string
  ): Promise<UserDto | undefined> {
    try {
      const user = await AuthenticationService.registerUser({
        email,
        password,
        name,
      });
      return user as UserDto;
    } catch (err) {
      throwAsServiceError(err);
    }
  }

  public static async checkAuth(): Promise<UserDto | undefined> {
    try {
      const user = await AuthenticationService.checkAuth();
      return user as UserDto;
    } catch (err) {
      throwAsServiceError(err);
    }
  }

   public static async logOut(): Promise<void> {
    try {
      await AuthenticationService.logoutUser();
    } catch (err) {
      throwAsServiceError(err);
    }
  }
}
