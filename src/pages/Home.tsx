import HeroSection from '../components/HeroSection';
import FeaturedProfileCard from '../components/FeaturedProfileCard';
import { useData } from '../lib/DataContext';
import { Link } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';
import * as Icons from 'lucide-react';

export default function Home() {
  const { categories: mockCategories, profiles: allProfiles, articles: mockArticles } = useData();

  // Само активни (не pending) профили
  const mockProfiles = allProfiles.filter(p => !p.isPending);

  // Категории сортирани по последно додаден профил (највисок индекс = понов)
  const activeCategories = mockCategories
    .filter(cat => mockProfiles.some(p => p.categorySlug === cat.slug))
    .sort((a, b) => {
      const lastA = mockProfiles.reduce((max, p, i) => p.categorySlug === a.slug ? i : max, -1);
      const lastB = mockProfiles.reduce((max, p, i) => p.categorySlug === b.slug ? i : max, -1);
      return lastB - lastA; // поновите прво
    });

  return (
    <div className="bg-slate-50 min-h-screen pb-24">
      <HeroSection />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">

        <div className="space-y-20 flex flex-col w-full">

          {/* Categories */}
          <div className="space-y-16">
            {activeCategories.map(category => {
              const categoryProfiles = mockProfiles.filter(p => p.categorySlug === category.slug).slice(0, 4);
              return (
                <section key={category.id}>
                  <div className="flex justify-between items-end mb-8 border-b border-slate-300 pb-4 sm:pb-3 gap-4">
                    <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight leading-tight text-left">{category.name}</h2>
                    <Link to={`/kategorija/${category.slug}`} className="text-blue-600 font-bold hover:text-blue-800 flex items-center gap-1 text-[13px] sm:text-sm bg-blue-50 px-3 py-1.5 sm:px-4 sm:py-2 rounded-lg transition-colors whitespace-nowrap mb-0.5 sm:mb-0">
                      Види сите <ArrowRight className="w-3.5 h-3.5 sm:w-4 sm:h-4 ml-0.5" />
                    </Link>
                  </div>
                  <div className="flex overflow-x-auto pb-6 -mx-4 px-4 sm:mx-0 sm:px-0 sm:grid sm:grid-cols-2 lg:grid-cols-4 gap-6 snap-x sm:overflow-visible no-scrollbar">
                    {categoryProfiles.map(profile => (
                      <div key={profile.id} className="w-[85vw] max-w-[320px] shrink-0 sm:w-auto sm:max-w-none snap-start">
                        <FeaturedProfileCard profile={profile} />
                      </div>
                    ))}
                  </div>
                </section>
              );
            })}
          </div>

          {/* Split row: Најнови / Локални препораки */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-10 border-t border-slate-200 pt-16">
            <section>
              <div className="flex justify-between items-end mb-6 border-b border-slate-300 pb-4 sm:pb-3">
                <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight leading-tight text-left">Најнови во водичот</h2>
              </div>
              <div className="space-y-4">
                {mockProfiles.slice(0, 3).map(profile => (
                  <div key={`latest-${profile.id}`} className="flex items-start gap-4 p-3 border border-slate-100 -mx-3 hover:bg-white hover:border-slate-200 rounded-xl transition-colors hover:shadow-sm">
                    <div className={`overflow-hidden bg-amber-50 text-amber-600 border border-amber-100 flex items-center justify-center flex-shrink-0 ${profile.logoShape === 'horizontal' ? 'w-20 h-12 rounded-md p-1' : 'w-14 h-14 rounded-xl'}`}>
                      {profile.logo ? (
                        <img src={profile.logo} alt="" className="w-full h-full object-contain" />
                      ) : (
                        <Icons.Store className="w-7 h-7" />
                      )}
                    </div>
                    <div className="flex-1">
                      <Link to={`/profil/${profile.slug}`} className="font-bold text-slate-900 hover:text-blue-600 block leading-tight">{profile.name}</Link>
                      <p className="text-xs sm:text-sm text-slate-500 font-medium mb-1">{mockCategories.find(c => c.slug === profile.categorySlug)?.name} • {profile.location}</p>
                    </div>
                  </div>
                ))}
              </div>
            </section>

            <section>
              <div className="flex justify-between items-end mb-6 border-b border-slate-300 pb-4 sm:pb-3">
                <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight leading-tight text-left">Локални препораки</h2>
              </div>
              <div className="space-y-4">
                {mockArticles.map(article => (
                  <div key={article.id} className="flex items-center gap-4 p-3 border border-slate-100 -mx-3 hover:bg-white hover:border-slate-200 rounded-xl transition-all group hover:shadow-sm">
                    <img src={article.image_url} alt={article.title} className="w-20 h-20 rounded-xl object-cover flex-shrink-0 shadow-sm group-hover:shadow-md transition-shadow" />
                    <div>
                      <span className="font-bold text-slate-900 group-hover:text-blue-600 leading-tight block mb-2 transition-colors cursor-pointer">
                        {article.title}
                      </span>
                      <p className="text-xs font-bold text-blue-600 uppercase tracking-wide bg-blue-50 px-2 py-1 rounded inline-block">Според категорија</p>
                    </div>
                  </div>
                ))}
              </div>
            </section>
          </div>

          {/* Bottom Promo */}
          <div className="border-t border-slate-200 pt-16 mt-16 max-w-4xl mx-auto w-full">
            <div className="bg-gradient-to-br from-slate-900 bg-slate-900 to-slate-800 rounded-2xl border border-slate-700 p-10 sm:p-16 flex flex-col items-center justify-center relative overflow-hidden text-center text-white shadow-xl shadow-slate-900/10">
              <div className="relative z-10 w-full flex flex-col justify-center items-center">
                <h3 className="font-bold text-3xl sm:text-4xl mb-4">Пријави субјект</h3>
                <p className="text-slate-300 text-base sm:text-lg mb-8 leading-relaxed mx-auto max-w-md">
                  Додадете го вашиот бизнис или институција во Локалниот водич и бидете достапни за сите граѓани.
                </p>
                <Link to="/prijavi-subjekt" className="inline-flex justify-center items-center px-10 py-4 rounded-xl bg-blue-600 text-white font-bold hover:bg-blue-500 transition-colors shadow-lg shadow-blue-600/20 text-lg">
                  Пријави се бесплатно <ArrowRight className="w-5 h-5 ml-2" />
                </Link>
              </div>
              <Icons.Store className="w-64 h-64 text-slate-700 absolute -right-10 -bottom-20 z-0 opacity-40 rotate-12" />
              <Icons.Megaphone className="w-48 h-48 text-slate-700 absolute -left-10 -top-10 z-0 opacity-20 -rotate-12" />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
