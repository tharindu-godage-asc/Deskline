import { type HTMLAttributes } from "react";
import { type VariantProps } from "class-variance-authority";

import { badgeVariants } from "./badge.variants";
import { cn } from "../../../features/requests/lib/cn";

type BadgeProps =
  HTMLAttributes<HTMLSpanElement> &
  VariantProps<typeof badgeVariants>;

export function Badge({
  variant,
  size,
  className,
  children,
  ...props
}: BadgeProps) {
  return (
    <span
      className={cn(
        badgeVariants({ variant, size }),
        className
      )}
      {...props}
    >
      {children}
    </span>
  );
}