import { router } from "../../../src/app/router";
import {
  getCurrentUser,
  users,
} from "../../shared/api/auth";
import { useAuth } from "../../shared/context/AuthContext";

type LoginData = {
  email: string;
  password: string;
};

export function useLogin() {

  const { login: loginUser } = useAuth(); 
  const login = ({
    email,
    password,
  }: LoginData) => {
    const errors = {
      email: "",
      password: "",
      auth: "",
    };

    if (!email.trim()) {
      errors.email = "Email is required";
    }

    if (!password.trim()) {
      errors.password =
        "Password is required";
    }

    if (
      errors.email ||
      errors.password
    ) {
      return {
        success: false,
        errors,
      };
    }

    const user = users.find(
      (u) =>
        u.email === email &&
        u.password === password
    );

    if (!user) {
      return {
        success: false,
        errors: {
          email: "",
          password: "",
          auth:
            "Invalid email or password",
        },
      };
    }

    loginUser(user);

    if (
      user.role === "requester"
    ) {
      router.navigate(
        "/my-requests"
      );
    } else {
      router.navigate("/queue");
    }

    return {
      success: true,
      errors,
    };
  };

  return {
    login,
  };
}