export function getSiteUrl() {
  if (typeof window !== 'undefined') {
    return window.location.origin;
  }

  const siteUrl = process.env.URL?.replace(/\/+$/, '');
  if (!siteUrl) {
    throw new Error('URL is required when pre-rendering canonical URLs.');
  }
  return siteUrl;
}