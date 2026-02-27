// app/(dashboard)/docs/Sidebar.tsx
"use client";
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useTheme } from './ThemeContext';
import { useLanguage } from './LanguageContext';

const menuItemsEn = [
  { title: "1. Overview", href: "/docs" },
  {
    title: "2. Feature",
    href: "/docs/feature/spec",
    children: [
      { title: "2.1 Spec", href: "/docs/feature/spec" },
      { title: "2.2 Component", href: "/docs/feature/component" },
    ]
  },
  { title: "3. Hardware", href: "/docs/hardware" },
  {
    title: "4. Software",
    href: "/docs/software",
    children: [
      { title: "4.1 Logic", href: "/docs/software/logic" },
      { title: "4.2 Loops", href: "/docs/software/loops" },
      { title: "4.3 Math", href: "/docs/software/math" },
      { title: "4.4 Text", href: "/docs/software/text" },
      { title: "4.5 Pins", href: "/docs/software/pins" },
      { title: "4.6 Control", href: "/docs/software/control" },
      { title: "4.7 AutOBot", href: "/docs/software/autobot" },
    ]
  },
  {
    title: "5. AI",
    href: "/docs/ai/usage",
    children: [
      { title: "5.1 How to use", href: "/docs/ai/usage" },
      { title: "5.2 Demo", href: "/docs/ai/demo" },
      { title: "5.3 Function Ref", href: "/docs/ai/reference" },
      { title: "5.4 Advance Edit", href: "/docs/ai/advanced" },
    ]
  },
];

const menuItemsTh = [
  { title: "1. ภาพรวม", href: "/docs" },
  {
    title: "2. ฟีเจอร์",
    href: "/docs/feature/spec_th",
    children: [
      { title: "2.1 ข้อมูลจำเพาะ", href: "/docs/feature/spec_th" },
      { title: "2.2 ส่วนประกอบ", href: "/docs/feature/component_th" },
    ]
  },
  { title: "3. ฮาร์ดแวร์", href: "/docs/hardware_th" },
  {
    title: "4. โปรแกรม",
    href: "/docs/software",
    children: [
      { title: "4.1 ตรรกะ", href: "/docs/software/logic_th" },
      { title: "4.2 ลูป", href: "/docs/software/loops_th" },
      { title: "4.3 คณิตศาสตร์", href: "/docs/software/math_th" },
      { title: "4.4 ข้อความ", href: "/docs/software/text_th" },
      { title: "4.5 พิน", href: "/docs/software/pins_th" },
      { title: "4.6 การควบคุม", href: "/docs/software/control_th" },
      { title: "4.7 ไลบรารี AutOBot", href: "/docs/software/autobot_th" },
    ]
  },
  {
    title: "5. AI",
    href: "/docs/ai/usage_th",
    children: [
      { title: "5.1 วิธีใช้งาน", href: "/docs/ai/usage_th" },
      { title: "5.2 ตัวอย่าง", href: "/docs/ai/demo_th" },
      { title: "5.3 อ้างอิงฟังก์ชัน", href: "/docs/ai/reference_th" },
      { title: "5.4 ตั้งค่าขั้นสูง", href: "/docs/ai/advanced_th" },
    ]
  },
];

export default function Sidebar() {
  const pathname = usePathname();
  const { isDark, toggleTheme } = useTheme();
  const { language, toggleLanguage } = useLanguage();

  const menuItems = language === 'th' ? menuItemsTh : menuItemsEn;

  return (
    <aside style={{
      width: '250px',
      backgroundColor: 'var(--bg-sidebar)',
      borderRight: '1px solid var(--border-color)',
      padding: '30px 20px',
      height: '100%',
      display: 'flex',
      flexDirection: 'column',
      flexShrink: 0,
      transition: 'all 0.3s ease'
    }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '30px' }}>
        <div style={{ color: 'var(--text-primary)', fontWeight: 'bold', fontSize: '1.4rem', letterSpacing: '1px' }}>
          AUTOBOT <span style={{ color: '#facc15' }}>DOCS</span>
        </div>
      </div>

      <nav style={{ flex: 1, overflowY: 'auto', paddingRight: '10px' }}>
        {menuItems.map((item) => {
          const isParentActive = pathname === item.href || (item.children?.some(child => pathname === child.href));

          return (
            <div key={item.title} style={{ marginBottom: '20px' }}>
              <Link href={item.href} style={{
                color: isParentActive ? '#38bdf8' : 'var(--text-secondary)',
                textDecoration: 'none',
                fontWeight: isParentActive ? 'bold' : '500',
                fontSize: '1rem',
                display: 'block'
              }}>
                {item.title}
              </Link>

              {item.children && (
                <div style={{ paddingLeft: '15px', marginTop: '10px', borderLeft: '1px solid var(--border-color)' }}>
                  {item.children.map((child) => {
                    const isChildActive = pathname === child.href;
                    return (
                      <Link key={child.title} href={child.href} style={{
                        color: isChildActive ? '#38bdf8' : 'var(--text-muted)',
                        textDecoration: 'none',
                        display: 'block',
                        fontSize: '0.9rem',
                        marginBottom: '8px',
                        fontWeight: isChildActive ? '600' : 'normal'
                      }}>
                        {child.title}
                      </Link>
                    );
                  })}
                </div>
              )}
            </div>
          );
        })}
      </nav>
      <div>
        <div style={{ display: 'flex', gap: '6px' }}>
          <button
            onClick={toggleLanguage}
            title={language === 'en' ? 'Switch to Thai' : 'Switch to English'}
            style={{
              background: 'none',
              border: '1px solid var(--border-color)',
              borderRadius: '8px',
              padding: '4px 8px',
              cursor: 'pointer',
              fontSize: '1rem',
              color: 'var(--text-primary)',
              transition: 'all 0.2s ease',
            }}
          >
            {language === 'en' ? 'EN' : 'TH'}
          </button>
          <button
            onClick={toggleTheme}
            style={{
              background: 'none',
              border: '1px solid var(--border-color)',
              borderRadius: '8px',
              padding: '4px 8px',
              cursor: 'pointer',
              fontSize: '1.2rem',
              color: 'var(--text-primary)'
            }}
          >
            {isDark ? '🌙' : '☀️'}
          </button>
        </div>
      </div>
      <div style={{ marginTop: '40px', paddingTop: '20px', borderTop: '1px solid var(--border-color)' }}>
        <a href="http://www.gnu.org/licenses/agpl-3.0" target="_blank" rel="noopener noreferrer">
          <img
            src="https://img.shields.io/badge/license-AGPL-blue.svg"
            alt="AGPL License"
          />
        </a>
      </div>
    </aside>
  );
}