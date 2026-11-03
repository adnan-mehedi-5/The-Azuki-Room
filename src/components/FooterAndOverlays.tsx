import React, { useState, useEffect, useCallback } from 'react';
import {
  ANNOUNCEMENT,
  CONTACT,
  EXPLORE_LINKS,
  LEGAL_LINKS,
  OPENING_HOURS,
  validateNewsletterEmail,
} from '../utils/siteConfig';
import { BrandMark, HalalBadge } from './BrandComponents';

export function NewsletterSignup({
  variant = 'dark',
  source = 'website',
  heading = 'Stay close',
  description = 'Occasional updates on new menu drops, evening events at The Azuki Lounge and seasonal specials. No spam, easy to unsubscribe.',
  compact = false,
}: {
  variant?: 'dark' | 'light';
  source?: string;
  heading?: string;
  description?: string;
  compact?: boolean;
}) {
  const [email, setEmail] = useState('');
  const [status, setStatus] = useState<'idle' | 'loading' | 'ok' | 'error'>('idle');
  const [message, setMessage] = useState<string | null>(null);
  const isLight = variant === 'light';

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (status === 'loading') return;

    const validation = validateNewsletterEmail(email);
    if (!validation.valid) {
      setStatus('error');
      setMessage(validation.error ?? 'Please enter a valid email address.');
      return;
    }

    setStatus('loading');
    setMessage(null);

    setTimeout(() => {
      try {
        const stored = JSON.parse(localStorage.getItem('azuki_newsletter_subscribers') || '[]');
        stored.push({ email: email.trim(), source, subscribedAt: new Date().toISOString() });
        localStorage.setItem('azuki_newsletter_subscribers', JSON.stringify(stored));
      } catch {
        // Ignore storage error
      }
      setStatus('ok');
      setMessage('You are on the list. See you soon.');
      setEmail('');
    }, 300);
  };

  return (
    <div
      className={
        compact
          ? ''
          : `rounded-xl border p-6 sm:p-8 ${
              isLight ? 'bg-white border-sumi/10' : 'bg-white/[0.03] border-white/10'
            }`
      }
    >
      {!compact && (
        <>
          <p className="text-xs uppercase tracking-[0.2em] mb-3 text-binchotan">Newsletter</p>
          <h3 className={`font-serif text-2xl sm:text-3xl mb-3 ${isLight ? 'text-sumi' : 'text-sake'}`}>
            {heading}
          </h3>
          <p className={`text-sm leading-relaxed mb-6 ${isLight ? 'text-smoke' : 'text-sake/70'}`}>
            {description}
          </p>
        </>
      )}
      <form onSubmit={handleSubmit} className="flex flex-col sm:flex-row gap-3" noValidate>
        <label htmlFor={`newsletter-email-${source}`} className="sr-only">
          Email address
        </label>
        <input
          id={`newsletter-email-${source}`}
          type="email"
          required
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="you@example.com"
          autoComplete="email"
          disabled={status === 'loading'}
          className={`flex-1 px-4 py-3 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-binchotan/60 ${
            isLight
              ? 'bg-washi border border-sumi/10 text-sumi placeholder:text-smoke/60'
              : 'bg-sumi/60 border border-white/10 text-sake placeholder:text-sake/40'
          }`}
        />
        <button
          type="submit"
          disabled={status === 'loading'}
          className="px-6 py-3 bg-binchotan text-sumi text-sm font-medium rounded-lg hover:bg-binchotan/90 transition-colors disabled:opacity-60"
        >
          {status === 'loading' ? 'Joining…' : 'Subscribe'}
        </button>
      </form>
      {message && (
        <p
          className={`mt-4 text-sm ${
            status === 'error' ? 'text-ember' : isLight ? 'text-smoke' : 'text-sake/70'
          }`}
          role="status"
        >
          {message}
        </p>
      )}
    </div>
  );
}

const RG_URL =
  'https://restaurantguru.com/The-Azuki-Dinning-Japanese-Restaurant-and-Sake-Bar-London';

