import { type ButtonHTMLAttributes } from "react";
import { type VariantProps } from "class-variance-authority";

import { buttonVariants } from "./button.variants";
import { cn } from "../../lib/cn";

type Props = ButtonHTMLAttributes<HTMLButtonElement> &
  VariantProps<typeof buttonVariants> & {
    loading?: boolean;
  };

export function Button({
  variant,
  size,
  loading = false,
  children,
  className,
  disabled,
  ...props
}: Props) {
  return (
    <button
      disabled={loading || disabled}
      className={cn(
        buttonVariants({ variant, size }),
        className
      )}
      {...props}
    >
      {loading ? "Loading..." : children}
    </button>
  );
}