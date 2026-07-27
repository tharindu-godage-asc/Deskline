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
      className={`rounded-xl box-border shadow-md p-6 ${className}`}
    >
      {children}
    </div>
  );
}