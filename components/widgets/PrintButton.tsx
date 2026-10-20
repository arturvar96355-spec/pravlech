'use client';

import { Printer } from 'lucide-react';

export function PrintButton() {
  return (
    <button onClick={() => window.print()} className="inline-flex min-h-11 items-center gap-2 rounded-full border-2 border-line bg-white px-4 font-medium text-sage transition-colors hover:border-sage">
      <Printer size={18} aria-hidden /> Распечатать
    </button>
  );
}
