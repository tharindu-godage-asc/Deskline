import {
  forwardRef,
  type InputHTMLAttributes,
} from "react";

type Props =
  InputHTMLAttributes<HTMLInputElement>;

export const Input = forwardRef<
  HTMLInputElement,
  Props
>(({ ...props }, ref) => {
  return (
    <input
      ref={ref}
      {...props}
      className="w-full rounded-md border border-gray-200 px-3 py-2"
      style={{
        background:
          "var(--color-surface)",
        color: "var(--color-text)",
        borderColor:
          "var(--color-border)",
      }}
    />
  );
});

Input.displayName = "Input";