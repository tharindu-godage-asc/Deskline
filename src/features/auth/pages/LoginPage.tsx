import { Button } from "../../../shared/ui/button/Button";
import { Card } from "../../../shared/ui/Card";
import { useLogin } from "../../../shared/hooks/useLogin";
import { useState } from "react";
import { loginSchema } from "../../requests/schemas/loginSchema";
import { useToast } from "../../../shared/context/ToastContext";

export function LoginPage() {

const [email, setEmail] = useState("");
const [password, setPassword] = useState("");
const [errors, setErrors] = useState({
  email: "",
  password: "",
  auth: "",
});
const [isLoading, setIsLoading] = useState(false);

const { login } = useLogin();

const { showToast } = useToast();

const handleLogin = async () => {
  const result = loginSchema.safeParse({
    email,
    password,
  });

  if (!result.success) {
    const fieldErrors =
      result.error.flatten().fieldErrors;

    setErrors({
      email:
        fieldErrors.email?.[0] ?? "",
      password:
        fieldErrors.password?.[0] ?? "",
      auth: "",
    });

    return;
  }

  try {
    setIsLoading(true);
    setErrors({
      email: "",
      password: "",
      auth: "",
    });

    await login({
      email,
      password,
    });
    showToast(
      "Login successful.",
      "success"
    );
      } catch {
        setErrors({
          email: "",
          password: "",
          auth: "Invalid email or password.",
        });
        showToast(
        "Invalid email or password.",
        "error"
      );
        } finally {    
          setIsLoading(false);  
        }
    };


  return (
    <div
        className="flex mt-20 items-center justify-center w-full"
        style={{
          background: "var(--color-background)",
        }}
      >
      {/* <Card className="w-full max-w-md">
        <div className="w-full space-y-6">
          <div>
            <h1 className="text-2xl font-bold">
              Support Portal
            </h1>
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
                onChange={(e) => {
                  setEmail(e.target.value);

                  setErrors((prev) => ({
                    ...prev,
                    email: "",
                    auth: "",
                  }));
                }}
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
                onChange={(e) => {
                  setPassword(e.target.value);

                  setErrors((prev) => ({
                    ...prev,
                    password: "",
                    auth: "",
                  }));
                }}
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

        <form className="space-y-4">
          <div>
            <label
              htmlFor="email"
              className="mb-1 block text-sm font-medium"
            >
              Email
            </label>

           <Input
            id="email"
            type="email"
            value={email}
            onChange={(e) => {
              setEmail(e.target.value);

              setErrors((prev) => ({
                ...prev,
                email: "",
                auth: "",
              }));
            }}
            placeholder="you@example.com"

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

            <Input
              id="password"
              type="password"
              value={password}
              onChange={(e) => {
                setPassword(e.target.value);

                setErrors((prev) => ({
                  ...prev,
                  password: "",
                  auth: "",
                }));
              }}
              placeholder="••••••••"
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
            className="w-full onHover:pointer"
            onClick={handleLogin}
            disabled={isLoading}
          >
            {isLoading ? "Signing In..." : "Sign In"}
          </Button>
        </form>
      </div>

      {/* Demo Credentials */}
      <div className="w-full rounded-lg border border-gray-200 p-4 text-sm md:w-72 md:shrink-0">
        <p className="mb-4 text-base font-semibold">
          Demo Accounts
        </p>

        <div className="space-y-4">
          <div>
            <p className="font-semibold">Requester</p>
            <p>requester@deskline.com</p>
            <p>password123</p>
          </div>

          <div>
            <p className="font-semibold">Technician</p>
            <p>tech@deskline.com</p>
            <p>password123</p>
          </div>

          <div>
            <p className="font-semibold">Admin</p>
            <p>admin@deskline.com</p>
            <p>password123</p>
          </div>
        </div>
      </div>

  <Card className="w-full max-w-4xl">
    <div className="flex flex-col gap-8 md:flex-row">
      {/* Login Form */}
      <div className="flex-1 space-y-6">
        <div>
          <h1 className="text-2xl font-bold">
            Support Portal
          </h1>
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
              onChange={(e) => {
                setEmail(e.target.value);

                setErrors((prev) => ({
                  ...prev,
                  email: "",
                  auth: "",
                }));
              }}
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
              onChange={(e) => {
                setPassword(e.target.value);

                setErrors((prev) => ({
                  ...prev,
                  password: "",
                  auth: "",
                }));
              }}
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
            disabled={isLoading}
          >
            {isLoading ? "Signing In..." : "Sign In"}
          </Button>
        </form>
      </div>

      {/* Demo Credentials */}
      <div className="w-full rounded-lg border p-4 text-sm md:w-72 md:shrink-0">
        <p className="mb-4 text-base font-semibold">
          Demo Accounts
        </p>

        <div className="space-y-4">
          <div>
            <p className="font-semibold">Requester</p>
            <p>requester@deskline.com</p>
            <p>password123</p>
          </div>

          <div>
            <p className="font-semibold">Technician</p>
            <p>tech@deskline.com</p>
            <p>password123</p>
          </div>

          <div>
            <p className="font-semibold">Admin</p>
            <p>admin@deskline.com</p>
            <p>password123</p>
          </div>
        </div>
      </div>
    </div>
  </Card>
    </div>
  );
}