import { Field } from "../../../shared/ui/Field";
import { Input } from "../../../shared/ui/Input";
import { SelectFilter } from "../../../shared/ui/SelectFilter";

import {
  STATUS_OPTIONS,
  PRIORITY_OPTIONS,
  CATEGORY_OPTIONS,
  ASSIGNEE_OPTIONS,
} from "../../../shared/constants/requestFilterOptions";

import type { RequestFilters as RequestFiltersType } from "../../../shared/types/filters";

type Props = {
  filters: RequestFiltersType;
  onChange: (filters: RequestFiltersType) => void;
  showAssignee?: boolean;
};

export function RequestFilters({
  filters,
  onChange,
  showAssignee,
}: Props) {
  return (
    <div
      className="grid gap-4 rounded-xl border p-4 md:grid-cols-2 lg:grid-cols-4"
      style={{
        backgroundColor: "var(--color-surface)",
        borderColor: "var(--color-border)",
      }}
    >
      {/* Search */}
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

      {/* Status */}
      <SelectFilter
        label="Status"
        value={filters.status}
        options={STATUS_OPTIONS}
        onChange={(status) =>
          onChange({
            ...filters,
            status: status as RequestFiltersType["status"],
          })
        }
      />

      {/* Priority */}
      <SelectFilter
        label="Priority"
        value={filters.priority}
        options={PRIORITY_OPTIONS}
        onChange={(priority) =>
          onChange({
            ...filters,
            priority: priority as RequestFiltersType["priority"],
          })
        }
      />

      {/* Category */}
      <SelectFilter
        label="Category"
        value={filters.category}
        options={CATEGORY_OPTIONS}
        onChange={(category) =>
          onChange({
            ...filters,
            category: category as RequestFiltersType["category"],
          })
        }
      />

      {showAssignee && (
      <SelectFilter
        label="Assignee"
        value={filters.assignee ?? "all"}
        options={ASSIGNEE_OPTIONS}
        onChange={(assignee) =>
          onChange({
            ...filters,
            assignee: assignee as
              | "all"
              | "unassigned"
              | "me",
          })
        }
      />
    )}
    </div>
  );
}