import { Field } from "../../../shared/ui/Field";
import { Input } from "../../../shared/ui/Input";
import { SelectFilter } from "../../../shared/ui/SelectFilter";
import { STATUS_OPTIONS, PRIORITY_OPTIONS, CATEGORY_OPTIONS, ASSIGNEE_OPTIONS } from "../../../shared/constants/requestFilterOptions";
import type { RequestFilters as RequestFiltersType } from "../../../shared/types/filters";
import { useEffect, useRef } from "react";

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

  const searchRef = useRef<HTMLInputElement>(null);
  useEffect(() => {
  const handleKeyDown = (
    event: KeyboardEvent
  ) => {
    const target =
      event.target as HTMLElement;

    const isTyping =
      target.tagName === "INPUT" ||
      target.tagName === "TEXTAREA" ||
      target.isContentEditable;

    if (isTyping) {
      return;
    }

    if (event.key === "/") {
      event.preventDefault();
      searchRef.current?.focus();
    }
  };

  window.addEventListener(
    "keydown",
    handleKeyDown
  );

  return () => {
    window.removeEventListener(
      "keydown",
      handleKeyDown
    );
  };
}, []);

  return (
    <div
    className={`grid gap-4 rounded-xl border p-4 md:grid-cols-2 ${
      showAssignee ? "lg:grid-cols-5" : "lg:grid-cols-4"
    }`}
    style={{
      backgroundColor: "var(--color-surface)",
      borderColor: "var(--color-border)",
    }}
  >
      {/* Search */}
      <Field label="Search">
        <Input
          ref={searchRef}
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