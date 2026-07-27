import { router } from "../../../app/router";
import { Button } from "../../../shared/ui/button/Button";
import { Card } from "../../../shared/ui/Card";

export function LoginPage() {
  const handleLogin = () => {
    console.log("Login clicked");
    router.navigate("/my-requests");
  };

  return (
    <div className="flex min-h-screen items-center justify-center bg-gray-50 p-4">
      <Card>
        <div className="w-full max-w-md space-y-6">
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
                placeholder="you@example.com"
                className="w-full rounded-md border px-3 py-2"
              />
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
                placeholder="••••••••"
                className="w-full rounded-md border px-3 py-2"
              />
            </div>

            <Button
              type="button"
              className="w-full"
              onClick={handleLogin}
            >
              Sign In
            </Button>
          </form>

          <p className="text-center text-xs text-gray-500">
            Authentication is stubbed for now and will be implemented
            in a later stage.
          </p>
        </div>
      </Card>
    </div>
  );
}