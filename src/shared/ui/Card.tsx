type Props = {
  children: React.ReactNode;
  className?: string;
};

export function Card({
  children,
  className = "",
}: Props) {
  return (
    <div
      className={`rounded-xl border p-6 ${className}`}
      style={{
        backgroundColor: "var(--color-surface)",
        borderColor: "var(--color-border)",
      }}
    >
      {children}
    </div>
  );
}