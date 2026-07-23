import {
  type SelectHTMLAttributes,
} from "react";

type Props =
  SelectHTMLAttributes<HTMLSelectElement>;

export function Select(props: Props) {
  return (
    <select
      {...props}
      className="
      w-full
      rounded-md
      border
      px-3
      py-2
      "
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