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
        outline:
          "bg-transparent text-slate-700 border-slate-300 dark:text-slate-200 dark:border-slate-600",

        low: "bg-blue-100 text-blue-800 border-blue-200",
        medium: "bg-yellow-100 text-yellow-800 border-yellow-200",
        high: "bg-red-100 text-red-800 border-red-200",

        general:
        "bg-slate-100 text-slate-700 dark:bg-slate-800 dark:text-slate-200",
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


// open:
//   "bg-green-100 text-green-800 dark:bg-emerald-950 dark:text-emerald-300 dark:border dark:border-emerald-800",

// pending:
//   "bg-yellow-100 text-yellow-800 dark:bg-amber-950 dark:text-amber-300 dark:border dark:border-amber-800",

// closed:
//   "bg-red-100 text-red-800 dark:bg-red-950 dark:text-red-300 dark:border dark:border-red-800",

// cancelled:
//   "bg-gray-100 text-gray-800 dark:bg-slate-800 dark:text-slate-300 dark:border dark:border-slate-700",

// low:
//   "bg-blue-100 text-blue-800 border-blue-200 dark:bg-sky-950 dark:text-sky-300 dark:border-sky-800",

// medium:
//   "bg-yellow-100 text-yellow-800 border-yellow-200 dark:bg-amber-950 dark:text-amber-300 dark:border-amber-800",

// high:
//   "bg-red-100 text-red-800 border-red-200 dark:bg-red-950 dark:text-red-300 dark:border-red-800",