export function RestaurantGuruBadge() {
  return (
    <div
      id="circle_bw"
      data-length={29}
      className="circle_bw_black rg-award-lang-en_US"
      role="link"
      tabIndex={0}
      aria-label="Restaurant Guru 2026: Recommended: The Azuki Room"
    >
      <p className="circle_bw_year">2026</p>
      <div className="circle_bw_name">
        <a className="circle_bw_link" target="_blank" rel="noopener noreferrer" href={RG_URL}>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            xmlnsXlink="http://www.w3.org/1999/xlink"
            width="178px"
            height="178px"
            viewBox="0 0 178 178"
          >
            <defs>
              <path id="circle_bw_name-arc" d="M 12 89 a 77 77 0 0 0 154 0" />
            </defs>
            <text className="circle_bw_name_txt" fill="#000" textAnchor="middle">
              <textPath startOffset="50%" xlinkHref="#circle_bw_name-arc">
                The Azuki Room
              </textPath>
            </text>
          </svg>
        </a>
      </div>
      <div className="circle_bw_nom">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          xmlnsXlink="http://www.w3.org/1999/xlink"
          width="200px"
          height="200px"
          viewBox="0 0 200 200"
        >
          <defs>
            <path id="circle_bw_nom-arc1" d="M 30 100 a 70 70 0 1 1 140 0" />
          </defs>
          <text className="circle_bw_nom_txt" fill="#000" textAnchor="middle">
            <textPath startOffset="50%" xlinkHref="#circle_bw_nom-arc1">
              Recommended
            </textPath>
          </text>
        </svg>
      </div>
      <a
        className="circle_bw_home"
        style={{ fontSize: 0 }}
        href="https://restaurantguru.com"
        target="_blank"
        rel="noopener noreferrer"
      >
        Restaurant Guru
      </a>
    </div>
  );
}

