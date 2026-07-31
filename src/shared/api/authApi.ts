export async function login(
  email: string,
  password: string
) {
  const response =
    await fetch("/login", {
      method: "POST",
      headers: {
        "Content-Type":
          "application/json",
      },
      body: JSON.stringify({
        email,
        password,
      }),
    });

  if (!response.ok) {
    throw new Error(
      "Invalid credentials"
    );
  }

  return response.json();
}