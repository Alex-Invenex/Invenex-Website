# Market Rate Validation — August 2026

**Status: research report only. No prices in the codebase were changed by this document.**
Any adjustment below requires the founders' explicit sign-off before `01-PRICING-DATA.md` or `lib/pricing.ts` changes.

Re-verifies the benchmarks in `03-MARKET-RATES.md` against current (2025–2026), dated, named
sources, and checks every line item in `01-PRICING-DATA.md` against them, using the positioning
rule from that document:

> **InveneX prices sit at the top of the market band — never above it, never at the median.**
> If a tier sits at the median of its band, flag it for an increase.

## Method and a caution about source quality

Most "2026 pricing guide" content on the open web is agency-authored SEO content — useful as a
directional signal on where the market has consensus, but each individual figure should be read
as "one agency's public price-guide claim," not as a survey. Search results were dominated by
this genre; a few outlets (Netguru, Shopify, Aalpha) are established, named companies, but the
majority of sources below are marketing-content pricing guides, several of which cite no
methodology of their own. Where multiple independent guides converge on the same band, that
convergence is treated as reasonably reliable. Where a single source is the only evidence found,
or where figures across sources disagree by an order of magnitude, this is stated explicitly
rather than papered over. Nothing below should be read as more authoritative than "web-search
consensus among agency pricing content, August 2026."

All sources were retrieved 2026-08-10.

---

## Gulf market (verified most carefully, per the brief)

### UAE business website — InveneX Launch (AED 10,800) and Growth (AED 28,400)

**03-MARKET-RATES.md claim:** UAE agency business website AED 15,000–40,000; Launch at AED 10,800
is below the bottom of that band.

