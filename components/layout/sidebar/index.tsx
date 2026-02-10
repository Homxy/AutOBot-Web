import Link from 'next/link';

const sidebarNav = [
  {
    title: "Getting Started",
    links: [
      { href: "/docs/introduction", label: "Introduction" },
      { href: "/docs/installation", label: "Installation" },
    ]
  },
  {
    title: "Core Concepts",
    links: [
      { href: "/docs/routing", label: "Routing & Layouts" },
      { href: "/docs/mdx-guide", label: "Using MDX" },
    ]
  },
];

export default function DocsSidebar() {
  return (
    // 1. Sticky Sidebar styling
    <aside className="w-64 shrink-0 border-r border-gray-200 overflow-y-auto py-6 px-4">
      <nav className="space-y-8">
        {sidebarNav.map((section) => (
          <div key={section.title}>
            <h5 className="font-semibold text-gray-900 mb-3">{section.title}</h5>
            <ul className="space-y-2">
              {section.links.map((link) => (
                <li key={link.href}>
                  <Link 
                    href={link.href}
                    className="block text-gray-600 hover:text-gray-900 text-sm transition-colors"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        ))}
      </nav>
    </aside>
  );
}