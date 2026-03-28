"use client";

import * as React from "react";
import { redirect, useRouter } from "next/navigation";

import { cn } from "@saasfly/ui";
import { Button } from "@saasfly/ui/button";

// Check if Clerk is configured
const isClerkConfigured = !!(
  process.env.NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY &&
  process.env.NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY !== "1"
);

type Dictionary = Record<string, string>;

interface UserAuthFormProps extends React.HTMLAttributes<HTMLDivElement> {
  lang: string;
  dict?: Dictionary;
  disabled?: boolean;
}

// Development login form when Clerk is not configured
function DevLoginForm({ lang }: { lang: string }) {
  const router = useRouter();
  
  const handleDevLogin = () => {
    // In dev mode, just redirect to dashboard
    router.push(`/${lang}/dashboard`);
  };

  return (
    <div className="flex flex-col gap-4 p-4 border rounded-lg bg-muted/50">
      <p className="text-sm text-muted-foreground text-center">
        Development Mode - Clerk not configured
      </p>
      <Button onClick={handleDevLogin}>
        Continue as Dev User
      </Button>
    </div>
  );
}

// Clerk auth form
function ClerkAuthForm({ lang, className, ...props }: UserAuthFormProps) {
  const { SignIn, useUser } = require("@clerk/nextjs");
  const { user } = useUser();
  
  if (user) {
    redirect(`/${lang}/dashboard`);
  }

  return (
    <div className={cn("grid gap-6", className)} {...props}>
      <SignIn withSignUp={false} fallbackRedirectUrl={`/${lang}/dashboard`} />
    </div>
  );
}

export function UserClerkAuthForm({
  className,
  lang,
  ...props
}: UserAuthFormProps) {
  if (!isClerkConfigured) {
    return (
      <div className={cn("grid gap-6", className)} {...props}>
        <DevLoginForm lang={lang} />
      </div>
    );
  }

  return <ClerkAuthForm lang={lang} className={className} {...props} />;
}
