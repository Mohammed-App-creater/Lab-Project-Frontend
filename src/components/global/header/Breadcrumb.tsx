'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';

const labelMap: Record<string, string> = {
  divisions: 'All Divisions',
  'data-science': 'Data Science Division',
  'group-1': 'Group 1',
};

export default function Breadcrumb() {
  const pathname = usePathname();
  const pathParts = pathname?.split('/').filter(Boolean); // Removes empty strings

  const crumbs = pathParts?.map((part, index) => {
    const href = '/' + pathParts.slice(0, index + 1).join('/');
    const label = labelMap[part] || part.replace(/-/g, ' ').replace(/\b\w/g, l => l.toUpperCase());
    return { href, label };
  });

  return (
    <div className="text-sm text-muted-foreground flex items-center gap-1">
      <Link href="/" className="hover:underline">Home</Link>
      {crumbs?.map((crumb, index) => (
        <span key={crumb.href} className="flex items-center gap-1">
          <span>›</span>
          {index < crumbs.length - 1 ? (
            <Link href={crumb.href} className="hover:underline">{crumb.label}</Link>
          ) : (
            <span className="font-medium text-foreground">{crumb.label}</span>
          )}
        </span>
      ))}
    </div>
  );
}
