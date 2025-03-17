export const clsx = (...classnames) =>
  classnames
    .filter(Boolean)
    .join(" ")
    .replace(/\s{2,}/g, " ")
    .trim();

export function func(...param) {
  const [param1, param2] = param;
  if (typeof param1 === "string") {
    return param1 + param2;
  }
  if (typeof param1 === "object") {
    const { key, value } = param1;
    return key + value;
  }
  throw new Error("Invalid parameters");
}
