import { expect, test } from "vitest";
import { clsx } from "../../app/lib/utils";

const testCases = [
  { classnames: ["cls1", "cls2"], expected: "cls1 cls2" },
  { classnames: ["cls1", "cls2", "cls3"], expected: "cls1 cls2 cls3" },
  { classnames: [" cls1 ", " cls2", "cls3 "], expected: "cls1 cls2 cls3" },
  { classnames: [" ", "cls2", "cls3"], expected: "cls2 cls3" },
  { classnames: ["cls1", " ", "cls3"], expected: "cls1 cls3" },
  { classnames: ["cls1", "      ", "cls3"], expected: "cls1 cls3" },
  { classnames: ["cls1", " cls2", "  "], expected: "cls1 cls2" },
  { classnames: ["", "  ", "   "], expected: "" },
];

test.each(testCases)(`clsx(...$classnames) = $expected`, ({ classnames, expected }) => {
  expect(clsx(...classnames)).toBe(expected);
});
