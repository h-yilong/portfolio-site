const TECHS = [
  {
    title: "Main TechStack",
    items: ["Next.js", "React", "PostgreSQL", "Prisma ORM", "React Hook Form", "Zod"],
  },
  {
    title: "UI & Design",
    items: ["Figma(to be released)", "TailwindCSS", "Shadcn(Radix)", "Three.js"],
  },
  {
    title: "Quality Assurance",
    items: ["TypeScript", "Vitest", "Cypress", "Eslint", "Prettier", "Husky(Git Hooks)"],
  },
  {
    title: "DevOps",
    items: ["Git", "GitHub Actions", "Vercel"],
  },
];

export default function Site() {
  return (
    <section className="max-width my-8 font-medium text-slate-200" id="site">
      <div className="p-2">
        <div className="relative">
          <svg className="absolute top-16 left-1/6 w-2/3 opacity-25" viewBox="0 0 1770 198" preserveAspectRatio="none">
            <defs>
              <linearGradient
                id="linear-gradient"
                x1="1.68"
                y1="39.51"
                x2="477.01"
                y2="39.51"
                gradientUnits="userSpaceOnUse"
              >
                <stop offset="0" stopColor="#3f76ff" />
                <stop offset="1" stopColor="#cf27e9" />
              </linearGradient>
            </defs>
            <path
              stroke="url(#linear-gradient)"
              fill="none"
              strokeWidth="3px"
              strokeDasharray="5000px"
              className="draw-line"
              d="M1 121C22.2555 125.831 38.1827 141.224 60.3333 144.778C86.9413 149.046 115.913 138.373 139 126.222C183.185 102.967 225.056 75.2475 269 51.4444C287.803 41.2594 322.06 28.3653 338.778 48.3333C357.202 70.3399 346.595 99.2786 330 118.444C323.617 125.817 316.62 133.363 308.333 138.667C299.538 144.296 310.363 120.711 311 119.222C324.632 87.3462 359.731 58.8025 395.444 58C435.973 57.0892 441.809 97.9021 437.889 129C435.878 144.953 443.593 134.344 449.667 126.111C468.21 100.979 486.975 75.9876 509.667 54.3333C532.234 32.7971 565.748 6.45343 599.556 14.4444C643.628 24.8614 613.092 99.3831 597.889 123.667C590.618 135.28 572.919 148.393 583.111 124.222C602.214 78.9205 630.983 40.6786 674.111 15.3333C695.592 2.70944 729.074 -10.7168 745 17.4444C764.124 51.2611 752.606 100.751 738.778 134.333C733.629 146.838 726.023 159.873 716.778 169.889C713.467 173.475 714.656 170.425 715.889 167.889C720.492 158.422 726.362 149.521 731.667 140.444C742.219 122.389 752.837 104.632 765.778 88.1111C789.395 57.962 820.652 22.2526 859.222 11.6666C881.849 5.45652 912.181 6.36074 925.444 29.2222C935.559 46.656 932.402 73.3337 929.667 92.1111C926.691 112.533 918.691 130.671 907.889 148.111C898.868 162.674 882.123 193.437 862.889 196.889C852.862 198.689 859.163 177.56 859.778 174.889C866.701 144.799 882.918 117.633 900.778 92.7777C915.117 72.8214 932.56 55.8815 952.778 41.8888C985.708 19.0984 1037.47 -10.4418 1079 4.77774C1130.47 23.6391 1108.4 107.539 1095.22 144.111C1090.57 157.022 1083.97 168.295 1074.33 178.111C1072.01 180.477 1062.32 191.604 1061.44 182.111C1057.52 139.613 1089.64 90.3545 1115.89 60.4444C1135.54 38.0545 1161.75 15.4749 1190.89 6.99996C1226.52 -3.36081 1259.88 13.697 1272.78 48.1111C1283.14 75.7729 1286.83 105.783 1269 131C1267.47 133.169 1224.51 182.019 1222.33 167.889C1220.49 155.899 1227.51 137.452 1231.89 126.556C1241.75 102.029 1258.88 77.3959 1278.67 59.8888C1297.17 43.5125 1321.16 32.3399 1344.67 25.3333C1373.22 16.8233 1394.36 29.2511 1413.44 51C1434.94 75.4993 1431.6 117.459 1419.11 145.556C1410.97 163.876 1410.35 152.19 1414 138C1428 83.483 1478.39 29.2523 1538.78 31C1590.63 32.5004 1609.27 92.0133 1645.56 118.556C1683.35 146.199 1727.06 138.587 1769 129"
            />
          </svg>
          <article className="mx-auto my-4 max-w-2xl space-y-3 text-center leading-8">
            <p>
              <span className="text-xl font-bold">The aim</span> of this site is to provide a overview of my skills and
              understanding regarding web application development. This is a work in progress and will be updated as
              more content and explanations are added.
            </p>
            <p>
              In the meantime, it will provide beginners and junior developers some insight more than just coding, but
              also other aspects of web application development, e.g. design, testing, deployment, etc.
            </p>
          </article>
          <div className="grid grid-cols-4 gap-6">
            {TECHS.map((tech) => (
              <article
                className="mt-8 cursor-default rounded-xl border border-white/10 bg-[var(--about-bg)] p-4 text-center shadow-indigo-500/5 transition-all duration-200 hover:shadow-xl"
                key={tech.title}
              >
                <h3 className="my-2 bg-linear-to-r from-indigo-500 to-violet-600 bg-clip-text text-lg font-bold tracking-wide text-transparent">
                  {tech.title}
                </h3>
                <ul className="space-y-1.5 font-medium">
                  {tech.items.map((item) => (
                    <li key={item}>{item}</li>
                  ))}
                </ul>
              </article>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
