import { useEffect } from 'react';

const BASE_URL = 'https://vodic.gostivarpress.mk';
const DEFAULT_IMAGE = 'https://i.ibb.co/XGVBhgB/1.png';

interface PageMetaOptions {
  title: string;
  description?: string;
  image?: string;
  canonicalPath?: string;
}

function setMeta(selector: string, attr: string, value: string) {
  let el = document.querySelector(selector) as HTMLMetaElement | null;
  if (!el) {
    el = document.createElement('meta');
    const [attrName, attrVal] = selector.match(/\[(.+?)="(.+?)"\]/)?.slice(1) ?? [];
    if (attrName) el.setAttribute(attrName, attrVal);
    document.head.appendChild(el);
  }
  el.setAttribute(attr, value);
}

export function usePageMeta({ title, description, image, canonicalPath }: PageMetaOptions) {
  useEffect(() => {
    const fullTitle = title.includes('GPRESS') ? title : `${title} — GPRESS Локален водич`;
    document.title = fullTitle;

    setMeta('meta[name="description"]', 'content', description ?? 'Локален водич за Гостивар и Полог — GPRESS');
    setMeta('meta[property="og:title"]', 'content', fullTitle);
    setMeta('meta[property="og:description"]', 'content', description ?? '');
    setMeta('meta[property="og:image"]', 'content', image ?? DEFAULT_IMAGE);
    setMeta('meta[name="twitter:title"]', 'content', fullTitle);
    setMeta('meta[name="twitter:description"]', 'content', description ?? '');

    const canonicalEl = document.querySelector('link[rel="canonical"]') as HTMLLinkElement | null;
    if (canonicalEl && canonicalPath) {
      canonicalEl.href = `${BASE_URL}${canonicalPath}`;
    }
  }, [title, description, image, canonicalPath]);
}
