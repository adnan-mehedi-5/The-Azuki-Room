import test from 'node:test';
import assert from 'node:assert/strict';
import {
  ANNOUNCEMENT,
  CONTACT,
  NAV_LINKS,
  EXPLORE_LINKS,
  OPENING_HOURS,
  VALID_ROUTES,
  normalizePathname,
  validateNewsletterEmail,
  withBase,
  BASE_URL,
} from './siteConfig';

test('normalizePathname normalizes trailing slashes, query strings, and hashes', () => {
  assert.equal(normalizePathname('/'), '/');
  assert.equal(normalizePathname(''), '/');
  assert.equal(normalizePathname('/menu/'), '/menu');
  assert.equal(normalizePathname('/private-dining#set-menus'), '/private-dining');
  assert.equal(normalizePathname('/reservations?autostart=1'), '/reservations');
  assert.equal(normalizePathname('blog/what-is-binchotan'), '/blog/what-is-binchotan');
});

test('validateNewsletterEmail validates email formats properly', () => {
  assert.deepEqual(validateNewsletterEmail(''), {
    valid: false,
    error: 'Please enter a valid email address.',
  });
  assert.deepEqual(validateNewsletterEmail('invalid-email'), {
    valid: false,
    error: 'Please enter a valid email address.',
  });
  assert.deepEqual(validateNewsletterEmail('guest@theazukiroom.com'), {
    valid: true,
  });
});

test('site configuration constants match original site structure', () => {
  assert.equal(ANNOUNCEMENT.active, true);
  assert.equal(ANNOUNCEMENT.headline, 'Christmas Bookings');
  assert.equal(CONTACT.email, 'info@theazukiroom.com');
  assert.equal(NAV_LINKS.length, 5);
  assert.equal(EXPLORE_LINKS.length, 12);
  assert.equal(OPENING_HOURS.length, 7);
  assert.equal(VALID_ROUTES.length, 23);
});

test('withBase properly handles absolute and relative asset paths', () => {
  assert.equal(typeof BASE_URL, 'string');
  assert.equal(withBase('https://example.com/photo.jpg'), 'https://example.com/photo.jpg');
  assert.equal(withBase('#target'), '#target');
  assert.ok(withBase('/images/test.webp').includes('images/test.webp'));
  assert.ok(ANNOUNCEMENT.image.src.includes('images/interiors/lounge-armchairs.webp'));
});
