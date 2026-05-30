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
    <section className="bg-white border-b border-slate-100 overflow-hidden relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12 lg:py-20">

        {/* Наслов + опис — максимално хоризонтално, центрирано */}
        <div className="text-center max-w-5xl mx-auto relative z-10">
          <h1 className="font-black tracking-tight text-slate-900 mb-3 sm:mb-5 uppercase leading-none text-[clamp(2rem,6vw,4.75rem)]">
            Локален <span className="text-blue-600">водич</span>
          </h1>
          <p className="text-sm sm:text-xl text-slate-600 font-medium leading-snug max-w-3xl mx-auto">
            Најдете ги најдобрите локални компании, услуги, институции и продавници. Контакти, адреси, работно време и корисни информации од Гостивар и регионот.
          </p>
        </div>

        {/* 3D мапа — цела ширина под текстот (само на десктоп) */}
        <div
          className="hidden lg:block relative mt-14 w-full h-[460px] rounded-3xl bg-gradient-to-b from-white via-slate-50 to-blue-50/50 overflow-hidden border border-slate-100"
          style={{ perspective: '1300px' }}
        >
          {/* Закосена 3D подлога (grid + патеки) што се протега во далечина */}
          <div
            className="absolute inset-x-0 bottom-0 h-[150%] origin-bottom"
            style={{ transform: 'rotateX(58deg) scale(1.35)', transformOrigin: 'center bottom' }}
          >
            <div
              className="absolute inset-0 opacity-60"
              style={{
                backgroundImage:
                  'linear-gradient(to right, #cbd5e1 1px, transparent 1px), linear-gradient(to bottom, #cbd5e1 1px, transparent 1px)',
                backgroundSize: '46px 46px',
                maskImage: 'linear-gradient(to top, black 30%, transparent 90%)',
                WebkitMaskImage: 'linear-gradient(to top, black 30%, transparent 90%)',
              }}
            />
            <svg className="absolute inset-0 w-full h-full text-blue-200/50" viewBox="0 0 1000 500" fill="none" preserveAspectRatio="none">
              <path d="M-50 250 C 250 200, 400 350, 650 250 S 950 200, 1100 300" stroke="currentColor" strokeWidth="26" strokeLinecap="round" />
              <path d="M150 -50 C 250 200, 100 350, 350 550" stroke="currentColor" strokeWidth="16" strokeLinecap="round" />
              <path d="M700 -50 C 650 250, 850 350, 800 550" stroke="currentColor" strokeWidth="16" strokeLinecap="round" />
            </svg>
          </div>

          {/* Мек хоризонт — горниот раб исчезнува */}
          <div className="absolute inset-x-0 top-0 h-2/5 bg-gradient-to-b from-white to-transparent pointer-events-none z-10" />

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
