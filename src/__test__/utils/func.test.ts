import { expect, test } from "vitest";
import { func } from "../../app/lib/utils";

const testCases: { input: [string, string]; expected: string }[] = [
  { input: ["cls1", "cls2"], expected: "cls1cls2" },
  { input: ["key", "value"], expected: "keyvalue" },
];

const testCases2 = [
  { input: { key: "cls1", value: "cls2" }, expected: "cls1cls2" },
  { input: { key: "key", value: "value" }, expected: "keyvalue" },
];

test.each(testCases)(`func(...$input) = $expected`, ({ input, expected }) => {
  expect(func(...input)).toBe(expected);
});

test.each(testCases2)(`func($input) = $expected`, ({ input, expected }) => {
  expect(func(input)).toBe(expected);
});

console.log(func("1", "2"));
