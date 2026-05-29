import { Link } from 'react-router-dom';
import { Profile } from '../types';
import SafeImage from './SafeImage';

interface FeaturedProfileCardProps {
  key?: string | number;
  profile: Profile;
}

export default function FeaturedProfileCard({ profile }: FeaturedProfileCardProps) {
  return (
    <Link to={`/profil/${profile.slug}`} className="bg-white rounded-xl border border-slate-200 overflow-hidden hover:shadow-lg hover:border-slate-300 transition-all flex flex-col h-full group block focus:outline-none">
      <div className="h-44 bg-slate-100 relative overflow-hidden">
        <SafeImage
          src={profile.coverImage}
          alt={profile.name}
          className="w-full h-full object-cover group-hover:scale-[1.03] transition-transform duration-500"
          fallback={<div className="w-full h-full bg-gradient-to-br from-slate-100 to-slate-200" />}
        />
        <div className={`absolute -bottom-5 left-4 bg-white p-1 shadow-sm border border-slate-100 z-10 flex items-center justify-center overflow-hidden ${profile.logoShape === 'horizontal' ? 'w-24 h-12 rounded-lg' : 'w-14 h-14 rounded-xl'}`}>
          <SafeImage
            src={profile.logo}
            alt={`${profile.name} logo`}
            className="w-full h-full object-contain"
            fallback={
              <div className="w-full h-full bg-rose-50 text-rose-500 rounded-lg flex items-center justify-center font-bold text-xl">
                {profile.name.charAt(0)}
              </div>
            }
          />
        </div>
      </div>
      
      <div className="p-5 pt-10 flex-grow flex flex-col relative z-20 bg-white">
        <h3 className="font-bold text-slate-900 mb-1 leading-tight group-hover:text-blue-600 transition-colors">
          {profile.name}
        </h3>
        <p className="text-xs text-slate-500 mb-4 font-medium">
          {[
            profile.categoryShortName || profile.category,
            profile.subcategory,
            profile.location,
          ].filter(Boolean).join(' • ')}
        </p>
        
        <div className="mb-5 text-sm text-slate-600 line-clamp-2 leading-relaxed">
          {profile.shortDescription}
        </div>

        <div className="mt-auto pt-4 border-t border-slate-100">
          <span className="block w-full py-2.5 bg-blue-50 group-hover:bg-blue-600 text-blue-700 group-hover:text-white text-center rounded-lg font-bold text-sm transition-colors cursor-pointer">
            Види профил
          </span>
        </div>
      </div>
    </Link>
  );
}

