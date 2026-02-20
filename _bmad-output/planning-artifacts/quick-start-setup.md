# Invenex Website - Quick Start Setup Guide

**Get from zero to deployed in under 30 minutes**

---

## Prerequisites

Ensure you have installed:
- Node.js 20+ (`node -v`)
- npm 10+ (`npm -v`)
- Git (`git --version`)
- GitHub CLI (`gh --version`) - optional but recommended
- Vercel CLI (`npm i -g vercel`)

---

## Step 1: Create Next.js Project

```bash
# Navigate to your projects directory
cd ~/Desktop

# Create Next.js 15 project with all recommended options
npx create-next-app@latest invenex-website --typescript --tailwind --eslint --app --src-dir --import-alias "@/*"

# Navigate into project
cd invenex-website
```

**When prompted, select:**
- TypeScript: Yes
- ESLint: Yes
- Tailwind CSS: Yes
- `src/` directory: Yes
- App Router: Yes
- Import alias: @/*

---

## Step 2: Install Core Dependencies

```bash
# UI and Animation
npm install framer-motion gsap lucide-react clsx tailwind-merge class-variance-authority

# Forms and Validation
npm install react-hook-form @hookform/resolvers zod

# Sanity CMS
npm install next-sanity @sanity/client @sanity/image-url sanity

# Email
npm install resend @react-email/components

# Auth
npm install next-auth@beta

# Dev dependencies
npm install -D @next/bundle-analyzer @types/node
```

---

## Step 3: Initialize Git Repository

```bash
# Initialize git
git init

# Create .gitignore (Next.js creates this, but verify it has):
cat >> .gitignore << 'EOF'

# Environment
.env
.env.local
.env.*.local

# Sanity
.sanity

# IDE
.idea
.vscode

# OS
.DS_Store
Thumbs.db
EOF

# Initial commit
git add .
git commit -m "Initial commit: Next.js 15 project setup"
```

---

## Step 4: Create GitHub Repository

**Option A: Using GitHub CLI (Recommended)**
```bash
# Create private repository and push
gh repo create invenex-website --private --source=. --remote=origin --push
```

**Option B: Manual**
1. Go to https://github.com/new
2. Create repository named `invenex-website`
3. Keep it private
4. Don't initialize with README
5. Run:
```bash
git remote add origin https://github.com/YOUR_USERNAME/invenex-website.git
git branch -M main
git push -u origin main
```

---

## Step 5: Set Up Vercel

```bash
# Login to Vercel
vercel login

# Link project (creates .vercel folder)
vercel link

# When prompted:
# - Set up and deploy? Yes
# - Which scope? Your account
# - Link to existing project? No
# - Project name: invenex-website
# - Directory: ./
# - Override settings? No
```

---

## Step 6: Set Up Sanity CMS

```bash
# Initialize Sanity in your project
npx sanity@latest init --env

# When prompted:
# - Create new project? Yes
# - Project name: invenex-cms
# - Use default dataset (production)? Yes
# - Project output path: ./sanity
# - Select template: Clean project

# This creates sanity/ folder with Studio
```

**Get your Sanity credentials:**
1. Go to https://www.sanity.io/manage
2. Select your project
3. Go to API tab
4. Copy Project ID
5. Create a new token (Editor role)

---

## Step 7: Set Up Resend

1. Go to https://resend.com/signup
2. Create account
3. Go to API Keys
4. Create new API key
5. Copy the key

**Add Domain (for production):**
1. Go to Domains in Resend
2. Add `invenexsolutions.com`
3. Add the DNS records they provide:
   - SPF record
   - DKIM record
   - DMARC record (optional but recommended)
4. Verify domain

---

## Step 8: Configure Environment Variables

```bash
# Create .env.local
cat > .env.local << 'EOF'
# App
NEXT_PUBLIC_SITE_URL=http://localhost:3000

# Sanity
NEXT_PUBLIC_SANITY_PROJECT_ID=your_project_id_here
NEXT_PUBLIC_SANITY_DATASET=production
SANITY_API_TOKEN=your_token_here

# Auth
NEXTAUTH_URL=http://localhost:3000
NEXTAUTH_SECRET=generate_with_openssl_rand_base64_32
ADMIN_EMAIL=admin@invenexsolutions.com

# Resend
RESEND_API_KEY=re_your_key_here
EOF

# Generate NEXTAUTH_SECRET
openssl rand -base64 32
# Copy the output and paste into .env.local
```

---

## Step 9: Add Environment Variables to Vercel

```bash
# Add each variable to Vercel
vercel env add NEXT_PUBLIC_SANITY_PROJECT_ID
vercel env add NEXT_PUBLIC_SANITY_DATASET
vercel env add SANITY_API_TOKEN
vercel env add NEXTAUTH_SECRET
vercel env add ADMIN_EMAIL
vercel env add RESEND_API_KEY

# Pull env to local (syncs Vercel env to local)
vercel env pull .env.local
```

**Or via Vercel Dashboard:**
1. Go to your project on vercel.com
2. Settings > Environment Variables
3. Add each variable for Production, Preview, and Development

---

## Step 10: Connect Domain to Vercel

1. Go to your project on vercel.com
2. Settings > Domains
3. Add `invenexsolutions.com`
4. Add `www.invenexsolutions.com`
5. Update your domain DNS:

```
# At your domain registrar, add:
Type: A
Name: @
Value: 76.76.21.21

Type: CNAME
Name: www
Value: cname.vercel-dns.com
```

6. Wait for DNS propagation (can take up to 48 hours, usually minutes)
7. Vercel auto-provisions SSL certificate

---

## Step 11: Create Base Project Structure

```bash
# Create folder structure
mkdir -p src/components/{ui,sections,forms,layout,aceternity,magic-ui}
mkdir -p src/lib/{sanity,validations}
mkdir -p src/emails
mkdir -p src/types
mkdir -p src/styles
mkdir -p public/{fonts,images,og}

# Create placeholder files
touch src/lib/utils.ts
touch src/lib/sanity/client.ts
touch src/lib/sanity/queries.ts
touch src/types/index.ts
touch src/styles/animations.css
```

---

## Step 12: Set Up Tailwind Config with Design System

Replace `tailwind.config.ts`:

```typescript
import type { Config } from "tailwindcss";

const config: Config = {
  darkMode: "class",
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        background: {
          DEFAULT: "#0A0A0A",
          secondary: "#141414",
          tertiary: "#1A1A1A",
        },
        foreground: {
          DEFAULT: "#FAFAFA",
          muted: "#A3A3A3",
          subtle: "#737373",
        },
        border: {
          DEFAULT: "#262626",
          hover: "#404040",
        },
        accent: {
          DEFAULT: "#FFFFFF",
          muted: "#E5E5E5",
        },
      },
      fontFamily: {
        sans: ["var(--font-inter)"],
        mono: ["var(--font-jetbrains)"],
      },
      animation: {
        "fade-in": "fadeIn 0.5s ease-out",
        "slide-up": "slideUp 0.5s ease-out",
        "slide-down": "slideDown 0.5s ease-out",
      },
      keyframes: {
        fadeIn: {
          "0%": { opacity: "0" },
          "100%": { opacity: "1" },
        },
        slideUp: {
          "0%": { opacity: "0", transform: "translateY(20px)" },
          "100%": { opacity: "1", transform: "translateY(0)" },
        },
        slideDown: {
          "0%": { opacity: "0", transform: "translateY(-20px)" },
          "100%": { opacity: "1", transform: "translateY(0)" },
        },
      },
    },
  },
  plugins: [],
};

export default config;
```

---

## Step 13: Update Global CSS

Replace `src/app/globals.css`:

```css
@tailwind base;
@tailwind components;
@tailwind utilities;

@layer base {
  :root {
    --background: 0 0% 4%;
    --foreground: 0 0% 98%;
  }

  * {
    @apply border-border;
  }

  body {
    @apply bg-background text-foreground antialiased;
  }

  /* Smooth scrolling */
  html {
    scroll-behavior: smooth;
  }

  /* Selection */
  ::selection {
    @apply bg-accent/20 text-foreground;
  }
}

