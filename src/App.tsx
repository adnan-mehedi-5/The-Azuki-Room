import React, { useEffect, useState, useCallback, useRef } from 'react';
import pagesDataRaw from './data/pagesData.json';
import { normalizePathname, CONTACT, withBase, BASE_URL } from './utils/siteConfig';
import { Header } from './components/Header';
import { HeroSection } from './components/HeroSection';
import { Footer, CookieConsent, AnnouncementNotice } from './components/FooterAndOverlays';

interface PageEntry {
  title: string;
  description: string;
  mainHtml: string;
}

const pagesData = pagesDataRaw as Record<string, PageEntry>;

const cleanBase = (BASE_URL || '/').replace(/\/$/, '');

function resolveAssetPaths(html: string): string {
  if (!html || !cleanBase) return html;
  return html
    .replace(/(src|href)=(["'])\/(images|menus|videos)\//g, `$1=$2${cleanBase}/$3/`)
    .replace(/(src|href)=(["'])\/(favicon\.ico|icon\.png|apple-icon\.png|icon-512\.png|manifest\.webmanifest)(["'])/g, `$1=$2${cleanBase}/$3$4`)
    .replace(/url\((["']?)\/(images|menus|videos)\//g, `url($1${cleanBase}/$2/`)
    .replace(/srcset=(["'])([^"']+)(["'])/g, (_, q1, srcsetValue, q2) => {
      const updated = srcsetValue.replace(/(^|,\s*)\/(images|menus|videos)\//g, `$1${cleanBase}/$2/`);
      return `srcset=${q1}${updated}${q2}`;
    });
}

export function App() {
  const [currentRoute, setCurrentRoute] = useState<string>(() =>
    normalizePathname(window.location.pathname)
  );
  const mainRef = useRef<HTMLElement>(null);

  const navigate = useCallback((href: string) => {
    // Handle external URLs, mailto:, tel:, and direct static files (.pdf, .jpg)
    if (
      href.startsWith('http://') ||
      href.startsWith('https://') ||
      href.startsWith('mailto:') ||
      href.startsWith('tel:')
    ) {
      window.location.href = href;
      return;
    }

    if (
      href.endsWith('.pdf') ||
      href.endsWith('.jpg') ||
      href.endsWith('.webp') ||
      href.includes('/menus/') ||
      href.includes('/images/') ||
      href.includes('/videos/')
    ) {
      window.location.href = withBase(href);
      return;
    }

    // Handle pure hash links on current page
    if (href.startsWith('#')) {
      const targetId = href.slice(1);
      const el = document.getElementById(targetId);
      if (el) {
        el.scrollIntoView({ behavior: 'smooth' });
      }
      window.history.pushState({}, '', withBase(href));
      return;
    }

    const [pathPart, hashPart] = href.split('#');
    const normalized = normalizePathname(pathPart || '/');

    window.history.pushState({}, '', withBase(href));
    setCurrentRoute(normalized);

    if (hashPart) {
      setTimeout(() => {
        const el = document.getElementById(hashPart);
        if (el) {
          el.scrollIntoView({ behavior: 'smooth' });
        } else {
          window.scrollTo({ top: 0, behavior: 'auto' });
        }
      }, 60);
    } else {
      window.scrollTo({ top: 0, behavior: 'auto' });
    }
  }, []);

  useEffect(() => {
    const onPopState = () => {
      setCurrentRoute(normalizePathname(window.location.pathname));
    };
    window.addEventListener('popstate', onPopState);
    return () => window.removeEventListener('popstate', onPopState);
  }, []);

  const pageEntry = pagesData[currentRoute] ?? pagesData['/'];

  // Update document title and meta description on route change
  useEffect(() => {
    if (!pageEntry) return;
    document.title = pageEntry.title;
    const descMeta = document.querySelector('meta[name="description"]');
    if (descMeta && pageEntry.description) {
      descMeta.setAttribute('content', pageEntry.description);
    }
  }, [pageEntry]);

  // Mount OpenTable widget when on /reservations
  useEffect(() => {
    if (currentRoute !== '/reservations') return;
    const container = document.getElementById('opentable-widget');
    if (!container) return;

    container.innerHTML = '';
    const script = document.createElement('script');
    script.src =
      'https://www.opentable.co.uk/widget/reservation/loader?rid=541284&type=standard&theme=tall&color=7&dark=false&iframe=true&domain=couk&lang=en-GB&newtab=false&ot_source=Restaurant%20website&cfe=true';
    script.async = true;
    container.appendChild(script);

    // Provide a clean interactive booking fallback inside #opentable-widget if OpenTable's iframe is blocked by sandbox CSP or takes a moment
    const fallbackTimer = setTimeout(() => {
      if (container && !container.querySelector('iframe')) {
        container.innerHTML = `
          <div class="w-full max-w-md mx-auto p-6 rounded-xl bg-washi border border-sumi/10 text-center space-y-4">
            <p class="font-serif text-xl text-sumi">Book via OpenTable</p>
            <p class="text-xs text-smoke leading-relaxed">Select your preferred date, time, and party size directly on OpenTable.</p>
            <a
              href="${CONTACT.openTableUrl}"
              target="_blank"
              rel="noopener noreferrer"
              class="inline-flex items-center justify-center px-6 py-3 bg-binchotan text-sumi text-sm font-medium rounded-lg hover:bg-binchotan/90 transition-colors"
            >
              Book on OpenTable
            </a>
          </div>
        `;
      }
    }, 2500);

    return () => clearTimeout(fallbackTimer);
  }, [currentRoute]);

  // Intercept internal link clicks inside the rendered HTML
  const handleMainClick = (e: React.MouseEvent<HTMLElement>) => {
    const target = e.target as HTMLElement;
    const anchor = target.closest('a');
    if (!anchor) return;

    const href = anchor.getAttribute('href');
    if (!href) return;

    // Allow target="_blank", mailto:, tel:, and static asset downloads (.pdf, .jpg, /menus/) to work natively
    if (
      anchor.getAttribute('target') === '_blank' ||
      href.startsWith('http://') ||
      href.startsWith('https://') ||
      href.startsWith('mailto:') ||
      href.startsWith('tel:') ||
      href.endsWith('.pdf') ||
      href.endsWith('.jpg') ||
      href.endsWith('.webp') ||
      href.includes('/menus/') ||
      href.includes('/images/') ||
      href.includes('/videos/')
    ) {
      return;
    }

    e.preventDefault();
    navigate(href);
  };

  return (
    <>
      <a href="#main-content" className="skip-link">
        Skip to content
      </a>
      <Header onNavigate={navigate} />
      <main
        id="main-content"
        ref={mainRef}
        className="flex-1"
        tabIndex={-1}
        onClick={handleMainClick}
      >
        {currentRoute === '/' && <HeroSection onNavigate={navigate} />}
        <div dangerouslySetInnerHTML={{ __html: resolveAssetPaths(pageEntry?.mainHtml ?? '') }} />
      </main>
      <Footer onNavigate={navigate} />
      <CookieConsent onNavigate={navigate} />
      <AnnouncementNotice onNavigate={navigate} />
    </>
  );
}

export default App;
