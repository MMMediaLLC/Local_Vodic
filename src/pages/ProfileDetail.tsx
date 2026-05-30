import { useParams, Link } from 'react-router-dom';
import { useData } from '../lib/DataContext';
import { ArrowLeft, Phone, MapPin, Mail, Clock, Globe, Facebook, Share2, Instagram } from 'lucide-react';
import FeaturedProfileCard from '../components/FeaturedProfileCard';
import SafeImage from '../components/SafeImage';
import VerificationBadge from '../components/VerificationBadge';
import VerificationInfo from '../components/VerificationInfo';
import { usePageMeta } from '../lib/usePageMeta';

// Извлекува точни координати (lat,lng) од Google Maps линк во повеќе формати,
// или од гол внес „41.7976, 20.9123". Точни координати = точен pin (нема
// текст-пребарување што наоѓа погрешен сличен бизнис).
function extractCoords(url: string): { lat: string; lng: string } | null {
  if (!url) return null;

  // DMS формат: 41°47'49.4"N 20°54'44.6"E (степени-минути-секунди)
  const dms = url.match(
    /(\d+)\s*°\s*(\d+)\s*['′]\s*([\d.]+)\s*["″]\s*([NSns])[,\s]+(\d+)\s*°\s*(\d+)\s*['′]\s*([\d.]+)\s*["″]\s*([EWew])/
  );
  if (dms) {
    const toDec = (d: string, m: string, s: string, hemi: string) => {
      let v = parseInt(d, 10) + parseInt(m, 10) / 60 + parseFloat(s) / 3600;
      if (/[SsWw]/.test(hemi)) v = -v;
      return v.toFixed(6);
    };
    return {
      lat: toDec(dms[1], dms[2], dms[3], dms[4]),
      lng: toDec(dms[5], dms[6], dms[7], dms[8]),
    };
  }

  // Децимален формат
  const patterns = [
    /^\s*(-?\d{1,2}\.\d+)\s*,\s*(-?\d{1,3}\.\d+)\s*$/, // гол "lat,lng"
    /@(-?\d+\.\d+),(-?\d+\.\d+)/,                       // .../@lat,lng,17z
    /!3d(-?\d+\.\d+)!4d(-?\d+\.\d+)/,                   // !3dlat!4dlng
    /[?&](?:q|query|ll|center)=(-?\d+\.\d+),(-?\d+\.\d+)/, // q=/ll=/center=lat,lng
  ];
  for (const re of patterns) {
    const m = url.match(re);
    if (m) return { lat: m[1], lng: m[2] };
  }
  return null;
}

function getMapsUrl(profile: { googleMapsUrl?: string; name: string; address: string; location: string }) {
  const coords = extractCoords(profile.googleMapsUrl ?? '');
  if (coords) return `https://www.google.com/maps/search/?api=1&query=${coords.lat},${coords.lng}`;
  if (profile.googleMapsUrl) return profile.googleMapsUrl;
  const query = encodeURIComponent(`${profile.name} ${profile.address} ${profile.location}`);
  return `https://www.google.com/maps/search/?api=1&query=${query}`;
}

function getMapsEmbedUrl(profile: { googleMapsUrl?: string; name: string; address: string; location: string }) {
  const url = profile.googleMapsUrl ?? '';
  // 1) Веќе embed код — користи директно
  if (url.includes('/embed') || url.includes('output=embed')) return url;
  // 2) Точни координати — точен pin (најсигурно)
  const coords = extractCoords(url);
  if (coords) return `https://maps.google.com/maps?q=${coords.lat},${coords.lng}&z=16&output=embed`;
  // 3) Fallback — текст-пребарување по име+адреса (може да најде приближно)
  const query = encodeURIComponent(`${profile.name} ${profile.address} ${profile.location}`);
  return `https://maps.google.com/maps?q=${query}&output=embed`;
}

function LocalBusinessJsonLd({ profile }: { profile: any }) {
  const schema = {
    '@context': 'https://schema.org',
    '@type': 'LocalBusiness',
    name: profile.name,
    description: profile.shortDescription || profile.fullDescription,
    address: {
      '@type': 'PostalAddress',
      streetAddress: profile.address,
      addressLocality: profile.location,
      addressCountry: 'MK',
    },
    telephone: profile.phone,
    ...(profile.website && { url: profile.website }),
    ...(profile.coverImage && { image: profile.coverImage }),
    ...(profile.workingHours && { openingHours: profile.workingHours }),
  };
  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
    />
  );
}

