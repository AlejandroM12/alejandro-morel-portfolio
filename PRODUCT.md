# Producto

Portfolio profesional de Alejandro Morel, pensado como un solo producto de software. El sitio lo posiciona como Senior Full Stack Developer, con foco en React, Next.js, NestJS y Applied AI.

La misma plataforma tiene que servir para distintas oportunidades, sin duplicar sitios ni páginas:

- Senior Full Stack Developer
- AI Full Stack Developer
- Applied AI Engineer
- Freelance Web Developer

## Perfiles

Hay una sola home canónica. Un query param cambia el énfasis de esa lectura. Los valores acordados son:

- `?profile=fullstack`
- `?profile=ai`
- `?profile=freelance`

Sin parámetro, la home muestra la presentación general. El selector y la reorganización del contenido se implementan en una etapa posterior. Esta etapa no incluye esa lógica.

## Idiomas

El idioma por defecto es español. Inglés entra completo desde el shell visual, con `next-intl`. Esta etapa solo deja `lang="es"` en el documento raíz.

## Tipografía

Newsreader para títulos. Geist para interfaz y contenido. La carga de fuentes forma parte del shell visual, no de este esqueleto.

## Contenido

La experiencia laboral, los proyectos y los resultados se cargan cuando existan datos reales. El repositorio no incluye biografías, casos ni métricas de relleno.

## Fuera de esta versión

Autenticación, panel de administración, blog, analytics y un segundo frontend. La API NestJS aparece en la etapa de contacto.
