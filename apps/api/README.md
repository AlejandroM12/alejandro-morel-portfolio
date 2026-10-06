# Portfolio API

API de NestJS para administrar el perfil, la experiencia, las habilidades, los proyectos y los canales de contacto. El sitio en `apps/web` sigue leyendo `apps/web/src/content` y los mensajes de `next-intl`. Esta API repite esos mismos registros para poder pasar de uno en uno.

Swagger: `http://localhost:3001/docs`.

## Decisiones

El sitio no llama a la API todavía. Los textos de interfaz (titulares, navegación, etiquetas) quedan en los mensajes del frontend. Acá viven los registros: perfil, contacto, experiencia, grupos de habilidades y proyectos.

Las lecturas son públicas. Crear, editar y borrar piden el header `x-api-key`, comparado con `ADMIN_API_KEY`. No hay usuarios ni sesiones.

El texto en español e inglés se guarda como JSON `{ "es", "en" }`, igual que `Localized` en el sitio. El estado `in-progress` se persiste como `in_progress` y la API lo devuelve con el guion.

Perfil y contacto son un solo registro cada uno. Experiencia, habilidades y proyectos son colecciones identificadas por `slug`. No hay paginación, búsqueda ni carga de archivos: las capturas son rutas o URLs.

El seed inserta lo que ya está en el sitio y no pisa filas existentes. Email, LinkedIn, CV, roles y períodos quedan vacíos hasta que existan.

Un controller valida la entrada, un service aplica las reglas (no encontrado, slug repetido) y un repository habla con Prisma.

Los errores salen con la misma forma: `statusCode`, `error`, `message`, `path`, `timestamp`.

## Endpoints

Prefijo `/api`. Las mutaciones requieren `x-api-key`.

| Método | Ruta                    | Qué hace                                              |
| ------ | ----------------------- | ----------------------------------------------------- |
| GET    | `/api/health`           | Proceso y base de datos                               |
| GET    | `/api/profiles`         | Perfiles                                              |
| GET    | `/api/profiles/:slug`   | Un perfil                                             |
| PATCH  | `/api/profiles/:slug`   | Edita nombre, título o tecnologías                    |
| GET    | `/api/experience`       | Experiencia, por orden                                |
| GET    | `/api/experience/:slug` | Un puesto                                             |
| POST   | `/api/experience`       | Crea un puesto                                        |
| PATCH  | `/api/experience/:slug` | Edita un puesto                                       |
| DELETE | `/api/experience/:slug` | Borra un puesto                                       |
| GET    | `/api/skills`           | Grupos de habilidades                                 |
| GET    | `/api/skills/:slug`     | Un grupo                                              |
| POST   | `/api/skills`           | Crea un grupo                                         |
| PATCH  | `/api/skills/:slug`     | Edita un grupo                                        |
| DELETE | `/api/skills/:slug`     | Borra un grupo                                        |
| GET    | `/api/projects`         | Catálogo. Filtros: `category`, `featured=true\|false` |
| GET    | `/api/projects/:slug`   | Un proyecto                                           |
| POST   | `/api/projects`         | Crea un proyecto                                      |
| PATCH  | `/api/projects/:slug`   | Edita un proyecto                                     |
| DELETE | `/api/projects/:slug`   | Borra un proyecto                                     |
| GET    | `/api/contact`          | Email, LinkedIn y CV                                  |
| PATCH  | `/api/contact`          | Edita esos canales                                    |

Categorías: `fullstack`, `ai`, `backend`, `frontend`, `automation`.

Estados: `concept`, `in-progress`, `shipped`.

## Cómo correrla

```bash
docker compose up postgres
cp apps/api/.env.example apps/api/.env
pnpm --filter @personal-portfolio/api db:migrate
pnpm --filter @personal-portfolio/api db:seed
pnpm --filter @personal-portfolio/api dev
```

`docker compose up` también construye y levanta la API.

## Tests

```bash
pnpm --filter @personal-portfolio/api test
```

Los unitarios cubren el mapeo de proyectos, el service, la API key y el formato de errores. La integración HTTP usa un repositorio en memoria. Con Postgres migrado:

```bash
RUN_DB_TESTS=1 pnpm --filter @personal-portfolio/api test:e2e
```

## Migración del sitio

Cuando un módulo pase a la API, el frontend reemplaza la lectura de `apps/web/src/content` por el GET correspondiente. El JSON usa los mismos campos (`slug`, `summary.es`, `status: "in-progress"`). Se puede hacer de a un módulo. Hasta ese momento el sitio no depende de que la API esté encendida.
