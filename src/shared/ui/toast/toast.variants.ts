export type ToastVariant =
  | "success"
  | "error";

export const toastVariants = {
  success: {
    progressBar:
      "bg-green-500",
    indicator:
      "bg-green-500",
  },

  error: {
    progressBar:
      "bg-red-500",
    indicator:
      "bg-red-500",
  },
} as const;