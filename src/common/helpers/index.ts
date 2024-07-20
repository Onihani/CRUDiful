// utils
export { cn as classnames } from "@/lib/utils";

export const generateId = (prefix: string) => {
  return `${prefix}-${Math.floor(Math.random() * 1e8).toString(16)}`;
};

export const isJsonString = (str: string) => {
  try {
    JSON.parse(str);
  } catch (e) {
    return false;
  }
  return true;
};

export { default as calcTimeAgo } from "./calculate-time-ago";
export { default as getBlogSummary } from "./get-content-summary";
