import { BadgeCheck, ShieldCheck, Info } from 'lucide-react';
import { Profile } from '../types';
import { getEffectiveStatus } from './VerificationBadge';

const MK_MONTHS = [
  'јануари', 'февруари', 'март', 'април', 'мај', 'јуни',
  'јули', 'август', 'септември', 'октомври', 'ноември', 'декември',
];

// ISO датум → „месец година" на македонски (пр. „мај 2026").
function formatMkDate(iso?: string | null): string | null {
  if (!iso) return null;
  const d = new Date(iso);
  if (isNaN(d.getTime())) return null;
  return `${MK_MONTHS[d.getMonth()]} ${d.getFullYear()}`;
}

interface VerificationInfoProps {
  profile: Pick<Profile, 'isVerified' | 'verificationStatus' | 'verifiedAt' | 'createdAt' | 'updatedAt'>;
}

export default function VerificationInfo({ profile }: VerificationInfoProps) {
  const status = getEffectiveStatus(profile);

  if (status === 'unverified') return null;

  const isVerified = status === 'verified';
  const TitleIcon = isVerified ? BadgeCheck : ShieldCheck;
  const titleIconClass = isVerified ? 'text-blue-500' : 'text-emerald-500';
  const statusLabel = isVerified ? 'Верифициран профил' : 'Проверен субјект';

  // Датум на последна проверка: рачно поставен → последно ажурирање → креирање
  const checkedDate =
    formatMkDate(profile.verifiedAt) ||
    formatMkDate(profile.updatedAt) ||
    formatMkDate(profile.createdAt) ||
    'мај 2026';

  return (
    <div className="bg-white rounded-2xl border border-slate-200 shadow-sm p-6 sm:p-8 mb-8">
      <h2 className="text-xl font-bold text-slate-900 mb-4 border-b border-slate-100 pb-3 flex items-center gap-2">
        <TitleIcon className={`w-5 h-5 ${titleIconClass}`} />
        Информации за верификација
      </h2>

      <div className="space-y-3 text-sm text-slate-700">
        <div className="flex gap-2">
          <span className="font-semibold text-slate-500 w-40 shrink-0">Статус:</span>
          <span>{statusLabel}.</span>
        </div>
        <div className="flex gap-2">
          <span className="font-semibold text-slate-500 w-40 shrink-0">Деловен статус:</span>
          <span>Регистриран и активен деловен субјект.</span>
        </div>
        <div className="flex gap-2">
          <span className="font-semibold text-slate-500 w-40 shrink-0">Последна проверка:</span>
          <span>{checkedDate}.</span>
        </div>
        <div className="flex gap-2">
          <span className="font-semibold text-slate-500 w-40 shrink-0">Извор:</span>
          <span>Доставени податоци од субјектот и јавно достапни информации.</span>
        </div>
      </div>

      <div className="mt-5 pt-4 border-t border-slate-100 flex items-start gap-2 text-xs text-slate-500">
        <Info className="w-3.5 h-3.5 mt-0.5 flex-shrink-0" />
        <p>Ознаката значи дека се проверени основните идентификациски, деловни и контакт-податоци, вклучително и јавно достапни евиденции на Централниот регистар.</p>
      </div>
    </div>
  );
}
