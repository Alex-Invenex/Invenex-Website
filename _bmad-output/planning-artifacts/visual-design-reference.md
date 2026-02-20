# Visual Design Reference Sheet - Invenex Transformation

**Quick reference for designers and developers implementing Epic 10**

---

## Color Palette Evolution

### Current Invenex Colors
```css
--purple-primary: #8B5CF6    /* Too generic */
--purple-dark: #6D28D9
--pink-accent: #EC4899
--background-dark: #0F0F0F
--text-white: #FFFFFF
```

### Proposed Enhancement
```css
/* Keep the purple but add Kerala-inspired accents */
--primary-purple: #8B5CF6
--kerala-green: #2D5016      /* Tea gardens, backwaters */
--spice-gold: #D4AF37         /* Turmeric, saffron */
--copper: #B87333             /* Like Stokt, premium feel */
--deep-blue: #0A2342          /* Arabian Sea at night */

/* Gradients */
--gradient-hero: linear-gradient(135deg, #8B5CF6 0%, #EC4899 100%)
--gradient-accent: linear-gradient(90deg, #D4AF37 0%, #B87333 100%)
--gradient-text: linear-gradient(135deg, #8B5CF6 0%, #EC4899 50%, #D4AF37 100%)
```

### Usage Guidelines
- **Purple gradient:** Hero headlines, major CTAs
- **Kerala green:** Subtle accents, nature imagery overlays
- **Spice gold:** Awards, achievements, special highlights
- **Copper:** 3D brand element, premium features
- **Deep blue:** Alternative dark sections, footer

---

## Typography System

### Display Type (Headlines)
```css
/* Hero - Massive Impact */
.hero-headline {
  font-family: 'Space Grotesk', sans-serif;
  font-size: clamp(60px, 12vw, 180px);
  font-weight: 900;
  line-height: 0.9;
  letter-spacing: -0.02em;
  text-transform: uppercase;
}

/* Section Headers */
.section-header {
  font-family: 'Space Grotesk', sans-serif;
  font-size: clamp(40px, 8vw, 96px);
  font-weight: 800;
  line-height: 1;
  letter-spacing: -0.01em;
}

/* Subsection Headers */
.subsection-header {
  font-family: 'Space Grotesk', sans-serif;
  font-size: clamp(28px, 5vw, 56px);
  font-weight: 700;
  line-height: 1.1;
}
```

### Body Type
```css
/* Large Body */
.body-large {
  font-family: 'Inter', sans-serif;
  font-size: clamp(18px, 2vw, 24px);
  line-height: 1.6;
  font-weight: 400;
}

/* Regular Body */
.body-regular {
  font-family: 'Inter', sans-serif;
  font-size: 16px;
  line-height: 1.7;
  font-weight: 400;
}

/* Small Text / Labels */
.text-small {
  font-family: 'Inter', sans-serif;
  font-size: 14px;
  line-height: 1.5;
  font-weight: 500;
  text-transform: uppercase;
  letter-spacing: 0.1em;
}
```

### Special Treatments

**Gradient Text:**
```css
.gradient-text {
  background: linear-gradient(135deg, #8B5CF6 0%, #EC4899 100%);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
}
```

**Outlined Text:**
```css
.outlined-text {
  color: transparent;
  -webkit-text-stroke: 2px #FFFFFF;
  text-stroke: 2px #FFFFFF;
}
```

**Parenthetical Labels:**
```css
.label-parenthetical {
  font-size: 12px;
  text-transform: uppercase;
  letter-spacing: 0.15em;
  opacity: 0.6;
}
/* Example: ( WE ARE INVENEX ) */
```

---

## Spacing Scale

### Vertical Spacing (Sections)
```css
--space-section-sm: 64px;   /* Mobile sections */
--space-section-md: 96px;   /* Tablet sections */
--space-section-lg: 128px;  /* Desktop sections */
--space-section-xl: 160px;  /* Hero, major sections */
```

### Component Spacing
```css
--space-xs: 4px;
--space-sm: 8px;
--space-md: 16px;
--space-lg: 24px;
--space-xl: 32px;
--space-2xl: 48px;
--space-3xl: 64px;
--space-4xl: 96px;
```

### Grid Gaps
```css
/* Portfolio Bento Grid */
.bento-grid {
  gap: 24px;  /* Desktop */
  gap: 16px;  /* Mobile */
}

/* Service Cards */
.service-grid {
  gap: 32px;  /* Desktop */
  gap: 24px;  /* Mobile */
}
```

---

## Layout Patterns

### Asymmetric Hero
```
┌────────────────────────────────────────┐
│ Logo          Nav Menu          CTA    │
├─────────────────┬──────────────────────┤
│                 │                      │
│   MASSIVE       │                      │
│   HEADLINE      │    [3D Element]      │
│   TEXT          │    Floating here     │
│                 │    with animations   │
│   Subheadline   │                      │
│                 │                      │
│   [CTAs]        │                      │
│                 │                      │
│   50+ 5+ 98%    │                      │
│   Stats inline  │                      │
└─────────────────┴──────────────────────┘
```

