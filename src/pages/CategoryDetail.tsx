import { useParams, Link } from 'react-router-dom';
import { useData } from '../lib/DataContext';
import ProfileCard from '../components/ProfileCard';

export default function CategoryDetail() {
  const { slug } = useParams();
  const { categories: mockCategories, locations: mockLocations, profiles: mockProfiles } = useData();
  const category = mockCategories.find(c => c.slug === slug) || mockCategories[0];
  const profiles = mockProfiles.filter(p => !slug || p.categorySlug === category.slug);

  return (
    <div className="bg-slate-50 min-h-screen pb-16">
      <div className="bg-white border-b border-slate-200 py-8">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-sm font-medium text-slate-500 mb-2 flex items-center gap-2">
            <Link to="/" className="hover:text-blue-600">Локален водич</Link>
            <span>/</span>
            <span className="text-slate-900">{category.name}</span>
          </div>
          <h1 className="text-3xl sm:text-4xl font-extrabold text-slate-900">{category.name}</h1>
          <p className="text-slate-500 mt-2">{category.description}</p>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-8">
          <div className="flex flex-wrap gap-2">
            <button className="px-4 py-2 bg-blue-600 text-white rounded-md text-sm font-bold shadow-sm">Сите</button>
            {mockLocations.map(loc => (
              <button key={loc.id} className="px-4 py-2 bg-white border border-slate-200 text-slate-700 hover:bg-slate-50 rounded-md text-sm font-medium transition-colors">
                {loc.name}
              </button>
            ))}
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          <div className="lg:col-span-3 space-y-4">
            {profiles.length > 0 ? profiles.map(profile => (
              <ProfileCard key={profile.id} profile={profile} />
            )) : (
              <div className="bg-white p-8 rounded-xl border border-slate-200 text-center text-slate-500">
                Нема пронајдено профили во оваа категорија.
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

