import { Field } from "./Field";
import { Select } from "./Select";

type Option = {
  value: string;
  label: string;
};

type Props = {
  label: string;
  value: string;
  options: Option[];
  onChange: (value: string) => void;
};

export function SelectFilter({
  label,
  value,
  options,
  onChange,
}: Props) {
  return (
    <Field label={label}>
      <Select
        value={value}
        onChange={(e) => onChange(e.target.value)}
      >
        {options.map((option) => (
          <option
            key={option.value}
            value={option.value}
          >
            {option.label}
          </option>
        ))}
      </Select>
    </Field>
  );
}