### Bento Portfolio Grid
```
┌─────────────────────────────────────────┐
│  Featured        │  Small │  Small      │
│  Project         │  Proj  │  Proj       │
│  (2x2)           ├────────┴─────────────┤
│                  │  Medium Project (2x1) │
├──────────────────┴───────────┬──────────┤
│  Medium Project (2x1)        │  Small   │
├──────────────────────────────┤  (1x2)   │
│  Small │  Small │  Small     │          │
└────────┴────────┴────────────┴──────────┘
```

### Split Section (Services)
```
┌─────────────────────────────────────────┐
│                                         │
│  [Image/Visual]    │    Text Content    │
│  Full bleed left   │    Right aligned   │
│  Overlaps edge     │    60% width       │
│                    │                    │
└────────────────────┴────────────────────┘

Next section reverses (text left, image right)
```

---

## Animation Specs

### Scroll-Triggered Reveals
```javascript
// Text reveals - staggered words
{
  initial: { y: 100, opacity: 0 },
  animate: { y: 0, opacity: 1 },
  transition: {
    duration: 1,
    stagger: 0.1,
    ease: [0.6, 0, 0.2, 1]  // expo.out
  }
}

// Images - scale + fade
{
  initial: { scale: 0.95, opacity: 0 },
  animate: { scale: 1, opacity: 1 },
  transition: {
    duration: 0.8,
    ease: [0.4, 0, 0.2, 1]
  }
}

// Cards - slide up + fade
{
  initial: { y: 60, opacity: 0 },
  animate: { y: 0, opacity: 1 },
  transition: {
    duration: 0.6,
    ease: [0.4, 0, 0.2, 1]
  }
}
```

### Hover States
```css
/* Card Hover */
.card {
  transition: transform 0.4s cubic-bezier(0.4, 0, 0.2, 1),
              box-shadow 0.4s cubic-bezier(0.4, 0, 0.2, 1);
}

.card:hover {
  transform: translateY(-8px);
  box-shadow: 0 20px 60px rgba(0, 0, 0, 0.3);
}

.card:hover img {
  transform: scale(1.05);
}

/* Button Hover */
.button {
  transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
}

.button:hover {
  transform: scale(1.05);
  box-shadow: 0 10px 30px rgba(139, 92, 246, 0.3);
}

/* Link Underline */
.link {
  position: relative;
}

.link::after {
  content: '';
  position: absolute;
  bottom: 0;
  left: 0;
  width: 0;
  height: 2px;
  background: currentColor;
  transition: width 0.3s ease-out;
}

.link:hover::after {
  width: 100%;
}
```

### 3D Element Animation
```javascript
// Scroll-based rotation
useFrame(() => {
  const scrollY = window.scrollY
  mesh.current.rotation.y = scrollY * 0.001
  mesh.current.rotation.x = Math.sin(scrollY * 0.001) * 0.2
})

// Mouse following (subtle)
const handleMouseMove = (e) => {
  const x = (e.clientX / window.innerWidth - 0.5) * 0.5
  const y = (e.clientY / window.innerHeight - 0.5) * 0.5

  gsap.to(mesh.current.rotation, {
    x: y,
    y: x,
    duration: 2,
    ease: 'power2.out'
  })
}
```

---

## Component Design Patterns

### Project Card
```tsx
<motion.div
  className="project-card group"
  whileHover={{ y: -8 }}
  transition={{ duration: 0.4 }}
>
  <div className="relative overflow-hidden aspect-[16/9]">
    <Image
      src={project.image}
      alt={project.title}
      fill
      className="object-cover group-hover:scale-105 transition-transform duration-700"
    />
    <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-400">
      <div className="absolute bottom-0 left-0 p-6">
        <h3 className="text-2xl font-bold mb-2">{project.title}</h3>
        <p className="text-sm opacity-80">{project.description}</p>
      </div>
    </div>
  </div>

  <div className="p-6">
    <div className="flex gap-2 mb-4">
      {project.tags.map(tag => (
        <span className="text-xs uppercase tracking-wide px-3 py-1 bg-purple-500/20 rounded-full">
          {tag}
        </span>
      ))}
    </div>
    <p className="text-sm text-purple-400">{project.outcome}</p>
  </div>
</motion.div>
```

