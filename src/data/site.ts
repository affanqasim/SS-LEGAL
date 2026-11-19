// Firm details used across the site. Every value here is a placeholder
// until the firm confirms it (see "Placeholders in use" in CLAUDE.md).

export const site = {
  name: 'SS Legal',
  email: 'hello@example.com',
  phone: {
    display: '[Phone number]',
    // Set to the E.164 number (e.g. "+44...") once confirmed. While null,
    // the phone number is shown as text, not as a tap-to-call link.
    href: null as string | null,
  },
  address: '[Address]',
  sraNumber: '[SRA number]',
  // Where the "Book a consultation" button goes. The enquiry form will sit
  // in the homepage hero with this id.
  bookingHref: '/#enquiry',
} as const;

export const mainNav = [
  { label: 'Practice areas', href: '/practice-areas' },
  { label: 'About', href: '/about' },
  { label: 'Contact', href: '/contact' },
] as const;

export const legalNav = [
  { label: 'Privacy notice', href: '/privacy' },
  { label: 'Cookie notice', href: '/cookies' },
  { label: 'Regulatory information', href: '/regulatory' },
] as const;
