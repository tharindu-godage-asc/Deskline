import {
  FiMonitor,
  FiCode,
  FiTool,
  FiKey,
} from "react-icons/fi";

import type { ReactNode } from "react";

export const defaultCategoryIcon = (
  <FiMonitor className="h-5 w-5" />
);

export const categoryIcons: Record<
  string,
  ReactNode
> = {
  hardware: (
    <FiMonitor className="h-5 w-5" />
  ),
  software: (
    <FiCode className="h-5 w-5" />
  ),
  facilities: (
    <FiTool className="h-5 w-5" />
  ),
  access: (
    <FiKey className="h-5 w-5" />
  ),
};