### Service Card (NOT Icon Grid)
```tsx
<div className="service-section grid md:grid-cols-2 gap-12 items-center">
  {/* Image/Visual Side */}
  <div className="relative">
    <Image
      src="/services/code-screenshot.png"
      alt="Next.js code example"
      width={800}
      height={600}
      className="rounded-lg shadow-2xl"
    />
    {/* Floating tech badges */}
    <div className="absolute -bottom-6 -right-6 flex gap-4">
      <TechBadge icon="nextjs" />
      <TechBadge icon="react" />
      <TechBadge icon="typescript" />
    </div>
  </div>

  {/* Content Side */}
  <div>
    <span className="text-sm uppercase tracking-wide text-purple-400 mb-4 block">
      01 / Web Development
    </span>
    <h2 className="text-5xl font-bold mb-6">
      SITES THAT <span className="gradient-text">PERFORM</span>
    </h2>
    <p className="text-lg mb-8">
      Lightning-fast web apps built with Next.js 14, React 18, and modern
      JAMstack architecture. Your users won't wait for slow sites. Neither will we.
    </p>

    <ul className="space-y-4 mb-8">
      <li className="flex items-start gap-3">
        <CheckIcon />
        <span>Server-side rendering for SEO and speed</span>
      </li>
      <li className="flex items-start gap-3">
        <CheckIcon />
        <span>Progressive Web App (PWA) capabilities</span>
      </li>
      <li className="flex items-start gap-3">
        <CheckIcon />
        <span>Headless CMS integration (Sanity, Strapi)</span>
      </li>
    </ul>

    <Button variant="primary">View Web Projects →</Button>
  </div>
</div>
```

### Testimonial Card
```tsx
<div className="testimonial-card bg-white/5 backdrop-blur rounded-2xl p-8 border border-white/10">
  <div className="flex gap-1 mb-4">
    {[...Array(5)].map((_, i) => (
      <StarIcon key={i} className="w-5 h-5 text-yellow-400 fill-current" />
    ))}
  </div>

  <blockquote className="text-lg mb-6 italic">
    "{testimonial.quote}"
  </blockquote>

  <div className="flex items-center gap-4">
    <Image
      src={testimonial.avatar}
      alt={testimonial.name}
      width={48}
      height={48}
      className="rounded-full"
    />
    <div>
      <p className="font-semibold">{testimonial.name}</p>
      <p className="text-sm opacity-60">{testimonial.role}, {testimonial.company}</p>
    </div>
  </div>
</div>
```

---

## Image Treatment Guidelines

### Photography Style
- **Lighting:** Natural, soft shadows
- **Composition:** Rule of thirds, intentional framing
- **Color:** Slightly desaturated, professional grade
- **Context:** Show environment, tell story

### Image Overlays
```css
/* Gradient overlay for text contrast */
.image-overlay {
  position: relative;
}

.image-overlay::after {
  content: '';
  position: absolute;
  inset: 0;
  background: linear-gradient(
    180deg,
    transparent 0%,
    rgba(0, 0, 0, 0.4) 50%,
    rgba(0, 0, 0, 0.8) 100%
  );
}
```

