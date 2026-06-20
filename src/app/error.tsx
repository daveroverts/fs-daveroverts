"use client";

import { useEffect } from "react";
import Layout from "@/components/Layout";

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    console.error(error);
  }, [error]);

  return (
    <Layout title="Something went wrong">
      <p className="py-3">An unexpected error occurred.</p>
      <button
        onClick={reset}
        className="px-4 py-2 rounded-lg border-2 hover:bg-gray-50 dark:hover:bg-gray-800"
      >
        Try again
      </button>
    </Layout>
  );
}
