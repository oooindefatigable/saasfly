"use client";

import React, { useState } from "react";
import Image from "next/image";
import { useRouter } from "next/navigation";

import { Button } from "@saasfly/ui/button";
import * as Icons from "@saasfly/ui/icons";

import { Modal } from "~/components/modal";
import { siteConfig } from "~/config/site";
import { useSigninModal } from "~/hooks/use-signin-modal";

// Check if Clerk is configured
const isClerkConfigured = !!(
  process.env.NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY &&
  process.env.NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY !== "1"
);

export const SignInClerkModal = ({ dict }: { dict: Record<string, string> }) => {
  const signInModal = useSigninModal();
  const [signInClicked, setSignInClicked] = useState(false);
  const router = useRouter();
  
  // Conditionally use Clerk
  let signIn: any = null;
  if (isClerkConfigured) {
    try {
      const { useSignIn } = require("@clerk/nextjs");
      const result = useSignIn();
      signIn = result.signIn;
    } catch (e) {
      // Clerk not available
    }
  }

  // Dev mode handler
  const handleDevSignIn = () => {
    setSignInClicked(true);
    setTimeout(() => {
      router.push("/dashboard");
      signInModal.onClose();
    }, 500);
  };

  if (!signIn && !isClerkConfigured) {
    // Dev mode - show simple button
    return (
      <Modal showModal={signInModal.isOpen} setShowModal={signInModal.onClose}>
        <div className="w-full">
          <div className="flex flex-col items-center justify-center space-y-3 border-b border-neutral-200 dark:border-neutral-800 bg-background px-4 py-6 pt-8 text-center md:px-16">
            <a href={siteConfig.url}>
              <Image
                src="/images/avatars/saasfly-logo.svg"
                className="mx-auto"
                width="64"
                height="64"
                alt=""
              />
            </a>
            <h3 className="font-urban text-2xl font-bold">{dict.signup}</h3>
            <p className="text-sm text-gray-500 dark:text-zinc-400">Development Mode</p>
          </div>
          <div className="flex flex-col space-y-4 px-4 py-8 md:px-16">
            <Button
              variant="default"
              disabled={signInClicked}
              onClick={handleDevSignIn}
            >
              {signInClicked ? (
                <Icons.Spinner className="mr-2 h-4 w-4 animate-spin" />
              ) : (
                <Icons.User className="mr-2 h-4 w-4" />
              )}{" "}
              Continue as Dev User
            </Button>
          </div>
        </div>
      </Modal>
    );
  }

  if (!signIn) {
    return null;
  }

  const signInWith = (strategy: string) => {
    const protocol = window.location.protocol
    const host = window.location.host
    return signIn
      .authenticateWithRedirect({
        strategy,
        redirectUrl: '/sign-in/sso-callback',
        redirectUrlComplete: `${protocol}//${host}/dashboard`,
      })
      .then((res) => {
        console.log(res)
      })
      .catch((err: any) => {
        // See https://clerk.com/docs/custom-flows/error-handling
        // for more info on error handling
        console.log(err.errors)
        console.error(err, null, 2)
      })
  }

  return (
    <Modal showModal={signInModal.isOpen} setShowModal={signInModal.onClose}>
      <div className="w-full">
        <div className="flex flex-col items-center justify-center space-y-3 border-b border-neutral-200 dark:border-neutral-800 bg-background px-4 py-6 pt-8 text-center md:px-16">
          <a href={siteConfig.url}>
            <Image
              src="/images/avatars/saasfly-logo.svg"
              className="mx-auto"
              width="64"
              height="64"
              alt=""
            />
          </a>
          <h3 className="font-urban text-2xl font-bold">{dict.signup}</h3>
          <p className="text-sm text-gray-500 dark:text-zinc-400">{dict.privacy}</p>
        </div>

        <div className="flex flex-col space-y-4 px-4 py-8 md:px-16">
          <Button
            variant="default"
            disabled={signInClicked}
            onClick={() => {
              setSignInClicked(true);
              void signInWith('oauth_github')
                .then(() => {
                  setTimeout(() => {
                    signInModal.onClose();
                  }, 1000)
                })
            }}
          >
            {signInClicked ? (
              <Icons.Spinner className="mr-2 h-4 w-4 animate-spin" />
            ) : (
              <Icons.GitHub className="mr-2 h-4 w-4" />
            )}{" "}
            {dict.signup_github}
          </Button>
        </div>
      </div>
    </Modal>
  );
};
