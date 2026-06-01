import { ReactNode } from 'react';

interface Props {
  searchSlot?: ReactNode;
}

export default function HeroSection({ searchSlot }: Props) {
  return (
    <>
      {/* ── МОБИЛЕН — лого + пребарувач, ништо друго ── */}
      <section className="sm:hidden flex flex-col items-center justify-center bg-white min-h-[calc(100dvh-8rem)] px-6 gap-5">
        <img
          src="https://gostivarpress.mk/wp-content/uploads/2026/05/lg.jpg"
          alt="GPRESS Локален водич"
          className="w-44 h-auto"
        />
        {searchSlot}
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
