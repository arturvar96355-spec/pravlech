'use client';

import { LayoutGroup, motion } from 'motion/react';
import Link from 'next/link';
import { useState } from 'react';
import { doctors, specialties, type SpecialtyId } from '@/content/doctors';
import { cn } from '@/lib/utils';
import { DoctorCard } from './DoctorCard';

export function DoctorsGrid({ limit, filterable = true }: { limit?: number; filterable?: boolean }) {
  const [filter, setFilter] = useState<SpecialtyId | 'all'>('all');
  const list = (filter === 'all' ? doctors : doctors.filter((d) => d.specialtyId === filter)).slice(0, limit);

  return (
    <div>
      {filterable && (
        <div role="group" aria-label="Фильтр по специализации" className="mb-8 flex flex-wrap gap-2">
          {specialties.map((s) => (
            <button
              key={s.id}
              aria-pressed={filter === s.id}
              onClick={() => setFilter(s.id)}
              className={cn(
                'min-h-11 rounded-full border-2 px-5 font-medium transition-colors',
                filter === s.id ? 'border-sage bg-sage text-white' : 'border-line bg-white hover:border-sage',
              )}
            >
              {s.label}
            </button>
          ))}
        </div>
      )}
      <LayoutGroup>
        <motion.ul layout className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
          {list.map((d, i) => (
            <motion.li key={d.slug} layout initial={{ opacity: 0, y: 14 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.45 }}>
              <DoctorCard doctor={d} index={doctors.indexOf(d)} />
            </motion.li>
          ))}
        </motion.ul>
      </LayoutGroup>
      {limit && (
        <p className="mt-8">
          <Link href="/doctors/" className="link-u font-heading text-lg font-medium text-sage">Все врачи →</Link>
        </p>
      )}
    </div>
  );
}
