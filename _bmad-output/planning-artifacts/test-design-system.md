# System-Level Test Design

**Project:** Invenex Solutions Website
**Date:** 2026-01-18
**Author:** Vmj
**Status:** Draft
**Phase:** 3 (Solutioning - Pre-Implementation)

---

## Executive Summary

This document defines the system-level testability assessment and test strategy for the Invenex Solutions website project. Based on the architecture decisions (Next.js 15, Sanity CMS, Vercel, TypeScript strict), this review evaluates testability, identifies architecturally significant requirements, and recommends a test levels strategy.

**Key Findings:**
- Architecture is **well-suited for testing** with clear component boundaries
- RSC/Client separation enables isolated unit and integration testing
- External dependencies (Sanity, Resend) require mocking strategies
- Performance testing infrastructure needed for Lighthouse 90+ target

---

## Testability Assessment

### Controllability: PASS

**Can we control system state for testing?**

| Aspect | Assessment | Details |
|--------|------------|---------|
| API Seeding | ✅ Good | Sanity CMS provides API for test data creation/deletion |
| State Reset | ✅ Good | ISR cache can be invalidated via `revalidateTag('sanity')` |
| Dependency Injection | ✅ Good | Sanity client and Resend client are modular and mockable |
| Form Control | ✅ Good | Server Actions return typed `ActionResult<T>` enabling predictable testing |
| Auth Control | ✅ Good | NextAuth.js session can be mocked/controlled in tests |
| Error Triggering | ⚠️ Moderate | Need test endpoints or mocks to simulate CMS/email failures |

**Recommendations:**
- Create Sanity test dataset for isolated testing
- Mock Resend API in integration tests (no actual email sending)
- Add test-only API route for cache invalidation in staging

### Observability: PASS

**Can we inspect system state and validate results?**

| Aspect | Assessment | Details |
|--------|------------|---------|
| Logging | ⚠️ Moderate | Vercel Logs available but no structured logging defined |
| Metrics | ✅ Good | Vercel Analytics + Speed Insights provide performance metrics |
| Error Visibility | ✅ Good | Error boundaries with user-friendly fallbacks |
| Test Results | ✅ Good | TypeScript strict mode + ESLint catch issues at compile time |
| State Inspection | ✅ Good | RSC are stateless, Client components have predictable React state |
| NFR Validation | ✅ Good | Lighthouse scores, Core Web Vitals measurable via CI |

**Recommendations:**
- Consider structured logging for production debugging (Sentry, LogRocket - Post-MVP)
- Lighthouse CI integration for automated performance validation
- Accessibility auditing via axe-core in Playwright tests

### Reliability: PASS

**Are tests isolated, reproducible, and maintainable?**

| Aspect | Assessment | Details |
|--------|------------|---------|
| Test Isolation | ✅ Good | RSC components are stateless and parallelizable |
| Client Boundaries | ✅ Good | Client components are leaf nodes (no nested `use client`) |
| Determinism | ⚠️ Moderate | Animation tests may be flaky (timing-dependent) |
| Failure Reproduction | ✅ Good | ISR serves stale content during CMS outages (graceful degradation) |
| Loose Coupling | ✅ Good | Clear separation: Sanity → queries.ts → fetch.ts → components |
| Cleanup | ⚠️ Moderate | Need Sanity test data cleanup strategy |

**Recommendations:**
- Skip or disable animations in E2E tests (`prefers-reduced-motion`)
- Use Playwright test fixtures for consistent setup/teardown
- Implement test data factories for Sanity content

---

## Architecturally Significant Requirements (ASRs)

Requirements that drive architecture decisions and pose testability challenges.

### High-Priority ASRs (Score >= 6)

| ASR ID | Source | Requirement | Probability | Impact | Score | Testing Challenge |
|--------|--------|-------------|-------------|--------|-------|-------------------|
| ASR-001 | NFR5 | Lighthouse Performance >= 90 | 3 | 3 | **9** | Requires CI-integrated Lighthouse audits, real-device testing |
| ASR-002 | NFR2-4 | Core Web Vitals (LCP < 2.5s, INP < 200ms, CLS < 0.1) | 3 | 3 | **9** | Production-like environment needed for accurate metrics |
| ASR-003 | NFR16 | WCAG 2.1 AA Compliance | 2 | 3 | **6** | Automated + manual accessibility auditing required |
| ASR-004 | NFR10 | Admin Authentication Security | 2 | 3 | **6** | Auth flow testing, session management validation |
| ASR-005 | NFR23 | Email Delivery > 95% | 2 | 3 | **6** | Cannot test actual delivery in CI; mock + monitoring |
| ASR-006 | NFR27 | 99.9% Availability | 2 | 3 | **6** | Infrastructure testing via Vercel; error boundary validation |

