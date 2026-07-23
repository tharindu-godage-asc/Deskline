import { type ButtonHTMLAttributes } from "react";

type Variant =
  | "primary"
  | "secondary"
  | "danger";

type Props =
  ButtonHTMLAttributes<HTMLButtonElement> & {
    variant?: Variant;
    loading?: boolean;
  };

export function Button({
  variant = "primary",
  loading = false,
  children,
  ...props
}: Props) {
  const styles = {
    primary:
      "bg-blue-600 text-white",
    secondary:
      "border bg-transparent",
    danger:
      "bg-red-600 text-white",
  };

  return (
    <button
      disabled={loading}
      className={`
      rounded-md
      px-4
      py-2
      ${styles[variant]}
      `}
      {...props}
    >
      {loading
        ? "Loading..."
        : children}
    </button>
  );
}