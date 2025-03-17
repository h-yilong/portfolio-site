"use client";

import { createContext, type ReactNode } from "react";

export const TestContext = createContext({});

export default function TestProvider({ children }: { children: ReactNode }) {
  return <TestContext.Provider value="dark">{children}</TestContext.Provider>;
}
