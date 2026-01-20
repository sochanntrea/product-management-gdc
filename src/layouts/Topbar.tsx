import { useLocation } from "react-router-dom";

function formatTitle(segment: string) {
  return segment
    .replace(/-/g, " ")
    .replace(/\b\w/g, (c) => c.toUpperCase());
}

export default function Topbar() {
  const { pathname } = useLocation();

  const segments = pathname.split("/").filter(Boolean);

  let titleSegment = segments[segments.length - 1];

  if (titleSegment && !isNaN(Number(titleSegment))) {
    titleSegment = segments[segments.length - 2];
  }

  const title = formatTitle(titleSegment || "Dashboard");

  return (
    <header className="h-16 bg-white border-b flex items-center justify-between px-6">
      <h1 className="text-lg font-semibold">{title}</h1>

      <div className="flex items-center gap-4">
        <select className="border rounded-md px-3 py-1 text-sm">
          <option>Nika Shop</option>
        </select>

        <div className="w-8 h-8 rounded-full bg-gray-300" />
      </div>
    </header>
  );
}
