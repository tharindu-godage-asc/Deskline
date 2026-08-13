import { cva } from "class-variance-authority";

export const badgeVariants = cva(
  "rounded-full px-2 py-1 text-xs font-medium",
  {
    variants: {
      variant: {
        open: "bg-green-100 text-green-800 dark:bg-emerald-950 dark:text-emerald-300 dark:border dark:border-emerald-800",
        pending: "bg-amber-100 text-amber-800 dark:bg-amber-950 dark:text-amber-300 dark:border dark:border-amber-800",
        closed: "bg-slate-100 text-slate-700 dark:bg-slate-800 dark:text-slate-300 dark:border dark:border-slate-700",
        cancelled: "bg-purple-100 text-purple-800 dark:bg-purple-950 dark:text-purple-300 dark:border dark:border-purple-800",
        outline:
          "bg-transparent text-slate-700 border-slate-300 dark:text-slate-200 dark:border-slate-600",

        low: "bg-sky-100 text-sky-800 border border-sky-200 dark:bg-sky-950 dark:text-sky-300 dark:border-sky-800",
        medium: "bg-orange-100 text-orange-800 border border-orange-200 dark:bg-orange-950 dark:text-orange-300 dark:border-orange-800",
        high: "bg-rose-100 text-rose-800 border border-rose-200 dark:bg-rose-950 dark:text-rose-300 dark:border-rose-800",

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