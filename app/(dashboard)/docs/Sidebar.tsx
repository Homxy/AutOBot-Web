// app/(dashboard)/docs/Sidebar.tsx
"use client";
import Link from 'next/link';
import { usePathname } from 'next/navigation';

const menuItems = [
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
  { title: "4. Software", href: "/docs/software" },
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

export default function Sidebar() {
  const pathname = usePathname();

  return (
    <aside style={{ 
      width: '280px', 
      backgroundColor: '#0f172a', 
      borderRight: '1px solid #334155', 
      padding: '30px 20px', 
      height: '100vh', 
      position: 'sticky', 
      top: 0,
      overflowY: 'auto'
    }}>
      <div style={{ color: '#ffffff', fontWeight: 'bold', fontSize: '1.4rem', marginBottom: '30px', letterSpacing: '1px' }}>
        AUTOBOT <span style={{ color: '#facc15' }}>DOCS</span>
      </div>
      
      <nav>
        {menuItems.map((item) => {
          const isParentActive = pathname === item.href || (item.children?.some(child => pathname === child.href));
          
          return (
            <div key={item.title} style={{ marginBottom: '20px' }}>
              <Link href={item.href} style={{ 
                color: isParentActive ? '#38bdf8' : '#e2e8f0', 
                textDecoration: 'none', 
                fontWeight: isParentActive ? 'bold' : '500',
                fontSize: '1rem',
                display: 'block'
              }}>
                {item.title}
              </Link>
              
              {item.children && (
                <div style={{ paddingLeft: '15px', marginTop: '10px', borderLeft: '1px solid #334155' }}>
                  {item.children.map((child) => {
                    const isChildActive = pathname === child.href;
                    return (
                      <Link key={child.title} href={child.href} style={{ 
                        color: isChildActive ? '#38bdf8' : '#94a3b8', 
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
    </aside>
  );
}