### Image Aspect Ratios
- **Hero:** 21:9 (cinematic)
- **Portfolio cards:** 16:9 (standard)
- **Process photos:** 4:3 (classic)
- **Team headshots:** 1:1 (square)
- **Screenshots:** Native (don't crop)

---

## Iconography

### When to Use Icons
✅ **Good:**
- Tech stack badges (Next.js, React logos)
- Social media links (LinkedIn, Twitter)
- UI elements (arrow, check, close)
- Process steps (1, 2, 3)

❌ **Avoid:**
- Generic service icons (lightbulb, rocket, handshake)
- Decorative icons that add no meaning
- Icon grids (replace with imagery)

### Icon Style
```css
.icon {
  width: 24px;
  height: 24px;
  stroke-width: 2px;
  stroke: currentColor;
  fill: none;
}

/* Tech badges - filled logos */
.tech-badge {
  width: 40px;
  height: 40px;
  padding: 8px;
  background: rgba(255, 255, 255, 0.1);
  border-radius: 12px;
}
```

---

## Cursor Interactions

### Custom Cursor
```css
.custom-cursor {
  position: fixed;
  width: 20px;
  height: 20px;
  border: 2px solid #FFFFFF;
  border-radius: 50%;
  pointer-events: none;
  z-index: 9999;
  mix-blend-mode: difference;
  transition: transform 0.3s ease-out;
}

/* Hover state - expands */
.custom-cursor.hover {
  transform: scale(2);
}

/* Click state - shrinks */
.custom-cursor.click {
  transform: scale(0.8);
}

/* Text state - shows "View" */
.custom-cursor.view::after {
  content: 'View';
  font-size: 10px;
}
```

### Magnetic Effect
```javascript
// Button becomes magnetic within 100px radius
const magneticButton = (button) => {
  button.addEventListener('mousemove', (e) => {
    const rect = button.getBoundingClientRect()
    const x = e.clientX - rect.left - rect.width / 2
    const y = e.clientY - rect.top - rect.height / 2
    const distance = Math.sqrt(x * x + y * y)

    if (distance < 100) {
      button.style.transform = `translate(${x * 0.3}px, ${y * 0.3}px)`
    }
  })

  button.addEventListener('mouseleave', () => {
    button.style.transform = 'translate(0, 0)'
  })
}
```

---

## 3D Element Specifications

### Model Requirements
- **Poly count:** <50,000 triangles
- **Textures:** 1024x1024 max, compressed (basis/ktx2)
- **Materials:** PBR (Physically Based Rendering)
- **Animations:** Baked where possible
- **File size:** <2MB total

### Lighting Setup
```javascript
// Three-point lighting for 3D element
<ambientLight intensity={0.5} />
<directionalLight
  position={[10, 10, 5]}
  intensity={1}
  castShadow
/>
<pointLight
  position={[-10, 0, -10]}
  intensity={0.5}
  color="#8B5CF6"  // Purple rim light
/>
```

### Materials
```javascript
const material = new THREE.MeshStandardMaterial({
  color: '#B87333',     // Copper base
  metalness: 0.9,       // Very metallic
  roughness: 0.2,       // Smooth but not mirror
  envMapIntensity: 1.5  // Enhanced reflections
})
```

---

## Responsive Breakpoints

### Design Breakpoints
```css
/* Mobile */
@media (max-width: 640px) {
  /* Single column layouts */
  /* Stacked elements */
  /* Reduced type sizes */
}

/* Tablet */
@media (min-width: 641px) and (max-width: 1024px) {
  /* Two column grids */
  /* Medium type sizes */
  /* Simplified interactions */
}

/* Desktop */
@media (min-width: 1025px) {
  /* Multi-column layouts */
  /* Full animations */
  /* Custom cursor active */
}

/* Large Desktop */
@media (min-width: 1440px) {
  /* Contained max-width: 1400px */
  /* Larger type sizes */
  /* More whitespace */
}
```

### Typography Scaling
```css
/* Use clamp() for fluid typography */
h1 { font-size: clamp(40px, 8vw, 120px); }
h2 { font-size: clamp(32px, 6vw, 80px); }
h3 { font-size: clamp(24px, 4vw, 48px); }
p  { font-size: clamp(16px, 2vw, 18px); }
```

---

## Performance Budgets

### Bundle Sizes
- **JavaScript:** <150KB gzipped
- **CSS:** <50KB gzipped
- **Fonts:** <100KB total
- **Images (above fold):** <500KB total
- **3D models:** <2MB

### Lighthouse Targets
- **Performance:** 95+
- **Accessibility:** 100
- **Best Practices:** 95+
- **SEO:** 100

### Core Web Vitals
- **LCP:** <2.0s
- **FID:** <100ms
- **CLS:** <0.1
- **INP:** <200ms

---

## Accessibility Requirements

### Color Contrast
- **Normal text:** 4.5:1 minimum
- **Large text (18px+):** 3:1 minimum
- **UI elements:** 3:1 minimum

### Focus States
```css
/* Visible focus indicator */
*:focus-visible {
  outline: 2px solid #8B5CF6;
  outline-offset: 4px;
  border-radius: 4px;
}

/* Never remove outline completely */
*:focus {
  outline: none; /* Remove default */
}
```

### Motion Preferences
```css
/* Respect reduced motion */
@media (prefers-reduced-motion: reduce) {
  * {
    animation-duration: 0.01ms !important;
    animation-iteration-count: 1 !important;
    transition-duration: 0.01ms !important;
  }
}
```

---

## Quick Reference: Before vs. After

### Hero Section
**Before:**
- Big type, empty space
- Static layout
- Generic copy

**After:**
- Big type + 3D element + gradient emphasis
- Scroll animations
- Specific, bold copy

### Portfolio
**Before:**
- Gradient placeholder boxes
- Uniform grid
- Generic descriptions

**After:**
- Real project photography
- Asymmetric bento grid
- Results-focused outcomes

### Services
**Before:**
- 6-card icon grid
- Generic icons
- Corporate copy

**After:**
- Full-width alternating sections
- Real code screenshots / process images
- Specific tech stack and outcomes

### Overall Feel
**Before:**
- Template-based
- Corporate
- Forgettable

**After:**
- Intentionally designed
- Bold and creative
- Award-worthy

---

## Design Checklist

Before shipping any section:
- [ ] Does it look intentionally designed (not template-based)?
- [ ] Is there real content (not placeholders)?
- [ ] Do animations enhance, not delay?
- [ ] Is it accessible (keyboard, screen reader, color contrast)?
- [ ] Does it perform well (60fps, fast load)?
- [ ] Does it reflect Bold + Quality + Creativity?
- [ ] Would we submit this to Awwwards?

If any answer is "no," keep iterating.

---

**Remember:** Every pixel is a design decision. Make it count.
