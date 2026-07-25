import { cva } from "class-variance-authority";

export const buttonVariants = cva(
  "rounded-md font-medium transition-colors",
  {
    variants: {
      variant: {
        primary: "bg-blue-600 text-white",
        secondary: "border bg-transparent",
        danger: "bg-red-600 text-white",
      },
      size: {
        sm: "px-3 py-1 text-sm",
        md: "px-4 py-2",
        lg: "px-6 py-3",
      },
    },
    defaultVariants: {
      variant: "primary",
      size: "md",
    },
  }
);