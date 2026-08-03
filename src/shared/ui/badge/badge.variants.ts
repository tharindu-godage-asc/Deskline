import { cva } from "class-variance-authority";

export const badgeVariants = cva(
  "rounded-full px-2 py-1 text-xs font-medium",
  {
    variants: {
      variant: {
        open: "bg-green-100 text-green-800",
        pending: "bg-yellow-100 text-yellow-800",
        closed: "bg-red-100 text-red-800",
        cancelled: "bg-gray-100 text-gray-800",
      },
      size: {
        sm: "text-xs",
        md: "text-sm",
        lg: "text-lg px-6 pb-2"
      },
    },
    defaultVariants: {
      variant: "open",
      size: "sm",
    },
  }
);