export const BASE_URL: string = import.meta.env?.BASE_URL ?? '/';

export function withBase(path: string): string {
  if (!path) return path;
  if (/^(?:[a-z]+:)?\/\//i.test(path) || path.startsWith('data:') || path.startsWith('blob:') || path.startsWith('#')) {
    return path;
  }
  const base = (import.meta.env?.BASE_URL ?? '/').replace(/\/$/, '');
  const cleanPath = path.startsWith('/') ? path : `/${path}`;
  return `${base}${cleanPath}`;
}

export const ANNOUNCEMENT = {
  active: true,
  image: {
    src: withBase('/images/interiors/lounge-armchairs.webp'),
    alt: 'Velvet armchairs and low tables in the lounge at The Azuki Room',
  },
  kicker: 'Now Taking',
  headline: 'Christmas Bookings',
  subheadline: '& Private Hire',
  ctaLabel: 'Enquire now',
  ctaHref: '/private-dining#set-menus',
};

export const CLOSURE = {
  active: false,
  headline: 'The Azuki Room is closed until further notice.',
  body: 'We are not currently taking bookings or serving guests. Thank you for your understanding. We hope to welcome you back before long.',
};

export const CONTACT = {
  email: 'info@theazukiroom.com',
  phone: '+442070780135',
  phoneDisplay: '0207 078 0135',
  address: 'Rolls Passage, off 36 Chancery Lane, London EC4A 1HL',
  nearestTube: 'Chancery Lane (Central Line)',
  parking: 'Free parking on Chancery Lane after 7pm',
  googleMapsUrl: 'https://maps.app.goo.gl/p3UmPCVoQV4oh3VK9?g_st=ic',
  openTableUrl:
    'https://www.opentable.co.uk/restref/client/?rid=541284&restref=541284&lang=en-GB&ot_source=Restaurant%20website',
};

export const NAV_LINKS = [
  { label: 'Menus', href: '/menu' },
  { label: 'Our Story', href: '/about' },
  { label: 'Private Events', href: '/private-dining' },
  { label: 'Reservations', href: '/reservations' },
  { label: 'Contact', href: '/contact' },
] as const;

export const EXPLORE_LINKS = [
  { label: 'Menus', href: '/menu' },
  { label: 'Our Story', href: '/about' },
  { label: 'Private Events', href: '/private-dining' },
  { label: 'Reservations', href: '/reservations' },
  { label: 'Contact', href: '/contact' },
  { label: 'FAQs', href: '/faq' },
  { label: 'Saturday Sushi Club', href: '/saturday-sushi-club' },
  { label: "What's On", href: '/whats-on' },
  { label: 'The Space', href: '/space' },
  { label: 'Gallery', href: '/gallery' },
  { label: 'Blog', href: '/blog' },
  { label: 'Halal Japanese', href: '/halal-japanese-restaurant-london' },
] as const;

export const LEGAL_LINKS = [
  { label: 'Privacy Policy', href: '/privacy' },
  { label: 'Cookie Policy', href: '/cookies' },
  { label: 'Terms of Service', href: '/terms' },
  { label: 'Accessibility', href: '/accessibility' },
] as const;

export const OPENING_HOURS = [
  { day: 'Monday', hours: '12:00 - 15:00, 17:00 - 22:30' },
  { day: 'Tuesday', hours: '12:00 - 15:00, 17:00 - 22:30' },
  { day: 'Wednesday', hours: '12:00 - 15:00, 17:00 - 22:30' },
  { day: 'Thursday', hours: '12:00 - 15:00, 17:00 - 22:30' },
  { day: 'Friday', hours: '12:00 - 15:00, 17:00 - 22:30' },
  { day: 'Saturday', hours: '12:00 - 22:30' },
  { day: 'Sunday', hours: 'Closed' },
] as const;

export const VALID_ROUTES = [
  '/',
  '/menu',
  '/about',
  '/private-dining',
  '/reservations',
  '/contact',
  '/faq',
  '/saturday-sushi-club',
  '/whats-on',
  '/space',
  '/gallery',
  '/blog',
  '/blog/what-is-binchotan',
  '/blog/beginners-guide-to-sake',
  '/blog/how-to-find-the-azuki',
  '/blog/dotori-to-the-azuki',
  '/blog/izakaya-tradition',
  '/blog/late-night-dining-london',
  '/halal-japanese-restaurant-london',
  '/privacy',
  '/cookies',
  '/terms',
  '/accessibility',
] as const;

export function normalizePathname(pathname: string): string {
  const base = (import.meta.env?.BASE_URL ?? '/').replace(/\/$/, '');
  let withoutHash = pathname.split('#')[0].split('?')[0];

  if (base && withoutHash.startsWith(base)) {
    withoutHash = withoutHash.slice(base.length);
  }

  if (!withoutHash || withoutHash === '/') return '/';
  const cleaned = withoutHash.endsWith('/') ? withoutHash.slice(0, -1) : withoutHash;
  return cleaned.startsWith('/') ? cleaned : `/${cleaned}`;
}

export function validateNewsletterEmail(email: string): { valid: boolean; error?: string } {
  const trimmed = email.trim();
  if (!trimmed) {
    return { valid: false, error: 'Please enter a valid email address.' };
  }
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!emailRegex.test(trimmed)) {
    return { valid: false, error: 'Please enter a valid email address.' };
  }
  return { valid: true };
}
