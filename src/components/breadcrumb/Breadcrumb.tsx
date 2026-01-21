import { Link, useLocation } from "react-router-dom";

function formatSegment(segment: string) {
  return segment.replace(/-/g, " ").replace(/\b\w/g, (c) => c.toUpperCase());
}

export function Breadcrumb() {
  const { pathname } = useLocation();
  const segments = pathname.split("/").filter(Boolean);
  const parent = segments[segments.length - 2];
  const current = segments[segments.length - 1];

  if (!parent) return null;

  return (
    <div className="text-sm text-muted-foreground">
      <Link to={`/${parent}`} className="text-blue-600 hover:underline">
        {formatSegment(parent)}
      </Link>
      <span className="mx-1">›</span>
      <span>{formatSegment(current)}</span>
    </div>
  );
}
