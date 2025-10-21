import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

/**
 * Generates an array of N numbers evenly distributed across the range [-1, 1].
 *
 * The function divides the interval [-1, 1] into (N-1) equal segments and places
 * a number at each division point, ensuring the first number is -1 and the last is 1.
 * All values are rounded to 2 decimal places for precision.
 *
 * @param n - The number of values to generate (must be a positive integer)
 * @returns An array of N evenly spaced numbers from -1 to 1, rounded to 2 decimals
 *
 * @example
 * distributeAlongRange(3) // returns [-1, 0, 1]
 * distributeAlongRange(4) // returns [-1, -0.33, 0.33, 1]
 * distributeAlongRange(5) // returns [-1, -0.5, 0, 0.5, 1]
 * distributeAlongRange(6) // returns [-1, -0.6, -0.2, 0.2, 0.6, 1]
 * distributeAlongRange(1) // returns [0]
 */
export function distributeAlongRange(n: number): number[] {
  // Handle edge case: if only one number is requested, return the midpoint
  if (n === 1) {
    return [0];
  }

  // Calculate the step size between consecutive numbers
  // The range spans 2 units (from -1 to 1), divided by (n-1) intervals
  const step = 2 / (n - 1);

  // Generate the array by computing each position and round to 2 decimal places
  return Array.from({ length: n }, (_, i) => {
    const value = -1 + i * step;
    return Math.round(value * 100) / 100;
  });
}
