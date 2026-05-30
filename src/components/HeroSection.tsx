import { MapPin } from 'lucide-react';

export default function HeroSection() {
  const description =
    'Најдете ги најдобрите локални компании, услуги, институции и продавници. Контакти, адреси, работно време и корисни информации од Гостивар и регионот.';

  return (
    <>
      {/* ── МОБИЛЕН — модерна сина картичка ── */}
      <section className="sm:hidden bg-white px-4 pt-5 pb-3">
        <div className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-blue-600 via-blue-600 to-blue-500 text-white px-6 py-8 text-center shadow-xl shadow-blue-600/20">
          {/* Декоративни сјаеви */}
          <div className="pointer-events-none absolute -top-12 -right-10 w-44 h-44 bg-white/10 rounded-full blur-2xl" />
          <div className="pointer-events-none absolute -bottom-16 -left-12 w-44 h-44 bg-blue-300/20 rounded-full blur-2xl" />

          <span className="relative inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-white/15 backdrop-blur-sm text-[11px] font-semibold mb-3">
            <MapPin className="w-3.5 h-3.5" />
            Гостивар и Полошки регион
          </span>
          <h1 className="relative font-black uppercase leading-[0.95] text-[2rem] mb-3">
            Локален водич
          </h1>
          <p className="relative text-blue-50/90 text-sm leading-snug max-w-sm mx-auto">
            {description}
          </p>
        </div>
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
          </div>
        </div>
      </section>
    </>
  );
}
