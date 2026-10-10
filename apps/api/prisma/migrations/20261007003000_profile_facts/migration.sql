-- Periods and summaries are localized. Existing periods were empty strings.
ALTER TABLE "experiences" ALTER COLUMN "period" DROP DEFAULT;

ALTER TABLE "experiences"
  ALTER COLUMN "period" TYPE JSONB
  USING (
    CASE
      WHEN "period" IS NULL OR "period" = '' THEN '{"es":"","en":""}'::jsonb
      ELSE jsonb_build_object('es', "period", 'en', "period")
    END
  );

ALTER TABLE "experiences"
  ADD COLUMN "summary" JSONB NOT NULL DEFAULT '{"es":"","en":""}';

ALTER TABLE "experiences" ALTER COLUMN "summary" DROP DEFAULT;

ALTER TABLE "contacts" ADD COLUMN "github" TEXT NOT NULL DEFAULT '';

CREATE TABLE "education" (
    "slug" TEXT NOT NULL,
    "institution" TEXT NOT NULL,
    "credential" JSONB NOT NULL,
    "period" JSONB NOT NULL,
    "order" INTEGER NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "education_pkey" PRIMARY KEY ("slug")
);
