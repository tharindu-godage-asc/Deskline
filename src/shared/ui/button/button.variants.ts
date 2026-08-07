import { cva } from "class-variance-authority";

export const buttonVariants = cva(
  "rounded-md font-medium transition-colors cursor-pointer disabled:cursor-not-allowedcursor-pointer transition-all duration-200 ease-out hover:scale-[1.02] hover:shadow-md active:scale-[0.98] disabled:cursor-not-allowed disabled:hover:scale-100 disabled:hover:shadow-none",
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