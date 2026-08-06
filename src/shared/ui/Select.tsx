import {
  type SelectHTMLAttributes,
} from "react";
import { cn } from "../lib/cn";

type Props =
  SelectHTMLAttributes<HTMLSelectElement>;

export function Select({
  className,
  ...props
}: Props) {
  return (
    <select
      {...props}
      className={cn(
        "w-full rounded-md border px-3 py-2 shadow-sm transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50",
        className
      )}
      style={{
        background: "var(--color-surface)",
        color: "var(--color-text)",
        borderColor: "var(--color-border)",
      }}
    />
  );
}