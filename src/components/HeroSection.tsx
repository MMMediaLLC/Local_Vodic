import { Link } from 'react-router-dom';
import { ArrowRight, MapPin } from 'lucide-react';
import { useData } from '../lib/DataContext';
import { motion } from 'motion/react';
import * as Icons from 'lucide-react';

export default function HeroSection() {
  const { profiles: mockProfiles, categories: mockCategories } = useData();
  // Select some profiles to display on our "map"
  const mapProfiles = mockProfiles.slice(0, 5);

  // Hardcode some relative positions for the pins to look like a map cluster
  const positions = [
    { top: '20%', left: '30%' },
    { top: '45%', left: '60%' },
    { top: '70%', left: '40%' },
    { top: '35%', left: '80%' },
    { top: '65%', left: '15%' }
  ];

  return (
    <section className="bg-white border-b border-slate-100 overflow-hidden relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 lg:py-24">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <div className="max-w-2xl relative z-10">
            <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-blue-50 text-blue-700 text-sm font-medium mb-6">
              <MapPin className="w-4 h-4" />
              Гостивар и Полог
            </span>
            <h1 className="text-5xl sm:text-6xl lg:text-7xl font-black tracking-tight text-slate-900 mb-6 uppercase">
              Локален <span className="text-blue-600">водич</span>
            </h1>
            <p className="text-xl sm:text-2xl text-slate-700 font-medium mb-4">
              Фирми, услуги, институции, продавници и корисни информации од регионот.
            </p>
            <p className="text-lg text-slate-500 mb-8 max-w-lg">
              Најдете локални субјекти, услуги, адреси, телефони, работно време и корисни информации на едно место.
            </p>
            <div className="flex flex-col sm:flex-row gap-4">
              <Link to="/prijavi-subjekt" className="inline-flex justify-center items-center gap-2 px-6 py-3 rounded-lg bg-blue-600 text-white font-medium hover:bg-blue-700 transition-all shadow-sm shadow-blue-200">
                Пријави субјект
                <ArrowRight className="w-4 h-4" />
              </Link>
            </div>
          </div>
          
          <div className="hidden lg:block relative h-[500px] w-full rounded-2xl bg-slate-50 overflow-hidden border border-slate-100">
            {/* Abstract Map Background Grid/Lines */}
            <div className="absolute inset-0 pattern-grid-lg text-slate-200 opacity-50" 
                 style={{ backgroundImage: 'linear-gradient(to right, #e2e8f0 1px, transparent 1px), linear-gradient(to bottom, #e2e8f0 1px, transparent 1px)', backgroundSize: '40px 40px' }}>
            </div>
            
            {/* Some abstract local map paths */}
            <svg className="absolute inset-0 w-full h-full text-blue-100/40" viewBox="0 0 500 500" fill="none">
              <path d="M-50 200 C 150 200, 250 100, 350 300 S 550 250, 600 150" stroke="currentColor" strokeWidth="20" strokeLinecap="round" />
              <path d="M100 -50 C 150 150, 50 300, 200 450 S 400 400, 450 600" stroke="currentColor" strokeWidth="12" strokeLinecap="round" />
              <path d="M300 0 L 300 500" stroke="currentColor" strokeWidth="4" strokeDasharray="10 10" />
            </svg>

            {/* Profile Map Pins */}
            {mapProfiles.map((profile, index) => {
              const pos = positions[index % positions.length];
              const category = mockCategories.find(c => c.slug === profile.categorySlug);
              // eslint-disable-next-line @typescript-eslint/no-explicit-any
              const IconComponent = category ? (Icons as any)[category.icon] || Icons.MapPin : Icons.MapPin;
              
              const colorClasses = category?.color === 'blue' ? 'bg-blue-100 text-blue-600 border-blue-200' :
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
                  transition={{ delay: index * 0.2 + 0.3, type: 'spring', stiffness: 100 }}
                  whileHover={{ scale: 1.05, zIndex: 30 }}
                >
                  <Link to={`/profil/${profile.slug}`} className="group relative -translate-x-1/2 -translate-y-1/2 flex flex-col items-center">
                    
                    {/* Tooltip on hover */}
                    <div className="absolute -top-16 opacity-0 group-hover:opacity-100 transition-opacity duration-200 bg-slate-900 text-white text-xs font-medium py-1.5 px-3 rounded-lg shadow-xl whitespace-nowrap pointer-events-none w-max z-50">
                      {profile.name}
                      <div className="absolute -bottom-1 left-1/2 -translate-x-1/2 w-2 h-2 bg-slate-900 rotate-45 transform origin-center"></div>
                    </div>

                    <div className={`w-14 h-14 rounded-2xl flex items-center justify-center p-0.5 shadow-lg relative overflow-hidden bg-white border-2 border-white cursor-pointer group-hover:shadow-blue-500/20 transition-all duration-300`}>
                       {profile.logo ? (
                         <img src={profile.logo} alt={profile.name} className="w-full h-full object-cover rounded-xl" />
                       ) : (
                          <div className={`w-full h-full rounded-xl flex items-center justify-center ${colorClasses}`}>
                            <IconComponent className="w-6 h-6" />
                          </div>
                       )}
                    </div>
                    {/* Pin tail */}
                    <div className="w-3 h-4 bg-white clip-triangle-down -mt-1 drop-shadow-md"></div>
                  </Link>
                </motion.div>
              );
            })}
            
            {/* Center animated ring to make it feel alive */}
            <motion.div 
              className="absolute top-1/2 left-1/2 w-32 h-32 -mt-16 -ml-16 bg-blue-500 rounded-full opacity-10 pointer-events-none"
              animate={{ scale: [1, 2], opacity: [0.3, 0] }}
              transition={{ repeat: Infinity, duration: 3, ease: "easeOut" }}
            />
            <motion.div 
              className="absolute top-1/2 left-1/2 w-32 h-32 -mt-16 -ml-16 bg-blue-500 rounded-full opacity-10 pointer-events-none"
              animate={{ scale: [1, 2], opacity: [0.3, 0] }}
              transition={{ repeat: Infinity, duration: 3, delay: 1.5, ease: "easeOut" }}
            />

          </div>
        </div>
      </div>
    </section>
  );
}
