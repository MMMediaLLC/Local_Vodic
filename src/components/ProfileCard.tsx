import { Link } from 'react-router-dom';
import { Profile } from '../types';
import { MapPin, Phone, BadgeCheck, Store } from 'lucide-react';

interface ProfileCardProps {
  key?: string | number;
  profile: Profile;
}

export default function ProfileCard({ profile }: ProfileCardProps) {
  return (
    <Link to={`/profil/${profile.slug}`} className="flex flex-col sm:flex-row gap-4 bg-white border border-slate-200 rounded-xl p-4 sm:p-5 transition-all hover:shadow-md hover:border-slate-300 relative group block focus:outline-none">
      {/* Icon / Image Placeholder */}
      <div className={`flex-shrink-0 bg-slate-50 border border-slate-100 flex items-center justify-center text-slate-400 overflow-hidden ${profile.logoShape === 'horizontal' ? 'w-24 h-12 sm:w-32 sm:h-16 rounded-md p-1' : 'w-16 h-16 sm:w-20 sm:h-20 rounded-lg'}`}>
        {profile.logo ? (
          <img src={profile.logo} alt="" className="w-full h-full object-contain" />
        ) : (
          <Store className="w-8 h-8 opacity-50" />
        )}
      </div>

      <div className="flex-grow flex flex-col justify-between">
        <div>
          <div className="flex items-start justify-between gap-4">
            <h3 className="text-base sm:text-lg font-bold text-slate-900 leading-tight mb-1 group-hover:text-blue-600 transition-colors">
              {profile.name}
            </h3>
            {profile.isVerified && (
              <BadgeCheck className="w-5 h-5 text-blue-500 flex-shrink-0" title="Верифицирана објава" />
            )}
          </div>
          <div className="flex items-center text-sm text-slate-500 mb-2 gap-3">
            <div className="flex items-center gap-1 shrink">
              <MapPin className="w-3.5 h-3.5 flex-shrink-0" />
              <span>{profile.location}</span>
            </div>
            <div className="flex items-center gap-1 font-medium text-slate-600">
              <Phone className="w-3.5 h-3.5 flex-shrink-0" />
              <span>{profile.phone}</span>
            </div>
          </div>
        </div>
        
        <div className="mt-2 sm:mt-0 pt-3 border-t border-slate-100 flex items-center justify-between">
          <p className="text-sm text-slate-500 line-clamp-2 pr-4 flex-1">
             {profile.shortDescription}
          </p>
          <span className="text-sm font-bold text-blue-600 group-hover:text-blue-700 whitespace-nowrap hidden sm:block">
            Види профил
          </span>
        </div>
      </div>
    </Link>
  );
}

