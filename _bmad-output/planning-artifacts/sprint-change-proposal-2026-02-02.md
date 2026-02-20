# Sprint Change Proposal: Epic Consolidation

**Date:** 2026-02-02
**Requested By:** Seb
**Type:** Scope Correction (Incremental)

---

## Problem Statement

Three enhancement epics (Epic 9 + Epic 10a + Epic 10b) created 27 stories totaling 64% of core MVP size. This scope creep risked:
- Diluted focus on core functionality
- Conflicting design directions (generic "premium UI" vs Stokt-inspired typography)
- Overlapping implementations (custom cursor appeared 3x)

---

## Approved Changes

### Consolidation: New Epic 9 — Stokt-Inspired Design

**Goal:** Transform Invenex into a bold, typography-driven agency site inspired by Stokt Creative.

**Design Principles:**
1. Typography is architecture — headlines fill the viewport
2. Text first, image second — portfolio shows names, images on hover
3. Motion is meaning — animations serve the brand story

### Story List (6 stories)

| ID | Story | Priority | Effort | Original Source |
|----|-------|----------|--------|-----------------|
| 9.1 | Massive Hero Typography | P0 | Medium | Epic 10-stokt 10.1 |
| 9.2 | Scroll Animations | P1 | Medium | Epic 9 original |
| 9.3 | Text-First Portfolio | P0 | Medium-High | Epic 10-stokt 10.2 |
| 9.4 | Bold CTA Section | P1 | Low | Epic 10-stokt 10.4 |
| 9.5 | Bold Stats Section | P1 | Low-Medium | Epic 10-stokt 10.3 |
| 9.6 | Navigation Hover Effects | P2 | Low | Epic 10-stokt 10.6 |

**Total Stories:** 6 (down from 27)
**Reduction:** 78%

---

## Removed Items

### CUT (Not Aligned with Design Direction)

| Item | Reason |
|------|--------|
| Custom Cursor | Generic "premium UI" — not Stokt pattern |
| Floating Orbs | Generic "premium UI" — not Stokt pattern |
| Services as Typography | Lower impact, services cards are functional |

### DEFERRED (Phase 2 Backlog)

| Item | Reason |
|------|--------|
| 3D Brand Element | Heavy implementation, not MVP-critical |
| Video Hero | Heavy implementation, not MVP-critical |
| Page Transitions | Already have scroll animations |
| Founder/Team Spotlight | Optional, can add post-launch |

---

## Deprecated Documents

The following epic documents are superseded by this consolidated Epic 9:

1. `epic-10-stokt-inspired-redesign.md` — Absorbed into consolidated Epic 9
2. `epic-10-complete-site-transformation.md` — Partially absorbed, rest deferred

These files should be moved to `_bmad-output/archive/` or deleted.

---

## Implementation Order

### Phase 1: Typography Foundation
1. Story 9.1: Massive Hero Typography
2. Story 9.4: Bold CTA Section

### Phase 2: Portfolio Transformation
3. Story 9.3: Text-First Portfolio

### Phase 3: Visual Polish
4. Story 9.2: Scroll Animations
5. Story 9.5: Bold Stats Section
6. Story 9.6: Navigation Hover Effects

---

## Success Metrics

- Homepage feels bold and confident
- Typography dominates over imagery
- Interactions feel intentional
- Lighthouse Performance maintained >85
- Visual cohesion with Stokt-inspired direction

---

## Approval

- [x] Problem identified and confirmed
- [x] Stories evaluated incrementally
- [x] Consolidation approved
- [ ] Sprint status updated
- [ ] Deprecated files archived

**Status:** APPROVED

---

**Prepared By:** John (PM Agent)
**Approved By:** Seb
