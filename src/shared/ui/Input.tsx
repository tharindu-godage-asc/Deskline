import {
  type InputHTMLAttributes,
} from "react";

type Props =
  InputHTMLAttributes<HTMLInputElement>;

export function Input({
  ...props
}: Props) {
  return (
    <input
      {...props}
      className="w-fullrounded-md border px-3 py-2 outline-none"
      style={{
        background:
          "var(--color-surface)",
        color: "var(--color-text)",
        borderColor:
          "var(--color-border)",
      }}
    />
  );
}