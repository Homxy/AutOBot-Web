// context/ThemeContext.tsx
"use client";
import React, { createContext, useContext, useState, useEffect } from 'react';

const ThemeContext = createContext({
  isDark: true,
  toggleTheme: () => {},
});

export const ThemeProvider = ({ children }: { children: React.ReactNode }) => {
  const [isDark, setIsDark] = useState(true);

  useEffect(() => {
    const savedTheme = localStorage.getItem('theme');
    if (savedTheme === 'light') setIsDark(false);
  }, []);

  const toggleTheme = () => {
    const newStatus = !isDark;
    setIsDark(newStatus);
    localStorage.setItem('theme', newStatus ? 'dark' : 'light');
  };

  return (
    <ThemeContext.Provider value={{ isDark, toggleTheme }}>
      <div style={{
        // จัดการ CSS Variables
        ...(isDark ? {
          '--bg-main': '#020617',
          '--bg-sidebar': '#0f172a',
          '--text-primary': '#ffffff',
          '--text-secondary': '#e2e8f0', // สีเทาอ่อนสำหรับ Dark mode
          '--text-muted': '#94a3b8',
          '--border-color': '#202935',
          '--code-bg': '#1e293b',
        } : {
          // ปรับ Light Mode ให้เข้มขึ้นเพื่อให้อ่านง่าย
          '--bg-main': '#ffffff',
          '--bg-sidebar': '#f1f5f9',
          '--text-primary': '#030509',    // สีดำเกือบสนิท
          '--text-secondary': '#020101',  // สีเทาเข้ม (สำหรับ Paragraph)
          '--text-muted': '#080a0d',     // สีเทาปานกลาง
          '--border-color': '#06080b',   // เส้นขอบที่ชัดเจนขึ้น
          '--code-bg': '#ededed',
        }) as React.CSSProperties,
        height: '100%',
        transition: 'all 0.2s ease-in-out'
      }}>
        {children}
      </div>
    </ThemeContext.Provider>
  );
};

export const useTheme = () => useContext(ThemeContext);