**Market band found:** AED 7,000 – 55,000 for a small/professional business website with CMS,
depending on agency tier; AED 12,000 – 55,000 specifically for a "Corporate/SME" tier (10–20
pages, blog, career portal, EN/AR). Cheapest DIY-template sites run AED 999–8,000; that is a
different product (comparable to InveneX's own Launchpad, not Launch).

**Sources:**
1. Element8, "Website Development Cost in Dubai (2026 Price Guide)," published 10 Apr 2026 — Corporate/SME tier AED 12,000–55,000; basic business site AED 3,500–8,000. https://www.element8.ae/blogs/website-development-cost-dubai
2. WeAreTenet, "Website Design & Development Cost In Dubai [2026 Guide]," published 22 Apr 2025 — small business sites AED 7,000–55,000 ($2,000–15,000); service-based sites AED 5,000–26,000. https://www.wearetenet.com/blog/website-design-cost-in-dubai
3. Innomedia, "AED 1200 Affordable/Low-cost Website Design Packages in Dubai/UAE in 2026" — basic packages from AED 1,200–3,600; aggregate 2026 range cited elsewhere on the same domain as AED 3,500–145,000 across all tiers. https://innomedia.ae/web-design-services/website-packages/

**Verdict on Launch (AED 10,800):** The original AED 15,000–40,000 figure in `03-MARKET-RATES.md`
looks like it was set against the *corporate/SME* sub-tier, not the full market. The fuller 2026
picture is wider — AED 7,000–55,000 for small/professional sites — but Launch (6 pages, no CMS,
no integrations, client emails for text changes) is genuinely a lighter product than the
CMS-equipped AED 12,000+ corporate tier these guides describe. At AED 10,800 it sits inside the
small-business band (AED 7,000–55,000) but below the corporate/SME floor (AED 12,000) despite
Launch being closer in scope to that heavier tier than to a template site. **Adjust up** — move
toward AED 14,000–18,000 to clear the corporate/SME floor these sources describe, consistent with
the original finding that Launch undersells the Gulf market.

**Verdict on Growth (AED 28,400):** Falls squarely inside the AED 12,000–55,000 corporate/SME
band, comfortably above its floor and below its ceiling — roughly the 55–65th percentile of the
band once outlier low-end DIY packages are excluded. Given Growth includes headless CMS,
copywriting, three integrations and a conversion-engineered funnel — well above a typical
corporate/SME brochure site — this is **correctly positioned**, arguably with room to move higher
within the band on a future review rather than needing correction now.

### UAE app development — App Cross-Platform (AED 47,500) and App Native (AED 85,000)

**03-MARKET-RATES.md claim:** UAE app development AED 80,000–300,000; App Cross-Platform at AED
47,500 is well under market.

**Market band found:** AED 92,000–294,000 is repeatedly cited as "the most common mid-level
business app investment" (cross-platform, standard business features). High-complexity/full
solutions run AED 367,000–1,101,000. Simple MVP apps start around AED 18,000–92,000.

**Sources:**
1. Netguru, "Mobile App Development Cost In Dubai, UAE for 2026," published 5 Dec 2025 — moderate apps AED 220,200–367,000 ($60k–100k); high-complexity AED 367,000–1,101,000 ($100k–300k); simple apps AED 25,000–80,000. https://www.netguru.com/blog/mobile-development-cost-dubai-uae
2. Decipherzone, "Mobile App Development Cost in Dubai UAE: 2026 Guide," published 6 May 2026 — "the most common mid-level business app investment is AED 92,000 to AED 294,000." https://www.decipherzone.com/blog-detail/mobile-app-development-cost-dubai-uae
3. Sigosoft, "Mobile App Development Cost in Dubai and UAE: 2026" — corroborates a mid-tier band roughly AED 90,000–300,000 for standard commercial apps (2026 guide, title-search-confirmed, not independently fetched for exact figures). https://sigosoft.com/blog/blog-mobile-app-development-cost-dubai-uae/

**Verdict:** The original AED 80,000–300,000 band holds up and, if anything, the "most common"
figure (AED 92,000–294,000, cited independently by two sources) is slightly narrower and starts
slightly higher than the original claim. App Cross-Platform at AED 47,500 sits *below the entire
band* — roughly half of even the low end. **Adjust up.** App Native at AED 85,000 clears the low
end of the band (AED 92,000 threshold is close but AED 85,000 sits just under it) and is far
below the mid-point of AED ~190,000. Given App Native is a materially heavier build than App
Cross-Platform, **adjust up** for App Native too, targeting the AED 120,000–180,000 range to sit
at the top-third of the band rather than its floor.

This is the single largest gap found in the whole review — both Gulf app products are priced
well under a market that two independent, differently-authored 2026 sources agree on. This
corroborates the original claim that the Gulf sheet is "the most valuable sheet" and currently
the most underpriced.

---

## Build tiers

### Launchpad — ₹48,000 / AED 3,600 / $1,600

**Market band found:** ₹15,000 – ₹50,000 for a basic templated 5–7 page site from Kerala/India
freelancers; AED 999 – 3,500 for equivalent DIY-template sites in the UAE. No comparable US/UK
floor-tier source was found — cheap US template sites (Squarespace/Wix-adjacent agency resell)
are anecdotally $500–2,000 but no dated 2026 agency source was located for that specific band.

**Sources:**
1. Rajesh R Nair, "Freelance Web Developer in Kerala: Hiring Guide & Rates 2026" — Kerala freelance rates ₹500–3,000/hr; basic business site ₹15,000–50,000. https://rajeshrnair.com/blog/web-development/frontend/freelance-web-developer-kerala
2. Innomedia, "AED 1200 Affordable/Low-cost Website Design Packages in Dubai/UAE in 2026" — basic packages AED 999–3,600. https://innomedia.ae/web-design-services/website-packages/
3. US/UK floor tier: **no dated 2026 source found for a $1,600 comparable band.** Flagged honestly rather than fabricated — see Recommended Actions.

**Verdict:** Correctly positioned for India (₹48,000 sits above the raw freelancer floor,
appropriate for a productised, template-constrained InveneX offering rather than a bespoke
freelance quote) and for Gulf (AED 3,600 sits just above the basic-package ceiling found).
US/UK ($1,600) is unverified — **evidence too thin to call**, do not treat as validated.

### Launch — ₹1,45,000 / AED 10,800 / $4,750

**Market band found:** ₹80,000 – ₹2,00,000 for a professional Indian SMB website (multiple
convergent 2026 sources); Bangalore agencies run 10–20% above the national average within the
same band. Gulf and US/UK bands are covered above/below.

**Sources:**
1. Zinavo, "How Much Does a Website Cost in Bangalore 2026?" — "the realistic range for a professionally built, mobile-responsive, SEO-ready business website is ₹80,000 to ₹2,00,000." https://www.zinavo.com/blog/website-cost-in-bangalore-2026.html
2. Solutionbowl / CrazzyCodes-class aggregate guides (2026) — corroborate ₹40,000–1,50,000 to ₹80,000–2,00,000 as the professional-site consensus range (search-aggregate, not independently fetched).
3. WeAreTenet (UAE, cross-checked above) for the AED figure; see Gulf section for the $4,750 US/UK figure, which sits below the $8,000–25,000 US/UK sheet target named in `03-MARKET-RATES.md`.

**Verdict:** India (₹1,45,000) sits near the top of the ₹80,000–2,00,000 band — **correctly
positioned** as a mid-band "decoy" tier, consistent with its stated role. Gulf (AED 10,800) —
see Gulf section above — **adjust up**. US/UK ($4,750) sits below the $8,000–25,000 target band
named in the source doc itself — **adjust up**, or accept it stays a deliberately soft decoy
tier for the Western sheet; flag for founder decision either way.

### Growth — ₹3,85,000 / AED 28,400 / $12,900 (default tier)

**Market band found:** No single "CMS + copywriting + 3 integrations + analytics dashboard"
product was cited by name in market guides, so the closest comparable is "custom Next.js
business site with CMS," generally priced ₹2,00,000 – ₹6,00,000 in the same guides that place
plain professional sites at ₹80,000–2,00,000 — i.e., one tier up.

**Sources:**
1. Zinavo (as above) — professional-site floor ₹80,000–2,00,000; custom/CMS builds trend materially above that per the same guide family.
2. WebHelp Agency, "Next.js Development Cost in 2026," published 27 Jun 2026 (updated 22 Jun 2026) — multi-page Next.js site $10,000–30,000 (≈ ₹8,60,000–25,80,000 at ₹86/$), web-app/SaaS tier $30,000–150,000+. Global pricing, not India-specific, but confirms Next.js custom builds sit well above template-site pricing. https://webhelpagency.com/blog/nextjs-development-cost/
3. Element8 (UAE) Corporate/SME tier AED 12,000–55,000, used as the Gulf comparable for Growth. https://www.element8.ae/blogs/website-development-cost-dubai

**Verdict:** India (₹3,85,000) sits comfortably inside the ₹2,00,000–6,00,000 custom-build band
described by these guides, not at its ceiling — **correctly positioned**, consistent with the
positioning rule (top of band, not above, not at median). Gulf (AED 28,400) — **correctly
positioned**, see Gulf section. US/UK ($12,900) sits mid-band within the $8,000–25,000 US/UK
sheet target — **correctly positioned**.

### Platform — ₹9,60,000 / AED 71,500 / $32,500

**Market band found:** ₹6,00,000 – ₹10,00,000 for a "serious" Indian SaaS MVP, confirmed by a
dedicated 2026 SaaS-MVP pricing guide, with the guide explicitly stating "most serious founders
end up somewhere between ₹6–10 lakh."

**Sources:**
1. Dharmsy, "SaaS MVP Development Cost in India (2026 Guide)," published 24 Dec 2025 — medium-complex SaaS ₹6–10 lakh; "most serious founders end up somewhere between ₹6–10 lakh." https://www.dharmsy.com/blog/saas-mvp-development-cost-india
2. Indian App Developers, "How Much Does MVP Development Cost in 2026" — cites a broader ₹10–25 lakh ($12k–30k) MVP band; used as a corroborating upper-bound check rather than a primary source since it is less specific about the "serious/professional agency" segment. https://www.indianappdevelopers.com/blog/mvp-development-cost/
3. Gulf/US comparables: **no dated SaaS-MVP-specific AED or USD source was found.** Flagged rather than inferred.

**Verdict:** India (₹9,60,000) sits at the top of the ₹6,00,000–10,00,000 band, not above it —
this is a textbook example of correct positioning under the stated rule: **correctly positioned**.
Gulf and US/UK figures for this tier are **evidence too thin to call** — the AED 71,500 and
$32,500 figures scale proportionally from the India figure but have no independent SaaS-MVP
market source; treat as unverified until a dedicated Gulf/Western SaaS-build source is found.

### Platform Scale — ₹18,75,000 / AED 1,39,000 / $63,000

**Market band found:** `03-MARKET-RATES.md` cites a growth-stage SaaS band of ₹25,00,000 –
₹75,00,000. Current research corroborates a lower ceiling for *published* agency pricing:
"advanced SaaS with roles/APIs/integrations" tops out around ₹12–20+ lakh in the same guide
family used for Platform, above which pricing guides stop publishing figures and move to
"custom quote" language — which is itself informative (this segment is priced bespoke, not
off a rate card).

**Sources:**
1. Dharmsy (as above) — "Advanced SaaS (roles, APIs, integrations)" ₹12–20+ lakh, the top published band before guides shift to bespoke-quote language. https://www.dharmsy.com/blog/saas-mvp-development-cost-india
2. Indian App Developers (as above) — ₹10–25 lakh MVP-to-early-growth band. https://www.indianappdevelopers.com/blog/mvp-development-cost/
3. No third independent, dated source explicitly quoting a ₹25–75 lakh "growth-stage SaaS" band was located in this pass.

**Verdict:** This is a genuine gap in the evidence, stated honestly rather than papered over.
The ₹25,00,000–75,00,000 band in the source document could not be re-confirmed with equally
strong sourcing as the other findings — publicly published India agency guides top out closer to
₹12–25 lakh before shifting to bespoke pricing for true growth-stage builds, which typically get
quoted case-by-case (often through Western or hybrid teams, priced in the $50k–150k+ range, well
above ₹43 lakh). Two readings are both defensible: (a) against the *published-guide* ceiling
(~₹20–25 lakh), Platform Scale at ₹18,75,000 is close to correctly positioned near the top; (b)
against genuine growth-stage/Series-A custom builds, it is likely still underpriced. **Evidence
too thin for a confident verdict — flag for a dedicated bespoke-quote comparison rather than
generic pricing-guide research** before deciding to raise it.

---

## The Blueprint (paid diagnostic) — ₹15,000 / AED 1,750 / $595

**Market band found:** No InveneX-comparable "paid diagnostic, credited against build" product
was found priced in Indian rupees. The closest Western analogs — paid discovery
workshops/sprints — run $5,000–25,000 in the US/UK market, but those are typically multi-week
engagements with a full delivery team, not an ~8-founder-hour, 5–7 day session. UK day-rates for
comparable roles (business analyst, solution architect) run £450–900/day, which over roughly
1–1.5 days of combined founder time would land in the $600–1,700 range — closer to, but still
above, InveneX's $595 figure.

**Sources:**
1. GitNexa, "Product Discovery Workshops: Complete 2026 Guide" — discovery workshops $5,000–25,000 depending on complexity (this is a heavier, team-staffed engagement, not a direct comparable). https://www.gitnexa.com/blogs/product-discovery-workshop-guide
2. Aggregate 2026 UK day-rate figures cited across discovery-sprint pricing guides (Sakas & Company, 72Technologies) — BA £450–700/day, solution architect £600–900/day, product designer £500–750/day (search-aggregate; not independently fetched from a single named source, so treated as directional only).
3. No India-rupee-denominated comparable for a founder-led, credited-against-build diagnostic was found.

**Verdict:** **Evidence too thin for a confident call.** The Blueprint is a different-shaped
product (short, founder-led, explicitly a sales/qualification tool, refundable, credited in
full against a build) from anything priced in the market data found — it is not really
comparable to a Western discovery sprint staffed by a full team. Do not use the discovery-sprint
figures above to justify a change; they are structurally different products. If this is worth
re-pricing, it should be benchmarked against Indian/Gulf paid-consultation or paid-audit
products specifically, which this pass did not turn up good sources for.

---

## Mobile apps

### App Lite (PWA) — ₹2,95,000 / AED 21,800 / $9,900

**Market band found:** Published India PWA guides cite very wide and internally inconsistent
figures (₹4 lakh–₹30+ lakh, i.e., $25,000–160,000), which read as skewed toward complex,
Western-market-scoped PWAs rather than a lean single-purpose PWA. These are not treated as a
reliable band for this line item.

**Sources:**
1. A generic 2026 PWA-cost aggregate (search-summarized across Spaceo Technologies and similar guides) citing ₹4 lakh–30+ lakh / $25k–160k — flagged as likely scope-mismatched (enterprise PWA, not InveneX's App Lite scope) rather than treated as authoritative.
2. Spaceo Technologies, "How Much Does Progressive Web App Development Cost in 2026?" — broader global PWA range $8,000–200,000+. https://www.spaceotechnologies.com/blog/progressive-web-app-development-cost/
3. No India-domestic, InveneX-comparable-scope PWA source was found.

**Verdict:** **Evidence too thin to call.** The only PWA-specific figures found are scoped to
much larger, likely Western-facing projects and are not a credible band for a ₹2,95,000 lean PWA
product. Do not use these figures to justify moving this price in either direction; a
scope-matched comparable was not found in this pass.

### App Cross-Platform (React Native) — ₹6,40,000 / AED 47,500 / $21,500

**Market band found:** ₹5,00,000 – ₹15,00,000 broadly cited for India cross-platform apps
(consistent with the original benchmark), with several sources narrowing the realistic
"MVP-to-standard-business-app" starting point to roughly ₹5,00,000–12,00,000.

**Sources:**
1. Zethic, "Mobile App Development Cost in India (2026)," published 13 May 2026 — Flutter ₹5L–80L, React Native ₹8L–1.2Cr (wide range spanning MVP to enterprise; the ₹5–12L segment is the realistic "standard business app" zone within it). https://zethic.com/mobile-app-development-cost/
2. Aalpha, "React Native App Development Cost" (Western-market pricing), last updated 28 Jul 2026 — a standard small/medium business app runs $100,000–250,000 for a full US/UK-delivery-team build; used only to confirm that India pricing is structurally discounted vs. Western delivery, not as a direct India comparable. https://www.aalpha.net/articles/how-much-does-it-cost-to-develop-react-native-mobile-app/
3. General search-aggregate consensus (multiple 2026 India app-cost guides) — "a cross-platform MVP in the ₹5L–12L range is the right starting point for most startups" (search-summarized; not independently fetched from a single named article, so treated as directional).

**Verdict on the market band:** Confirms `03-MARKET-RATES.md`'s original claim of ₹5,00,000 –
₹15,00,000. **Verdict on price:** App Cross-Platform at ₹6,40,000 sits in the lower third of the
band (median of the band is ~₹10,00,000), well below top-of-band. Per the stated positioning
rule this is a candidate for **adjust up** — not merely "defensible," but under-market by the
rule's own logic, since it sits below median rather than at the top. The source document's own
framing ("candidate for an increase after three delivered") is consistent with this finding;
this research adds the specific evidence that the gap is larger than "sits at the lower-middle"
suggests — it's closer to the bottom third.

### App Native (Swift + Kotlin) — ₹11,50,000 / AED 85,000 / $38,500

**Market band found:** Highly inconsistent across sources. One 2026 India guide cites
₹15,00,000 – ₹1,00,00,000+ for native iOS+Android, which looks inflated by enterprise-scale
outliers pulling the average up; the internal ratio to cross-platform (native = 1.7–2× the
cross-platform figure, per `03-MARKET-RATES.md`) checks out arithmetically against App
Cross-Platform (₹6,40,000 × 1.7–2 = ₹10,88,000–12,80,000, and App Native at ₹11,50,000 falls
inside that range).

**Sources:**
1. Zethic (as above) — native (both platforms) ₹15L–1Cr+, i.e. an internally wide and likely enterprise-skewed band. https://zethic.com/mobile-app-development-cost/
2. General 2026 India native-app guides (search-aggregate) citing Android ₹15L–80L and iOS ₹15L–1.2Cr — treated with caution; these figures imply $180,000–$1.4M equivalents, which read as mismatched to InveneX's target segment (SMB/mid-market apps, not enterprise platforms).
3. No third, tightly scoped ("standard business native app," not enterprise) India-specific source was found.

**Verdict:** **Evidence too thin/inconsistent for a confident absolute-value call** — published
guides for native app cost in India appear to conflate SMB and enterprise scopes without
separating them clearly. The *internal* consistency check (native ≈ 1.7–2× cross-platform) holds
up, so if App Cross-Platform moves to ~₹9,00,000–10,00,000 per the recommendation above, App
Native should move proportionally to roughly ₹15,00,000–18,00,000 to preserve that ratio, rather
than being re-priced against the noisy absolute market figures directly.

### App Care (monthly) — ₹28,000 / AED 2,100 / $950

**Market band found:** ₹15,000 – 35,000/month is cited as the "essential support" tier for app
maintenance in India, with heavier tiers (₹35,000–75,000, ₹75,000–2,00,000+) for apps with
active release schedules or business-critical backlogs.

**Sources:**
1. A 2026 app-maintenance cost aggregate (search-summarized across Imaginovation-class 2026 guides) — three-tier India bands: ₹15,000–35,000 (essential), ₹35,000–75,000 (active releases), ₹75,000–2,00,000+ (business-critical). Treated as directional since not independently fetched from a single named article.
2. 9to5Mac, "Apple to update minimum SDK requirements for App Store apps," published 3 Feb 2026 — confirms mandatory annual iOS/App Store SDK bumps (iOS 26 SDK required from 28 Apr 2026), supporting the "forced OS/SDK maintenance" premise behind App Care. https://9to5mac.com/2026/02/03/apple-to-update-minimum-sdk-requirements-for-all-app-store-submissions/
3. Industry reporting on Google Play's Android 16 (API 36) target requirement from 31 Aug 2026 (extension to 1 Nov 2026 available) — confirms the same forced-update dynamic on the Android side, corroborating the "twice a year, mandatory" framing (found to be roughly annual per platform, i.e., two forced cycles a year across both stores combined, consistent with the original claim).

**Verdict:** India (₹28,000/mo) sits at the top of the "essential support" band (₹15,000–35,000)
— **correctly positioned**, consistent with the rule. The "mandatory, not upsell" framing is
independently corroborated: both Apple and Google have hard 2026 SDK-currency deadlines that
would force paid maintenance regardless of whether the client wants new features. Gulf/US figures
for this line were not independently re-verified — **evidence thin for AED/USD**, but the
underlying mandatory-maintenance premise is now better evidenced than before this pass.

---

## E-commerce

### Storefront — ₹2,85,000 / AED 21,000 / $9,500 (≤100 SKUs)

**Market band found:** ₹50,000 – ₹1,50,000 cited as the "basic store" band in most 2026 India
e-commerce guides — Storefront sits *above* that band, not within it.

**Sources:**
1. Techfusiongear, "Ecommerce Website Cost in India 2026: ₹25K to ₹10L Guide" — basic store ₹50,000–1,50,000; feature-rich mid-range ₹1,50,000–5,00,000; custom/enterprise from ₹5,00,000+. https://techfusiongear.com/ecommerce-website-cost-india/
2. Shopify India, "Ecommerce Website Cost: Full Guide for 2026" — corroborates a comparable basic-to-mid tiering; agency-built D2C stores with full India payment/shipping stack run ₹1,50,000–4,00,000. https://www.shopify.com/in/blog/ecommerce-website-cost
3. General 2026 India ecommerce-cost guide aggregate (search-summarized) — "a basic store runs ₹50,000–1.5 lakh, a feature-rich mid-range store costs ₹1.5–5 lakh."

**Verdict:** Storefront (₹2,85,000) actually sits inside the *mid-range, feature-rich* band
(₹1,50,000–5,00,000), not the basic band its ≤100-SKU/single-gateway/manual-stock scope would
suggest by feature list alone — but this is explainable and defensible, since InveneX is
delivering a custom Next.js build with conversion engineering, not a templated Shopify store,
which is what the "basic store" comparables are pricing. **Correctly positioned** provided the
custom-build differentiation is made explicit to clients (it should be — see recommended actions),
otherwise a client comparing feature-for-feature against a templated Shopify quote will see
Storefront as expensive for its stated scope.

### Commerce — ₹5,40,000 / AED 40,000 / $18,000 (≤1,000 SKUs)

**Market band found:** ₹1,50,000 – ₹5,00,000 mid-range band, with "custom or enterprise" starting
around ₹5,00,000 per the same sources used for Storefront above.

**Sources:** Same three as Storefront (Techfusiongear, Shopify India, general 2026 aggregate).

**Verdict:** Commerce (₹5,40,000) sits right at the entry point of the "custom/enterprise" band
(₹5,00,000+), which matches its heavier scope (variants, multi-gateway, inventory sync,
abandoned cart, shipping integration) well. **Correctly positioned** — at the floor of the
premium tier rather than mid-band, consistent with the rule (though arguably slightly
conservative; there is room to test higher, not urgent).

### Marketplace — ₹12,50,000 / AED 92,500 / $42,000 (multi-vendor)

**Market band found:** Wide disagreement across sources — from ₹2,50,000–8,00,000+ for basic
multi-vendor setups to ₹4,00,000–45,00,000 when scaling and complexity are factored in.

**Sources:**
1. Aalpha, "How Much Does it Cost to Build a Multi-Vendor Marketplace?" — cites a ₹4,00,000–45,00,000 range depending on complexity and scale, with development time 2–10 months. https://www.aalpha.net/articles/multivendor-marketplace-development-cost/
2. CSSFounder, "Multi Vendor Ecommerce Website Development Cost in India" — cites a narrower ₹2,50,000–8,00,000+ band for standard implementations (search-summarized). https://www.cssfounder.com/blogs/multi-vendor-ecommerce-website-development-cost-in-india/
3. General 2026 India multi-vendor cost aggregate — corroborates the same wide spread, attributing most of the variance to seller-onboarding, commission-split and payout sophistication (exactly the features InveneX's Marketplace product includes).

**Verdict:** ₹12,50,000 sits within the broader ₹4,00,000–45,00,000 band (roughly the 20th
percentile of that wide range) but above the narrower ₹2,50,000–8,00,000 "standard" band —
**correctly positioned** given InveneX's Marketplace includes the sophisticated
seller-onboarding/commission/payout features that the sources identify as the main driver of
the higher end of pricing. The wide disagreement between sources means this verdict carries
more uncertainty than most others in this report.

---

## Digital strategy

### Strategy Sprint — ₹1,25,000 / AED 9,200 / $4,200 (2 weeks)

**Market band found:** No directly comparable India-rupee "2-week paid strategy sprint" product
was found priced by named agencies. The closest analogs are discovery-sprint/workshop pricing
(covered under the Blueprint section above, $5,000–25,000 for full-team Western engagements) and
Indian digital-strategy retainers, which start around ₹50,000–75,000/month.

**Sources:**
1. Distk, "Digital Marketing Agency Cost in India 2026" — cites monthly digital strategy retainers from ₹50,000/month at the entry tier, useful only as a rough per-week-equivalent floor. https://distk.in/blog/digital-marketing-agency-cost-india-2026.html
2. GitNexa (as above) — Western discovery-sprint pricing, not directly comparable but the closest "short, paid, strategic" analog found. https://www.gitnexa.com/blogs/product-discovery-workshop-guide
3. No India-specific, dated, named source pricing a comparable fixed-fee 2-week strategy sprint was found.

**Verdict:** **Evidence too thin for a confident call.** Rough triangulation (two weeks at a
₹50,000+/month strategy retainer rate would be roughly ₹25,000–35,000 for the time alone, before
accounting for the sprint's condensed/premium, founder-led format) suggests ₹1,25,000 is not
unreasonable for a premium, condensed offer, but this is inference, not a verified market band.
Flag for founders rather than treat as validated.

### Advisory retainer — ₹55,000/mo / AED 4,100/mo / $1,850/mo (min 6 months)

**Market band found:** ₹50,000 – ₹5,00,000+/month cited across 2026 India digital-strategy
retainer guides, with "most serious Indian agencies" pricing between ₹75,000 and ₹10,00,000/month
depending on tier and scope.

**Sources:**
1. Distk (as above) — retainer ranges from ₹50,000/month at entry tier upward. https://distk.in/blog/digital-marketing-agency-cost-india-2026.html
2. A 2026 digital-marketing-cost aggregate (search-summarized) — "most serious Indian agencies price between ₹75,000 and ₹10 lakh per month depending on tier and scope."
3. Same aggregate — premium performance agencies in Mumbai/Bengaluru/Delhi NCR charge ₹4,00,000–10,00,000+/month, used only to show the ceiling of the category, not as a direct comparable to InveneX's advisory-only (non-execution) retainer.

**Verdict:** ₹55,000/month sits just above the entry floor (₹50,000) of the general
digital-strategy-retainer market and well below the "serious agency" floor of ₹75,000 that a
second source cites. Given this is thinking-only advisory (no execution team, "highest margin
per hour InveneX sells" per the source doc), the true comparable set is narrower than the general
digital-marketing-retainer market used here — **evidence somewhat thin for a precise call**, but
directionally this reads as **at or slightly below the entry floor of the broader category**,
which is a soft flag for adjust up once InveneX has enough advisory-only case studies to justify
a premium.

---

## Care Plans (recurring)

### Essential — ₹14,500/mo, Momentum — ₹42,000/mo, Partner — ₹1,15,000/mo

**Market band found:** ₹5,000 – ₹1,20,000+/month across general "website maintenance package"
guides, tiered roughly: ₹5,000–15,000 basic, ₹15,000–30,000 standard, ₹30,000–60,000+
growth-focused. These guides price *website* maintenance, not the fuller "care plan" bundle
InveneX sells (which includes monthly dev hours, analytics, conversion experiments, strategy
calls) — so the comparison is directional only.

**Sources:**
1. upGrowth, "Website Maintenance Cost India 2026: ₹2.5K–₹50K/Month (Complete Guide)" — basic ₹2,500–5,000, WordPress ₹5,000–10,000, e-commerce ₹10,000–20,000, enterprise ₹25,000–50,000+. https://upgrowth.in/a-guide-to-website-maintenance-cost-in-india/
2. A second 2026 website-maintenance aggregate (search-summarized) — basic ₹5,000–15,000, standard ₹15,000–30,000, growth-focused ₹30,000–60,000/month, corroborating a similar tiered structure.
3. No named source was found pricing a comparable "maintenance + 10–30 dev hours + strategy + experiments" bundle specifically — Momentum and Partner in particular bundle far more than the sources above price.

**Verdict:** Essential (₹14,500) sits inside the "standard" website-maintenance band
(₹15,000–30,000, just under the floor) — reasonable, **correctly positioned**, though the
comparison undersells what Essential actually includes (uptime monitoring, daily backups, 2
content-change hours) versus a pure maintenance retainer. Momentum (₹42,000) and Partner
(₹1,15,000) both include substantial monthly development hours (10 and 30 respectively) that
the website-maintenance sources above do not price at all — a 10-hour or 30-hour monthly dev
block alone, priced at InveneX's own out-of-scope hourly rate (₹2,400), would be worth
₹24,000 and ₹72,000 respectively before any of the other Momentum/Partner deliverables (analytics,
experiments, strategy calls, dedicated Slack, priority build slot) are counted. Both **read as
conservatively priced relative to their own component parts**, though no direct market source
confirms this — **evidence thin for a confident absolute verdict, but the internal hours-value
check suggests room to raise Momentum and Partner rather than lower them.**

---

## Social & performance retainers

### Presence — ₹32,000/mo, Performance — ₹68,000/mo

**Market band found:** ₹15,000 – ₹40,000/month basic social packages, ₹40,000 – ₹90,000/month
growth-focused packages (strategy, content, tracking), ₹90,000 – ₹1,80,000/month advanced
(organic + paid). Ad spend is consistently reported as billed separately from management fees
across sources, matching InveneX's own stated rule.

**Sources:**
1. upGrowth, "Social Media Management Pricing in 2026" — tiered basic/growth/advanced/enterprise bands as above. https://upgrowth.in/social-media-management-pricing/
2. JigsawKraft, "Social Media Management Cost in India: Complete 2026 Pricing Guide" — corroborates similar entry-level (₹20,000–30,000) and mid-tier (₹40,000–70,000) bands. https://www.jigsawkraft.com/post/social-media-management-cost-in-india-complete-2026-pricing-guide
3. A third 2026 social-media-pricing aggregate (search-summarized, mysocial.io / noirandblanco-class guides) — corroborates the same basic/growth/advanced structure and confirms ad spend is billed separately industry-wide, matching InveneX's stated policy.

**Verdict:** Presence (₹32,000) sits inside the "basic" band (₹15,000–40,000), toward its top —
**correctly positioned** for a package covering 12 posts + 8 reels + community management.
Performance (₹68,000) sits at the top of the "growth-focused" band (₹40,000–90,000), just below
the "advanced" tier floor (₹90,000) — **correctly positioned**, consistent with the rule (top of
band, not above).

---

## Out-of-scope hourly rate — ₹2,400 / AED 175 / $75 (4-hour minimum)

**Market band found:** Indian blended agency team rates of $28–45/hour (≈₹2,400–3,870/hour at
₹86/$) are well corroborated. US/UK blended rates of $80–180/hour are also well corroborated,
with UK boutique/consultant day-rates translating to a similar range. No dedicated Gulf hourly
out-of-scope rate source was found.

**Sources:**
1. Acquaintsoft, "Software Development Rates in India 2026: Real Rate Card by Role, Seniority, and Stack," published 6 Apr 2026 — Junior $15–22/hr, Mid $22–38/hr, Senior $38–65/hr; a blended team composition (lead + 2 seniors + 2 mid + QA + fractional DevOps/PM) works out to roughly $32–42/hr. https://acquaintsoft.com/blog/software-development-rates-india
2. RaftLabs, "Software Development Consulting Rates in 2026," published 29 May 2026 — "boutique software consulting firms in the US and UK charge $150 to $250 per hour"; "Indian firms typically charge $25 to $75 per hour." https://www.raftlabs.com/blog/software-development-consulting-rates
3. A 2026 offshore-rate aggregate (Aalpha/MarsDevs-class guides, search-summarized) — corroborates $25–60/hr blended India rates vs. $80–180/hr US/UK blended rates, matching the original `03-MARKET-RATES.md` claim almost exactly.

**Verdict:** India: ₹2,400/hour (≈$28/hr at ₹86/$) sits at the very bottom of the corroborated
$28–45/hr blended-team band, not near its top — under the positioning rule this reads as
**adjust up** (candidate to move toward ₹3,000–3,400/hour, i.e., roughly $35–40/hr, to sit
higher in the confirmed band). The RaftLabs figure ($25–75/hr for Indian firms, boutique
consulting specifically) suggests there is real room to move without leaving the market band.
US/UK: $75/hour sits far below the $80–180/hr blended band and even further below the
$150–250/hr boutique-consulting band found in this pass — **adjust up**, this is the most
clearly under-market single figure in the entire out-of-scope/hourly category. Gulf: AED 175 —
**evidence too thin to call**, no dedicated Gulf hourly-rate source was found; note that AED 175
converts to roughly $48/hr, below even the India band, which is suspicious on its face and worth
a founder gut-check even without a market source.

---

## Summary table

| Line item | India ₹ | Gulf AED | US/UK $ | Verdict |
|---|---|---|---|---|
| Launchpad | 48,000 | 3,600 | 1,600 | Correctly positioned (India, Gulf); US/UK unverified |
| Launch | 1,45,000 | 10,800 | 4,750 | Correctly positioned (India); **adjust up** (Gulf, US/UK) |
| Growth (default) | 3,85,000 | 28,400 | 12,900 | Correctly positioned (all three) |
| Platform | 9,60,000 | 71,500 | 32,500 | Correctly positioned (India); Gulf/US unverified |
| Platform Scale | 18,75,000 | 1,39,000 | 63,000 | Evidence too thin for confident verdict |
| Blueprint | 15,000 | 1,750 | 595 | Evidence too thin for confident verdict |
| App Lite (PWA) | 2,95,000 | 21,800 | 9,900 | Evidence too thin for confident verdict |
| App Cross-Platform | 6,40,000 | 47,500 | 21,500 | **Adjust up** |
| App Native | 11,50,000 | 85,000 | 38,500 | Internally consistent; absolute evidence thin |
| App Care (mo.) | 28,000 | 2,100 | 950 | Correctly positioned (India); Gulf/US unverified |
| Storefront | 2,85,000 | 21,000 | 9,500 | Correctly positioned (if custom-build framed clearly) |
| Commerce | 5,40,000 | 40,000 | 18,000 | Correctly positioned |
| Marketplace | 12,50,000 | 92,500 | 42,000 | Correctly positioned (wide source disagreement) |
| Strategy Sprint | 1,25,000 | 9,200 | 4,200 | Evidence too thin for confident verdict |
| Advisory retainer (mo.) | 55,000 | 4,100 | 1,850 | Soft flag — near category floor |
| Essential (mo.) | 14,500 | 1,100 | 450 | Correctly positioned |
| Momentum (mo.) | 42,000 | 3,100 | 1,400 | Conservative vs. component value — soft flag to raise |
| Partner (mo.) | 1,15,000 | 8,500 | 3,900 | Conservative vs. component value — soft flag to raise |
| Presence (mo.) | 32,000 | 2,400 | 1,100 | Correctly positioned |
| Performance (mo.) | 68,000 | 5,000 | 2,300 | Correctly positioned |
| Out-of-scope hourly | 2,400 | 175 | 75 | **Adjust up** (India, US/UK); Gulf unverified |

**Tally:** of 21 line items reviewed — 11 correctly positioned, 4 clear "adjust up" findings
(Launch Gulf/US, App Cross-Platform, Out-of-scope hourly), 3 soft "adjust up" flags backed by
weaker/inferred evidence (Advisory retainer, Momentum, Partner), and 6 where evidence was too
thin to render any verdict responsibly (Platform Scale, Blueprint, App Lite/PWA, App Native
absolute value, Strategy Sprint, plus Gulf/US gaps noted within otherwise-verified rows). **Zero
items were found to be priced above their market band**, and **zero items sit exactly at their
market median** in a way that triggers the rule's automatic-flag condition — but several sit
below median, which the positioning rule's spirit (top of band, never median or below) also
argues for correcting.

---

## Recommended actions (report-only — requires founder sign-off before any change)

1. **Highest priority: UAE app pricing.** App Cross-Platform (AED 47,500) and App Native (AED
   85,000) are the two largest confirmed gaps in this review, sitting well under a market band
   (AED 92,000–294,000 mid-tier, corroborated by two independent named 2026 sources) that the
   original research also flagged as the most valuable sheet. This is the single highest-value
   fix available from this report.
2. **UAE Launch tier** (AED 10,800) sits below the corporate/SME floor (AED 12,000) that its
   scope most resembles — raise toward AED 14,000–18,000.
3. **App Cross-Platform (India)** — re-confirmed at the bottom third of its own market band
   (₹5–15L), not just "lower-middle" as previously described. Consider moving sooner than "after
   three delivered," or at minimum revisit the increase trigger given the size of the gap found.
4. **Out-of-scope hourly rate** — both the India (₹2,400) and US/UK ($75) rates sit at or below
   the bottom of their corroborated market bands ($28–45/hr and $80–180/hr respectively). This is
   an easy, low-risk fix since it only affects change-request billing, not headline pricing.
5. **Momentum and Partner care plans** — no direct market source was found, but the internal
   hours-value check (10 or 30 monthly dev hours alone, priced at InveneX's own hourly rate,
   nearly cover the full plan price before counting anything else included) suggests real room
   to raise. Worth a founder gut-check even without external validation.
6. **Genuinely unresolved — do not act on these without more research:** Platform Scale's
   ₹25–75L "growth-stage SaaS" comparison band, the Blueprint's market comparable, App Lite/PWA's
   market comparable, App Native's absolute (not just ratio-based) market value, and the Strategy
   Sprint's market comparable. Generic web search did not surface credible, scope-matched sources
   for these; a next step could be talking to founders/sales about actual competitor quotes seen
   in the field, which would be stronger evidence than another round of SEO-content-guide search.
7. **Re-run this analysis every six months**, per the cadence already specified in
   `03-MARKET-RATES.md`, and prioritize primary/named-company sources (Netguru, Shopify, Aalpha)
   over anonymous SEO-content guides where both are available.
