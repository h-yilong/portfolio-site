import { describe, it, expect } from "vitest";
import { distributeAlongRange } from "../../lib/utils";

describe("distributeAlongRange", () => {
  it("should return [-1, 0, 1] for n=3", () => {
    const result = distributeAlongRange(3);
    expect(result).toEqual([-1, 0, 1]);
  });

  it("should return [-1, -0.5, 0, 0.5, 1] for n=5", () => {
    const result = distributeAlongRange(5);
    expect(result).toEqual([-1, -0.5, 0, 0.5, 1]);
  });

  it("should return [-1, -0.33, 0.33, 1] for n=4", () => {
    const result = distributeAlongRange(4);
    expect(result).toEqual([-1, -0.33, 0.33, 1]);
  });

  it("should return [-1, -0.6, -0.2, 0.2, 0.6, 1] for n=6", () => {
    const result = distributeAlongRange(6);
    expect(result).toEqual([-1, -0.6, -0.2, 0.2, 0.6, 1]);
  });

  it("should return [0] for n=1", () => {
    const result = distributeAlongRange(1);
    expect(result).toEqual([0]);
  });

  it("should return [-1, 1] for n=2", () => {
    const result = distributeAlongRange(2);
    expect(result).toEqual([-1, 1]);
  });

  it("should return correct length array", () => {
    expect(distributeAlongRange(7).length).toBe(7);
    expect(distributeAlongRange(10).length).toBe(10);
  });

  it("should always start with -1 and end with 1 for n>1", () => {
    const result7 = distributeAlongRange(7);
    expect(result7[0]).toBe(-1);
    expect(result7[result7.length - 1]).toBe(1);

    const result10 = distributeAlongRange(10);
    expect(result10[0]).toBe(-1);
    expect(result10[result10.length - 1]).toBe(1);
  });

  it("should have evenly spaced intervals", () => {
    const result = distributeAlongRange(6);

    // Calculate intervals between consecutive numbers
    const intervals = [];
    for (let i = 1; i < result.length; i++) {
      intervals.push(result[i] - result[i - 1]);
    }

    // All intervals should be approximately equal
    const firstInterval = intervals[0];
    intervals.forEach((interval) => {
      expect(interval).toBeCloseTo(firstInterval, 10);
    });
  });

  it("should span the full range from -1 to 1", () => {
    const result = distributeAlongRange(4);
    const min = Math.min(...result);
    const max = Math.max(...result);

    expect(min).toBe(-1);
    expect(max).toBe(1);
  });

  it("should include 0 for odd values of n", () => {
    expect(distributeAlongRange(3)).toContain(0);
    expect(distributeAlongRange(5)).toContain(0);
    expect(distributeAlongRange(7)).toContain(0);
    expect(distributeAlongRange(9)).toContain(0);
  });

  it("should produce symmetric values around 0", () => {
    const result = distributeAlongRange(5);

    // For each value, there should be a corresponding negative value
    expect(result).toContain(-1);
    expect(result).toContain(1);
    expect(result).toContain(-0.5);
    expect(result).toContain(0.5);
    expect(result).toContain(0);
  });
});
