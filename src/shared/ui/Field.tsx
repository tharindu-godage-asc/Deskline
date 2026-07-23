type Props = {
  label: string;
  error?: string;
  children: React.ReactNode;
};

export function Field({
  label,
  error,
  children,
}: Props) {
  return (
    <div className="space-y-1">
      <label
        className="
        text-sm
        font-medium
        "
      >
        {label}
      </label>

      {children}

      {error && (
        <p className="text-sm text-red-500">
          {error}
        </p>
      )}
    </div>
  );
}