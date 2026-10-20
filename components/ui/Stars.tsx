import { Star } from 'lucide-react';

export function Stars({ className = '', size = 20 }: { className?: string; size?: number }) {
  return (
    <span className={`inline-flex gap-0.5 text-[#e0a526] ${className}`} aria-hidden>
      {Array.from({ length: 5 }, (_, i) => (
        <Star key={i} size={size} fill="currentColor" strokeWidth={0} />
      ))}
    </span>
  );
}
