import { useParams, Link } from 'react-router-dom';
import { useData } from '../lib/DataContext';
import FeaturedProfileCard from '../components/FeaturedProfileCard';

export default function CategoryDetail() {
  const { slug } = useParams();
  const { categories: mockCategories, locations: mockLocations, profiles: allProfiles } = useData();

  const category = mockCategories.find(c => c.slug === slug) || mockCategories[0];

  // Само активни (не pending) профили од оваа категорија
  const profiles = allProfiles.filter(p =>
    !p.isPending && (!slug || p.categorySlug === category.slug)
  );

  return (
    <div className="bg-slate-50 min-h-screen pb-16">
      {/* Header */}
      <div className="bg-white border-b border-slate-200 py-8">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-sm font-medium text-slate-500 mb-2 flex items-center gap-2">
            <Link to="/" className="hover:text-blue-600 transition-colors">Локален водич</Link>
            <span>/</span>
            <span className="text-slate-900">{category.name}</span>
          </div>
          <h1 className="text-3xl sm:text-4xl font-extrabold text-slate-900">{category.name}</h1>
          {category.description && (
            <p className="text-slate-500 mt-2">{category.description}</p>
          )}
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Location filters */}
        <div className="flex flex-wrap gap-2 mb-8">
          <button className="px-4 py-2 bg-blue-600 text-white rounded-lg text-sm font-bold shadow-sm">
            Сите
          </button>
          {mockLocations.map(loc => (
            <button
              key={loc.id}
              className="px-4 py-2 bg-white border border-slate-200 text-slate-700 hover:bg-slate-50 rounded-lg text-sm font-medium transition-colors"
            >
              {loc.name}
            </button>
          ))}
        </div>

        {/* Profile grid — исти картички како на почетна */}
        {profiles.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {profiles.map(profile => (
              <FeaturedProfileCard key={profile.id} profile={profile} />
            ))}
          </div>
        ) : (
          <div className="bg-white p-12 rounded-2xl border border-slate-200 text-center text-slate-400">
            <p className="font-medium text-lg">Нема профили во оваа категорија.</p>
          </div>
        )}
      </div>
    </div>
  );
}
