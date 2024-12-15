"use client";

import { langOptions } from "@/lib/constants";

interface DropdownProps {
  name: string;
  value: string;
  onChange: (value: string) => void;
  options: langOptions[];
}

export default function Dropdown({
  name,
  value,
  onChange,
  options,
}: DropdownProps) {
  return (
    <select
      name={name}
      className="rounded-md border-input border bg-background px-3 py-2 focus:ring-blue-200 mb-2 w-fit"
      value={value}
      onChange={(e) => onChange(e.target.value)}
    >
      {options.map((option, index) => (
        <option key={`${name}_${index}`} value={option.value}>
          {option.label}
        </option>
      ))}
    </select>
  );
}
