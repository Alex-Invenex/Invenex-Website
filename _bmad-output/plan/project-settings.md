# Invenex Solutions - Project Settings

**Last Updated:** 2026-01-18

## Repository

| Setting | Value |
|---------|-------|
| GitHub URL | https://github.com/vishnumelur/invenexsolutions |
| Clone URL | https://github.com/vishnumelur/invenexsolutions.git |
| Visibility | Private |
| Default Branch | main |
| Local Path | `/home/vmj/Desktop/invenex/invenex-website` |

## Technology Stack

| Technology | Version | Purpose |
|------------|---------|---------|
| Next.js | 16.1.3 | React framework with App Router |
| React | 19.2.3 | UI library |
| TypeScript | ^5 | Type safety (strict mode) |
| Tailwind CSS | ^4 | Utility-first CSS |
| ESLint | ^9 | Code linting |
| Turbopack | Built-in | Development bundler |

## Configuration Files

### package.json

```json
{
  "name": "invenex-website",
  "version": "0.1.0",
  "private": true,
  "scripts": {
    "dev": "next dev",
    "build": "next build",
    "start": "next start",
    "lint": "eslint"
  },
  "dependencies": {
    "next": "16.1.3",
    "react": "19.2.3",
    "react-dom": "19.2.3"
  },
  "devDependencies": {
    "@tailwindcss/postcss": "^4",
    "@types/node": "^20",
    "@types/react": "^19",
    "@types/react-dom": "^19",
    "eslint": "^9",
    "eslint-config-next": "16.1.3",
    "tailwindcss": "^4",
    "typescript": "^5"
  }
}
```

### tsconfig.json

```json
{
  "compilerOptions": {
    "target": "ES2017",
    "lib": ["dom", "dom.iterable", "esnext"],
    "allowJs": true,
    "skipLibCheck": true,
    "strict": true,
    "noEmit": true,
    "esModuleInterop": true,
    "module": "esnext",
    "moduleResolution": "bundler",
    "resolveJsonModule": true,
    "isolatedModules": true,
    "jsx": "react-jsx",
    "incremental": true,
    "plugins": [{ "name": "next" }],
    "paths": {
      "@/*": ["./src/*"]
    }
  },
  "include": [
    "next-env.d.ts",
    "**/*.ts",
    "**/*.tsx",
    ".next/types/**/*.ts",
    ".next/dev/types/**/*.ts",
    "**/*.mts"
  ],
  "exclude": ["node_modules"]
}
```

### postcss.config.mjs (Tailwind v4)

```javascript
const config = {
  plugins: {
    "@tailwindcss/postcss": {},
  },
};

export default config;
```

### next.config.ts

```typescript
import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
};

export default nextConfig;
```

## Design System Base

| Property | Value | CSS Variable |
|----------|-------|--------------|
| Background | #0A0A0A | `--background` |
| Foreground | #FAFAFA | `--foreground` |

## Project Structure

```
invenex-website/
├── src/
│   ├── app/
│   │   ├── globals.css
│   │   ├── layout.tsx
│   │   └── page.tsx
│   ├── components/
│   │   ├── ui/
│   │   ├── sections/
│   │   ├── forms/
│   │   ├── layout/
│   │   └── shared/
│   ├── lib/
│   │   ├── utils.ts
│   │   └── constants.ts
│   └── types/
│       └── index.ts
├── public/
│   ├── fonts/
│   ├── images/
│   └── og/
├── .env.local
├── .env.example
├── package.json
├── tsconfig.json
├── next.config.ts
├── postcss.config.mjs
└── eslint.config.mjs
```

## Environment Variables

See `.env.example` for all required environment variables:

| Variable | Story | Purpose |
|----------|-------|---------|
| `NEXT_PUBLIC_SANITY_PROJECT_ID` | 7.1 | Sanity CMS project ID |
| `NEXT_PUBLIC_SANITY_DATASET` | 7.1 | Sanity dataset name |
| `SANITY_API_TOKEN` | 7.1 | Sanity API token |
| `SANITY_REVALIDATE_SECRET` | 7.1 | Webhook revalidation secret |
| `RESEND_API_KEY` | 5.2 | Resend email API key |
| `NEXTAUTH_SECRET` | 7.5 | NextAuth session secret |
| `NEXTAUTH_URL` | 7.5 | NextAuth base URL |
| `NEXT_PUBLIC_GA_ID` | Optional | Google Analytics ID |

## Commands

| Command | Description |
|---------|-------------|
| `npm run dev` | Start development server (Turbopack) |
| `npm run build` | Production build |
| `npm run start` | Start production server |
| `npm run lint` | Run ESLint |

## Development Server

- **Local:** http://localhost:3000
- **Network:** http://192.168.101.69:3000
