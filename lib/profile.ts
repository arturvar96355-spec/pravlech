import type { ForWhomId } from './booking';

/** Что мы помним на устройстве пациента. Здоровье и диагнозы не хранятся. */
export type Person = { name: string; forWhom: ForWhomId };
export type Profile = {
  name: string;
  phone: string;
  people: Person[];
  /** slug врача или id направления (как в BookingProvider) */
  lastDoctor?: string;
  lastService?: string;
};

export const PROFILE_KEY = 'pravlech-profile';

export function loadProfile(): Profile | null {
  try {
    const raw = localStorage.getItem(PROFILE_KEY);
    if (!raw) return null;
    const p = JSON.parse(raw) as Partial<Profile>;
    if (!p.name || typeof p.name !== 'string') return null;
    return {
      name: p.name,
      phone: typeof p.phone === 'string' ? p.phone : '',
      people: Array.isArray(p.people) ? p.people.filter((x) => x && typeof x.name === 'string').slice(0, 3) : [],
      lastDoctor: typeof p.lastDoctor === 'string' ? p.lastDoctor : undefined,
      lastService: typeof p.lastService === 'string' ? p.lastService : undefined,
    };
  } catch {
    return null;
  }
}

export function saveProfile(p: Profile): boolean {
  try {
    localStorage.setItem(PROFILE_KEY, JSON.stringify(p));
    return true;
  } catch {
    return false;
  }
}

export function clearProfile(): void {
  try {
    localStorage.removeItem(PROFILE_KEY);
  } catch {
    /* нечего чистить */
  }
}
