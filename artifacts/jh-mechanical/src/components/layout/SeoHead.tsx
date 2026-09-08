import { useEffect } from 'react';

export function SeoHead({
  title,
  description,
  canonicalUrl,
  schema
}: {
  title: string;
  description: string;
  canonicalUrl: string;
  schema?: unknown;
}) {
  useEffect(() => {
    document.title = title;
    
    const setMeta = (selector: string, attrs: Record<string, string>) => {
      let tag = document.head.querySelector(selector) as HTMLMetaElement | null;
      if (!tag) {
        tag = document.createElement('meta');
        document.head.appendChild(tag);
      }
      Object.entries(attrs).forEach(([key, value]) => tag?.setAttribute(key, value));
    };

    setMeta('meta[name="description"]', { name: 'description', content: description });
    setMeta('meta[property="og:title"]', { property: 'og:title', content: title });
    setMeta('meta[property="og:description"]', { property: 'og:description', content: description });
    setMeta('meta[property="og:type"]', { property: 'og:type', content: 'website' });
    setMeta('meta[property="og:url"]', { property: 'og:url', content: canonicalUrl });
    
    let canonical = document.head.querySelector('link[rel="canonical"]') as HTMLLinkElement | null;
    if (!canonical) {
      canonical = document.createElement('link');
      canonical.rel = 'canonical';
      document.head.appendChild(canonical);
    }
    canonical.href = canonicalUrl;

    if (schema) {
      let schemaTag = document.head.querySelector('#jh-schema') as HTMLScriptElement | null;
      if (!schemaTag) {
        schemaTag = document.createElement('script');
        schemaTag.id = 'jh-schema';
        schemaTag.type = 'application/ld+json';
        document.head.appendChild(schemaTag);
      }
      schemaTag.textContent = JSON.stringify(schema);
    } else {
      document.head.querySelector('#jh-schema')?.remove();
    }

    return () => {
      // Don't remove the schema on unmount, or maybe do if changing routes. 
      // Actually, standard practice for SPAs is to replace it, which we do above.
    };
  }, [title, description, canonicalUrl, schema]);

  return null;
}
