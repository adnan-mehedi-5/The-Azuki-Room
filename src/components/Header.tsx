import React, { useState, useEffect } from 'react';
import { NAV_LINKS, CLOSURE } from '../utils/siteConfig';
import { BrandMark, HalalBadge } from './BrandComponents';

function MobileDrawer({
  open,
  onClose,
  onNavigate,
}: {
  open: boolean;
  onClose: () => void;
  onNavigate: (href: string) => void;
}) {
  useEffect(() => {
    if (open) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [open]);

  const handleLinkClick = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
    e.preventDefault();
    onClose();
    onNavigate(href);
  };

  return (
    <div
      className={`fixed inset-0 z-[60] transition-opacity duration-300 ${
        open ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none'
      }`}
    >
      <div className="absolute inset-0 bg-sumi/80 backdrop-blur-sm" onClick={onClose} />
      <div
        className={`absolute right-0 top-0 bottom-0 w-[88vw] max-w-xs sm:max-w-sm bg-sumi border-l border-white/5 transition-transform duration-300 flex flex-col overflow-y-auto ${
          open ? 'translate-x-0' : 'translate-x-full'
        }`}
      >
        <div className="flex items-center justify-between p-6 border-b border-white/5">
          <BrandMark size="sm" />
          <button
            onClick={onClose}
            className="p-2 text-sake/70 hover:text-sake"
            aria-label="Close menu"
          >
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={1.5}
                d="M6 18L18 6M6 6l12 12"
              />
            </svg>
          </button>
        </div>
        <nav className="p-6 space-y-1">
          {NAV_LINKS.map((link) => (
            <a
              key={link.href}
              href={link.href}
              onClick={(e) => handleLinkClick(e, link.href)}
              className="block py-3 text-lg text-sake/70 hover:text-binchotan transition-colors border-b border-white/5"
            >
              {link.label}
            </a>
          ))}
        </nav>
        <div className="p-6">
          {CLOSURE.active ? (
            <p className="rounded-lg border border-binchotan/25 px-5 py-4 text-center text-sm leading-relaxed text-sake/70">
              {CLOSURE.headline}
            </p>
          ) : (
            <a
              href="/reservations"
              onClick={(e) => handleLinkClick(e, '/reservations')}
              data-track="cta_reserve_mobile_menu"
              className="block w-full text-center px-6 py-3 bg-binchotan text-sumi font-medium rounded-lg hover:bg-binchotan/90 transition-colors"
            >
              Reserve a Table
            </a>
          )}
        </div>
      </div>
    </div>
  );
}

export function Header({ onNavigate }: { onNavigate: (href: string) => void }) {
  const [scrolled, setScrolled] = useState(false);
  const [drawerOpen, setDrawerOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleLink = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
    e.preventDefault();
    onNavigate(href);
  };

  return (
    <>
      <header
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
          scrolled ? 'bg-sumi/95 backdrop-blur-md border-b border-white/5' : 'bg-transparent'
        }`}
      >
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="flex h-16 sm:h-20 items-center justify-between gap-3">
            <a
              href="/"
              onClick={(e) => handleLink(e, '/')}
              className="flex items-center gap-2 sm:gap-3 min-w-0"
              aria-label="The Azuki Room, home"
            >
              <BrandMark size="sm" />
              <span className="text-base sm:text-lg md:text-xl font-serif tracking-wide text-sake whitespace-nowrap">
                THE AZUKI ROOM
              </span>
            </a>
            <div className="hidden md:block">
              <HalalBadge size="sm" variant="light" />
            </div>
            <nav className="hidden lg:flex items-center gap-8">
              {NAV_LINKS.map((link) => (
                <a
                  key={link.href}
                  href={link.href}
                  onClick={(e) => handleLink(e, link.href)}
                  className="text-sm text-sake/70 hover:text-binchotan transition-colors duration-200"
                >
                  {link.label}
                </a>
              ))}
            </nav>
            <div className="flex items-center gap-2 sm:gap-4">
              {!CLOSURE.active && (
                <a
                  href="/reservations"
                  onClick={(e) => handleLink(e, '/reservations')}
                  data-track="cta_reserve_header"
                  className="hidden sm:inline-flex items-center px-5 py-2.5 bg-binchotan text-sumi text-sm font-medium rounded-lg hover:bg-binchotan/90 transition-colors"
                >
                  Reserve a Table
                </a>
              )}
              <button
                onClick={() => setDrawerOpen(true)}
                className="lg:hidden -mr-2 p-3 text-sake/70 hover:text-sake"
                aria-label="Open menu"
                aria-expanded={drawerOpen}
              >
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={1.5}
                    d="M3.75 9h16.5m-16.5 6.75h16.5"
                  />
                </svg>
              </button>
            </div>
          </div>
        </div>
      </header>
      <MobileDrawer
        open={drawerOpen}
        onClose={() => setDrawerOpen(false)}
        onNavigate={onNavigate}
      />
    </>
  );
}
