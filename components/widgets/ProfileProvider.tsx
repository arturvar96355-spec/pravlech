'use client';

import { createContext, useCallback, useContext, useEffect, useMemo, useState, type ReactNode } from 'react';
import { clearProfile, loadProfile, saveProfile, type Profile } from '@/lib/profile';

type Ctx = {
  /** null — ничего не сохранено или ещё не прочитано */
  profile: Profile | null;
  ready: boolean;
  remember: (p: Profile) => void;
  forget: () => void;
};

const ProfileCtx = createContext<Ctx>({ profile: null, ready: false, remember: () => {}, forget: () => {} });
export const useProfile = () => useContext(ProfileCtx);

/** Профиль читаем только в браузере после загрузки, чтобы статическая страница не расходилась с клиентской. */
export function ProfileProvider({ children }: { children: ReactNode }) {
  const [profile, setProfile] = useState<Profile | null>(null);
  const [ready, setReady] = useState(false);

  useEffect(() => {
    setProfile(loadProfile());
    setReady(true);
  }, []);

  const remember = useCallback((p: Profile) => {
    if (saveProfile(p)) setProfile(p);
  }, []);
  const forget = useCallback(() => {
    clearProfile();
    setProfile(null);
  }, []);

  const value = useMemo(() => ({ profile, ready, remember, forget }), [profile, ready, remember, forget]);
  return <ProfileCtx.Provider value={value}>{children}</ProfileCtx.Provider>;
}
