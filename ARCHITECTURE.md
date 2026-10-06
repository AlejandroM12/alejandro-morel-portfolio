# Arquitectura

Etapa 1: esqueleto del monorepo. El sitio público vive en Next.js. NestJS, Prisma y PostgreSQL se agregan cuando el formulario de contacto necesite persistencia.

## Workspace

El nombre del repositorio y del paquete raíz es `personal-portfolio`. El directorio abierto en el editor puede seguir llamándose `rrhh-project` si el IDE tiene esa carpeta bloqueada. El nombre del producto no depende del nombre de la carpeta.

No había código previo que preservar. `C:\Users\axel_\Projects\portfolio` existe y está vacío; este esqueleto no lo usa.

## Estructura actual

```text
personal-portfolio/
├── apps/
│   └── web/                         # Next.js App Router
│       └── src/app/
│           ├── layout.tsx           # documento mínimo, lang="es"
│           ├── page.tsx             # ruta raíz exigida por el framework
│           └── globals.css          # Tailwind cargado, sin diseño
├── packages/
│   └── config/
│       ├── typescript/              # base.json y nextjs.json
│       ├── eslint/next.mjs          # preset de Next.js
│       └── prettier/index.mjs
├── package.json
├── pnpm-workspace.yaml
└── turbo.json
```

`src/app/layout.tsx` y `src/app/page.tsx` existen porque el App Router no compila sin una ruta raíz. No son páginas de producto. La ruta raíz renderiza un `main` vacío.

## Límites

| Pieza             | Responsabilidad en esta etapa                      |
| ----------------- | -------------------------------------------------- |
| `apps/web`        | Compilar y servir el documento raíz                |
| `packages/config` | TypeScript estricto, ESLint y Prettier compartidos |
| Raíz              | Workspaces, tareas de Turborepo y scripts          |

`packages/contracts` no forma parte de esta etapa. Aparece cuando la web y la API compartan el payload de contacto.

`packages/content` no forma parte de esta etapa. El posicionamiento vive en el contenido del sitio y en el seed de la API: una sola narrativa de full stack web, backend y mobile, con Applied AI en expansión. No hay un parámetro `profile` que cambie el oficio.

## Decisiones de toolchain

Versiones fijadas en los `package.json` y en `pnpm-lock.yaml`.

| Paquete      | Versión | Motivo                                                                                |
| ------------ | ------- | ------------------------------------------------------------------------------------- |
| Node.js      | 24.x    | Runtime local. Next.js acepta Node 20.9 o superior                                    |
| pnpm         | 11.1.3  | Gestor de workspaces                                                                  |
| Turborepo    | 2.11.7  | Tareas `dev`, `build`, `lint` y `typecheck`                                           |
| Next.js      | 16.3.8  | App Router vigente                                                                    |
| React        | 19.2.8  | Versión que fija `create-next-app` 16.3.8                                             |
| TypeScript   | 5.9.3   | Última 5.x. TypeScript 7.0 ya existe, y `typescript-eslint` 8.71 todavía exige `<6.1` |
| ESLint       | 9.39.5  | Última 9.x compatible con `eslint-plugin-react` del preset de Next.js                 |
| Tailwind CSS | 4.3.3   | Configuración en CSS, plugin `@tailwindcss/postcss`                                   |
| Prettier     | 3.9.9   | Formato compartido desde `packages/config`                                            |

TypeScript usa `strict` y `noUncheckedIndexedAccess` en `packages/config/typescript/base.json`. La app web extiende `nextjs.json`.

ESLint corre con `eslint-config-next` (core web vitals y TypeScript). ESLint 10 ya es la línea vigente y ESLint 9 está fuera de soporte, pero `eslint-plugin-react` 7.37.5, que trae el preset de Next.js, solo declara compatibilidad hasta ESLint 9. Con ESLint 10 el lint falla. Esta etapa se queda en 9.39.5 hasta que ese plugin publique soporte. Desde Next.js 16, `next build` no ejecuta el linter. El chequeo queda en `pnpm lint`.

pnpm 11 no ejecuta scripts de dependencias hasta que el repo los autoriza. `pnpm-workspace.yaml` permite el `postinstall` de `unrs-resolver`, el binding nativo que usa el resolver de imports de ESLint. El script elige el binario de la plataforma; no compila código del portfolio.

## Internacionalización, tema y fuentes

Implementados con el sistema visual:

- `next-intl`, español en `/` e inglés en `/en`
- `next-themes`, modo claro, oscuro y preferencia del sistema
- Newsreader para títulos, Geist para interfaz y texto, Geist Mono para metadatos

Los tokens viven en `apps/web/src/app/globals.css`. Los componentes están en `apps/web/src/components`. La revisión visual está en `/design-system` y no se indexa. Las secciones del portfolio siguen sin construirse.

## API

`apps/api` entra en la etapa de contacto, con NestJS, Prisma, PostgreSQL y Docker. Hasta entonces el sitio no depende de un backend.
