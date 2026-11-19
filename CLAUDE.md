# SS Legal website: project brief

Read this file at the start of every session. It records decisions already made. Do not change a decision listed here without asking Affan first.

## What this is

A website for a new UK commercial disputes legal agency, working name **SS Legal** (placeholder, final name not chosen). The founder is **Syed Safi Ullah**, a solicitor of England and Wales. Clients are expected to be in the UK and overseas.

The most important part of the site is the **enquiry and booking flow**. Everything else supports it.

Affan is building the site. Safi approves designs and content. Every design and copy decision is shown to Affan for approval before it is built on.

## Stack

- **Framework:** Astro (static output), TypeScript
- **Hosting:** Cloudflare Pages, deployed from GitHub on every push to `main`
- **Server code:** Cloudflare Pages Functions, only for the enquiry submission
- **Enquiry emails:** Resend (free tier: 3,000 emails a month, 100 a day)
- **Booking:** Cal.com embed (free individual plan)
- **Content editing:** a Git-based CMS (Keystatic or Decap CMS) so the team can edit text, team members and practice area pages without code. Pick one, explain the choice to Affan, wait for approval.
- **Motion:** GSAP with ScrollTrigger, plus Lenis for smooth scrolling
- **Fonts:** Newsreader (headings) and Instrument Sans (body), self-hosted through Fontsource, not loaded from Google's servers

All accounts (domain, Cloudflare, Resend, Cal.com, Google Workspace) are registered in the firm's name. Never commit API keys; use environment variables in Cloudflare.

## Design: approved direction, "Sage and graphite"

The approved mockup is the "4 · Sage and graphite" board on the SS Legal Homepage Directions canvas. Match it.

| Token | Hex | Use |
|---|---|---|
| `sage` | `#DCE3D8` | Main page background |
| `sage-light` | `#F5F7F3` | Cards, form background |
| `graphite` | `#1F2421` | Text, primary buttons, dark sections |
| `green` | `#3E5C4A` | Accent: labels, links, icons, secondary buttons |
| `green-light` | `#A9C2AE` | Accent on graphite backgrounds only |
| `muted` | `#3A413C` | Secondary text on sage |
| `border` | `#AFB8AB` | Input borders |

Rules:
- Colour is used sparingly. Sage and graphite carry the page; green is the one accent.
- Serif headings, sans body. Large headline sizes (around 66px desktop on the homepage).
- Rounded buttons (pill shape) and rounded cards (around 14 to 20px radius).
- Thin rules and generous white space. No gradients, no emoji, no stock icon packs; simple stroke icons only.
- Check text contrast meets WCAG AA (4.5:1 for body text). `green` on `sage` passes; do not put `green` text on `graphite`.
- Every layout must work at phone width.

### Motion

- Hero text and form ease up on load (about 1s, staggered).
- Sections and practice area cards reveal as they scroll into view.
- Lenis smooth scrolling, synced with ScrollTrigger through one animation loop.
- Only animate `transform` and `opacity`.
- Respect `prefers-reduced-motion`: no smoothing, no reveal animations, content shown immediately.
- Motion must not hurt load speed. Keep Largest Contentful Paint under 2.5s on mobile.

## Pages

1. **Home:** header with phone number and "Book a consultation" button, hero with the enquiry form, trust strip, practice areas grid, how it works (3 steps), footer
2. **Practice areas:** one page per area, 12 at launch (list below), each ending with the enquiry form or a link to it
3. **About:** the firm and Safi's profile
4. **Contact:** phone, email, address, enquiry form
5. **Booking confirmed:** shown after a slot is booked
6. **Privacy notice** and **Cookie notice:** wording supplied by the firm
7. **Regulatory information:** wording supplied by the firm

The phone number and the "Book a consultation" button appear in the header on every page.

### Practice areas (12 at launch, no sub-pages)

Professional negligence; Insolvency; Director and shareholder disputes; HMRC tax disputes; Debt recovery; Banking and finance; Cryptocurrency; Costs and detailed assessment; Breach of contract; Partnership disputes; Defamation and reputation; Intellectual property.

## Enquiry and booking flow

Two steps on one page:

**Step 1: details.** Fields:
- Full name (required)
- Email (required)
- Phone (required)
- Practice area (required, dropdown of the 12 areas plus "Other")
- Value of your case (required): Under £50,000 / £50,000 to £200,000 / Over £200,000
- What has happened? (required, free text)
- Documents (optional, upload, 10 MB limit)

**Step 2: choose a time.** Cal.com booking embed, pre-filled with name and email from step 1.

What happens on submit:
- Step 1 posts to a Pages Function. It validates the fields, rejects spam (Cloudflare Turnstile), and emails the firm all the details with the documents attached, through Resend.
- Cal.com handles the slot, the calendar entry and the client's confirmation email. The client's confirmation must say that a solicitor will call them at the booked time. Write that wording for Affan to approve.
- The firm also gets Cal.com's booking notification, so they can match the booking to the enquiry email.

Before building, check and report to Affan:
- Resend's attachment size limit, and whether 10 MB of uploads fits.
- Whether Cal.com can pre-fill name and email in an embed on the free plan.

Enquiry data is personal data under UK GDPR. Do not store enquiries anywhere except the firm's email unless Affan asks. Link the privacy notice next to the submit button.

## Consultation availability

Use the same pattern as the reference site go-legal.co.uk for slot length and hours until Safi confirms his own.

## Content rules

- Write all copy fresh. Use Go Legal only as a reference for structure. Do not copy or closely paraphrase its text. Safi works there, so the new site must not mirror its content.
- No invented facts: no case results, statistics, reviews, awards or client counts. Use bracketed placeholders, e.g. `[SRA number]`.
- Plain, direct language. No superlatives ("best", "leading", "unrivalled"). No em-dashes.
- Talk to the visitor ("you"), not about the firm ("we are"), where it reads naturally.
- Legal accuracy of practice area content is the firm's responsibility. Mark drafts for Safi's review.

## Placeholders in use

- Firm name: SS Legal
- Email: hello@example.com (dummy, replace before launch)
- Phone: `[Phone number]`
- Address, SRA number, regulatory wording: bracketed placeholders

## Open decisions (ask, do not assume)

- Final firm name, logo, domain
- Whether the first consultation is free
- Safi's consultation hours and slot length
- Which inbox receives enquiries
- Photography: there are no photos yet. Sage and graphite depends on good imagery, so plan image slots with clear placeholders.
- Whether a news section is needed at launch

## Working with Affan

- Show each page design before building the next one.
- Keep explanations short and plain.
- Flag problems (data that doesn't add up, claims without a source) instead of working around them.
