"use client";

import { ReactNode } from "react";
import dynamic from "next/dynamic";

// Check if Clerk is configured
const isClerkConfigured = !!(
  process.env.NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY &&
  process.env.NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY !== "1"
);

// Dynamically import ClerkProvider only when configured
const ClerkProviderWrapper = dynamic(
  () => import("@clerk/nextjs").then((mod) => mod.ClerkProvider),
  { 
    ssr: false,
    loading: () => null,
  }
);

export function AuthProvider({ children }: { children: ReactNode }) {
  if (!isClerkConfigured) {
    // In development without Clerk, just render children directly
    return <>{children}</>;
  }

  return <ClerkProviderWrapper>{children}</ClerkProviderWrapper>;
}