### Medium-Priority ASRs (Score 3-5)

| ASR ID | Source | Requirement | Probability | Impact | Score | Testing Challenge |
|--------|--------|-------------|-------------|--------|-------|-------------------|
| ASR-007 | NFR7 | Initial bundle < 200KB JS | 2 | 2 | **4** | Bundle analyzer in CI, size budgets |
| ASR-008 | NFR11 | Server-side form validation | 2 | 2 | **4** | Zod schema unit tests, integration tests for actions |
| ASR-009 | NFR22 | CMS 99.9% availability | 1 | 3 | **3** | ISR fallback testing, mock CMS failures |
| ASR-010 | NFR29 | Offline support | 1 | 2 | **2** | Service worker E2E testing |

---

## Test Levels Strategy

### Recommended Distribution

Based on architecture (Next.js 15 RSC-first, Sanity CMS, Vercel):

| Level | Percentage | Rationale |
|-------|------------|-----------|
| **Unit** | 30% | Utility functions, Zod schemas, formatters, pure logic |
| **Integration** | 40% | Server Actions, API routes, Sanity queries, component interactions |
| **E2E** | 30% | Critical user journeys, performance, accessibility |

### Test Level Definitions

**Unit Tests (30%)**
- **Scope:** Pure functions, utilities, Zod schemas
- **Tools:** Vitest (preferred for Next.js 15)
- **Execution:** On every commit (< 30s)
- **Examples:**
  - `cn()` utility function
  - `formatDate()`, `formatCurrency()` helpers
  - `contactFormSchema` validation
  - `careerFormSchema` validation
  - Action result type guards

**Integration Tests (40%)**
- **Scope:** Server Actions, API routes, Sanity data fetching, component compositions
- **Tools:** Vitest + React Testing Library, MSW for mocking
- **Execution:** On PR (< 5 min)
- **Examples:**
  - `submitContactAction()` with mocked Resend
  - `submitCareerAction()` with file upload
  - `/api/sanity/revalidate` webhook handler
  - Sanity query functions with mocked responses
  - Form components with mocked actions

**E2E Tests (30%)**
- **Scope:** Critical user journeys, cross-page flows, visual regression
- **Tools:** Playwright
- **Execution:** On PR to main, nightly regression (< 10 min)
- **Examples:**
  - Quote request submission (full journey)
  - Job application with resume upload
  - Portfolio filtering and navigation
  - Mobile navigation (hamburger menu)
  - Share functionality
  - Accessibility audit (axe-core)
  - Lighthouse performance audit

---

## NFR Testing Approach

### Security Testing (NFR9-NFR15)

| NFR | Test Approach | Tools | Priority |
|-----|---------------|-------|----------|
| NFR9 HTTPS | E2E verify redirect, certificate validity | Playwright, SSL checkers | P0 |
| NFR10 Admin Auth | E2E login flows, session tests, unauthorized access attempts | Playwright | P0 |
| NFR11 Form Validation | Unit tests for Zod schemas, integration tests bypass attempts | Vitest | P0 |
| NFR12 XSS Prevention | E2E inject script tags in forms, verify sanitization | Playwright | P1 |
| NFR13 CSRF | Integration test token validation, cross-origin requests | Vitest + MSW | P1 |
| NFR14 Security Headers | E2E verify response headers (X-Frame-Options, CSP) | Playwright, curl | P1 |
| NFR15 Env Secrets | Build-time verification, no client exposure | CI checks | P0 |

### Performance Testing (NFR1-NFR8)

