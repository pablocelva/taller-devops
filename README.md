# Taller DevOps

Proyecto usado en clase para practicar calidad, build y contenedores con una
aplicacion frontend simple hecha con React, Vite y TypeScript.

La idea del repositorio no es solo ejecutar una app, sino comparar tres formas
de construir una imagen Docker:

1. Dockerfile basico.
2. Dockerfile multistage para reducir el tamano final.
3. Dockerfile optimizado para mejorar cache y contexto de build.

## Requisitos

- Node.js compatible con el proyecto.
- pnpm via Corepack.
- Docker.

Activar Corepack si no esta habilitado:

```bash
corepack enable
```

Instalar dependencias:

```bash
pnpm install
```

## Ejecutar En Local

Servidor de desarrollo:

```bash
pnpm dev
```

Build de produccion:

```bash
pnpm build
```

Preview local del build:

```bash
pnpm preview -- --host 0.0.0.0
```

## Calidad

El proyecto separa lint, tests y build para que cada paso tenga un objetivo
claro.

```bash
pnpm lint
pnpm test
pnpm build
```

Orden recomendado para revisar cambios:

1. `pnpm lint`: detecta problemas rapidos de codigo.
2. `pnpm test`: ejecuta tests de componentes con Vitest.
3. `pnpm build`: valida TypeScript y genera `dist`.

Los tests viven en `test/`, no en `src/`, para separar codigo de aplicacion y
codigo de verificacion. La configuracion de Vitest esta integrada en
`vite.config.ts`, y el setup global vive en `test/setupTests.ts`.

## Docker Paso 1: Imagen Basica

Archivo: `Dockerfile`

Construye y ejecuta la app usando `node:24`. Es simple, pero la imagen final
incluye Node, dependencias, codigo fuente y artefactos necesarios para construir.
Por eso suele ser grande.

Build:

```bash
docker build -f Dockerfile -t taller-devops:latest .
```

Run:

```bash
docker run --rm -p 8080:80 taller-devops:latest
```

Abrir:

```text
http://localhost:8080
```

Entrar al contenedor:

```bash
docker run --rm -it taller-devops:latest bash
```

Puntos para observar:

- Usa una sola etapa.
- La imagen final contiene mucho mas de lo necesario para servir una app estatica.
- `COPY . .` copia todo el contexto disponible.
- Cambios pequenos pueden invalidar mucho cache.

## Docker Paso 2: Multistage

Archivo: `Dockerfile.multistage`

Usa `node:24` para construir y `nginx:alpine` para servir solo el contenido de
`dist`. Esto reduce mucho el tamano final.

Build:

```bash
docker build -f Dockerfile.multistage -t taller-devops:multistage .
```

Run:

```bash
docker run --rm -p 8080:80 taller-devops:multistage
```

Entrar al contenedor:

```bash
docker run --rm -it taller-devops:multistage sh
```

Puntos para observar:

- La etapa `builder` compila la app.
- La etapa `runner` solo recibe `/app/dist`.
- La imagen final ya no necesita Node.
- Baja el tamano final, pero aun usa `COPY . .` antes de instalar dependencias.
- Todavia no esta optimizado para cache.

## Docker Paso 3: Optimizado

Archivo: `Dockerfile.optimized`

Mantiene el multistage, pero ordena las capas para aprovechar mejor el cache.
Tambien usa `.dockerignore` para enviar al build solo los archivos necesarios.

Build:

```bash
docker build -f Dockerfile.optimized -t taller-devops:optimized .
```

Run:

```bash
docker run --rm -p 8080:80 taller-devops:optimized
```

Entrar al contenedor:

```bash
docker run --rm -it taller-devops:optimized sh
```

Puntos para observar:

- Primero copia `package.json` y `pnpm-lock.yaml`.
- Luego ejecuta `pnpm install`.
- Despues copia configuraciones, `public/` y `src/`.
- Ejecuta `pnpm lint` y `pnpm build`.
- Copia `test/` despues del build y recien ahi ejecuta `pnpm test`.
- Si cambian solo los tests, el build de la app puede seguir cacheado.
- `.dockerignore` evita enviar `node_modules`, `dist`, `.git` y archivos no
  necesarios.

## Comparar Imagenes

Despues de construir las tres imagenes:

```bash
docker images | grep taller-devops
```

Preguntas para discutir:

- Cual imagen pesa mas?
- Cual imagen final contiene Node?
- Que capas se reutilizan en un segundo build?
- Que pasa si cambia solo un archivo en `src/`?
- Que pasa si cambia solo un archivo en `test/`?
- Que diferencia hay entre optimizar tamano final y optimizar tiempo de rebuild?

## Probar Cache

Construir dos veces la imagen optimizada:

```bash
docker build -f Dockerfile.optimized -t taller-devops:optimized .
docker build -f Dockerfile.optimized -t taller-devops:optimized .
```

En el segundo build deberias ver varias capas marcadas como `CACHED`.

Para experimentar:

1. Cambia un archivo en `test/`.
2. Ejecuta de nuevo el build optimizado.
3. Observa que capas se reutilizan y cuales se vuelven a ejecutar.

## Archivos Importantes

- `src/`: codigo de la aplicacion.
- `test/`: tests de componentes.
- `vite.config.ts`: configuracion de Vite y Vitest.
- `.dockerignore`: whitelist del contexto de Docker para el build optimizado.
- `Dockerfile`: version basica.
- `Dockerfile.multistage`: version con runtime Nginx.
- `Dockerfile.optimized`: version con mejor uso de cache.

## Limpieza Util

Eliminar contenedores detenidos:

```bash
docker container prune
```

Eliminar imagenes no usadas:

```bash
docker image prune
```