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
      {/* ── МОБИЛЕН — Airbnb-стил fullbleed фото ── */}
      <section className="sm:hidden relative overflow-hidden border-b border-slate-200" style={{ minHeight: '200px' }}>
        {/* Background photo */}
        {HERO_PHOTO_URL && (
          <div
            className="absolute inset-0 bg-cover bg-center bg-no-repeat"
            style={{ backgroundImage: `url(${HERO_PHOTO_URL})` }}
          />
        )}
        {/* Fallback gradient shown when no photo is set */}
        {!HERO_PHOTO_URL && (
          <div className="absolute inset-0 bg-gradient-to-b from-slate-900 via-slate-800 to-slate-700" />
        )}
        {/* Dark overlay — stronger at bottom so search bar stays readable */}
        <div className="absolute inset-0 bg-gradient-to-b from-black/40 via-black/50 to-black/65" />

        {/* Content */}
        <div className="relative z-10 px-4 pt-8 pb-6 flex flex-col items-center text-center">
          <h1 className="font-black tracking-tight text-white uppercase leading-none text-[clamp(2rem,9.5vw,2.8rem)] drop-shadow-md mb-1">
            Локален <span className="text-blue-400">водич</span>
          </h1>
          <p className="text-white/70 text-xs font-medium mb-4 tracking-wide uppercase">
            Гостивар &amp; Полог
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
