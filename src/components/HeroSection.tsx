import { ReactNode } from 'react';

// Mobile hero photo — replace with an actual Gostivar/Polog valley shot.
// Recommended: a wide landscape (16:9 or wider), at least 1200px wide.
const HERO_PHOTO_URL = '';

interface Props {
  searchSlot?: ReactNode;
}

export default function HeroSection({ searchSlot }: Props) {
  return (
    <>
      {/* ── МОБИЛЕН — бела картичка на сив фон ── */}
      <section className="sm:hidden flex items-center justify-center bg-slate-100 min-h-[calc(100dvh-8rem)] px-4">
        <div className="w-full max-w-sm bg-white rounded-2xl shadow-lg px-6 py-7 flex flex-col gap-3">
          <h1 className="font-black tracking-tight text-slate-900 uppercase leading-none text-[clamp(1.9rem,9vw,2.6rem)] text-center">
            Локален <span className="text-blue-600">водич</span>
          </h1>
          <p className="text-slate-500 text-sm font-medium text-center leading-tight">
            Гостивар и Полог — фирми, услуги, контакти
          </p>
          {searchSlot}
        </div>
      </section>

      {/* ── ДЕСКТОП — непроменето ── */}
      <section className="hidden sm:block relative overflow-hidden border-b border-slate-100 bg-gradient-to-b from-white via-white to-blue-50/40">
        <div className="pointer-events-none absolute inset-x-0 top-0 h-44 bg-gradient-to-b from-white to-transparent z-[1]" />
        <div className="pointer-events-none absolute -bottom-28 left-1/2 -translate-x-1/2 w-[900px] h-[280px] bg-blue-100/30 rounded-full blur-3xl" />

        <div className="max-w-7xl mx-auto px-6 lg:px-8 py-14 lg:py-16 relative">
          <div className="text-center max-w-5xl mx-auto relative z-10">
            <h1 className="font-black tracking-tight text-slate-900 mb-5 uppercase leading-[0.95] text-[clamp(2.25rem,6.5vw,5rem)]">
              Локален <span className="bg-gradient-to-r from-blue-600 to-blue-500 bg-clip-text text-transparent">водич</span>
            </h1>
            <p className="text-xl text-slate-600 font-medium leading-snug max-w-4xl mx-auto">
              Најдете ги најдобрите локални компании, услуги, институции и продавници. Контакти, адреси, работно време и корисни информации од Гостивар и регионот.
            </p>
          </div>
        </div>
      </section>
    </>
  );
}