| NFR | Test Approach | Tools | Priority |
|-----|---------------|-------|----------|
| NFR1-4 Core Web Vitals | Lighthouse CI on key pages, real user monitoring | Lighthouse CI, Vercel Speed Insights | P0 |
| NFR5 Lighthouse >= 90 | CI gate on all 4 categories | Lighthouse CI, GitHub Action | P0 |
| NFR6 TTFB < 600ms | Performance benchmarks in CI | WebPageTest API, Playwright metrics | P1 |
| NFR7 Bundle < 200KB | Bundle size tracking in CI | @next/bundle-analyzer, size-limit | P0 |
| NFR8 Image Optimization | Visual regression, lazy loading verification | Playwright, Lighthouse | P1 |

### Accessibility Testing (NFR16-NFR21)

| NFR | Test Approach | Tools | Priority |
|-----|---------------|-------|----------|
| NFR16 WCAG 2.1 AA | Automated axe-core audits on all pages | @axe-core/playwright | P0 |
| NFR17 Color Contrast | Automated contrast checks | axe-core, Lighthouse | P0 |
| NFR18 Keyboard Nav | E2E tab navigation tests | Playwright keyboard API | P0 |
| NFR19 Screen Reader | Manual testing + automated landmark checks | VoiceOver, NVDA, axe-core | P1 |
| NFR20 Reduced Motion | E2E with prefers-reduced-motion, verify animation disabled | Playwright emulation | P1 |
| NFR21 Focus Indicators | E2E verify visible focus on all interactive elements | Playwright | P0 |

### Reliability Testing (NFR27-NFR30)

| NFR | Test Approach | Tools | Priority |
|-----|---------------|-------|----------|
| NFR27 99.9% Uptime | Vercel infrastructure monitoring, synthetic checks | Vercel, StatusPage | P1 |
| NFR28 Error Handling | E2E trigger errors, verify graceful fallbacks | Playwright, MSW network errors | P0 |
| NFR29 Offline Page | E2E go offline, verify service worker response | Playwright network emulation | P2 |
| NFR30 Build Reliability | CI/CD pipeline validation, preview deployments | Vercel, GitHub Actions | P0 |

### Maintainability Testing (NFR31-NFR34)

| NFR | Test Approach | Tools | Priority |
|-----|---------------|-------|----------|
| NFR31 TypeScript Strict | Build-time type checking, no `any` allowed | tsc, ESLint rules | P0 |
| NFR32 ESLint Zero Errors | Pre-commit hooks, CI gate | ESLint, Husky | P0 |
| NFR33 Documentation | Code review checklist | Manual review | P2 |
| NFR34 CMS Content Updates | E2E verify Sanity publish → site update | Playwright, Sanity webhooks | P1 |

---

## Test Environment Requirements

### Local Development
- **Node.js:** 20.x
- **Package Manager:** npm
- **Test Runner:** Vitest (unit/integration), Playwright (E2E)
- **Mocking:** MSW for API mocking
- **Sanity:** Development dataset

### CI Environment (GitHub Actions)
- **Node.js:** 20.x
- **Playwright:** Latest with Chromium, Firefox, WebKit
- **Lighthouse CI:** Integrated for performance gates
- **Vercel Preview:** Deploy previews for E2E testing
- **Secrets:** Sanity test token, Resend test key

### Staging Environment
- **Platform:** Vercel Preview Deployment
- **CMS:** Staging dataset (separate from production)
- **Email:** Resend test mode (no actual delivery)
- **Purpose:** Full E2E regression, performance testing

### Production Monitoring
- **Vercel Analytics:** Real User Metrics
- **Speed Insights:** Core Web Vitals tracking
- **Error Tracking:** Error boundary reporting (consider Sentry post-MVP)

---

## Testability Concerns

### Identified Concerns

| ID | Concern | Severity | Impact | Mitigation |
|----|---------|----------|--------|------------|
| TC-001 | Animation timing flakiness | Medium | Test reliability | Disable animations in E2E via `prefers-reduced-motion` |
| TC-002 | External service dependencies | Medium | Test isolation | MSW mocking for Sanity/Resend, isolated test datasets |
| TC-003 | ISR cache behavior | Low | Test predictability | Explicit cache invalidation before tests, use `no-store` in tests |
| TC-004 | Real email verification | Low | Delivery testing | Cannot test actual delivery; use webhook logs, Resend test mode |
| TC-005 | Mobile device testing | Medium | Platform coverage | Playwright device emulation, limited real device testing |
| TC-006 | Performance variance | Medium | Metrics consistency | Run Lighthouse CI multiple times, use percentiles |

### Blocker Assessment: NONE

