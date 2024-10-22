export const clsx = (...classnames: string[]) =>
  classnames
    .filter(Boolean)
    .join(" ")
    .replace(/\s{2,}/g, " ")
    .trim();