export function Footer({ onNavigate }: { onNavigate: (href: string) => void }) {
  const handleLink = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
    e.preventDefault();
    onNavigate(href);
  };

  return (
    <footer className="bg-sumi border-t border-white/5">
      <div className="bg-white/[0.02] border-b border-white/5">
        <div className="mx-auto max-w-3xl px-6 lg:px-8 py-14 text-center">
          <p className="text-xs uppercase tracking-[0.2em] text-binchotan mb-3">Newsletter</p>
          <h2 className="font-serif text-2xl sm:text-3xl text-sake mb-3">
            Stay close to The Azuki Room
          </h2>
          <p className="text-sm text-sake/60 leading-relaxed mb-6 max-w-xl mx-auto">
            Occasional notes on new menu drops, evening events at The Azuki Lounge and seasonal
            specials. No spam, easy to unsubscribe.
          </p>
          <div className="max-w-md mx-auto">
            <NewsletterSignup compact source="footer" />
          </div>
        </div>
      </div>

      <div className="mx-auto max-w-7xl px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12">
          <div>
            <div className="flex items-center gap-3 mb-4">
              <BrandMark size="sm" />
              <span className="text-lg font-serif text-sake">THE AZUKI ROOM</span>
            </div>
            <p className="text-sm text-sake/50 leading-relaxed">
              A hidden Japanese dining room in the heart of Chancery Lane. Intimate 30-cover
              izakaya centred around charcoal, with sushi, yakitori, robata, and lunchtime ramen.
            </p>
            <div className="mt-3">
              <HalalBadge size="sm" variant="light" />
            </div>
          </div>

          <div>
            <h3 className="text-xs uppercase tracking-widest text-binchotan mb-4">Explore</h3>
            <ul className="space-y-2">
              {EXPLORE_LINKS.map((link) => (
                <li key={link.href}>
                  <a
                    href={link.href}
                    onClick={(e) => handleLink(e, link.href)}
                    className="text-sm text-sake/50 hover:text-binchotan transition-colors"
                  >
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h3 className="text-xs uppercase tracking-widest text-binchotan mb-4">Opening Hours</h3>
            <ul className="space-y-1.5">
              {OPENING_HOURS.map((item) => (
                <li key={item.day} className="text-sm text-sake/50">
                  <span className="text-sake/70">{item.day}:</span> {item.hours}
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h3 className="text-xs uppercase tracking-widest text-binchotan mb-4">Find Us</h3>
            <address className="not-italic text-sm text-sake/50 space-y-2">
              <p>{CONTACT.address}</p>
              <p>
                <a
                  href={`mailto:${CONTACT.email}`}
                  data-track="cta_contact_email_footer"
                  className="hover:text-binchotan transition-colors"
                >
                  {CONTACT.email}
                </a>
              </p>
              <p>
                <a
                  href={`tel:${CONTACT.phone}`}
                  data-track="cta_contact_phone_footer"
                  className="hover:text-binchotan transition-colors"
                >
                  {CONTACT.phoneDisplay}
                </a>
              </p>
            </address>
            <div className="mt-4">
              <a
                href="https://www.instagram.com/the_azuki_room"
                target="_blank"
                rel="noopener noreferrer"
                data-track="cta_social_instagram_footer"
                className="text-sake/50 hover:text-binchotan transition-colors inline-block"
                aria-label="Instagram"
              >
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zM12 0C8.741 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.052.014 8.333 0 8.741 0 12c0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98C8.333 23.986 8.741 24 12 24c3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98C15.668.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 100 12.324 6.162 6.162 0 000-12.324zM12 16a4 4 0 110-8 4 4 0 010 8zm6.406-11.845a1.44 1.44 0 100 2.881 1.44 1.44 0 000-2.881z" />
                </svg>
              </a>
            </div>
          </div>
        </div>

        <div className="mt-12 pt-8 border-t border-white/5">
          <div className="flex justify-center mb-10">
            <RestaurantGuruBadge />
          </div>
          <nav aria-label="Legal" className="flex flex-wrap justify-center gap-x-6 gap-y-2 mb-6">
            {LEGAL_LINKS.map((link) => (
              <a
                key={link.href}
                href={link.href}
                onClick={(e) => handleLink(e, link.href)}
                className="text-xs text-sake/40 hover:text-binchotan transition-colors"
              >
                {link.label}
              </a>
            ))}
          </nav>
          <div className="text-center">
            <p className="text-xs text-sake/30">© 2026 The Azuki Room. All rights reserved.</p>
          </div>
        </div>
      </div>
    </footer>
  );
}

const CONSENT_KEY = 'azuki_consent';

export function CookieConsent({ onNavigate }: { onNavigate: (href: string) => void }) {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    if (params.get('autostart') === '1') return;

    try {
      const saved = localStorage.getItem(CONSENT_KEY);
      if (saved) {
        const parsed = JSON.parse(saved);
        if (parsed.v === '1') return;
      }
    } catch {
      // ignore
    }
    setVisible(true);
  }, []);

  const handleChoice = (choice: 'accepted' | 'rejected') => {
    try {
      localStorage.setItem(
        CONSENT_KEY,
        JSON.stringify({ v: '1', choice, ts: Date.now() })
      );
    } catch {
      // ignore
    }
    setVisible(false);
  };

  if (!visible) return null;

  return (
    <div
      role="dialog"
      aria-live="polite"
      aria-label="Cookie consent"
      className="fixed inset-x-3 bottom-3 z-50 sm:inset-x-auto sm:bottom-6 sm:right-6 sm:max-w-md"
    >
      <div className="rounded-lg border border-binchotan/20 bg-sumi/95 backdrop-blur-sm p-5 shadow-2xl">
        <p className="text-sm text-sake/90 leading-relaxed">
          We use a small set of strictly necessary cookies to run the site, plus optional anonymous
          analytics to understand how visitors use it. You can accept or decline non-essential
          cookies. Read our{' '}
          <a
            href="/cookies"
            onClick={(e) => {
              e.preventDefault();
              onNavigate('/cookies');
            }}
            className="text-binchotan underline underline-offset-2"
          >
            cookie policy
          </a>
          .
        </p>
        <div className="mt-4 flex flex-col-reverse sm:flex-row gap-2 sm:justify-end">
          <button
            type="button"
            onClick={() => handleChoice('rejected')}
            className="px-4 py-2 text-sm text-sake/80 hover:text-sake border border-white/10 hover:border-white/30 rounded transition-colors"
          >
            Decline
          </button>
          <button
            type="button"
            onClick={() => handleChoice('accepted')}
            className="px-4 py-2 text-sm font-medium text-sumi bg-binchotan hover:bg-binchotan/90 rounded transition-colors"
          >
            Accept all
          </button>
        </div>
      </div>
    </div>
  );
}

const ANNOUNCEMENT_KEY = 'azuki-announcement-seen';

export function AnnouncementNotice({ onNavigate }: { onNavigate: (href: string) => void }) {
  const [visible, setVisible] = useState(false);

  const handleClose = useCallback(() => {
    setVisible(false);
    try {
      sessionStorage.setItem(ANNOUNCEMENT_KEY, '1');
    } catch {
      // ignore
    }
  }, []);

  useEffect(() => {
    if (!ANNOUNCEMENT.active) return;
    const params = new URLSearchParams(window.location.search);
    if (params.get('autostart') === '1') return;

    try {
      if (sessionStorage.getItem(ANNOUNCEMENT_KEY)) return;
    } catch {
      // ignore
    }

    const timer = setTimeout(() => setVisible(true), 1200);
    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    if (!visible) return;
    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') handleClose();
    };
    window.addEventListener('keydown', onKeyDown);
    return () => window.removeEventListener('keydown', onKeyDown);
  }, [visible, handleClose]);

  if (!visible) return null;

  return (
    <div className="pointer-events-none fixed inset-x-0 top-0 bottom-[34vh] z-40 flex items-center justify-center p-4 sm:bottom-0">
      <section
        aria-labelledby="announcement-title"
        className="pointer-events-auto relative flex max-h-full w-full max-w-md flex-col overflow-hidden rounded-2xl border border-binchotan/25 bg-sumi shadow-2xl sm:max-h-[82vh]"
      >
        <button
          type="button"
          onClick={handleClose}
          aria-label="Close announcement"
          className="absolute right-3 top-3 z-10 flex h-9 w-9 items-center justify-center rounded-full bg-sumi/60 text-sake/80 backdrop-blur-sm transition-colors hover:bg-sumi/80 hover:text-sake focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-binchotan"
        >
          <svg
            className="h-5 w-5"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="1.5"
          >
            <path strokeLinecap="round" strokeLinejoin="round" d="M6 6l12 12M18 6L6 18" />
          </svg>
        </button>

        <div className="relative aspect-[3/2] max-h-[38vh] w-full shrink-[2] overflow-hidden sm:max-h-none">
          <img
            src={ANNOUNCEMENT.image.src}
            alt={ANNOUNCEMENT.image.alt}
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-x-0 bottom-0 h-16 bg-gradient-to-t from-sumi to-transparent" />
        </div>

        <div className="overflow-y-auto px-7 pb-8 pt-4 text-center sm:px-9">
          <div className="flex items-center justify-center gap-3">
            <span className="h-px w-8 bg-binchotan/50" />
            <p className="text-[11px] uppercase tracking-[0.28em] text-binchotan">
              {ANNOUNCEMENT.kicker}
            </p>
            <span className="h-px w-8 bg-binchotan/50" />
          </div>
          <h2
            id="announcement-title"
            className="mt-3 font-serif text-3xl leading-tight text-sake sm:text-4xl"
          >
            {ANNOUNCEMENT.headline}
            <span className="block text-2xl text-sake/75 sm:text-3xl">
              {ANNOUNCEMENT.subheadline}
            </span>
          </h2>
          <a
            href={ANNOUNCEMENT.ctaHref}
            onClick={(e) => {
              e.preventDefault();
              handleClose();
              onNavigate(ANNOUNCEMENT.ctaHref);
            }}
            className="mt-6 inline-flex items-center justify-center rounded-full bg-binchotan px-7 py-3 text-xs font-medium uppercase tracking-[0.16em] text-sumi transition-colors hover:bg-binchotan/90 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-binchotan focus-visible:ring-offset-2 focus-visible:ring-offset-sumi"
          >
            {ANNOUNCEMENT.ctaLabel}
          </a>
        </div>
      </section>
    </div>
  );
}
