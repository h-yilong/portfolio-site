This is a [Next.js](https://nextjs.org) project bootstrapped with [`create-next-app`](https://nextjs.org/docs/app/api-reference/cli/create-next-app).

## Table of Content

- Objective
- Design
- Tech Stack
- 3D implementation
- DX
  - prettier-plugin-tailwindcss
- User experience
- QA
  - linting
  - prettier
  - spellCheck
  - [husky](https://typicode.github.io/husky/)
- Testing
  - unit
  - component
  - e2e
- User Experience
- CI/CD
  - github actions
- Performance
- Others
- Todo list
  - Data structure and algorithm problems and notes
  - system design playground and articles

## Getting Started

First, run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

You can start editing the page by modifying `app/page.tsx`. The page auto-updates as you edit the file.

This project uses [`next/font`](https://nextjs.org/docs/app/building-your-application/optimizing/fonts) to automatically optimize and load [Geist](https://vercel.com/font), a new font family for Vercel.

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js) - your feedback and contributions are welcome!

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/app/building-your-application/deploying) for more details.

---

## TODO

- Protect `master` branch
  - pushing directly on `master` branch shall be forbidden
- Merging of Pull request shall trigger deployment
- UI responsiveness test
- Using `release` branch for releasing
- pre-commit hook to run tests(unit, component and e2e)
  - commit should fail if linting or test fails
- proper input attributes for better user experience
- frontend form validation
  - and test
    - unit(validation rules)
    - component test
    - e2e test
- Modal component
  - refs:
    - <https://github.com/vercel/nextgram>
    - <https://nextjs.org/docs/app/building-your-application/routing/parallel-routes#modals>
- i18n
- Support dark/light themes
- Sentry
- GA

## References

- <https://docs.cypress.io/faq/questions/using-cypress-faq#Can-I-test-Nextjs-sites-using-Cypress>
