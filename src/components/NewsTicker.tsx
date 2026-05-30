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
    <div className="hidden sm:flex items-stretch bg-slate-900 text-white rounded-xl overflow-hidden shadow-sm border border-slate-800 mb-8">
      <a
        href="https://gostivarpress.mk"
        target="_blank"
        rel="noopener noreferrer"
        className="flex items-center gap-2 bg-blue-600 px-4 font-bold text-sm shrink-0 hover:bg-blue-500 transition-colors"
      >
        <Newspaper className="w-4 h-4" />
        Вести
      </a>
      <div className="group relative flex-1 overflow-hidden py-2.5">
        <div className="flex gap-10 whitespace-nowrap animate-marquee group-hover:[animation-play-state:paused]">
          {loop.map((item, i) => (
            <a
              key={i}
              href={item.link || 'https://gostivarpress.mk'}
              target="_blank"
              rel="noopener noreferrer"
              className="text-sm text-slate-200 hover:text-white transition-colors flex items-center gap-2"
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
