export default function HeroSection() {
  const description =
    'Најдете ги најдобрите локални компании, услуги, институции и продавници. Контакти, адреси, работно време и корисни информации од Гостивар и регионот.';

  return (
    <>
      {/* ── МОБИЛЕН — мек син сјај што се стопува во бело кон рабовите ── */}
      <section className="sm:hidden bg-white px-4 pt-5 pb-3">
        <div className="relative overflow-hidden rounded-3xl px-6 py-10 text-center">
          {/* Син glow зад текстот → транспарентно (бело) кон рабовите */}
          <div
            className="pointer-events-none absolute inset-0"
            style={{
              background:
                'radial-gradient(78% 68% at 50% 42%, rgba(59,130,246,0.30) 0%, rgba(59,130,246,0.12) 45%, transparent 75%)',
            }}
          />
          <div className="relative">
            <h1 className="font-black uppercase leading-[0.95] text-[2rem] text-slate-900 mb-3">
              Локален <span className="bg-gradient-to-r from-blue-600 to-blue-500 bg-clip-text text-transparent">водич</span>
            </h1>
            <p className="text-slate-600 text-sm leading-snug max-w-sm mx-auto">
              {description}
            </p>
          </div>
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
