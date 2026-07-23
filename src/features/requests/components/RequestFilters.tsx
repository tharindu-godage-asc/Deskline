import { Field } from "../../../shared/ui/Field";
import { Input } from "../../../shared/ui/Input";
import { Select } from "../../../shared/ui/Select";

import type { RequestFilters as RequestFiltersType } from "../../../shared/types/filters";

type Props = {
  filters: RequestFiltersType;
  onChange: (filters: RequestFiltersType) => void;
};

export function RequestFilters({
  filters,
  onChange,
}: Props) {
  return (
    <div
      className="
        grid
        gap-4
        rounded-xl
        border
        p-4
        md:grid-cols-2
        lg:grid-cols-4
      "
      style={{
        backgroundColor: "var(--color-surface)",
        borderColor: "var(--color-border)",
      }}
    >
      <Field label="Search">
        <Input
          placeholder="Search by title..."
          value={filters.search}
          onChange={(e) =>
            onChange({
              ...filters,
              search: e.target.value,
            })
          }
        />
      </Field>

      <Field label="Status">
        <Select
          value={filters.status}
          onChange={(e) =>
            onChange({
              ...filters,
              status: e.target.value as RequestFiltersType["status"],
            })
          }
        >
          <option value="all">All Statuses</option>
          <option value="open">Open</option>
          <option value="pending">Pending</option>
          <option value="closed">Closed</option>
          <option value="cancelled">Cancelled</option>
        </Select>
      </Field>

      <Field label="Priority">
        <Select
          value={filters.priority}
          onChange={(e) =>
            onChange({
              ...filters,
              priority: e.target.value as RequestFiltersType["priority"],
            })
          }
        >
          <option value="all">All Priorities</option>
          <option value="low">Low</option>
          <option value="medium">Medium</option>
          <option value="high">High</option>
        </Select>
      </Field>

      <Field label="Category">
        <Select
          value={filters.category}
          onChange={(e) =>
            onChange({
              ...filters,
              category: e.target.value as RequestFiltersType["category"],
            })
          }
        >
          <option value="all">All Categories</option>
          <option value="hardware">Hardware</option>
          <option value="software">Software</option>
          <option value="facilities">Facilities</option>
          <option value="access">Access</option>
        </Select>
      </Field>
    </div>
  );
}