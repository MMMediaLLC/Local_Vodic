import { Search, X } from 'lucide-react';

interface HeroSectionProps {
  search: string;
  setSearch: (v: string) => void;
}

export default function HeroSection({ search, setSearch }: HeroSectionProps) {
  const description =
    'Најдете ги најдобрите локални компании, услуги, институции и продавници. Контакти, адреси, работно време и корисни информации од Гостивар и регионот.';

  const searchBar = (
    <div className="relative max-w-xl mx-auto mt-6">
      <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400 pointer-events-none" />
      <input
        type="search"
        value={search}
        onChange={e => setSearch(e.target.value)}
        placeholder="Пребарај фирми, услуги, категории..."
        className="w-full pl-12 pr-10 py-3.5 bg-white border border-slate-200 rounded-2xl shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-slate-800 placeholder-slate-400 transition-all"
      />
      {search && (
        <button
          onClick={() => setSearch('')}
          className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600"
        >
          <X className="w-4 h-4" />
        </button>
      )}
    </div>
  );

  return (
    <>
      {/* ── МОБИЛЕН — едноставно (почетно) ── */}
      <section className="sm:hidden bg-white px-4 py-7 text-center border-b border-slate-100">
        <h1 className="font-black tracking-tight text-slate-900 mb-2 uppercase leading-none text-[clamp(1.9rem,9vw,2.6rem)]">
          Локален <span className="text-blue-600">водич</span>
        </h1>
        <p className="text-slate-600 text-[13px] font-medium leading-snug max-w-md mx-auto">
          {description}
        </p>
        {searchBar}
      </section>

      {/* ── ДЕСКТОП — непроменето ── */}
      <section className="hidden sm:block relative overflow-hidden border-b border-slate-100 bg-gradient-to-b from-white via-white to-blue-50/40">
        {/* Мек бел fade на врвот — мазно се слева со мени барот */}
        <div className="pointer-events-none absolute inset-x-0 top-0 h-44 bg-gradient-to-b from-white to-transparent z-[1]" />
        {/* Мек декоративен син сјај — долу */}
        <div className="pointer-events-none absolute -bottom-28 left-1/2 -translate-x-1/2 w-[900px] h-[280px] bg-blue-100/30 rounded-full blur-3xl" />

        <div className="max-w-7xl mx-auto px-6 lg:px-8 py-14 lg:py-16 relative">
          <div className="text-center max-w-5xl mx-auto relative z-10">
            <h1 className="font-black tracking-tight text-slate-900 mb-5 uppercase leading-[0.95] text-[clamp(2.25rem,6.5vw,5rem)]">
              Локален <span className="bg-gradient-to-r from-blue-600 to-blue-500 bg-clip-text text-transparent">водич</span>
            </h1>
            <p className="text-xl text-slate-600 font-medium leading-snug max-w-4xl mx-auto">
              {description}
            </p>
            {searchBar}
          </div>
        </div>
      </section>
    </>
  );
}
