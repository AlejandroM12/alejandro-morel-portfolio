# personal-portfolio

Portfolio profesional de Alejandro Morel, Full Stack Software Engineer. Monorepo con pnpm y Turborepo. El sitio es bilingüe. La API NestJS administra el perfil y los proyectos. El sitio todavía lee el contenido estático.

## Requisitos

- Node.js 20.9 o superior. El entorno de desarrollo usado para armar el repo es Node.js 24.
- pnpm 11.1.3

## Instalación

Desde la raíz del repositorio:

```bash
pnpm install
```

## Scripts

| Comando             | Qué hace                                   |
| ------------------- | ------------------------------------------ |
| `pnpm dev`          | Levanta `apps/web` en modo desarrollo      |
| `pnpm build`        | Compila las apps del monorepo              |
| `pnpm start`        | Sirve el build de producción               |
| `pnpm lint`         | Ejecuta ESLint                             |
| `pnpm typecheck`    | Ejecuta el chequeo de TypeScript           |
| `pnpm format`       | Formatea el repositorio con Prettier       |
| `pnpm format:check` | Comprueba el formato sin escribir archivos |

La app web queda en [http://localhost:3000](http://localhost:3000).

## Documentación

- [PRODUCT.md](PRODUCT.md) describe el producto y los perfiles.
- [ARCHITECTURE.md](ARCHITECTURE.md) describe la estructura y las decisiones técnicas.
- [ROADMAP.md](ROADMAP.md) lista las etapas y su estado.

## Estructura

```text
apps/web            Next.js, TypeScript y Tailwind CSS. Español e inglés.
apps/api            NestJS, Prisma y PostgreSQL
packages/config     TypeScript, ESLint y Prettier compartidos
```
