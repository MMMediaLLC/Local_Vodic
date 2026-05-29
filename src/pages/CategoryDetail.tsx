import { useParams, Link } from 'react-router-dom';
import { useState } from 'react';
import { useData } from '../lib/DataContext';
import FeaturedProfileCard from '../components/FeaturedProfileCard';
import { usePageMeta } from '../lib/usePageMeta';
import { Search, X } from 'lucide-react';

export default function CategoryDetail() {
  const { slug } = useParams();
  const { categories, locations, profiles: allProfiles } = useData();
  const [selectedLocation, setSelectedLocation] = useState<string | null>(null);
  const [search, setSearch] = useState('');

  const category = categories.find(c => c.slug === slug) || categories[0];

  usePageMeta({
    title: category?.name ?? 'Категорија',
    description: category?.description,
    canonicalPath: `/kategorija/${slug}`,
  });

  const q = search.trim().toLowerCase();

  const profiles = allProfiles
    .filter(p =>
      !p.isPending &&
      p.isActive !== false &&
      (!slug || p.categorySlug === category?.slug) &&
      (!selectedLocation || p.location === selectedLocation) &&
      (!q ||
        p.name.toLowerCase().includes(q) ||
        p.shortDescription?.toLowerCase().includes(q) ||
        (p.subcategory || '').toLowerCase().includes(q))
    )
    .sort((a, b) => (b.createdAt ?? '').localeCompare(a.createdAt ?? ''));

  return (
    <div className="bg-slate-50 min-h-screen pb-16">
      {/* Header */}
      <div className="bg-white border-b border-slate-200 py-8">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-sm font-medium text-slate-500 mb-2 flex items-center gap-2">
            <Link to="/" className="hover:text-blue-600 transition-colors">Локален водич</Link>
            <span>/</span>
            <span className="text-slate-900">{category?.name}</span>
          </div>
          <h1 className="text-3xl sm:text-4xl font-extrabold text-slate-900">{category?.name}</h1>
          {category?.description && (
            <p className="text-slate-500 mt-2">{category.description}</p>
          )}
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">

        {/* Filters row */}
        <div className="flex flex-col sm:flex-row gap-4 mb-8">
          {/* Search */}
          <div className="relative flex-1 max-w-sm">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400 pointer-events-none" />
            <input
              type="search"
              value={search}
              onChange={e => setSearch(e.target.value)}
              placeholder="Пребарај во категоријата..."
              className="w-full pl-10 pr-9 py-2.5 bg-white border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm text-slate-800 placeholder-slate-400"
            />
            {search && (
              <button onClick={() => setSearch('')} className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600">
                <X className="w-3.5 h-3.5" />
              </button>
            )}
          </div>

          {/* Location chips */}
          <div className="flex flex-wrap gap-2">
            <button
              onClick={() => setSelectedLocation(null)}
              className={`px-4 py-2 rounded-lg text-sm font-bold shadow-sm transition-colors ${!selectedLocation ? 'bg-blue-600 text-white' : 'bg-white border border-slate-200 text-slate-700 hover:bg-slate-50'}`}
            >
              Сите
            </button>
            {locations.map(loc => (
              <button
                key={loc.id}
                onClick={() => setSelectedLocation(loc.name)}
                className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${selectedLocation === loc.name ? 'bg-blue-600 text-white font-bold' : 'bg-white border border-slate-200 text-slate-700 hover:bg-slate-50'}`}
              >
                {loc.name}
              </button>
            ))}
          </div>
        </div>

        {/* Count */}
        {(q || selectedLocation) && (
          <p className="text-sm text-slate-500 mb-5">
            {profiles.length === 0
              ? 'Нема резултати.'
              : `${profiles.length} профил${profiles.length === 1 ? '' : 'и'}`}
          </p>
        )}

        {profiles.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {profiles.map(profile => (
              <FeaturedProfileCard key={profile.id} profile={profile} />
            ))}
          </div>
        ) : (
          <div className="bg-white p-12 rounded-2xl border border-slate-200 text-center">
            <p className="font-medium text-lg text-slate-400">
              {q ? `Нема профили за „${search}"` : 'Нема профили во оваа категорија.'}
            </p>
          </div>
        )}
      </div>
    </div>
  );
}
