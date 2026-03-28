// Check if Clerk is configured
const isClerkConfigured = !!(
  process.env.NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY &&
  process.env.NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY !== "1" &&
  process.env.CLERK_SECRET_KEY &&
  process.env.CLERK_SECRET_KEY !== "1"
);

const ADMIN_EMAIL = process.env.ADMIN_EMAIL;

export async function getSessionUser() {
  if (!isClerkConfigured) {
    // Return a mock user for development without Clerk
    return {
      id: "dev-user-id",
      name: "Development User",
      email: "dev@example.com",
      image: null,
      isAdmin: true,
    };
  }

  const { auth } = await import("@clerk/nextjs/server");
  const { sessionClaims } = await auth();
  
  if (ADMIN_EMAIL && sessionClaims?.user) {
    const adminEmails = ADMIN_EMAIL.split(",");
    if (sessionClaims.user.email) {
      sessionClaims.user.isAdmin = adminEmails.includes(sessionClaims.user.email);
    }
  }
  return sessionClaims?.user;
}
