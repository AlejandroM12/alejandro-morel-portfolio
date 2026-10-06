# Roadmap

El contenido profesional se carga con datos reales, cuando existan. Roles, períodos, email, LinkedIn y CV siguen vacíos hasta que estén.

| Etapa | Alcance | Estado |
| ----- | ------- | ------ |
| 1 | Monorepo: pnpm, Turborepo, Next.js, Tailwind, TypeScript, ESLint y Prettier | Lista |
| 2 | Shell visual: tema claro y oscuro, español e inglés, tipografía, layout y navegación | Lista |
| 3 | Perfil de Full Stack Software Engineer en web, backend y mobile, con Applied AI en expansión. El contenido está en `apps/web/src/content` y en el seed de la API | Lista |
| 4 | Home: experiencia, ingeniería, conceptos, conocimiento, IA aplicada y contacto | Lista |
| 5 | Catálogo `/work` y plantilla de caso de estudio. Cada ficha muestra solo las secciones que tienen datos | Lista |
| 6 | API NestJS, Prisma, PostgreSQL y Docker: perfil, experiencia, habilidades, proyectos, contacto y health. El sitio sigue leyendo el contenido estático | Lista |
| 7 | Formulario de contacto conectado a la API | Pendiente |

## Hecho en el shell

- `next-intl`, con español por defecto e inglés completo
- `next-themes`
- Newsreader, Geist y Geist Mono
- Header, footer y navegación hacia experiencia, ingeniería, experimentos, conocimiento y contacto

## Pendiente

- Formulario de contacto contra la API
- Pasar la lectura del sitio, de a un módulo, del contenido estático a la API

No hay `packages/content` ni `packages/contracts`. El contenido público vive en la app web y se repite en el seed.
