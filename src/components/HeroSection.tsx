import { Link } from 'react-router-dom';
import { useData } from '../lib/DataContext';
import { motion } from 'motion/react';
import * as Icons from 'lucide-react';

export default function HeroSection() {
  const { profiles, categories } = useData();
  const mapProfiles = profiles.filter(p => !p.isPending && p.isActive !== false).slice(0, 6);

  // Позиции за пиновите распоредени хоризонтално преку широката мапа
  const positions = [
    { top: '38%', left: '12%' },
    { top: '58%', left: '27%' },
    { top: '33%', left: '43%' },
    { top: '60%', left: '58%' },
    { top: '40%', left: '73%' },
    { top: '55%', left: '88%' },
  ];

  return (
    <section className="relative overflow-hidden border-b border-slate-100 bg-gradient-to-b from-blue-50/60 via-white to-white">
      {/* Меки декоративни сјаеви во заднина */}
      <div className="pointer-events-none absolute -top-24 left-1/2 -translate-x-1/2 w-[800px] h-[400px] bg-blue-200/30 rounded-full blur-3xl" />
      <div className="pointer-events-none absolute top-40 -right-20 w-[400px] h-[400px] bg-emerald-200/20 rounded-full blur-3xl" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 sm:py-14 lg:py-20 relative">

        {/* Наслов + опис — максимално хоризонтално, центрирано */}
        <div className="text-center max-w-5xl mx-auto relative z-10">
          <span className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white border border-slate-200 shadow-sm text-xs sm:text-sm font-semibold text-slate-600 mb-5">
            <Icons.MapPin className="w-4 h-4 text-blue-600" />
            Гостивар и Полошки регион
          </span>
          <h1 className="font-black tracking-tight text-slate-900 mb-4 sm:mb-5 uppercase leading-[0.95] text-[clamp(2.25rem,6.5vw,5rem)]">
            Локален <span className="bg-gradient-to-r from-blue-600 to-blue-500 bg-clip-text text-transparent">водич</span>
          </h1>
          <p className="text-base sm:text-xl text-slate-600 font-medium leading-snug max-w-3xl mx-auto">
            Најдете ги најдобрите локални компании, услуги, институции и продавници. Контакти, адреси, работно време и корисни информации од Гостивар и регионот.
          </p>
        </div>

        {/* 3D мапа — цела ширина под текстот (само на десктоп) */}
        <div
          className="hidden lg:block relative mt-12 w-full h-[460px] rounded-[2rem] bg-gradient-to-b from-white via-white to-slate-100 overflow-hidden border border-slate-200/80 shadow-2xl shadow-slate-300/40 ring-1 ring-white"
          style={{ perspective: '1300px' }}
        >
          {/* Закосена 3D подлога — градска мапа на Гостивар (одозгора) */}
          <div
            className="absolute inset-x-0 bottom-0 h-[150%] origin-bottom"
            style={{ transform: 'rotateX(58deg) scale(1.35)', transformOrigin: 'center bottom' }}
          >
            <svg
              className="absolute inset-0 w-full h-full"
              viewBox="0 0 1000 600"
              fill="none"
              preserveAspectRatio="none"
              style={{
                maskImage: 'linear-gradient(to top, black 28%, transparent 92%)',
                WebkitMaskImage: 'linear-gradient(to top, black 28%, transparent 92%)',
              }}
            >
              {/* Ситна мрежа на блокови (заднина) */}
              <g stroke="#e2e8f0" strokeWidth="1">
                {Array.from({ length: 21 }).map((_, i) => (
                  <line key={`v${i}`} x1={i * 50} y1="0" x2={i * 50} y2="600" />
                ))}
                {Array.from({ length: 13 }).map((_, i) => (
                  <line key={`h${i}`} x1="0" y1={i * 50} x2="1000" y2={i * 50} />
                ))}
              </g>

              {/* Паркови / зеленило */}
              <g fill="#bbf7d0" opacity="0.7">
                <rect x="120" y="90" width="150" height="110" rx="14" />
                <circle cx="760" cy="160" r="70" />
                <rect x="560" y="380" width="180" height="120" rx="16" />
              </g>

              {/* Река Вардар */}
              <path
                d="M-40 120 C 200 180, 260 300, 480 340 S 820 420, 1080 380"
                stroke="#7dd3fc" strokeWidth="26" strokeLinecap="round" opacity="0.8"
              />
              <path
                d="M-40 120 C 200 180, 260 300, 480 340 S 820 420, 1080 380"
                stroke="#38bdf8" strokeWidth="10" strokeLinecap="round" opacity="0.5"
              />

              {/* Главни булевари */}
              <g stroke="#cbd5e1" strokeWidth="14" strokeLinecap="round">
                <path d="M0 300 H 1000" />
                <path d="M500 0 V 600" />
                <path d="M80 560 C 300 400, 650 480, 980 230" />
              </g>
              {/* Бели линии на булеварите */}
              <g stroke="#f8fafc" strokeWidth="2.5" strokeDasharray="14 14" strokeLinecap="round">
                <path d="M0 300 H 1000" />
                <path d="M500 0 V 600" />
              </g>

              {/* Споредни улици (дијагонали) */}
              <g stroke="#dbe2ea" strokeWidth="6" strokeLinecap="round" opacity="0.9">
                <path d="M250 0 V 600" />
                <path d="M750 0 V 600" />
                <path d="M0 150 H 1000" />
                <path d="M0 450 H 1000" />
              </g>

              {/* Градски блокови (згради) */}
              <g fill="#eef2f7" stroke="#dbe2ea" strokeWidth="2">
                <rect x="320" y="120" width="120" height="90" rx="6" />
                <rect x="560" y="120" width="120" height="90" rx="6" />
                <rect x="320" y="330" width="120" height="90" rx="6" />
                <rect x="800" y="330" width="120" height="90" rx="6" />
                <rect x="120" y="330" width="110" height="90" rx="6" />
              </g>

              {/* Кружен тек (плоштад) во центар */}
              <circle cx="500" cy="300" r="40" fill="#f1f5f9" stroke="#cbd5e1" strokeWidth="10" />
              <circle cx="500" cy="300" r="16" fill="#bbf7d0" />
            </svg>
          </div>

          {/* Горе чисто бело */}
          <div className="absolute inset-x-0 top-0 h-1/4 bg-gradient-to-b from-white to-transparent pointer-events-none z-10" />
          {/* Долу сенка — длабочина */}
          <div className="absolute inset-x-0 bottom-0 h-2/5 bg-gradient-to-t from-slate-900/20 via-slate-900/8 to-transparent pointer-events-none z-[5]" />

          {/* Пинови — стојат вертикално над 3D подот, кликабилни како досега */}
          {mapProfiles.map((profile, index) => {
            const pos = positions[index % positions.length];
            const category = categories.find(c => c.slug === profile.categorySlug);
            // eslint-disable-next-line @typescript-eslint/no-explicit-any
            const IconComponent = category ? (Icons as any)[category.icon] || Icons.MapPin : Icons.MapPin;

            const colorClasses =
              category?.color === 'blue' ? 'bg-blue-100 text-blue-600 border-blue-200' :
              category?.color === 'emerald' ? 'bg-emerald-100 text-emerald-600 border-emerald-200' :
              category?.color === 'orange' ? 'bg-orange-100 text-orange-600 border-orange-200' :
              category?.color === 'green' ? 'bg-green-100 text-green-600 border-green-200' :
              'bg-indigo-100 text-indigo-600 border-indigo-200';

            return (
              <motion.div
                key={profile.id}
                className="absolute z-20 flex flex-col items-center"
                style={{ top: pos.top, left: pos.left }}
                initial={{ opacity: 0, scale: 0.5, y: 20 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                transition={{ delay: index * 0.15 + 0.3, type: 'spring', stiffness: 100 }}
                whileHover={{ scale: 1.08, zIndex: 30 }}
              >
                <Link to={`/profil/${profile.slug}`} className="group relative -translate-x-1/2 -translate-y-1/2 flex flex-col items-center">
                  {/* Tooltip */}
                  <div className="absolute -top-16 opacity-0 group-hover:opacity-100 transition-opacity duration-200 bg-slate-900 text-white text-xs font-medium py-1.5 px-3 rounded-lg shadow-xl whitespace-nowrap pointer-events-none w-max z-50">
                    {profile.name}
                    <div className="absolute -bottom-1 left-1/2 -translate-x-1/2 w-2 h-2 bg-slate-900 rotate-45 transform origin-center"></div>
                  </div>

                  <div className="w-14 h-14 rounded-2xl flex items-center justify-center p-0.5 shadow-xl shadow-slate-900/10 relative overflow-hidden bg-white border-2 border-white cursor-pointer group-hover:shadow-blue-500/30 transition-all duration-300">
                    {profile.logo ? (
                      <img src={profile.logo} alt={profile.name} className="w-full h-full object-cover rounded-xl" />
                    ) : (
                      <div className={`w-full h-full rounded-xl flex items-center justify-center ${colorClasses}`}>
                        <IconComponent className="w-6 h-6" />
                      </div>
                    )}
                  </div>
                  {/* Опашка на пинот */}
                  <div className="w-3 h-4 bg-white clip-triangle-down -mt-1 drop-shadow-md"></div>
                  {/* Сенка на подот за длабочина */}
                  <div className="w-8 h-2 bg-slate-900/15 rounded-full blur-[3px] mt-1"></div>
                </Link>
              </motion.div>
            );
          })}

          {/* Анимирани кругови — централна точка */}
          <motion.div
            className="absolute top-1/2 left-1/2 w-40 h-40 -mt-20 -ml-20 bg-blue-500 rounded-full opacity-10 pointer-events-none z-0"
            animate={{ scale: [1, 2.2], opacity: [0.25, 0] }}
            transition={{ repeat: Infinity, duration: 3, ease: 'easeOut' }}
          />
          <motion.div
            className="absolute top-1/2 left-1/2 w-40 h-40 -mt-20 -ml-20 bg-blue-500 rounded-full opacity-10 pointer-events-none z-0"
            animate={{ scale: [1, 2.2], opacity: [0.25, 0] }}
            transition={{ repeat: Infinity, duration: 3, delay: 1.5, ease: 'easeOut' }}
          />
        </div>
      </div>
    </section>
  );
}
