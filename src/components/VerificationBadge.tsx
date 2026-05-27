import { BadgeCheck, ShieldCheck } from 'lucide-react';
import { Profile } from '../types';

export function getEffectiveStatus(profile: Pick<Profile, 'isVerified' | 'verificationStatus'>) {
  if (profile.verificationStatus) return profile.verificationStatus;
  if (profile.isVerified === true) return 'verified';
  return 'unverified';
}

interface VerificationBadgeProps {
  profile: Pick<Profile, 'isVerified' | 'verificationStatus'>;
  size?: 'sm' | 'md';
  showLabel?: boolean;
}

export default function VerificationBadge({ profile, size = 'md', showLabel = true }: VerificationBadgeProps) {
  const status = getEffectiveStatus(profile);

  if (status === 'unverified') return null;

  const iconSize = size === 'sm' ? 'w-4 h-4' : 'w-5 h-5';

  if (!showLabel) {
    if (status === 'verified') return <BadgeCheck className={`${iconSize} text-blue-500`} />;
    if (status === 'checked_subject') return <ShieldCheck className={`${iconSize} text-emerald-500`} />;
    return null;
  }

  if (status === 'verified') {
    return (
      <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-blue-50 text-blue-700 text-xs font-bold border border-blue-200">
        <span className="w-2 h-2 rounded-full bg-blue-600 flex-shrink-0" />
        Верифициран профил
      </span>
    );
  }

  if (status === 'checked_subject') {
    return (
      <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-50 text-emerald-700 text-xs font-bold border border-emerald-200">
        <span className="w-2 h-2 rounded-full bg-emerald-600 flex-shrink-0" />
        Проверен субјект
      </span>
    );
  }

  return null;
}
