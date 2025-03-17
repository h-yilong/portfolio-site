"use client";
import { useEffect } from "react";

export default function Error({ error, reset }: { error: Error & { digest?: string }; reset: () => void }) {
  useEffect(() => {
    // Optionally log the error to an error reporting service
    console.error(error);
  }, [error]);

  return (
    <main className="mt-32 flex h-full flex-col items-center justify-center">
      <h2 className="text-center">Something went wrong! {error.message}</h2>
      <button
        className="mt-4 rounded-md bg-blue-500 px-4 py-2 text-sm text-white transition-colors hover:bg-blue-400"
        onClick={() => {
          // todo: report error
          console.trace(`%c Page crash error `, "padding:2px;background:#e55;color:#fff", error);
          reset();
        }}
      >
        Try again
      </button>
    </main>
  );
}
