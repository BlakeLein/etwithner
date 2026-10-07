// Shared field rules for the order form and the contact form. Each returns an error message, or '' when the
// value is fine. These run in the browser, so they only guide honest visitors; anything that stores or reads
// submissions (such as a future admin app) must check the same rules again on the server.

export const LIMITS = { name: 60, email: 254, phone: 20, message: 2000 };

export function validateName(value: string): string {
  const v = value.trim();
  if (v === '') return 'Enter your name.';
  if (v.length < 2) return 'Name is too short.';
  if (v.length > LIMITS.name) return `Name must be ${LIMITS.name} characters or fewer.`;
  // Letters (including accented ones), spaces, hyphens, apostrophes, and periods: covers names like
  // O'Brien, Mary-Jane, and Jr. but rejects digits, symbols, and markup.
  if (!/^\p{L}[\p{L} .'’-]*$/u.test(v)) return 'Use letters, spaces, hyphens, apostrophes, or periods only.';
  return '';
}

export function validateEmail(value: string): string {
  const v = value.trim();
  if (v === '') return 'Enter your email.';
  if (v.length > LIMITS.email) return 'That email is too long.';
  if (!/^[A-Za-z0-9._%+-]+@[A-Za-z0-9-]+(\.[A-Za-z0-9-]+)*\.[A-Za-z]{2,}$/.test(v)) return 'Enter a valid email address.';
  return '';
}

// Keeps only what a phone number can contain, so letters and symbols cannot be typed.
export function cleanPhone(value: string): string {
  return value.replace(/[^\d\s().+-]/g, '');
}

export function validatePhone(value: string): string {
  const v = value.trim();
  if (v === '') return 'Enter your phone number.';
  if (!/^[\d\s().+-]+$/.test(v)) return 'Use numbers only.';
  const digits = v.replace(/\D/g, '');
  if (!(digits.length === 10 || (digits.length === 11 && digits.startsWith('1')))) return 'Enter a 10-digit phone number.';
  return '';
}

export function validateMessage(value: string): string {
  const v = value.trim();
  if (v === '') return 'Enter a message.';
  if (v.length > LIMITS.message) return `Message must be ${LIMITS.message} characters or fewer.`;
  return '';
}

export function validateChoice(value: string, message: string): string {
  return value === '' ? message : '';
}
