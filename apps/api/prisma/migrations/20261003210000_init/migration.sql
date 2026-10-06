-- CreateSchema
CREATE SCHEMA IF NOT EXISTS "public";

-- CreateEnum
CREATE TYPE "ProjectStatus" AS ENUM ('concept', 'in_progress', 'shipped');

-- CreateEnum
CREATE TYPE "ProjectCategory" AS ENUM ('fullstack', 'ai', 'backend', 'frontend', 'automation');

-- CreateTable
CREATE TABLE "profiles" (
    "slug" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "jobTitle" JSONB NOT NULL,
    "technologies" JSONB NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "profiles_pkey" PRIMARY KEY ("slug")
);

-- CreateTable
CREATE TABLE "contacts" (
    "id" TEXT NOT NULL DEFAULT 'default',
    "email" TEXT NOT NULL DEFAULT '',
    "linkedin" TEXT NOT NULL DEFAULT '',
    "cvUrl" TEXT NOT NULL DEFAULT '',
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "contacts_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "experiences" (
    "slug" TEXT NOT NULL,
    "organization" TEXT NOT NULL,
    "role" JSONB NOT NULL,
    "period" TEXT NOT NULL DEFAULT '',
    "order" INTEGER NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "experiences_pkey" PRIMARY KEY ("slug")
);

-- CreateTable
CREATE TABLE "skill_groups" (
    "slug" TEXT NOT NULL,
    "label" JSONB NOT NULL,
    "items" JSONB NOT NULL,
    "order" INTEGER NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "skill_groups_pkey" PRIMARY KEY ("slug")
);

-- CreateTable
CREATE TABLE "projects" (
    "slug" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "status" "ProjectStatus" NOT NULL,
    "featured" BOOLEAN NOT NULL DEFAULT false,
    "order" INTEGER NOT NULL,
    "categories" "ProjectCategory"[],
    "technologies" TEXT[],
    "languages" TEXT[],
    "summary" JSONB NOT NULL,
    "overview" JSONB NOT NULL,
    "problem" JSONB NOT NULL,
    "solution" JSONB NOT NULL,
    "features" JSONB NOT NULL,
    "architecture" JSONB NOT NULL,
    "decisions" JSONB NOT NULL,
    "screenshots" JSONB NOT NULL,
    "demoUrl" TEXT NOT NULL DEFAULT '',
    "repositoryUrl" TEXT NOT NULL DEFAULT '',
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "projects_pkey" PRIMARY KEY ("slug")
);
