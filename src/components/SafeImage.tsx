import { useState, ReactNode } from 'react';

interface SafeImageProps {
  src?: string | null;
  alt: string;
  className?: string;
  fallback?: ReactNode;
}

export default function SafeImage({ src, alt, className, fallback = null }: SafeImageProps) {
  const [error, setError] = useState(false);
  const trimmed = src?.trim();

  if (!trimmed || error) return <>{fallback}</>;

  return (
    <img
      src={trimmed}
      alt={alt}
      className={className}
      onError={() => setError(true)}
    />
  );
}
