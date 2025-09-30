"use client";

import { Fragment, useEffect } from "react";

const BITMAP = [
  [0, 1, 1, 0, 0, 0, 1, 1, 0],
  [1, 1, 1, 1, 0, 1, 1, 1, 1],
  [1, 1, 1, 1, 1, 1, 1, 1, 1],
  [0, 1, 1, 1, 1, 1, 1, 1, 0],
  [0, 0, 1, 1, 1, 1, 1, 0, 0],
  [0, 0, 0, 1, 1, 1, 0, 0, 0],
  [0, 0, 0, 0, 1, 0, 0, 0, 0],
];

// const pixelCoordinates: [number, number][] = [];
// for (let i = 0; i < BITMAP.length; i++) {
//   for (let j = 0; j < BITMAP[i].length; j++) {
//     if (BITMAP[i][j] === 1) {
//       pixelCoordinates.push([i, j]);
//     }
//   }
// }

// // Shuffle the coordinates array
// const shuffledCoordinates = [...pixelCoordinates].sort(() => Math.random() - 0.5);

const shuffledCoordinates = [
  [3, 5],
  [4, 4],
  [0, 6],
  [4, 2],
  [1, 2],
  [0, 2],
  [1, 8],
  [2, 0],
  [3, 2],
  [2, 5],
  [2, 3],
  [1, 1],
  [2, 7],
  [3, 6],
  [4, 5],
  [1, 6],
  [4, 3],
  [3, 7],
  [5, 5],
  [1, 5],
  [0, 7],
  [2, 6],
  [3, 1],
  [6, 4],
  [3, 4],
  [0, 1],
  [1, 3],
  [5, 3],
  [2, 1],
  [2, 8],
  [1, 0],
  [1, 7],
  [4, 6],
  [2, 2],
  [2, 4],
  [5, 4],
  [3, 3],
];

export default function PixelHeart() {
  useEffect(() => {
    const animatePixels = async () => {
      // Collect all coordinates where pixel value is 1
      await new Promise((resolve) => setTimeout(resolve, 1_000));

      // Animate each pixel in random order
      for (const [i, j] of shuffledCoordinates) {
        document.querySelector(`#pixel-heart .dot-${i}${j}`)?.setAttribute("data-show", "true");
        await new Promise((resolve) => setTimeout(resolve, 15));
      }
    };

    animatePixels();
  }, []);

  return (
    <div id="pixel-heart" className="grid h-fit w-fit grid-cols-9 gap-1">
      <span className="sr-only">Love</span>
      {BITMAP.map((row, i) => (
        <Fragment key={i}>
          {row.map((_, j) => {
            // const pixelKey = `${i}-${j}`;
            // const isVisible = visiblePixels.has(pixelKey);

            return (
              <div
                key={j}
                // data-show={isVisible ? "true" : "false"}
                data-show="false"
                className={`dot-${i}${j} aspect-square w-[0.3vw] bg-red-200 opacity-0 transition-opacity duration-100 ease-in-out data-[show=true]:opacity-100 data-[show=true]:shadow-[0_0_7px_0_#fff]`}
              />
            );
          })}
        </Fragment>
      ))}
    </div>
  );
}
