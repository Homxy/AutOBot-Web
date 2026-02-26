"use client";
import React, { createContext, useContext, useState, useEffect } from 'react';
import { useRouter, usePathname } from 'next/navigation';

type Language = 'en' | 'th';

const LanguageContext = createContext({
  language: 'en' as Language,
  toggleLanguage: () => { },
});

// Map between English and Thai routes
const routeMap: Record<string, string> = {
  '/docs/ai/usage': '/docs/ai/usage_th',
  '/docs/ai/usage_th': '/docs/ai/usage',
  '/docs/ai/demo': '/docs/ai/demo_th',
  '/docs/ai/demo_th': '/docs/ai/demo',
  '/docs/ai/reference': '/docs/ai/reference_th',
  '/docs/ai/reference_th': '/docs/ai/reference',
  '/docs/ai/advanced': '/docs/ai/advanced_th',
  '/docs/ai/advanced_th': '/docs/ai/advanced',
  '/docs/hardware': '/docs/hardware_th',
  '/docs/hardware_th': '/docs/hardware',
  '/docs/feature/spec': '/docs/feature/spec_th',
  '/docs/feature/spec_th': '/docs/feature/spec',
  '/docs/feature/component': '/docs/feature/component_th',
  '/docs/feature/component_th': '/docs/feature/component',
};

export const LanguageProvider = ({ children }: { children: React.ReactNode }) => {
  const [language, setLanguage] = useState<Language>('en');
  const router = useRouter();
  const pathname = usePathname();

  useEffect(() => {
    const savedLang = localStorage.getItem('language') as Language | null;
    if (savedLang === 'th' || savedLang === 'en') {
      setLanguage(savedLang);
    }
  }, []);

  // Sync language state with the current route
  useEffect(() => {
    if (pathname.includes('_th')) {
      setLanguage('th');
    } else if (pathname.startsWith('/docs/ai/') || pathname === '/docs/hardware' || pathname.startsWith('/docs/feature/')) {
      setLanguage('en');
    }
  }, [pathname]);

  const toggleLanguage = () => {
    const newLang: Language = language === 'en' ? 'th' : 'en';
    setLanguage(newLang);
    localStorage.setItem('language', newLang);

    // Navigate to the counterpart route if available
    const targetRoute = routeMap[pathname];
    if (targetRoute) {
      router.push(targetRoute);
    }
  };

  return (
    <LanguageContext.Provider value={{ language, toggleLanguage }}>
      {children}
    </LanguageContext.Provider>
  );
};

export const useLanguage = () => useContext(LanguageContext);
