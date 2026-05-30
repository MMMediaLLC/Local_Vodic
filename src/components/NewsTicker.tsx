import { useEffect, useState } from 'react';
import { Newspaper } from 'lucide-react';

interface NewsItem {
  title: string;
  link: string;
}

// Хоризонтален тикер со последните вести од gostivarpress.mk (само десктоп).
export default function NewsTicker() {
  const [items, setItems] = useState<NewsItem[]>([]);

  useEffect(() => {
    fetch('/api/news')
      .then(r => r.json())
      .then(d => Array.isArray(d.items) && setItems(d.items.slice(0, 10)))
      .catch(() => {});
  }, []);

  if (items.length === 0) return null;

  // Дуплираме за бесшевен loop
  const loop = [...items, ...items];

  return (
    <div className="hidden sm:flex items-stretch bg-white border-y border-slate-200 overflow-hidden">
      <span className="flex items-center gap-2 bg-blue-600 text-white px-5 font-bold text-sm shrink-0 uppercase tracking-wide">
        <Newspaper className="w-4 h-4" />
        Вести
      </span>
      <div className="group flex-1 overflow-hidden py-3">
        <div className="flex gap-12 whitespace-nowrap animate-marquee group-hover:[animation-play-state:paused]">
          {loop.map((item, i) => (
            <a
              key={i}
              href={item.link || 'https://gostivarpress.mk'}
              target="_blank"
              rel="noopener noreferrer"
              className="text-sm font-medium text-slate-600 hover:text-blue-600 transition-colors flex items-center gap-2.5"
            >
              <span className="w-1.5 h-1.5 rounded-full bg-blue-500 shrink-0" />
              {item.title}
            </a>
          ))}
        </div>
      </div>
    </div>
  );
}