@layer utilities {
  /* Hide scrollbar but allow scrolling */
  .no-scrollbar::-webkit-scrollbar {
    display: none;
  }
  .no-scrollbar {
    -ms-overflow-style: none;
    scrollbar-width: none;
  }
}
```

---

## Step 14: Create Utility Functions

Create `src/lib/utils.ts`:

```typescript
import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function formatDate(date: string | Date): string {
  return new Date(date).toLocaleDateString("en-US", {
    month: "long",
    day: "numeric",
    year: "numeric",
  });
}

export function absoluteUrl(path: string): string {
  return `${process.env.NEXT_PUBLIC_SITE_URL}${path}`;
}
```

---

## Step 15: Create Root Layout with Fonts

Replace `src/app/layout.tsx`:

```typescript
import type { Metadata } from "next";
import { Inter, JetBrains_Mono } from "next/font/google";
import "./globals.css";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
});

const jetbrains = JetBrains_Mono({
  subsets: ["latin"],
  variable: "--font-jetbrains",
});

export const metadata: Metadata = {
  metadataBase: new URL(
    process.env.NEXT_PUBLIC_SITE_URL || "http://localhost:3000"
  ),
  title: {
    default: "Invenex Solutions - Web & App Development Agency",
    template: "%s | Invenex Solutions",
  },
  description:
    "Premium web development, mobile apps, and digital solutions. Transform your ideas into powerful digital products.",
  keywords: [
    "web development",
    "mobile app development",
    "digital agency",
    "India",
  ],
  authors: [{ name: "Invenex Solutions" }],
  creator: "Invenex Solutions",
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "/",
    siteName: "Invenex Solutions",
    images: [{ url: "/og/default.png", width: 1200, height: 630 }],
  },
  twitter: {
    card: "summary_large_image",
    site: "@invenexsolutions",
  },
  robots: {
    index: true,
    follow: true,
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className="dark">
      <body className={`${inter.variable} ${jetbrains.variable} font-sans`}>
        {children}
      </body>
    </html>
  );
}
```

---

## Step 16: Create Initial Homepage

Replace `src/app/page.tsx`:

```typescript
export default function Home() {
  return (
    <main className="min-h-screen">
      {/* Hero Section */}
      <section className="flex min-h-screen flex-col items-center justify-center px-6">
        <div className="text-center">
          <h1 className="text-5xl font-bold tracking-tight md:text-7xl lg:text-8xl">
            Invenex
            <span className="block text-foreground-muted">Solutions</span>
          </h1>
          <p className="mx-auto mt-6 max-w-2xl text-lg text-foreground-muted md:text-xl">
            Premium web development, mobile apps, and digital solutions.
            Transform your ideas into powerful digital products.
          </p>
          <div className="mt-10 flex flex-col gap-4 sm:flex-row sm:justify-center">
            <a
              href="/contact"
              className="rounded-full bg-accent px-8 py-3 text-sm font-medium text-background transition-colors hover:bg-accent-muted"
            >
              Get a Quote
            </a>
            <a
              href="/portfolio"
              className="rounded-full border border-border px-8 py-3 text-sm font-medium text-foreground transition-colors hover:border-border-hover hover:bg-background-secondary"
            >
              View Our Work
            </a>
          </div>
        </div>
      </section>
    </main>
  );
}
```

---

## Step 17: First Deploy

```bash
# Commit all changes
git add .
git commit -m "feat: base project setup with design system"

