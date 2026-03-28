-- Create enum types (safe, only if not exists)
DO $$ BEGIN
  CREATE TYPE "SubscriptionPlan" AS ENUM ('FREE', 'PRO', 'BUSINESS');
EXCEPTION
  WHEN duplicate_object THEN null;
END $$;

DO $$ BEGIN
  CREATE TYPE "Status" AS ENUM ('PENDING', 'CREATING', 'INITING', 'RUNNING', 'STOPPED', 'DELETED');
EXCEPTION
  WHEN duplicate_object THEN null;
END $$;

-- Create User table
CREATE TABLE IF NOT EXISTS "User" (
  "id" TEXT PRIMARY KEY DEFAULT gen_random_uuid()::text,
  "name" TEXT,
  "email" TEXT UNIQUE,
  "emailVerified" TIMESTAMP,
  "image" TEXT
);

-- Create Account table
CREATE TABLE IF NOT EXISTS "Account" (
  "id" TEXT PRIMARY KEY DEFAULT gen_random_uuid()::text,
  "userId" TEXT NOT NULL,
  "type" TEXT NOT NULL,
  "provider" TEXT NOT NULL,
  "providerAccountId" TEXT NOT NULL,
  "refresh_token" TEXT,
  "access_token" TEXT,
  "expires_at" INTEGER,
  "token_type" TEXT,
  "scope" TEXT,
  "id_token" TEXT,
  "session_state" TEXT
);

-- Create Session table
CREATE TABLE IF NOT EXISTS "Session" (
  "id" TEXT PRIMARY KEY DEFAULT gen_random_uuid()::text,
  "sessionToken" TEXT UNIQUE NOT NULL,
  "userId" TEXT NOT NULL,
  "expires" TIMESTAMP NOT NULL
);

-- Create VerificationToken table
CREATE TABLE IF NOT EXISTS "VerificationToken" (
  "identifier" TEXT NOT NULL,
  "token" TEXT UNIQUE NOT NULL,
  "expires" TIMESTAMP NOT NULL
);

-- Create Customer table
CREATE TABLE IF NOT EXISTS "Customer" (
  "id" SERIAL PRIMARY KEY,
  "authUserId" TEXT NOT NULL,
  "name" TEXT,
  "plan" "SubscriptionPlan",
  "stripeCustomerId" TEXT UNIQUE,
  "stripeSubscriptionId" TEXT UNIQUE,
  "stripePriceId" TEXT,
  "stripeCurrentPeriodEnd" TIMESTAMP,
  "createdAt" TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  "updatedAt" TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Create K8sClusterConfig table
CREATE TABLE IF NOT EXISTS "K8sClusterConfig" (
  "id" SERIAL PRIMARY KEY,
  "name" TEXT NOT NULL,
  "location" TEXT NOT NULL,
  "authUserId" TEXT NOT NULL,
  "plan" "SubscriptionPlan" DEFAULT 'FREE',
  "network" TEXT,
  "createdAt" TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  "updatedAt" TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  "status" "Status" DEFAULT 'PENDING',
  "delete" BOOLEAN DEFAULT FALSE
);

-- Create indexes (safe, will ignore if exists)
CREATE INDEX IF NOT EXISTS "Customer_authUserId_idx" ON "Customer"("authUserId");
CREATE INDEX IF NOT EXISTS "K8sClusterConfig_authUserId_idx" ON "K8sClusterConfig"("authUserId");

-- Add unique constraint if not exists
DO $$ BEGIN
  ALTER TABLE "Account" ADD CONSTRAINT "Account_provider_providerAccountId_key" UNIQUE ("provider", "providerAccountId");
EXCEPTION
  WHEN duplicate_object THEN null;
END $$;

DO $$ BEGIN
  ALTER TABLE "VerificationToken" ADD CONSTRAINT "VerificationToken_identifier_token_key" UNIQUE ("identifier", "token");
EXCEPTION
  WHEN duplicate_object THEN null;
END $$;
