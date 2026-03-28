"use client";

import { ClerkProvider } from "@clerk/nextjs";
import { ReactNode } from "react";

// Check if Clerk is configured at build time
const isClerkConfigured = !!(
  process.env.NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY &&
  process.env.NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY.length > 10
);

export function AuthProvider({ children }: { children: ReactNode }) {
  if (!isClerkConfigured) {
    // In development without Clerk, just render children directly
    return <>{children}</>;
  }

  return <ClerkProvider>{children}</ClerkProvider>;
}
