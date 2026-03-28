<div align="center" width="100%">
    <img src="./saasfly-logo.svg" width="128" alt="" />
</div>

# Saasfly </br>

[![Estado del flujo de trabajo de GitHub Actions][check-workflow-badge]][check-workflow-badge-link] [![Licencia GitHub][github-license-badge]][github-license-badge-link]  [![Discord][discord-badge]][discord-badge-link] [![Saasfly][made-by-nextify-badge]][made-by-nextify-badge-link]
[![English](https://img.shields.io/badge/-English-grey.svg)](README.md)

Una plantilla base de Next.js fácil de usar y de nivel empresarial.

Ya no necesitas comprar plantillas: Saasfly ofrece una solución completa y de código abierto para crear aplicaciones SaaS de forma rápida y sencilla.

> **[Nextify](https://nextify.ltd)** ofrece una solución SaaS empresarial completa. Si te interesa hablar sobre tu proyecto o simplemente conversar con nosotros, escríbenos a [contact@nextify.ltd](mailto:contact@nextify.ltd).

> ❤️ Ofrecemos **soporte técnico y servicios de despliegue gratuitos para organizaciones sin fines de lucro**.
>
> 🙌 Todas las ganancias obtenidas de nuestros proyectos de código abierto se dedicarán **íntegramente a apoyar iniciativas open source y causas benéficas**.

## ⚡ Demo en vivo

¡Pruébalo por ti mismo!

Servidor de demo (Ubicación: Washington, EE. UU.): <https://show.saasfly.io>

Más documentación en <https://document.saasfly.io>

## 🌟 Historial de estrellas

[![Star History Chart](https://app.repohistory.com/api/svg?repo=saasfly/saasfly&type=Timeline)](https://repohistory.com)

## 🚀 Primeros pasos

### 🖱 Plantilla en un clic

[![Deploy with Vercel](https://vercel.com/button)](https://vercel.com/new/clone?repository-url=https%3A%2F%2Fgithub.com%2Fsaasfly%2Fsaasfly&env=NEXT_PUBLIC_APP_URL,NEXTAUTH_URL,NEXTAUTH_SECRET,STRIPE_API_KEY,STRIPE_WEBHOOK_SECRET,POSTGRES_URL,GITHUB_CLIENT_ID,GITHUB_CLIENT_SECRET,RESEND_API_KEY,RESEND_FROM&install-command=bun%20install&build-command=bun%20run%20build&root-directory=apps%2Fnextjs)

### 📋 Requisitos previos

Antes de comenzar, asegúrate de tener instalado lo siguiente:

1. [Bun](https://bun.sh/) & [Node.js](https://nodejs.org/) & [Git](https://git-scm.com/)

   1. Linux

    ```bash
      curl -sL https://gist.github.com/tianzx/874662fb204d32390bc2f2e9e4d2df0a/raw -o ~/downloaded_script.sh && chmod +x ~/downloaded_script.sh && source ~/downloaded_script.sh
    ```

   2. MacOS

    ```bash
      /bin/bash -c "$(curl -fsSL https://raw.githubusercontent.com/Homebrew/install/HEAD/install.sh)"
      brew install git
      brew install oven-sh/bun/bun
      brew install nvm
    ```

2. [PostgreSQL](https://www.postgresql.org/)
   1. Puedes usar Vercel Postgres o un servidor local de PostgreSQL (agrega `POSTGRES_URL` en `.env.local`)
      ```bash
         POSTGRES_URL = ''
      ```

### Instalación

Para comenzar con esta plantilla, tienes dos opciones:

1. Usa el comando `bun create` (🌟Muy recomendado🌟):

```bash
bun create saasfly
```

2. Clona el repositorio manualmente:

```bash
git clone https://github.com/saasfly/saasfly.git
cd saasfly
bun install
```

### Configuración

Sigue estos pasos para configurar tu proyecto:

1. Configura las variables de entorno:

```bash
cp .env.example .env.local
// (debes tener una base de datos preparada antes de ejecutar este comando)
bun db:push
```

2. Inicia el servidor de desarrollo:

```bash
bun run dev:web
```

3. Abre [http://localhost:3000](http://localhost:3000) en tu navegador para ver el resultado.

4. (Opcional, alpha) `bun run tailwind-config-viewer`
   Abre [http://localhost:3333](http://localhost:3333) para ver la configuración de Tailwind CSS.

### Otras notas

Usamos Clerk como proveedor de autenticación por defecto desde el **1 de junio de 2025**.

Puedes encontrar la implementación de NextAuth aquí: <https://github.com/saasfly/saasfly/tree/feature-nextauth>.

## 🥺 Hoja de ruta del proyecto

1. Panel de administración (¡en alpha!)
    1. Por ahora solo hay una página estática; planeamos integrarlo con una arquitectura headless.
    2. Puedes definir tu cuenta de admin cambiando **ADMIN_EMAIL="admin@saasfly.io,root@saasfly.io"** en `.env.local` y acceder a `host:port/admin/dashboard`.
    3. Por motivos de seguridad, no ofreceremos demo en línea por el momento.
2. Considerar integración con Payload CMS.

## ⭐ Funcionalidades

### 🐭 Frameworks

- **[Next.js](https://nextjs.org/)** - Framework de React para la web (con **App Directory**)
- **[NextAuth.js](https://next-auth.js.org/)** - Autenticación para Next.js
- **[Kysely](https://kysely.dev/)** - Constructor de consultas SQL con seguridad de tipos para TypeScript
- **[Prisma](https://www.prisma.io/)** - ORM de nueva generación para Node.js y TypeScript, usado como herramienta de gestión de esquemas
- **[React-email](https://react.email/)** - Renderizador de React para crear emails con componentes React

### 🐮 Plataformas

- **[Clerk](https://go.clerk.com/uKDp7Au)** - Plataforma integral de gestión de usuarios
- **[Vercel](https://vercel.com/)** – Despliega tu app Next.js con facilidad
- **[Stripe](https://stripe.com/)** – Procesamiento de pagos para negocios en internet
- **[Resend](https://resend.com/)** – Plataforma de email para desarrolladores

### 🐯 Funciones empresariales

- **[i18n](https://nextjs.org/docs/app/building-your-application/routing/internationalization)** - Soporte de internacionalización
- **[SEO](https://nextjs.org/docs/app/building-your-application/optimizing/metadata)** - Optimización para motores de búsqueda
- **[MonoRepo](https://turbo.build/)** - Monorepo para mejor gestión del código
- **[T3 Env](https://env.t3.gg/)** - Gestiona variables de entorno fácilmente

### 🐰 Obtención de datos

- **[trpc](https://trpc.io/)** – APIs tipadas de extremo a extremo
- **[tanstack/react-query](https://react-query.tanstack.com/)** – Hooks para obtener, cachear y actualizar datos asíncronos en React

### 🐲 Gestión de estado global

- **[Zustand](https://zustand.surge.sh/)** – Gestión de estado pequeña, rápida y escalable para React

### 🐒 UI

- **[Tailwind CSS](https://tailwindcss.com/)** – Framework CSS utility-first para desarrollo rápido de UI
- **[Shadcn/ui](https://ui.shadcn.com/)** – Componentes reutilizables construidos con Radix UI y Tailwind CSS
- **[Framer Motion](https://framer.com/motion)** – Librería de animaciones para React
- **[Lucide](https://lucide.dev/)** – Íconos simples y precisos
- **[next/font](https://nextjs.org/docs/basic-features/font-optimization)** – Optimiza fuentes y elimina solicitudes externas para mejorar rendimiento

### 🐴 Calidad de código

- **[TypeScript](https://www.typescriptlang.org/)** – Tipado estático para seguridad de extremo a extremo
- **[Prettier](https://prettier.io/)** – Formateador opinado para mantener estilo consistente
- **[ESLint](https://eslint.org/)** – Linter extensible para Next.js y TypeScript
- **[Husky](https://typicode.github.io/husky)** – Hooks de Git simplificados

### 🐑 Rendimiento

- **[Vercel Analytics](https://vercel.com/analytics)** – Métricas de rendimiento en tiempo real para tu app Next.js
- **[bun.sh](https://bun.sh/)** – Alternativa a npm para gestionar paquetes más rápido y de forma confiable

### 🐘 Base de datos

- **[PostgreSQL](https://www.postgresql.org/)** – La base de datos open source más avanzada del mundo

## 📦 Apps y paquetes

- `web`: Aplicación principal de Next.js
- `ui`: Componentes de UI compartidos
- `db`: Esquema y utilidades de base de datos
- `auth`: Utilidades de autenticación
- `email`: Plantillas y utilidades de correo

## 📜 Licencia

Este proyecto está licenciado bajo MIT. Consulta [LICENSE](./LICENSE) para más información.

## 🙏 Créditos

Este proyecto se inspiró en [Taxonomy](https://github.com/shadcn-ui/taxonomy) de shadcn y [create-t3-turbo](https://github.com/t3-oss/create-t3-turbo) de t3-oss.

## 👨‍💻 Colaboradores

<a href="https://github.com/saasfly/saasfly/graphs/contributors">
  <img src="https://contrib.rocks/image?repo=saasfly/saasfly" />
</a>

Hecho con [contrib.rocks](https://contrib.rocks).

<!-- Badges and links -->

[check-workflow-badge]: https://img.shields.io/github/actions/workflow/status/saasfly/saasfly/ci.yml?label=ci
[github-license-badge]: https://img.shields.io/badge/License-MIT-green.svg
[discord-badge]: https://img.shields.io/discord/1204690198382911488?color=7b8dcd&link=https%3A%2F%2Fsaasfly.io%2Fdiscord
[made-by-nextify-badge]: https://img.shields.io/badge/made_by-nextify-blue?color=FF782B&link=https://nextify.ltd/

[check-workflow-badge-link]: https://github.com/saasfly/saasfly/actions/workflows/check.yml
[github-license-badge-link]: https://github.com/saasfly/saasfly/blob/main/LICENSE
[discord-badge-link]: https://discord.gg/8SwSX43wnD
[made-by-nextify-badge-link]: https://nextify.ltd
