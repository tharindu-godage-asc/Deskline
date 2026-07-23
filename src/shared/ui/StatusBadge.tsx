import { type Status } from "../types";

type Props = {
  status: Status;
};

export function StatusBadge({
  status,
}: Props) {
  const colors = {
    open: "var(--status-open)",
    pending: "var(--status-pending)",
    closed: "var(--status-closed)",
    cancelled: "var(--status-cancelled)",
  };

  return (
    <span
      className="rounded-full px-2 py-1 mb-5 text-xs font-medium text-white"
      style={{
        backgroundColor: colors[status],
      }}
    >
      {status}
    </span>
  );
}