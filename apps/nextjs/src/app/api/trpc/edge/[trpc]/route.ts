import type {NextRequest} from "next/server";
import {fetchRequestHandler} from "@trpc/server/adapters/fetch";

import {createTRPCContext} from "@saasfly/api";
import {edgeRouter} from "@saasfly/api/edge";

// Check if Clerk is configured
const isClerkConfigured = !!(
  process.env.NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY &&
  process.env.NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY !== "1" &&
  process.env.CLERK_SECRET_KEY &&
  process.env.CLERK_SECRET_KEY !== "1"
);

// export const runtime = "edge";
const createContext = async (req: NextRequest) => {
    let authData = { userId: "dev-user-id" as string | null };
    
    if (isClerkConfigured) {
      const { getAuth } = await import("@clerk/nextjs/server");
      authData = getAuth(req);
    }
    
    return createTRPCContext({
        headers: req.headers,
        auth: authData,
    });
};

const handler = (req: NextRequest) =>
    fetchRequestHandler({
        endpoint: "/api/trpc/edge",
        router: edgeRouter,
        req: req,
        createContext: () => createContext(req),
        onError: ({error, path}) => {
            console.log("Error in tRPC handler (edge) on path", path);
            console.error(error);
        },
    });

export {handler as GET, handler as POST};
