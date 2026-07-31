import { router } from "../../../src/app/router";
import { useAuth } from "../../shared/context/AuthContext";
import { login as loginApi } from "../api/authApi";

type LoginData = {
  email: string;
  password: string;
};

export function useLogin() {
  const { login: loginUser } =
    useAuth();

  const login = async ({
    email,
    password,
  }: LoginData) => {
    const result =
      await loginApi(
        email,
        password
      );

    loginUser(result.user);

    if (
      result.user.role ===
      "requester"
    ) {
      router.navigate(
        "/my-requests"
      );
    } else {
      router.navigate(
        "/queue"
      );
    }

    return result;
  };

  return {
    login,
  };
}