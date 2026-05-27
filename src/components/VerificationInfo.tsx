import { BadgeCheck, ShieldCheck, Info } from 'lucide-react';
import { Profile } from '../types';
import { getEffectiveStatus } from './VerificationBadge';

interface VerificationInfoProps {
  profile: Pick<Profile, 'isVerified' | 'verificationStatus' | 'verifiedAt'>;
}

export default function VerificationInfo({ profile }: VerificationInfoProps) {
  const status = getEffectiveStatus(profile);

  if (status === 'unverified') return null;

  const isVerified = status === 'verified';
  const TitleIcon = isVerified ? BadgeCheck : ShieldCheck;
  const titleIconClass = isVerified ? 'text-blue-500' : 'text-emerald-500';
  const statusLabel = isVerified ? 'Верифициран профил' : 'Проверен субјект';

  return (
    <div className="bg-white rounded-2xl border border-slate-200 shadow-sm p-6 sm:p-8 mb-8">
      <h2 className="text-xl font-bold text-slate-900 mb-4 border-b border-slate-100 pb-3 flex items-center gap-2">
        <TitleIcon className={`w-5 h-5 ${titleIconClass}`} />
        Информации за верификација
      </h2>

      <div className="space-y-3 text-sm text-slate-700">
        <div className="flex gap-2">
          <span className="font-semibold text-slate-500 w-36 shrink-0">Статус:</span>
          <span>{statusLabel}</span>
        </div>
        <div className="flex gap-2">
          <span className="font-semibold text-slate-500 w-36 shrink-0">Проверени податоци:</span>
          <span>назив, адреса, контакт, локација</span>
        </div>
        <div className="flex gap-2">
          <span className="font-semibold text-slate-500 w-36 shrink-0">Последна проверка:</span>
          <span>{profile.verifiedAt || 'мај 2026'}</span>
        </div>
        <div className="flex gap-2">
          <span className="font-semibold text-slate-500 w-36 shrink-0">Извор:</span>
          <span>доставени податоци и јавно достапни евиденции</span>
        </div>
      </div>

      <div className="mt-5 pt-4 border-t border-slate-100 flex items-start gap-2 text-xs text-slate-500">
        <Info className="w-3.5 h-3.5 mt-0.5 flex-shrink-0" />
        <p>Ознаката значи дека се проверени основните идентификациски и контакт податоци. GPRESS Локален водич не гарантира квалитет, цени, достапност или правна усогласеност на услугите.</p>
      </div>
    </div>
  );
}
