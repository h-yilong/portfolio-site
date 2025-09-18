export const clsx = (...classnames: string[]) =>
  classnames
    .filter(Boolean)
    .join(" ")
    .replace(/\s{2,}/g, " ")
    .trim();

// export async function func(_key: string, _value: string): Promise<string>;
// export async function func(_config: { key: string; value: string }): Promise<string>;
// export async function func(...param: [string, string] | [{ key: string; value: string }]) {
//   const [param1, param2] = param;
//   if (typeof param1 === "string") {
//     return param1 + param2;
//   }
//   if (typeof param1 === "object") {
//     const { key, value } = param1;
//     return key + value;
//   }

//   throw new Error("Invalid parameters");
// }