export default function ProfileDetail() {
  const { slug } = useParams();
  const { profiles } = useData();
  const profile = profiles.find(p => p.slug === slug && !p.isPending && p.isActive !== false);

  usePageMeta({
    title: profile ? profile.name : 'Профилот не е пронајден',
    description: profile
      ? `${profile.shortDescription || profile.fullDescription} — ${profile.category}, ${profile.location}`
      : undefined,
    image: profile?.coverImage || profile?.logo,
    canonicalPath: profile ? `/profil/${profile.slug}` : undefined,
  });

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

  const relatedProfiles = profiles
    .filter(p => p.categorySlug === profile.categorySlug && p.id !== profile.id && !p.isPending)
    .slice(0, 3);

  const mapsUrl = getMapsUrl(profile);
  const embedUrl = getMapsEmbedUrl(profile);

  const handleShare = async () => {
    const url = window.location.href;
    const shareData = {
      title: profile.name,
      text: `${profile.name} — ${profile.categoryName || profile.category}${profile.location ? `, ${profile.location}` : ''} | GPRESS Локален водич`,
      url,
    };
    // Native споделување (мобилни: WhatsApp, Viber, Messenger...) со fallback на копирање
    if (typeof navigator !== 'undefined' && navigator.share) {
      try {
        await navigator.share(shareData);
      } catch {
        /* корисникот го откажа споделувањето — игнорирај */
      }
    } else {
      try {
        await navigator.clipboard.writeText(url);
        alert('Линкот е копиран!');
      } catch {
        alert(url);
      }
    }
  };

  return (
    <div className="bg-slate-50 min-h-screen pb-6 sm:pb-16">
      <LocalBusinessJsonLd profile={profile} />

      {/* Breadcrumb */}
      <div className="bg-white border-b border-slate-200">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 h-12 sm:h-14 flex items-center justify-between gap-3">
          <Link to={`/kategorija/${profile.categorySlug}`} className="text-slate-600 hover:text-blue-600 flex items-center gap-1.5 text-xs sm:text-sm font-medium transition-colors min-w-0">
            <ArrowLeft className="w-4 h-4 shrink-0" />
            <span className="truncate">Назад кон {profile.category}</span>
          </Link>
          <button
            className="text-slate-600 hover:text-blue-600 flex items-center gap-1.5 text-xs sm:text-sm font-medium transition-colors shrink-0"
            onClick={handleShare}
          >
            Сподели <Share2 className="w-4 h-4" />
          </button>
        </div>
      </div>

      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 pt-8">

        {/* Main Card */}
        <div className="bg-white rounded-2xl border border-slate-200 overflow-hidden shadow-sm mb-8">

          {/* Cover Image */}
          <div className="h-48 md:h-64 bg-slate-200 relative">
            <SafeImage
              src={profile.coverImage}
              alt="cover"
              className="w-full h-full object-cover"
            />
          </div>

          <div className="px-6 pb-8 relative pt-16 mt-2">
            {/* Logo */}
            <div className={`absolute -top-16 left-6 bg-white border border-slate-200 shadow-sm flex items-center justify-center overflow-hidden p-1 ${profile.logoShape === 'horizontal' ? 'w-40 sm:w-48 h-20 sm:h-24 rounded-lg' : 'w-28 h-28 sm:w-32 sm:h-32 rounded-2xl'}`}>
              <SafeImage
                src={profile.logo}
                alt={profile.name}
                className="w-full h-full object-contain p-1"
                fallback={<div className="text-4xl font-bold text-slate-300">{profile.name.charAt(0)}</div>}
              />
            </div>

            {/* Name + CTA */}
            <div className="flex flex-col md:flex-row md:justify-between md:items-end gap-4 border-b border-slate-100 pb-8">
              <div className="flex-1 min-w-0">
                <h1 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold text-slate-900 mb-2 tracking-tight leading-tight">{profile.name}</h1>
                <p className="text-slate-500 font-medium text-sm sm:text-base">{[profile.categoryName || profile.category, profile.subcategory, profile.location].filter(Boolean).join(' • ')}</p>
                <div className="mt-3">
                  <VerificationBadge profile={profile} showLabel={true} />
                </div>
              </div>

              <div className="flex flex-row gap-3 shrink-0 md:self-end">
                <a
                  href={`tel:${profile.phone}`}
                  className="flex-1 md:flex-none inline-flex justify-center items-center gap-2 px-5 py-2.5 rounded-xl bg-blue-500 text-white font-bold hover:bg-blue-600 transition-colors shadow-sm text-sm whitespace-nowrap"
                >
                  <Phone className="w-4 h-4 shrink-0" /> Јави се
                </a>
                <a
                  href={mapsUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex-1 md:flex-none inline-flex justify-center items-center gap-2 px-5 py-2.5 rounded-xl bg-blue-600 text-white font-bold hover:bg-blue-700 transition-colors shadow-sm text-sm whitespace-nowrap"
                >
                  <MapPin className="w-4 h-4 shrink-0" /> Види на мапа
                </a>
              </div>
            </div>

            {/* Info Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 pt-6">
              <div className="flex gap-3 bg-slate-50 p-4 rounded-xl border border-slate-100">
                <MapPin className="w-5 h-5 text-slate-400 mt-0.5 shrink-0" />
                <div>
                  <p className="text-[11px] font-bold text-slate-500 uppercase tracking-wider mb-1">Адреса</p>
                  <p className="font-medium text-slate-900 text-sm leading-tight">{profile.address}<br />{profile.location}</p>
                </div>
              </div>

              <div className="flex gap-3 bg-slate-50 p-4 rounded-xl border border-slate-100">
                <Phone className="w-5 h-5 text-slate-400 mt-0.5 shrink-0" />
                <div>
                  <p className="text-[11px] font-bold text-slate-500 uppercase tracking-wider mb-1">Телефон</p>
                  <a href={`tel:${profile.phone}`} className="font-medium text-slate-900 hover:text-blue-600 text-sm leading-tight block">{profile.phone}</a>
                  {profile.secondaryPhone && (
                    <a href={`tel:${profile.secondaryPhone}`} className="font-medium text-slate-900 hover:text-blue-600 text-sm leading-tight block mt-1">{profile.secondaryPhone}</a>
                  )}
                </div>
              </div>

              {profile.workingHours && (
                <div className="flex gap-3 bg-slate-50 p-4 rounded-xl border border-slate-100">
                  <Clock className="w-5 h-5 text-slate-400 mt-0.5 shrink-0" />
                  <div>
                    <p className="text-[11px] font-bold text-slate-500 uppercase tracking-wider mb-1">Работно време</p>
                    <p className="font-medium text-slate-900 text-sm leading-tight whitespace-pre-line">{profile.workingHours}</p>
                  </div>
                </div>
              )}

              {profile.email && (
                <div className="flex gap-3 bg-slate-50 p-4 rounded-xl border border-slate-100">
                  <Mail className="w-5 h-5 text-slate-400 mt-0.5 shrink-0" />
                  <div>
                    <p className="text-[11px] font-bold text-slate-500 uppercase tracking-wider mb-1">Email</p>
                    <a href={`mailto:${profile.email}`} className="font-medium text-slate-900 hover:text-blue-600 text-sm leading-tight break-all">{profile.email}</a>
                  </div>
                </div>
              )}

              {profile.website && (
                <div className="flex gap-3 bg-slate-50 p-4 rounded-xl border border-slate-100">
                  <Globe className="w-5 h-5 text-slate-400 mt-0.5 shrink-0" />
                  <div>
                    <p className="text-[11px] font-bold text-slate-500 uppercase tracking-wider mb-1">Веб-страница</p>
                    <a href={profile.website} target="_blank" rel="noopener noreferrer" className="font-medium text-blue-600 hover:underline text-sm leading-tight break-all">{profile.website.replace(/^https?:\/\//, '')}</a>
                  </div>
                </div>
              )}

              {profile.facebook && (
                <div className="flex gap-3 bg-slate-50 p-4 rounded-xl border border-slate-100">
                  <Facebook className="w-5 h-5 text-slate-400 mt-0.5 shrink-0" />
                  <div>
                    <p className="text-[11px] font-bold text-slate-500 uppercase tracking-wider mb-1">Facebook</p>
                    <a href={profile.facebook} target="_blank" rel="noopener noreferrer" className="font-medium text-blue-600 hover:underline text-sm">Отвори профил</a>
                  </div>
                </div>
              )}

              {profile.instagram && (
                <div className="flex gap-3 bg-slate-50 p-4 rounded-xl border border-slate-100">
                  <Instagram className="w-5 h-5 text-slate-400 mt-0.5 shrink-0" />
                  <div>
                    <p className="text-[11px] font-bold text-slate-500 uppercase tracking-wider mb-1">Instagram</p>
                    <a href={profile.instagram} target="_blank" rel="noopener noreferrer" className="font-medium text-blue-600 hover:underline text-sm">Отвори профил</a>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>

        {/* За нас + Услуги + Галерија */}
        <div className="bg-white rounded-2xl border border-slate-200 shadow-sm p-6 sm:p-8 mb-8">
          <h2 className="text-xl font-bold text-slate-900 mb-4 border-b border-slate-100 pb-3">За нас</h2>
          <p className="text-slate-700 leading-relaxed whitespace-pre-line">{profile.fullDescription}</p>

          {profile.services && profile.services.length > 0 && (
            <>
              <h2 className="text-xl font-bold text-slate-900 mt-10 mb-4 border-b border-slate-100 pb-3">Услуги</h2>
              <div className="flex flex-wrap gap-2">
                {profile.services.map((service: string, idx: number) => (
                  <span key={idx} className="px-3 py-1.5 bg-blue-50 text-blue-700 border border-blue-100 rounded-lg text-sm font-medium">
                    {service}
                  </span>
                ))}
              </div>
            </>
          )}

          {(() => {
            const validImages = (profile.galleryImages || []).filter((img: string) => img?.trim());
            if (validImages.length === 0) return null;
            return (
              <>
                <h2 className="text-xl font-bold text-slate-900 mt-10 mb-4 border-b border-slate-100 pb-3">Галерија</h2>
                <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
                  {validImages.map((img: string, idx: number) => (
                    <div key={idx} className="aspect-square rounded-xl overflow-hidden bg-slate-100 border border-slate-200">
                      <SafeImage src={img} alt={`Gallery ${idx + 1}`} className="w-full h-full object-cover hover:scale-105 transition-transform" fallback={null} />
                    </div>
                  ))}
                </div>
              </>
            );
          })()}
        </div>

        {/* Google Maps Embed */}
        <div className="bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden mb-8">
          <div className="px-6 py-4 border-b border-slate-100 flex items-center justify-between">
            <h2 className="text-xl font-bold text-slate-900 flex items-center gap-2">
              <MapPin className="w-5 h-5 text-blue-600" /> Локација
            </h2>
            <a
              href={mapsUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="text-sm font-semibold text-blue-600 hover:text-blue-800 transition-colors"
            >
              Отвори во Google Maps →
            </a>
          </div>
          <div className="h-64 sm:h-80 w-full bg-slate-100">
            <iframe
              title={`Локација на ${profile.name}`}
              src={embedUrl}
              width="100%"
              height="100%"
              style={{ border: 0 }}
              allowFullScreen
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
            />
          </div>
        </div>

        {/* Слични профили */}
        {relatedProfiles.length > 0 && (
          <div className="mt-4 mb-8">
            <h3 className="text-xl font-bold text-slate-900 mb-6">Слични профили од {profile.category}</h3>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
              {relatedProfiles.map(p => (
                <FeaturedProfileCard key={p.id} profile={p} />
              ))}
            </div>
          </div>
        )}

        {/* Информации за верификација — најдолу */}
        <VerificationInfo profile={profile} />

      </div>
    </div>
  );
}
