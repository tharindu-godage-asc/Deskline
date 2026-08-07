# Instructions

- Following Playwright test failed.
- Explain why, be concise, respect Playwright best practices.
- Provide a snippet of code with the fix, if possible.

# Test info

- Name: auth.spec.ts >> Authentication >> invalid password shows authentication error
- Location: e2e\auth.spec.ts:86:3

# Error details

```
Error: expect(locator).toBeVisible() failed

Locator: getByText('Invalid email or password.')
Expected: visible
Error: strict mode violation: getByText('Invalid email or password.') resolved to 2 elements:
    1) <div class="rounded-md border border-red-200 bg-red-50 p-3 text-sm text-red-600">Invalid email or password.</div> aka getByRole('main').getByText('Invalid email or password.')
    2) <p class="text-sm">Invalid email or password.</p> aka getByRole('paragraph').filter({ hasText: 'Invalid email or password.' })

Call log:
  - Expect "toBeVisible" with timeout 5000ms
  - waiting for getByText('Invalid email or password.')

```

# Page snapshot

```yaml
- generic [ref=e2]:
  - generic [ref=e3]:
    - banner [ref=e4]:
      - generic [ref=e5]:
        - heading "Deskline" [level=1] [ref=e7]
        - generic [ref=e9]:
          - button "Motion On" [ref=e10] [cursor=pointer]
          - button "Dark" [ref=e11] [cursor=pointer]
          - button "Logout" [ref=e12] [cursor=pointer]
    - main [ref=e13]:
      - generic [ref=e16]:
        - generic [ref=e17]:
          - heading "Support Portal" [level=1] [ref=e19]
          - generic [ref=e20]:
            - generic [ref=e21]:
              - generic [ref=e22]: Email
              - textbox "Email" [ref=e23]:
                - /placeholder: you@example.com
                - text: requester@deskline.com
            - generic [ref=e24]:
              - generic [ref=e25]: Password
              - textbox "Password" [ref=e26]:
                - /placeholder: ••••••••
                - text: wrongpassword
            - generic [ref=e27]: Invalid email or password.
            - button "Sign In" [ref=e28] [cursor=pointer]
        - generic [ref=e29]:
          - paragraph [ref=e30]: Demo Accounts
          - generic [ref=e31]:
            - generic [ref=e32]:
              - paragraph [ref=e33]: Requester
              - paragraph [ref=e34]: requester@deskline.com
              - paragraph [ref=e35]: password123
            - generic [ref=e36]:
              - paragraph [ref=e37]: Technician
              - paragraph [ref=e38]: tech@deskline.com
              - paragraph [ref=e39]: password123
            - generic [ref=e40]:
              - paragraph [ref=e41]: Admin
              - paragraph [ref=e42]: admin@deskline.com
              - paragraph [ref=e43]: password123
  - generic [ref=e47]:
    - paragraph [ref=e50]: Invalid email or password.
    - button "✕" [ref=e51]
```

# Test source

```ts
  9   |     /login/
  10  |   );
  11  | });
  12  | 
  13  | test.describe("Authentication", () => {
  14  |   test("requester login redirects to my-requests", async ({
  15  |     page,
  16  |   }) => {
  17  |     await page.goto("/login");
  18  | 
  19  |     await page.fill(
  20  |       "#email",
  21  |       "requester@deskline.com"
  22  |     );
  23  | 
  24  |     await page.fill(
  25  |       "#password",
  26  |       "password123"
  27  |     );
  28  | 
  29  |     await page.getByRole("button", {
  30  |       name: "Sign In",
  31  |     }).click();
  32  | 
  33  |     await expect(page).toHaveURL(
  34  |       /my-requests/
  35  |     );
  36  |   });
  37  | 
  38  |   test("technician login redirects to queue", async ({
  39  |     page,
  40  |   }) => {
  41  |     await page.goto("/login");
  42  | 
  43  |     await page.fill(
  44  |       "#email",
  45  |       "tech@deskline.com"
  46  |     );
  47  | 
  48  |     await page.fill(
  49  |       "#password",
  50  |       "password123"
  51  |     );
  52  | 
  53  |     await page.getByRole("button", {
  54  |       name: "Sign In",
  55  |     }).click();
  56  | 
  57  |     await expect(page).toHaveURL(
  58  |       /queue/
  59  |     );
  60  |   });
  61  | 
  62  |   test("admin login redirects to queue", async ({
  63  |     page,
  64  |   }) => {
  65  |     await page.goto("/login");
  66  | 
  67  |     await page.fill(
  68  |       "#email",
  69  |       "admin@deskline.com"
  70  |     );
  71  | 
  72  |     await page.fill(
  73  |       "#password",
  74  |       "password123"
  75  |     );
  76  | 
  77  |     await page.getByRole("button", {
  78  |       name: "Sign In",
  79  |     }).click();
  80  | 
  81  |     await expect(page).toHaveURL(
  82  |       /queue/
  83  |     );
  84  |   });
  85  | 
  86  |   test("invalid password shows authentication error", async ({
  87  |     page,
  88  |   }) => {
  89  |     await page.goto("/login");
  90  | 
  91  |     await page.fill(
  92  |       "#email",
  93  |       "requester@deskline.com"
  94  |     );
  95  | 
  96  |     await page.fill(
  97  |       "#password",
  98  |       "wrongpassword"
  99  |     );
  100 | 
  101 |     await page.getByRole("button", {
  102 |       name: "Sign In",
  103 |     }).click();
  104 | 
  105 |     await expect(
  106 |       page.getByText(
  107 |         "Invalid email or password."
  108 |       )
> 109 |     ).toBeVisible();
      |       ^ Error: expect(locator).toBeVisible() failed
  110 |   });
  111 | });
```