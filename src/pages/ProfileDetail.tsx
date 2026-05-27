import { useParams, Link } from 'react-router-dom';
import { useData } from '../lib/DataContext';
import { ArrowLeft, Phone, MapPin, Mail, Clock, Globe, Facebook, Share2, Instagram } from 'lucide-react';
import ProfileCard from '../components/ProfileCard';

export default function ProfileDetail() {
  const { slug } = useParams();
  const { profiles: mockProfiles } = useData();
  const profile = mockProfiles.find(p => p.slug === slug);

  if (!profile) {
    return (
      <div className="bg-slate-50 min-h-screen py-24 px-4 text-center">
        <h1 className="text-3xl font-bold text-slate-900 mb-4">Профилот не е пронајден.</h1>
        <p className="text-slate-600 mb-8 max-w-md mx-auto">Се извинуваме, но профилот кој го барате не постои или е отстранет.</p>
        <Link to="/" className="inline-flex items-center gap-2 bg-blue-600 hover:bg-blue-700 text-white font-bold py-3 px-6 rounded-xl transition-colors">
          <ArrowLeft className="w-5 h-5" />
          Назад кон Локален водич
        </Link>
      </div>
    );
  }

  const relatedProfiles = mockProfiles
    .filter(p => p.categorySlug === profile.categorySlug && p.id !== profile.id)
    .slice(0, 3);

  return (
    <div className="bg-slate-50 min-h-screen pb-16">
      
      {/* Top Header / Breadcrumb */}
      <div className="bg-white border-b border-slate-200">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 h-14 flex items-center justify-between">
          <Link to={`/kategorija/${profile.categorySlug}`} className="text-slate-600 hover:text-blue-600 flex items-center gap-2 text-sm font-medium">
            <ArrowLeft className="w-4 h-4" />
            Назад кон категорија
          </Link>
          <button className="text-slate-600 hover:text-blue-600 flex items-center gap-2 text-sm font-medium" onClick={() => navigator.clipboard.writeText(window.location.href).then(() => alert('Линкот е копиран!'))}>
            Сподели <Share2 className="w-4 h-4" />
          </button>
        </div>
      </div>

      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 -mt-px pt-8">
        
        {/* Cover & Profile Card */}
        <div className="bg-white rounded-2xl border border-slate-200 overflow-hidden shadow-sm mb-8">
          <div className="h-48 md:h-64 bg-slate-200 relative">
             <img 
              src={profile.coverImage || 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&q=80&w=1200'} 
              alt="cover" 
              className="w-full h-full object-cover"
            />
          </div>
          
          <div className="px-6 pb-8 relative pt-16 mt-2">
            {/* Logo */}
            <div className={`absolute -top-16 left-6 bg-white border border-slate-200 shadow-sm flex items-center justify-center overflow-hidden p-1 ${profile.logoShape === 'horizontal' ? 'w-40 sm:w-48 h-20 sm:h-24 rounded-lg' : 'w-28 h-28 sm:w-32 sm:h-32 rounded-2xl'}`}>
               {profile.logo ? (
                  <img src={profile.logo} alt={profile.name} className="w-full h-full object-contain p-1" />
               ) : (
                  <div className="text-4xl font-bold text-slate-300">{profile.name.charAt(0)}</div>
               )}
            </div>
            
            <div className="flex flex-col md:flex-row md:justify-between md:items-end gap-6 border-b border-slate-100 pb-8">
              <div className="flex-1 w-full min-w-0 pr-0 md:pr-4">
                <h1 className="text-2xl sm:text-3xl md:text-3xl lg:text-4xl font-extrabold text-slate-900 mb-3 tracking-tight leading-tight line-clamp-2 break-words text-left">{profile.name}</h1>
                <p className="text-slate-500 font-medium text-sm sm:text-base flex items-center gap-2">
                  {profile.category} • {profile.location}
                </p>
                {profile.isVerified && (
                  <div className="mt-3 inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-blue-50 text-blue-700 text-xs font-bold border border-blue-100">
                    <div className="w-2 h-2 rounded-full bg-blue-600"></div> Верифицирана објава
                  </div>
                )}
              </div>
              
              <div className="flex flex-col sm:flex-row gap-3 w-full md:w-auto shrink-0 md:self-end mt-2 md:mt-0">
                <a href={`tel:${profile.phone}`} className="flex-1 sm:flex-none inline-flex justify-center items-center gap-2 px-6 py-2.5 rounded-lg bg-emerald-600 text-white font-bold hover:bg-emerald-700 transition-colors shadow-sm">
                  <Phone className="w-4 h-4" /> Јави се
                </a>
                {profile.googleMapsUrl && (
                  <a href={profile.googleMapsUrl} target="_blank" rel="noopener noreferrer" className="flex-1 sm:flex-none inline-flex justify-center items-center gap-2 px-6 py-2.5 rounded-lg bg-blue-600 text-white font-bold hover:bg-blue-700 transition-colors shadow-sm">
                    <MapPin className="w-4 h-4" /> Види локација
                  </a>
                )}
              </div>
            </div>

            {/* Info Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 pt-8">
              <div className="flex gap-3 bg-slate-50 p-4 rounded-xl border border-slate-100">
                 <div className="mt-0.5 text-slate-400"><MapPin className="w-5 h-5"/></div>
                 <div>
                   <p className="text-[11px] font-bold text-slate-500 uppercase tracking-wider mb-1">Адреса</p>
                   <p className="font-medium text-slate-900 text-sm leading-tight">{profile.address}<br/>{profile.location}</p>
                 </div>
              </div>
              <div className="flex gap-3 bg-slate-50 p-4 rounded-xl border border-slate-100">
                 <div className="mt-0.5 text-slate-400"><Phone className="w-5 h-5"/></div>
                 <div>
                   <p className="text-[11px] font-bold text-slate-500 uppercase tracking-wider mb-1">Телефон</p>
                   <p className="font-medium text-slate-900 text-sm leading-tight">{profile.phone}</p>
                   {profile.secondaryPhone && (
                     <p className="font-medium text-slate-900 text-sm leading-tight mt-1">{profile.secondaryPhone}</p>
                   )}
                 </div>
              </div>
              {profile.email && (
                <div className="flex gap-3 bg-slate-50 p-4 rounded-xl border border-slate-100">
                  <div className="mt-0.5 text-slate-400"><Mail className="w-5 h-5"/></div>
                  <div>
                    <p className="text-[11px] font-bold text-slate-500 uppercase tracking-wider mb-1">Email</p>
                    <a href={`mailto:${profile.email}`} className="font-medium text-slate-900 hover:text-blue-600 text-sm leading-tight">{profile.email}</a>
                  </div>
                </div>
              )}
              {profile.workingHours && (
                <div className="flex gap-3 bg-slate-50 p-4 rounded-xl border border-slate-100">
                  <div className="mt-0.5 text-slate-400"><Clock className="w-5 h-5"/></div>
                  <div>
                    <p className="text-[11px] font-bold text-slate-500 uppercase tracking-wider mb-1">Работно време</p>
                    <p className="font-medium text-slate-900 text-sm leading-tight whitespace-pre-line">{profile.workingHours}</p>
                  </div>
                </div>
              )}
              {profile.website && (
                <div className="flex gap-3 bg-slate-50 p-4 rounded-xl border border-slate-100">
                  <div className="mt-0.5 text-slate-400"><Globe className="w-5 h-5"/></div>
                  <div>
                    <p className="text-[11px] font-bold text-slate-500 uppercase tracking-wider mb-1">Веб-страница</p>
                    <a href={profile.website} target="_blank" rel="noopener noreferrer" className="font-medium text-blue-600 hover:underline text-sm leading-tight break-all">{profile.website.replace(/^https?:\/\//, '')}</a>
                  </div>
                </div>
              )}
               {profile.facebook && (
                <div className="flex gap-3 bg-slate-50 p-4 rounded-xl border border-slate-100">
                  <div className="mt-0.5 text-slate-400"><Facebook className="w-5 h-5"/></div>
                  <div>
                    <p className="text-[11px] font-bold text-slate-500 uppercase tracking-wider mb-1">Facebook</p>
                    <a href={profile.facebook} target="_blank" rel="noopener noreferrer" className="font-medium text-blue-600 hover:underline text-sm leading-tight">Отвори профил</a>
                  </div>
                </div>
              )}
               {profile.instagram && (
                <div className="flex gap-3 bg-slate-50 p-4 rounded-xl border border-slate-100">
                  <div className="mt-0.5 text-slate-400"><Instagram className="w-5 h-5"/></div>
                  <div>
                    <p className="text-[11px] font-bold text-slate-500 uppercase tracking-wider mb-1">Instagram</p>
                    <a href={profile.instagram} target="_blank" rel="noopener noreferrer" className="font-medium text-blue-600 hover:underline text-sm leading-tight">Отвори профил</a>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Content sections */}
        <div className="bg-white rounded-2xl border border-slate-200 overflow-hidden shadow-sm p-6 sm:p-8 mb-8">
          <h2 className="text-xl font-bold text-slate-900 mb-4 border-b border-slate-100 pb-3">За нас</h2>
          <p className="text-slate-700 leading-relaxed whitespace-pre-line">
            {profile.fullDescription}
          </p>



          {profile.galleryImages && profile.galleryImages.length > 0 && (
            <>
              <h2 className="text-xl font-bold text-slate-900 mt-10 mb-4 border-b border-slate-100 pb-3">Галерија</h2>
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
                {profile.galleryImages.map((img, idx) => (
                  <div key={idx} className="aspect-square rounded-xl overflow-hidden bg-slate-100 border border-slate-200">
                    <img src={img} alt={`Gallery ${idx + 1}`} className="w-full h-full object-cover hover:scale-105 transition-transform" />
                  </div>
                ))}
              </div>
            </>
          )}
        </div>

        {relatedProfiles.length > 0 && (
          <div className="mt-12">
            <h3 className="text-lg sm:text-xl font-bold text-slate-900 mb-6">Слични профили од {profile.category}</h3>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
              {relatedProfiles.map(p => (
                 <ProfileCard key={p.id} profile={p} />
              ))}
            </div>
          </div>
        )}

      </div>
    </div>
  );
}
