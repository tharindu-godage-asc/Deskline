import { type Priority } from "../../../shared/types/index";

export function getPriorityTextClass(priority: string) {
  switch (priority) {
    case "high":
      return "font-semibold text-red-600 dark:text-red-400";
    case "medium":
      return "font-semibold text-amber-600 dark:text-amber-400";
    default:
      return "text-slate-600 dark:text-slate-300";
  }
}

export const getPriorityHoverBorderClass = (priority: Priority) => {
  switch (priority) {
    case "high":
      return "group-hover:border-red-500";
    case "medium":
      return "group-hover:border-amber-500";
    case "low":
      return "group-hover:border-green-500";
    default:
      return "group-hover:border-slate-300";
  }
};

export const getPriorityHoverRingClass = (priority: Priority) => {
  switch (priority) {
    case "high":
      return "hover:ring-red-500 dark:hover:ring-red-500";
    case "medium":
      return "hover:ring-amber-500 dark:hover:ring-amber-500";
    case "low":
      return "hover:ring-green-500 dark:hover:ring-green-500";
    default:
      return "hover:ring-slate-300 dark:hover:ring-slate-300";
  }
};