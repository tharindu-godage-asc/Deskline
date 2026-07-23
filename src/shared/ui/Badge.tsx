type BadgeVariant =
  | "status"
  | "priority"
  | "category";

type Props = {
  children: React.ReactNode;
  color: string;
};

export function Badge({
  children,
  color,
}: Props) {
  return (
    <span
      className="rounded-full px-2 py-1 text-xs font-medium text-white"
      style={{
        backgroundColor: color,
      }}
    >
      {children}
    </span>
  );
}