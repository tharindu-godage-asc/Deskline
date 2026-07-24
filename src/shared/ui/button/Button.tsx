import { type ButtonHTMLAttributes } from "react";
import { type VariantProps } from "class-variance-authority";

import { buttonVariants } from "./Button.Variants";
import { cn } from "../../../features/requests/lib/cn";

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
  ...props
}: Props) {
  return (
    <button
      disabled={loading || props.disabled}
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