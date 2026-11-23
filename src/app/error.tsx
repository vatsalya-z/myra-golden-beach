"use client";

import { Button } from "@/components/common/Button";
import { useEffect } from "react";

export default function ErrorPage({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    console.error("[Application error]", error);
  }, [error]);

  return (
    <div className="min-h-screen bg-[#FAF7F0] flex items-center justify-center px-4">
      <div className="text-center max-w-lg">
        <div className="font-playfair text-6xl font-bold text-[#C8A45D] mb-4">
          Oops
        </div>
        <h2 className="font-playfair text-2xl font-bold text-[#123B2A] mb-4">
          Something Went Wrong
        </h2>
        <p className="text-[#74766F] mb-8 leading-relaxed">
          An unexpected error occurred. Please try again or contact us
          directly if the problem persists.
        </p>
        <div className="flex flex-wrap justify-center gap-4">
          <Button onClick={reset} variant="primary" size="lg">
            Try Again
          </Button>
          <Button href="/" variant="outline" size="lg">
            Return Home
          </Button>
        </div>
      </div>
    </div>
  );
}
