import { router } from "../../../app/router";
import { getCurrentUser, users } from "../../../shared/api/auth";
import { Button } from "../../../shared/ui/button/Button";
import { Card } from "../../../shared/ui/Card";
import { useLogin } from "../../../shared/hooks/useLogin";
import { useState } from "react";

export function LoginPage() {

const [email, setEmail] = useState("");
const [password, setPassword] = useState("");
const [errors, setErrors] = useState({
  email: "",
  password: "",
  auth: "",
});

const { login } = useLogin();

const handleLogin = () => {
  const result = login({
    email,
    password,
  });

  if (!result.success) {
    setErrors(result.errors);
  }
};


  return (
    <div
        className="flex min-h-screen items-center justify-center w-full"
        style={{
          background: "var(--color-background)",
        }}
      >
      <Card className="w-full max-w-md">
        <div className="w-full space-y-6">
          <div>
            <h1 className="text-2xl font-bold text-gray-900">
              Support Portal
            </h1>

            <p className="mt-2 text-sm text-gray-500">
              Sign in to access your support requests.
            </p>
          </div>

          <form className="space-y-4">
            <div>
              <label
                htmlFor="email"
                className="mb-1 block text-sm font-medium"
              >
                Email
              </label>

              <input
                id="email"
                type="email"
                value={email}
                onChange={(e) =>
                  setEmail(e.target.value)
                }
                placeholder="you@example.com"
                className="w-full rounded-md border px-3 py-2"
              />
              {errors.email && (
                  <p className="mt-1 text-sm text-red-500">
                    {errors.email}
                  </p>
                )}
            </div>

            <div>
              <label
                htmlFor="password"
                className="mb-1 block text-sm font-medium"
              >
                Password
              </label>

              <input
                id="password"
                type="password"
                value={password}
                onChange={(e) =>
                  setPassword(e.target.value)
                }
                placeholder="••••••••"
                className="w-full rounded-md border px-3 py-2"
              />
              {errors.password && (
                  <p className="mt-1 text-sm text-red-500">
                    {errors.password}
                  </p>
                )}
            </div>

            {errors.auth && (
              <div className="rounded-md border border-red-200 bg-red-50 p-3 text-sm text-red-600">
                {errors.auth}
              </div>
            )}

            <Button
              type="button"
              className="w-full"
              onClick={handleLogin}
            >
              Sign In
            </Button>
          </form>

          <div className="rounded-lg border p-4 text-sm">
            <p className="mb-2 font-semibold">
              Demo Accounts
            </p>

            <div className="space-y-2">
              <p>
                <strong>Requester</strong><br />
                requester@deskline.com<br />
                password123
              </p>

              <p>
                <strong>Technician</strong><br />
                tech@deskline.com<br />
                password123
              </p>

              <p>
                <strong>Admin</strong><br />
                admin@deskline.com<br />
                password123
              </p>
            </div>
          </div>
        </div>
      </Card>
    </div>
  );
}