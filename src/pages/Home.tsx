import HeroSection from '../components/HeroSection';
import CityMap from '../components/CityMap';
import FeaturedProfileCard from '../components/FeaturedProfileCard';
import SafeImage from '../components/SafeImage';
import { useData } from '../lib/DataContext';
import { Link } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';
import * as Icons from 'lucide-react';
import { usePageMeta } from '../lib/usePageMeta';

export default function Home() {
  usePageMeta({
    title: 'GPRESS Локален водич — Гостивар и Полог',
    description: 'Најдете ги најдобрите локални компании, услуги, институции и продавници во Гостивар и Полошкиот регион.',
    canonicalPath: '/',
  });

  const { categories, profiles: allProfiles, articles, isLoading } = useData();

  // Само активни и одобрени профили, сортирани последно додаден прв
  const activeProfiles = allProfiles
    .filter(p => !p.isPending && p.isActive !== false)
    .sort((a, b) => (b.createdAt ?? '').localeCompare(a.createdAt ?? ''));

  // Категории сортирани по најновиот профил во секоја
  const activeCategories = categories
    .filter(cat => activeProfiles.some(p => p.categorySlug === cat.slug))
    .sort((a, b) => {
      const newestA = activeProfiles.find(p => p.categorySlug === a.slug)?.createdAt ?? '';
      const newestB = activeProfiles.find(p => p.categorySlug === b.slug)?.createdAt ?? '';
      return newestB.localeCompare(newestA);
    });

  return (
    <div className="bg-slate-50 min-h-screen pb-0 sm:pb-8">
      <HeroSection />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-8 pb-2">

        {/* Loading — додека податоците се вчитуваат (спречува трепкање при освежување) */}
        {isLoading && (
          <div className="flex justify-center py-24">
            <div className="w-8 h-8 border-2 border-slate-300 border-t-blue-600 rounded-full animate-spin" />
          </div>
        )}

        <div className={`space-y-20 flex flex-col w-full ${isLoading ? 'hidden' : ''}`}>

          {/* Categories */}
          {(
            <div className="space-y-16">
              {activeCategories.map(category => {
                const categoryProfiles = activeProfiles
                  .filter(p => p.categorySlug === category.slug)
                  .slice(0, 4);
                return (
                  <section key={category.id}>
                    <div className="flex justify-between items-end mb-8 border-b border-slate-300 pb-4 sm:pb-3 gap-4">
                      <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight leading-tight text-left">{category.name}</h2>
                      <Link
                        to={`/kategorija/${category.slug}`}
                        className="text-blue-600 font-bold hover:text-blue-800 flex items-center gap-1 text-[13px] sm:text-sm bg-blue-50 px-3 py-1.5 sm:px-4 sm:py-2 rounded-lg transition-colors whitespace-nowrap mb-0.5 sm:mb-0"
                      >
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
          )}

          {/* Split row: Најнови / Локални препораки */}
          {(
            <div className="grid grid-cols-1 md:grid-cols-2 gap-10 border-t border-slate-200 pt-16">
              <section>
                <div className="flex justify-between items-end mb-6 border-b border-slate-300 pb-4 sm:pb-3">
                  <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight leading-tight text-left">Најнови во водичот</h2>
                </div>
                <div className="space-y-4">
                  {activeProfiles.slice(0, 3).map(profile => (
                    <div key={`latest-${profile.id}`} className="flex items-start gap-4 p-3 border border-slate-100 -mx-3 hover:bg-white hover:border-slate-200 rounded-xl transition-colors hover:shadow-sm">
                      <div className={`overflow-hidden bg-amber-50 text-amber-600 border border-amber-100 flex items-center justify-center flex-shrink-0 ${profile.logoShape === 'horizontal' ? 'w-20 h-12 rounded-md p-1' : 'w-14 h-14 rounded-xl'}`}>
                        <SafeImage src={profile.logo} alt="" className="w-full h-full object-contain" fallback={<Icons.Store className="w-7 h-7" />} />
                      </div>
                      <div className="flex-1">
                        <Link to={`/profil/${profile.slug}`} className="font-bold text-slate-900 hover:text-blue-600 block leading-tight">{profile.name}</Link>
                        <p className="text-xs sm:text-sm text-slate-500 font-medium mb-1">
                          {categories.find(c => c.slug === profile.categorySlug)?.name} • {profile.location}
                        </p>
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
                  {articles.map(article => (
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
          )}

          {/* Bottom Promo */}
          {(
            <div className="border-t border-slate-200 pt-7 mt-7 sm:pt-12 sm:mt-12 w-full">
              <div className="bg-slate-900 rounded-2xl border border-slate-700 px-8 py-6 sm:px-12 sm:py-9 flex flex-col items-center justify-center relative overflow-hidden text-center text-white shadow-xl shadow-slate-900/10">
                <div className="relative z-10 w-full flex flex-col justify-center items-center">
                  <h3 className="font-bold text-2xl sm:text-3xl mb-2.5">Пријави субјект</h3>
                  <p className="text-slate-300 text-sm sm:text-base mb-6 leading-relaxed mx-auto max-w-4xl">
                    Додадете го вашиот бизнис или институција во Локалниот водич и бидете достапни за сите граѓани.
                  </p>
                  <Link to="/prijavi-subjekt" className="inline-flex justify-center items-center px-8 py-3 rounded-xl bg-blue-600 text-white font-bold hover:bg-blue-500 transition-colors shadow-lg shadow-blue-600/20">
                    Пријави се <ArrowRight className="w-5 h-5 ml-2" />
                  </Link>
                </div>
                <Icons.Store className="w-64 h-64 text-slate-700 absolute -right-10 -bottom-20 z-0 opacity-40 rotate-12" />
                <Icons.Megaphone className="w-48 h-48 text-slate-700 absolute -left-10 -top-10 z-0 opacity-20 -rotate-12" />
              </div>
            </div>
          )}

        </div>

        {/* Декоративна 3D мапа на Гостивар — најдолу (десктоп) */}
        <div className="hidden lg:block mt-20">
          <CityMap />
        </div>
      </div>
    </div>
  );
}