No architectural decisions fundamentally prevent testing. All concerns have viable mitigations.

---

## Recommendations for Sprint 0

### Framework Setup (`*testarch-framework` workflow)

1. **Install Vitest** for unit/integration testing
   ```bash
   npm install -D vitest @testing-library/react @testing-library/dom jsdom
   ```

2. **Install Playwright** for E2E testing
   ```bash
   npm install -D @playwright/test @axe-core/playwright
   npx playwright install
   ```

3. **Install MSW** for API mocking
   ```bash
   npm install -D msw
   ```

4. **Configure Lighthouse CI**
   ```bash
   npm install -D @lhci/cli
   ```

### CI Pipeline Setup (`*testarch-ci` workflow)

1. **GitHub Actions workflow** with:
   - Unit tests on every push
   - Integration tests on PR
   - E2E tests on PR to main
   - Lighthouse CI performance gate
   - Bundle size checks

2. **Quality Gates:**
   - All unit tests pass (100%)
   - All integration tests pass (100%)
   - E2E critical path tests pass (100%)
   - Lighthouse Performance >= 90
   - Accessibility axe-core: 0 violations
   - Bundle size < 200KB

### Test Data Strategy

1. **Sanity Test Dataset:**
   - Create dedicated `test` dataset in Sanity
   - Seed with minimum viable content (3 projects, 2 jobs, 1 testimonial)
   - Cleanup script for test isolation

2. **Fixtures:**
   - Contact form valid/invalid data
   - Career application with mock file
   - Project filter scenarios

---

## Test Coverage Targets

### By Requirement Category

| Category | FR Count | Coverage Target | Rationale |
|----------|----------|-----------------|-----------|
| Content Presentation | 7 | 80% | Static pages, E2E navigation tests |
| Portfolio & Case Studies | 6 | 90% | Critical user journey, filter logic |
| Lead Generation | 6 | 95% | Business critical, form validation |
| Talent Acquisition | 8 | 95% | Business critical, file upload |
| Content Management | 8 | 70% | CMS-dependent, admin flows |
| User Engagement | 6 | 60% | Animations harder to test |
| SEO | 5 | 100% | Automated meta/schema checks |
| Accessibility | 4 | 100% | axe-core automation |

### By Test Level

| Level | Test Count (Est.) | Coverage |
|-------|-------------------|----------|
| Unit | 50-60 tests | Utilities, schemas, helpers |
| Integration | 30-40 tests | Actions, API routes, queries |
| E2E | 20-25 tests | User journeys, accessibility |
| **Total** | 100-125 tests | |

---

## Quality Gate Criteria

### Pre-Implementation Gate (Current Phase)

- [x] Architecture reviewed for testability
- [x] ASRs identified and scored
- [x] Test levels strategy defined
- [x] NFR testing approaches documented
- [x] Testability concerns flagged with mitigations
- [x] Sprint 0 recommendations provided

### Sprint 0 Gate (Framework Setup)

- [ ] Vitest configured and running
- [ ] Playwright installed with base config
- [ ] MSW handlers for Sanity/Resend
- [ ] Lighthouse CI integrated
- [ ] CI pipeline with quality gates
- [ ] Test data seeding scripts

### Per-Epic Gate (Implementation Phase)

- [ ] All P0 tests pass (100%)
- [ ] P1 tests pass rate >= 95%
- [ ] No high-priority risks unmitigated
- [ ] Lighthouse Performance >= 90
- [ ] axe-core: 0 critical/serious violations

---

## Follow-on Workflows

After implementation begins:

1. **`*testarch-atdd`** - Generate failing acceptance tests for P0 scenarios before implementation
2. **`*testarch-automate`** - Expand test automation coverage after implementation
3. **`*testarch-ci`** - Scaffold CI/CD pipeline with test execution
4. **`*testarch-nfr`** - Validate NFRs with evidence-based assessment

---

## Approval

**Test Design Approved By:**

- [ ] Product Manager: _____________ Date: _______
- [ ] Tech Lead: _____________ Date: _______
- [ ] QA Lead: _____________ Date: _______

**Comments:**

---

**Generated by:** BMad TEA Agent - System-Level Test Design
**Workflow:** `_bmad/bmm/testarch/test-design`
**Mode:** System-Level (Phase 3 - Testability Review)
**Version:** 4.0 (BMad v6)