# Push to GitHub
git push

# Deploy to Vercel
vercel --prod
```

---

## Step 18: Verify Everything Works

1. **Local Development:**
   ```bash
   npm run dev
   # Visit http://localhost:3000
   ```

2. **Production:**
   - Visit your Vercel deployment URL
   - Visit https://invenexsolutions.com (after DNS propagates)

3. **Sanity Studio:**
   ```bash
   cd sanity
   npm run dev
   # Visit http://localhost:3333
   ```

---

## Next Steps

You're now ready to start building! Follow the implementation phases in the main spec:

1. **Phase 1:** Build base UI components
2. **Phase 2:** Create core pages (Home, About, Services, Contact)
3. **Phase 3:** Portfolio system with Sanity
4. **Phase 4:** Careers and Blog
5. **Phase 5:** Animations and premium effects
6. **Phase 6:** SEO and performance optimization
7. **Phase 7:** Admin dashboard and polish

---

## Useful Commands

```bash
# Development
npm run dev              # Start dev server
npm run build            # Production build
npm run start            # Start production server
npm run lint             # Run ESLint

# Sanity
cd sanity && npm run dev # Start Sanity Studio
npx sanity deploy        # Deploy Studio to Sanity hosting

# Vercel
vercel                   # Preview deployment
vercel --prod            # Production deployment
vercel env pull          # Sync env variables

# Git
git status               # Check status
git add .                # Stage all changes
git commit -m "message"  # Commit
git push                 # Push to GitHub

# Bundle Analysis
ANALYZE=true npm run build  # Analyze bundle size
```

---

## Troubleshooting

### Sanity connection issues
- Verify Project ID in .env.local
- Check API token has correct permissions
- Ensure CORS origins include localhost and production domain

### Resend emails not sending
- Verify API key is correct
- Check domain is verified in Resend dashboard
- Check spam folder for test emails

### Vercel deployment fails
- Check build logs in Vercel dashboard
- Ensure all env variables are set
- Run `npm run build` locally first to catch errors

### DNS not working
- Wait up to 48 hours for propagation
- Verify records at https://dnschecker.org
- Clear browser cache and try incognito

---

*Happy building, Vmj!*
