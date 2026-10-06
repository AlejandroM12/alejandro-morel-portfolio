-- Replace the project category enum and remap existing concepts.
CREATE TYPE "ProjectCategory_new" AS ENUM ('web', 'backend', 'mobile', 'applied_ai');

CREATE FUNCTION "remap_project_category"(value text)
RETURNS "ProjectCategory_new"
LANGUAGE sql
IMMUTABLE
AS $$
  SELECT CASE value
    WHEN 'fullstack' THEN 'web'::"ProjectCategory_new"
    WHEN 'frontend' THEN 'web'::"ProjectCategory_new"
    WHEN 'ai' THEN 'applied_ai'::"ProjectCategory_new"
    WHEN 'automation' THEN 'applied_ai'::"ProjectCategory_new"
    WHEN 'backend' THEN 'backend'::"ProjectCategory_new"
    WHEN 'web' THEN 'web'::"ProjectCategory_new"
    WHEN 'mobile' THEN 'mobile'::"ProjectCategory_new"
    WHEN 'applied_ai' THEN 'applied_ai'::"ProjectCategory_new"
  END;
$$;

CREATE FUNCTION "remap_project_categories"(categories "ProjectCategory"[])
RETURNS "ProjectCategory_new"[]
LANGUAGE sql
IMMUTABLE
AS $$
  SELECT ARRAY(
    SELECT "remap_project_category"(value::text)
    FROM unnest(categories) AS value
    WHERE "remap_project_category"(value::text) IS NOT NULL
  );
$$;

ALTER TABLE "projects"
  ALTER COLUMN "categories" TYPE "ProjectCategory_new"[]
  USING "remap_project_categories"("categories");

DROP FUNCTION "remap_project_categories"("ProjectCategory"[]);
DROP FUNCTION "remap_project_category"(text);
DROP TYPE "ProjectCategory";

ALTER TYPE "ProjectCategory_new" RENAME TO "ProjectCategory";

-- Profile technologies follow the public order: core, React Native, engineering, then Applied AI.
UPDATE "profiles"
SET
  "technologies" = '[
    {"es":"React","en":"React"},
    {"es":"Next.js","en":"Next.js"},
    {"es":"TypeScript","en":"TypeScript"},
    {"es":"NestJS","en":"NestJS"},
    {"es":"React Native","en":"React Native"},
    {"es":"Testing","en":"Testing"},
    {"es":"Arquitectura","en":"Architecture"},
    {"es":"Performance","en":"Performance"},
    {"es":"Observabilidad","en":"Observability"},
    {"es":"IA aplicada","en":"Applied AI"},
    {"es":"LLMs","en":"LLMs"},
    {"es":"RAG","en":"RAG"},
    {"es":"Agentes de IA","en":"AI Agents"},
    {"es":"Automatización","en":"Automation"}
  ]'::jsonb,
  "updatedAt" = CURRENT_TIMESTAMP
WHERE "slug" = 'alejandro-morel';

-- Skill groups: only rewrite a database that still has the previous taxonomy.
DO $$
BEGIN
  IF EXISTS (
    SELECT 1 FROM "skill_groups"
    WHERE "slug" IN ('frontend', 'ai', 'infrastructure')
  ) THEN
    DELETE FROM "skill_groups"
    WHERE "slug" IN ('frontend', 'ai', 'infrastructure');

    UPDATE "skill_groups"
    SET
      "label" = '{"es":"Backend","en":"Backend"}'::jsonb,
      "items" = '[
        {"es":"NestJS","en":"NestJS"},
        {"es":"BFF","en":"BFF"},
        {"es":"APIs","en":"APIs"}
      ]'::jsonb,
      "order" = 2,
      "updatedAt" = CURRENT_TIMESTAMP
    WHERE "slug" = 'backend';

    INSERT INTO "skill_groups" ("slug", "label", "items", "order", "updatedAt")
    VALUES
      (
        'web',
        '{"es":"Web","en":"Web"}'::jsonb,
        '[
          {"es":"React","en":"React"},
          {"es":"Next.js","en":"Next.js"},
          {"es":"TypeScript","en":"TypeScript"}
        ]'::jsonb,
        1,
        CURRENT_TIMESTAMP
      ),
      (
        'mobile',
        '{"es":"Mobile","en":"Mobile"}'::jsonb,
        '[{"es":"React Native","en":"React Native"}]'::jsonb,
        3,
        CURRENT_TIMESTAMP
      ),
      (
        'engineering',
        '{"es":"Ingeniería","en":"Engineering"}'::jsonb,
        '[
          {"es":"Testing","en":"Testing"},
          {"es":"Arquitectura","en":"Architecture"},
          {"es":"Performance","en":"Performance"},
          {"es":"Observabilidad","en":"Observability"}
        ]'::jsonb,
        4,
        CURRENT_TIMESTAMP
      ),
      (
        'expanding',
        '{"es":"En expansión","en":"Currently expanding"}'::jsonb,
        '[
          {"es":"IA aplicada","en":"Applied AI"},
          {"es":"LLMs","en":"LLMs"},
          {"es":"RAG","en":"RAG"},
          {"es":"Agentes de IA","en":"AI Agents"},
          {"es":"Automatización","en":"Automation"}
        ]'::jsonb,
        5,
        CURRENT_TIMESTAMP
      );
  END IF;
END $$;
