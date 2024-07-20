// utils
export { cn as classnames } from "@/lib/utils";

export const generateId = (prefix: string) => {
  return `${prefix}-${Math.floor(Math.random() * 1e8).toString(16)}`;
};

export { default as calcTimeAgo } from "./calculate-time-ago";
